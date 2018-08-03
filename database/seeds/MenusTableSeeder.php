<?php

use Illuminate\Database\Seeder;
use App\Menu;

class MenusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Menu::create([
            'title' => 'Новости',
            'category_id' => 1
        ]);

        Menu::create([
            'title' => 'Политика',
            'category_id' => 2
        ]);

        Menu::create([
            'title' => 'Экономика',
            'category_id' => 3
        ]);

        Menu::create([
            'title' => 'Украина',
            'category_id' => 4
        ]);

        Menu::create([
            'title' => 'Мир',
            'category_id' => 5
        ]);

        Menu::create([
            'title' => 'Спорт',
            'category_id' => 6
        ]);

        Menu::create([
            'title' => 'Аналитика',
            'category_id' => 7
        ]);

        Menu::create([
            'title' => 'Политика',
            'category_id' => 2,
            'parent_id' => 1
        ]);

        Menu::create([
            'title' => 'Экономика',
            'category_id' => 3,
            'parent_id' => 1
        ]);

        Menu::create([
            'title' => 'Еще новости',
            'category_id' => 1,
            'parent_id' => 1
        ]);

        Menu::create([
            'title' => 'Украина',
            'category_id' => 4,
            'parent_id' => 10
        ]);

        Menu::create([
            'title' => 'Мир',
            'category_id' => 5,
            'parent_id' => 10
        ]);

        Menu::create([
            'title' => 'Спорт',
            'category_id' => 6,
            'parent_id' => 10
        ]);
    }
}
