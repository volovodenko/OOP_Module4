<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBannersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('banners', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('model');
            $table->string('img');
            $table->integer('price')->unsigned();
            $table->boolean('isActive')->default(1);
            $table->integer('coupon_id')->unsigned()->default(0);
            $table->foreign('coupon_id')->references('id')->on('coupons');
            $table->unsignedInteger('seller_id');
            $table->foreign('seller_id')->references('id')->on('sellers');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('banners');
    }
}
