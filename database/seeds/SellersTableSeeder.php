<?php

use Illuminate\Database\Seeder;

class SellersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('sellers')->insert([
            [
                'seller' => 'ROZETKA',
                'link' => 'https://rozetka.com.ua'
            ],
            [
                'seller' => 'F.ua',
                'link' => 'https://f.ua'
            ]
        ]);
    }
}
