<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class User extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name',256);
            $table->string('ap_pat',45);
            $table->string('ap_mat',45)->nullable();
            $table->string('nickname',45);
            $table->string('email',45)->index();
            $table->string('password',256);
            $table->string('remember_token',256)->nullable();
            $table->date('birthdate')->nullable();
            $table->string('facebook',256)->nullable();
            $table->string('twitter',256)->nullable();
            $table->string('linkedin',256)->nullable();
            $table->string('google',256)->nullable();
            $table->string('api_key',1024)->nullable();
            $table->string('user_type',256)->nullable();
            $table->string('token')->nullable();
            $table->tinyInteger('status');
            $table->timestamp('created_at');
            $table->timestamp('updated_at');
            $table->timestamp('deleted_at')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('user');
    }
}
