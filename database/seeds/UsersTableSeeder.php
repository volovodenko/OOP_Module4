<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([ //1
            'name' => 'artur',
            'email' => 'a@i.ua',
            'password' => password_hash('12345', PASSWORD_DEFAULT)
        ]);

        User::create([ //2
            'name' => 'boris',
            'email' => 'b@i.ua',
            'password' => password_hash('12345', PASSWORD_DEFAULT)
        ]);

        User::create([ //3
            'name' => 'vasyl',
            'email' => 'v@i.ua',
            'password' => password_hash('12345', PASSWORD_DEFAULT)
        ]);


        User::create([ //4
            'name' => 'gosha',
            'email' => 'g@i.ua',
            'password' => password_hash('12345', PASSWORD_DEFAULT)
        ]);

        User::create([ //5
            'name' => 'egor',
            'email' => 'e@i.ua',
            'password' => password_hash('12345', PASSWORD_DEFAULT)
        ]);

        User::create([ //6
            'name' => 'igor',
            'email' => 'i@i.ua',
            'password' => password_hash('12345', PASSWORD_DEFAULT)
        ]);

        User::create([ //7
            'name' => 'kostya',
            'email' => 'k@i.ua',
            'password' => password_hash('12345', PASSWORD_DEFAULT)
        ]);

        User::create([ //8
            'name' => 'leonid',
            'email' => 'l@i.ua',
            'password' => password_hash('12345', PASSWORD_DEFAULT)
        ]);

        User::create([ //8
            'name' => 'misha',
            'email' => 'm@i.ua',
            'password' => password_hash('12345', PASSWORD_DEFAULT)
        ]);

        User::create([ //9
            'name' => 'oleg',
            'email' => 'o@i.ua',
            'password' => password_hash('12345', PASSWORD_DEFAULT)
        ]);

        User::create([ //10
            'name' => 'pavel',
            'email' => 'p@i.ua',
            'password' => password_hash('12345', PASSWORD_DEFAULT)
        ]);

        User::create([ //11
            'name' => 'ruslan',
            'email' => 'r@i.ua',
            'password' => password_hash('12345', PASSWORD_DEFAULT)
        ]);

        User::create([ //12
            'name' => 'taras',
            'email' => 't@i.ua',
            'password' => password_hash('12345', PASSWORD_DEFAULT)
        ]);

        User::create([ //13
            'name' => 'ustin',
            'email' => 'u@i.ua',
            'password' => password_hash('12345', PASSWORD_DEFAULT)
        ]);

        User::create([ //14
            'name' => 'fedor',
            'email' => 'f@i.ua',
            'password' => password_hash('12345', PASSWORD_DEFAULT)
        ]);

        User::create([ //15
            'name' => 'yurij',
            'email' => 'y@i.ua',
            'password' => password_hash('12345', PASSWORD_DEFAULT)
        ]);
    }
}