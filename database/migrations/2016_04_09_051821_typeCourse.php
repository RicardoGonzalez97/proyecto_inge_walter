p<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TypeCourse extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('typeCourse', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name',256)->index();
            $table->string('description',1024)->index();
            $table->integer('user_id');
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
        Schema::drop('typeCourse');
    }
}
