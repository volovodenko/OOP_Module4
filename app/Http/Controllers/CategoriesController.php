<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class CategoriesController extends Controller
{

    public function getAllCategories(){
        $categories = DB::table('categories')
            ->where('isActive', true)
            ->get();

        return response($categories, 200);
    }

    public function getCategoryByLink($link){

        $category = DB::table('categories')
            ->where('isActive', true)
            ->where('link', $link)
            ->get();

        return $category;
    }


}
