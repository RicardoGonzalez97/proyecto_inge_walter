<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Article extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('article', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name',256);
            $table->string('keywords',256);
            $table->text('summary');
            $table->text('abstract');
            $table->string('content',256);
            $table->text('files')->nullable();
            $table->text('author');
            $table->text('isssn');
            $table->tinyInteger('status');
            $table->integer('convened_id');
            $table->integer('investigationlines_id');
            $table->integer('user_id');
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
        Schema::drop('article');
    }
}
