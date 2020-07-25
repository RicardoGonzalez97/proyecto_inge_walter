<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Notaria extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notaria', function (Blueprint $table) {
            $table->increments('id');
            $table->string('texto_firmado',1024);
            $table->string('encriptado',512)->nullable();
            $table->string('hash',400);
            $table->integer('students_id');
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
        Schema::drop('notaria');
    }
}
