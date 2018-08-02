<?php

use Illuminate\Database\Seeder;
use App\Banner;

class BannersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Banner::create([

            'name' => 'Кофеварка',
            'model' => 'Bosch XHR-4',
            'img' => 'Bosch.png',
            'price' => 645,
            'coupon_id' => 1,
            'seller_id' => 1,
        ]);

        Banner::create([

            'name' => 'Наушники',
            'model' => 'Beats SOLO HD',
            'img' => 'beats.png',
            'price' => 1050,
            'coupon_id' => 2,
            'seller_id' => 2,
        ]);
        Banner::create([

            'name' => 'Фотоаппарат',
            'model' => 'Canon EOS 550D',
            'img' => 'canon.png',
            'price' => 20000,
            'coupon_id' => 1,
            'seller_id' => 2,
        ]);
        Banner::create([

            'name' => 'Рюкзак',
            'model' => 'Kathmandu',
            'img' => 'backpack.png',
            'price' => 2500,
            'coupon_id' => 2,
            'seller_id' => 1,
        ]);
        Banner::create([

            'name' => 'Сумка женская',
            'model' => 'HERMES',
            'img' => 'bag.png',
            'price' => 5000,
            'coupon_id' => 2,
            'seller_id' => 1,
        ]);
        Banner::create([

            'name' => 'Музыкальный центр',
            'model' => 'SONY',
            'img' => 'sony.png',
            'price' => 10500,
            'coupon_id' => 2,
            'seller_id' => 2,
        ]);
        Banner::create([

            'name' => 'Планшет',
            'model' => 'Ipad Pro',
            'img' => 'ipad.png',
            'price' => 30000,
            'coupon_id' => 1,
            'seller_id' => 1,
        ]);
        Banner::create([

            'name' => 'Смартфон',
            'model' => 'Samsung Galaxy S9',
            'img' => 'samsung-galaxy-s9.png',
            'price' => 22000,
            'coupon_id' => 2,
            'seller_id' => 1,
        ]);


    }
}
