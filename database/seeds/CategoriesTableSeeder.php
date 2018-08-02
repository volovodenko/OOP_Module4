<?php

use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert([
            [
                'title' => 'Без категории',
                'link' => 'noCategory',
                'isActive' => false
            ]
        ]);

        DB::table('categories')->insert([
            [
                'title' => 'Политика',
                'link' => 'politics'
            ],
            [
                'title' => 'Экономика',
                'link' => 'economic'
            ],
            [
                'title' => 'Украина',
                'link' => 'ukraine'
            ],
            [
                'title' => 'Мир',
                'link' => 'world'
            ],
            [
                'title' => 'Спорт',
                'link' => 'sport'
            ],
            [
                'title' => 'Аналитика',
                'link' => 'analytic'
            ]
        ]);
    }
}
