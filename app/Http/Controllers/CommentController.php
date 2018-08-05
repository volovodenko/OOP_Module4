<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Auth;
use Validator;
use App\Comment;
use App\Http\Controllers\VoteController;


class CommentController extends Controller
{

    public function getCommentsByArticleId($newsId)
    {
        $commentsCollection = DB::table('comments')
            ->leftJoin('users', 'comments.author_id', '=', 'users.id')
            ->select(
                'comments.id',
                'comments.text',
                'comments.parent_id as pId',
                'users.name as author',
                'users.id as authorId'
            )
            ->where('news_id', $newsId)
            ->get();

        $commentsArray = $commentsCollection->toArray();


        //Get votes for comments
        $votes = new VoteController;

        $userId = 0;
        //если пользователь авторизировался
        if (Auth::check()) {
            $user = Auth::user();
            $userId = $user->id;
        }

        $commentsArrayWithVotes = array_map(function ($comment) use ($votes, $userId) {

            $votesArray = $votes->getVotesByCommentId($comment->id)->toArray();

            $ups = 0;
            $downs = 0;
            $userVote = null;
            foreach ($votesArray as $vote) {
                if ($vote->vote === 'up' && intval($vote->author_id) !== $userId) {
                    $ups++;
                }

                if ($vote->vote === 'down' && intval($vote->author_id) !== $userId) {
                    $downs++;
                }

                if (intval($vote->author_id) === $userId) {
                    $userVote = $vote->vote;

                }

            }


            $comment->ups = $ups;
            $comment->downs = $downs;

            if ($userVote && $userVote !== 'veto') {
                $comment->vote = $userVote;
            }

            return $comment;

        }, $commentsArray);


        usort($commentsArrayWithVotes, function ($a, $b) {
            $voteA = (isset($a->vote) && $a->vote === 'up') ? 1 : 0;
            $voteB = (isset($b->vote) && $b->vote === 'up') ? 1 : 0;

            return ($b->ups + $voteB) - ($a->ups + $voteA);
        });

        return $commentsArrayWithVotes;
    }


    public function saveComment(Request $request)
    {

        //если пользователь не авторизировался
        if (!Auth::check()) {
            return response()->json(['message' => 'API: Unauthenticated'], 401);
        }

        $validator = Validator::make($request->all(), [
            'text' => 'required|string|max:255',
            'news_id' => 'required|numeric|unique:news,id,' . $request->news_id
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }


        $user = Auth::user();

        Comment::create([
            'text' => $request->text,
            'author_id' => $user->id,
            'news_id' => $request->news_id,
        ]);


        return response()->json(['message' => 'success'], 200);
    }


    public function getTop5Commentators()
    {
        $topAuthorIdCollection = DB::table('votes')
            ->select(DB::raw('count(*) as c, author_id'))
            ->groupBy('author_id')
            ->orderBy('c', 'desc')
            ->orderBy('author_id', 'desc')
            ->take(5)
            ->get();


        $topAuthorIdArray = $topAuthorIdCollection->toArray();

        $top5CommentatorsArray = array_map(function ($item) {

            $commentatorCollection = DB::table('users')
                ->select('name', 'id')
                ->where('id', $item->author_id)
                ->get();

            $commentator = $commentatorCollection->toArray()[0];

            $commentator->count = $item->c;

            return $commentator;


        }, $topAuthorIdArray);


        return response($top5CommentatorsArray, 200);

    }

}
