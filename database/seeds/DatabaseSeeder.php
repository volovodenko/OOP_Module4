<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(CategoriesTableSeeder::class);
        $this->call(MenusTableSeeder::class);
        $this->call(NewsTableSeeder::class);
        $this->call(TagsTableSeeder::class);
        $this->call(NewsTagsTableSeeder::class);
        $this->call(CommentsTableSeeder::class);
        $this->call(VotesTableSeeder::class);

        //Баннеры
        $this->call(SellersTableSeeder::class);
        $this->call(CouponsTableSeeder::class);
        $this->call(BannersTableSeeder::class);
    }
}
