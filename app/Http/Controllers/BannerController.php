<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Banner;

//use Storage;

class BannerController extends Controller
{
    public function getBanner()
    {

        $menu = Banner::where('isActive', true)
            ->select(
                'banners.id',
                'banners.name',
                'banners.model',
                'banners.price',
                'banners.img',

                'sellers.seller',
                'sellers.link',

                'coupons.coupon',
                'coupons.discount')
            ->leftJoin('sellers', 'banners.seller_id', '=', 'sellers.id')
            ->leftJoin('coupons', 'banners.coupon_id', '=', 'coupons.id')
            ->get();

        return response($menu, 200);
    }
}
