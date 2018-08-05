<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', 'API\UserController@login');
Route::post('register', 'API\UserController@register');
Route::post('validateEmail', 'API\UserController@validateEmail');
Route::post('details', 'API\UserController@details')->middleware('auth:api');



Route::get('menu', 'MenuController@getMenu');
//Route::get('image', 'MenuController@getImage');

Route::get('currency', 'CurrencyController@getCurrency');

Route::get('b', 'BannerController@getBanner'); //банери

Route::get('slider', 'NewsController@getSliderNews');
Route::get('hotNews', 'NewsController@getHotNews');
Route::get('homeNews', 'NewsController@getHomeNews');
Route::get('top3news', 'NewsController@getTop3News');
Route::get('catNews/{catLink}/{slug?}', 'NewsController@getCatNews')->middleware('user:api');
Route::get('tagNews/{tag}', 'NewsController@getNewsListByTag');
Route::post('saveViews', 'NewsController@saveViews');

Route::get('getCat', 'CategoriesController@getAllCategories');

Route::get('getTags/{tag}', 'TagController@getTagsForSearch');


Route::get('top5commentators', 'CommentController@getTop5Commentators');
Route::post('comment/save', 'CommentController@saveComment')->middleware('user:api');

Route::post('vote/save', 'VoteController@saveVote')->middleware('user:api');



//Route::get('test', 'CurrencyController@test');

Route::any('/{catchAll}', function () {
    return response()->json(['message' => 'API: Not Found!'], 404);
})->where('catchAll', '^.*$');