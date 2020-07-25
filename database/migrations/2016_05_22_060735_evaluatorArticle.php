<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EvaluatorArticle extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('evaluator', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name',256);
            $table->text('abstract');
            $table->text('cv');
            $table->text('email');
            $table->string('phone');
            $table->text('web');
            $table->string('image',256)->nullable();
            $table->tinyInteger('status');
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
        Schema::drop('evaluator');
    }
}
