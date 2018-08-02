<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class MenuController extends Controller
{
    public function getMenu()
    {
        $menu = DB::table('menus')
            ->select(
                'menus.id',
                'menus.title',

                'categories.link',
                'categories.id as catId'
            )
            ->leftJoin('categories', 'menus.category_id', '=', 'categories.id')
            ->get();

        return response($menu, 200);
    }

}
