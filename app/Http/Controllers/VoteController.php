<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Auth;
use Validator;

class VoteController extends Controller
{
    public function getVotesByCommentId($commentId)
    {
        $votes = DB::table('votes')
            ->select(
                'vote',
                'author_id',
                'comment_id'
            )
            ->where('comment_id', $commentId)
            ->get();

        return $votes;
    }

    public function saveVote(Request $request)
    {
        //если пользователь не авторизировался
        if (!Auth::check()) {
            return response()->json(['message' => 'API: Unauthenticated'], 401);
        }

        $validator = Validator::make($request->all(), [
            'vote' => 'required|string|max:4',
            'id' => 'required|numeric|unique:comments,id,' . $request->id
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }


        $user = Auth::user();

        $voteCollection = DB::table('votes')
            ->where('comment_id', $request->id)
            ->where('author_id', $user->id)
            ->get();


        $voteArray = $voteCollection->toArray();


        if (empty($voteArray)){
            DB::table('votes')->insert(
                [
                    'vote' => $request->vote,
                    'comment_id' => $request->id,
                    'author_id' => $user->id,
                ]
            );

            return response()->json(['message' => 'success'], 200);
        }


        DB::table('votes')
            ->where('comment_id', $request->id)
            ->where('author_id', $user->id)
            ->update(['vote' => $request->vote]);


        return response()->json(['message' => 'success'], 200);

    }
}
