<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\CommentController;
use DB;
use App\News;

use Illuminate\Support\Facades\Auth;


class NewsController extends Controller
{

    public function getSliderNews()
    {
        $newsCollection = DB::table('news')
            ->orderBy('id', 'desc')
            ->leftJoin('categories', 'news.category_id', '=', 'categories.id')
            ->select('news.*', 'categories.link')
            ->take(5)
            ->get();

        return response($newsCollection, 200);
    }


    public function getHotNews()
    {
        $hotNewsCollection = DB::table('news')
            ->leftJoin('categories', 'news.category_id', '=', 'categories.id')
            ->select('news.id', 'news.title', 'news.slug', 'categories.link')
            ->where('isHot', true)
            ->orderBy('id', 'desc')
            ->take(5)
            ->get();


        return response($hotNewsCollection, 200);
    }


    public function getHomeNews(CategoriesController $categories)
    {
        $catListArray = json_decode($categories->getAllCategories()->getContent());

        $newsList = [];

        foreach ($catListArray as $cat) {

            $news = $cat->link === 'analytic'
                ? $this->getAnalyticNews()->take(5)
                : $this->getNewsListByCatId($cat->id)->take(5);
            $newsList[] = $news;
        }

        return response($newsList, 200);
    }


    public function getCatNews(CategoriesController $categories, $catLink, $slug = null)
    {

        if ($catLink === 'analytic') {
            return response($this->getAnalyticNews(), 200);
        }


        $catListArray = json_decode($categories->getAllCategories()->getContent());

        $catLinkArray = array_map(function ($item) {
            return $item->link;
        }, $catListArray);

        if (!in_array($catLink, $catLinkArray)) {
            return response()->json(['message' => 'API: Category Not Found!'], 404);
        }

        $catId = $categories->getCategoryByLink($catLink)->toArray()[0]->id;

        $result = $slug ? $this->getArticle($catId, $slug) : $this->getNewsListByCatId($catId);

        if (empty($result->toArray())) {
            return response()->json(['message' => 'API: Article Not Found!'], 404);
        }

        return response($result, 200);

    }


    public function getNewsListByTag(TagController $tags, $tag)
    {
        $currentTag = explode('.', $tag)[0];

        $tagIdCollection = $tags->getTagIdByTagName($currentTag);

        $tagIdArray = $tagIdCollection->toArray();

        if (empty($tagIdArray)) {
            return response()->json(['message' => 'API: Tag Not Found!'], 404);
        }


        $tagId = $tagIdArray[0]->id;

        $newsListCollection = DB::table('news')
            ->leftJoin('news_tags', 'news.id', '=', 'news_tags.news_id')
            ->leftJoin('categories', 'news.category_id', '=', 'categories.id')
            ->select('news.id', 'news.title', 'news.slug', 'news.created_at', 'categories.link')
            ->where('news_tags.tag_id', $tagId)
            ->orderBy('id', 'desc')
            ->get();

        return response($newsListCollection, 200);

    }


    protected function getNewsListByCatId($catId)
    {
        $newsListCollection = DB::table('news')
            ->leftJoin('categories', 'news.category_id', '=', 'categories.id')
            ->select('news.id', 'news.title', 'news.slug', 'news.isAnalytic',
                'news.isHot', 'news.created_at', 'news.category_id', 'categories.link')
            ->where('news.category_id', $catId)
            ->orderBy('id', 'desc')
            ->get();

        return $newsListCollection;
    }


    protected function getArticle($catId, $slug)
    {

        $articleCollection = DB::table('news')
            ->select('id', 'title', 'titleImg', 'isHot', 'isAnalytic', 'text', 'views', 'created_at')
            ->where('category_id', $catId)
            ->where('slug', $slug)
            ->get();


        $articleArray = $articleCollection->toArray();

        if (empty($articleArray)) {
            return $articleCollection;
        }

        $articleId = $articleArray[0]->id;

        //Get tags
        $tags = new TagController;
        $tagsList = $tags->getTagsByArticleId($articleId);

        //Get comments
        $comments = new CommentController;
        $commentsList = $comments->getCommentsByArticleId($articleId);

        $article = $articleArray[0];

        //если пользователь авторизировался
        if (Auth::check()) {
            return collect([$article, $tagsList, $commentsList]);
        }


        //если не авторизировался
        if ($article->isAnalytic) {
            $arrayArticle = array_slice(explode(' ', $article->text), 0, 5);
            $arrayArticle[] = '...';

            $article->text = implode(' ', $arrayArticle);

            return collect([$article, $tagsList, $commentsList]);
        }

        return collect([$article, $tagsList, $commentsList]);


    }


    protected function saveViews(Request $request, News $news)
    {

        $article = $news->find($request->newsId);
        $article->views = $request->views;

        $article->save();

        return response()->json(['message' => 'API: Saved'], 200);

    }

    protected function getAnalyticNews()
    {
        $newsListCollection = DB::table('news')
            ->leftJoin('categories', 'news.category_id', '=', 'categories.id')
            ->select('news.id', 'news.title', 'news.slug', 'news.isAnalytic',
                'news.isHot', 'news.created_at', 'news.category_id', 'categories.link')
            ->where('news.isAnalytic', true)
            ->orderBy('id', 'desc')
            ->get();

        return $newsListCollection;
    }


    public function getTop3News(){

        $top3NewsIdCollection = DB::table('comments')
            ->select(DB::raw('count(*) as c, news_id'))
            ->groupBy('news_id')
            ->orderBy('c', 'desc')
            ->orderBy('news_id', 'desc')
            ->take(3)
            ->get();


        $top3NewsIdArray = $top3NewsIdCollection->toArray();


        $top3NewsArray = array_map(function($item) {

            $articleCollection = DB::table('news')
                ->leftJoin('categories', 'news.category_id', '=', 'categories.id')
                ->select('news.id', 'news.title', 'news.slug', 'news.isAnalytic',
                    'news.isHot', 'news.created_at', 'categories.link')
                ->where('news.id', $item->news_id)
                ->get();


            return $articleCollection->toArray()[0];


        },$top3NewsIdArray);


        return response($top3NewsArray, 200);

    }


    protected function translit($str)
    {
        $translit = array(
            "А" => "a",
            "Б" => "b",
            "В" => "v",
            "Г" => "g",
            "Д" => "d",
            "Е" => "e",
            "Ё" => "e",
            "Ж" => "zh",
            "З" => "z",
            "И" => "i",
            "Й" => "y",
            "К" => "k",
            "Л" => "l",
            "М" => "m",
            "Н" => "n",
            "О" => "o",
            "П" => "p",
            "Р" => "r",
            "С" => "s",
            "Т" => "t",
            "У" => "u",
            "Ф" => "f",
            "Х" => "h",
            "Ц" => "ts",
            "Ч" => "ch",
            "Ш" => "sh",
            "Щ" => "shch",
            "Ъ" => "",
            "Ы" => "y",
            "Ь" => "",
            "Э" => "e",
            "Ю" => "yu",
            "Я" => "ya",
            "а" => "a",
            "б" => "b",
            "в" => "v",
            "г" => "g",
            "д" => "d",
            "е" => "e",
            "ё" => "e",
            "ж" => "zh",
            "з" => "z",
            "и" => "i",
            "й" => "y",
            "к" => "k",
            "л" => "l",
            "м" => "m",
            "н" => "n",
            "о" => "o",
            "п" => "p",
            "р" => "r",
            "с" => "s",
            "т" => "t",
            "у" => "u",
            "ф" => "f",
            "х" => "h",
            "ц" => "ts",
            "ч" => "ch",
            "ш" => "sh",
            "щ" => "shch",
            "ъ" => "",
            "ы" => "y",
            "ь" => "",
            "э" => "e",
            "ю" => "yu",
            "я" => "ya",

            "A" => "a",
            "B" => "b",
            "C" => "c",
            "D" => "d",
            "E" => "e",
            "F" => "f",
            "G" => "g",
            "H" => "h",
            "I" => "i",
            "J" => "j",
            "K" => "k",
            "L" => "l",
            "M" => "m",
            "N" => "n",
            "O" => "o",
            "P" => "p",
            "Q" => "q",
            "R" => "r",
            "S" => "s",
            "T" => "t",
            "U" => "u",
            "V" => "v",
            "W" => "w",
            "X" => "x",
            "Y" => "y",
            "Z" => "z"
        );

        //замена подстроки на подстроку из массива
        $result = strtr($str, $translit);
        //все символы кроме букв и цифр заменить на -
        $result = preg_replace("/[^a-zA-Z0-9_]/i", "-", $result);
        //все тире больше 1-го раза заменить одним тире
        $result = preg_replace("/\-+/i", "-", $result);
        //все тире в начале строки и в конце строки убрать
        $result = preg_replace("/(^\-)|(\-$)/i", "", $result);
        return $result;
    }
}
