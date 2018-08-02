<?php

use Illuminate\Database\Seeder;

class CouponsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('coupons')->insert([
            [
                'coupon' => 'XXX-YYY-ZZZ',
                'discount' => '10%'
            ],
            [
                'coupon' => 'AAA-BBB-CCC',
                'discount' => '5%'
            ]
        ]);
    }
}
