<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ConvenedJournal extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('convenedJournal', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name',256);
            $table->text('description');
            $table->timestamp('starting_date');
            $table->timestamp('end_date');
            $table->string('image',45)->nullable();
            $table->text('files')->nullable();
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
        Schema::drop('convenedJournal');
    }
}
