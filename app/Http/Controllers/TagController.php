<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class TagController extends Controller
{
    public function getTagsByArticleId($articleId)
    {
        $tags = DB::table('tags')
            ->leftJoin('news_tags', 'tags.id', '=', 'news_tags.tag_id')
            ->select('tags.id', 'tags.tag')
            ->where('news_tags.news_id', $articleId)
            ->get();

        return $tags;
    }

    public function getTagIdByTagName($tag)
    {
        $tagId = DB::table('tags')
            ->select('id')
            ->where('tag', $tag)
            ->get();

        return $tagId;
    }

    public function getTagsForSearch($tag)
    {
        $tags = DB::table('tags')
            ->select('tag', 'id')
            ->where('tag', 'like',  "{$tag}%")
            ->get();

        return response($tags, 200);

    }
}
