Задание смотри файл Модуль ООП - практика.doc.

После клонирования проекта выполнить команду:
composer install

Скопировать файл .env.example в файл .env.
Указать поля:
DB_DATABASE,
DB_USERNAME,
DB_PASSWORD.

На ПК должен быть установлен MySQL сервер.

Выполнить команду:
php artisan migrate:refresh --seed

затем:
php artisan passport:install

После этого можно запускать сервер:
php artisan serve


Часть View (шаблона MVC) разработана на React.
Часть Model и Controller - фреймворк Laravel

Все исходники в папке react.
Для работы в dev-режиме выполнить команду:
npm i

После установки всех npm пакетов:
npm run watch - для работы в dev-режиме

или
npm run build - для генерации production файлов main.js и main.css