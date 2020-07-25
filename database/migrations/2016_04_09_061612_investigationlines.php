<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Investigationlines extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('investigationlines', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name',256);
            $table->string('description',1024);
            $table->text('files')->nullable();
            $table->text('cover')->nullable();
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
        Schema::drop('investigationlines');
    }
}
