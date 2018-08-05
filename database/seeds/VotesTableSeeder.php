<?php

use Illuminate\Database\Seeder;

class VotesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $commentsCount = DB::table('comments')->count();

        for ($commentId = 1; $commentId <= $commentsCount; $commentId++) {

            $numVotes = rand(0, 5);

            $commentsCollection = DB::table('comments')
                ->select('news_id', 'author_id')
                ->where('id', $commentId)
                ->get();

            $commentsArray = $commentsCollection->toArray()[0];
            $authorCommentId = $commentsArray->author_id;

            $authorArray = [];
            $authorArray[] = $authorCommentId; //чтоб сам за себя не голосовал

            for ($j = 0; $j <= $numVotes; $j++) {

                do {
                    $authorId = rand(1, 15);
                } while (in_array($authorId, $authorArray));

                $authorArray[] = $authorId;

                DB::table('votes')->insert(
                    [
                        'vote' => self::$vote[array_rand(self::$vote, 1)],
                        'comment_id' => $commentId,
                        'author_id' => $authorId,
                    ]
                );

            }


        }
    }


    private static $vote = [
        0 => 'up',
        1 => 'down'
    ];
}
