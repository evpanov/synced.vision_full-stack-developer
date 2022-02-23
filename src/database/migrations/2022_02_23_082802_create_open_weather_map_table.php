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
        Schema::create('open_weather_map', function (Blueprint $table) {
            $table->id();
            $table->integer('dt')->unsigned();
            $table->integer('city_id')->unsigned()->unique();
            $table->string('city_name');
            $table->float('temperature_min');
            $table->float('temperature_max');
            $table->float('wind_speed');
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
        Schema::dropIfExists('open_weather_map');
    }
};
