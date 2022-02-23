<?php

namespace Tests\Feature\Services;

use App\Providers\AppServiceProvider;
use App\Services\OpenWeatherMap\OpenWeatherMapService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class OpenWeatherMapTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_request_successful()
    {
        /** @var OpenWeatherMapService $openWeatherMap */
        $openWeatherMap = app(AppServiceProvider::OPEN_WEATHER_MAP);
        $openWeatherMap->setCity('Tel Aviv');
        $this->assertTrue($openWeatherMap->sendRequest());
    }
}
