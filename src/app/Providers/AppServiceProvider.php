<?php

namespace App\Providers;

use App\Services\OpenWeatherMap\OpenWeatherMapService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public const OPEN_WEATHER_MAP = 'open_weather_map';

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(self::OPEN_WEATHER_MAP, function () {
            return new OpenWeatherMapService(
                config('services.open_weather_map.gateway'),
                config('services.open_weather_map.appid')
            );
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
