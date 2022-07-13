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
        Schema::create('notify',function (Blueprint $table){
            $table->id()->autoIncrement()->nullable(false);
            $table->string('evento')->nullable(false);
            $table->dateTime('time_data')->nullable(false);
            $table->boolean('opend');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notify');
    }
};
