<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('config_actions', function (Blueprint $table) {
            $table->id();
            $table->integer('line');
            $table->integer('timeActionError');
            $table->integer('timeLastError');
            $table->string('email',300);
            $table->integer('vmax');
            $table->integer('vmin');
            $table->boolean('active');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
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
        Schema::dropIfExists('configactions');
    }
};
