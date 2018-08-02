<?php

use Illuminate\Database\Seeder;

class NewsTagsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $arrayTags = [];
        $categoryId = 1;

        for ($i = 1; $i < 300; $i++) {


            $arrayTags[] = [
                'news_id' => $i,
                'tag_id' => $categoryId++
            ];

            $tagArray = [];
            for ($j = 1; $j <= 4; $j++) {

                do {
                    $tagId = rand(6, 147);
                } while (in_array($tagId, $tagArray));

                $tagArray[] = $tagId;

                $arrayTags[] = [
                    'news_id' => $i,
                    'tag_id' => $tagId
                ];
            }

            $categoryId = $categoryId > 5 ? 1 : $categoryId;
        }


        DB::table('news_tags')->insert($arrayTags);

    }
}