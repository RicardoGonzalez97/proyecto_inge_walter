<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Course extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('course', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name',256)->index();
            $table->text('description');
            $table->string('image',256)->nullable();
            $table->text('agenda')->nullable();
            $table->text('files')->nullable();
            $table->text('direction');
            $table->string('lat',20);
            $table->string('lng',20);
            $table->text('keywords');
            $table->decimal('price', 10, 2);
            $table->integer('quota_max');
            $table->integer('quota_min');
            $table->text('hangouts');
            $table->timestamp('start_date');
            $table->timestamp('end_date');
            $table->string('cellphone',12);
            $table->text('certificate_title');
            $table->integer('typeCourse_id');
            $table->integer('categoryCourse_id');
            $table->integer('user_id');
            $table->integer('authorize');
            $table->tinyInteger('status');
            $table->timestamp('created_at');
            $table->timestamp('updated_at');
            $table->timestamp('deleted_at')->nullable();
            $table->string('duracion',129);
            $table->text('paid');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('course');
    }
}
