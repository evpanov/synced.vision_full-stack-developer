<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OpenWeatherMapModel extends Model
{
    protected $table = 'open_weather_map';

    public function __construct(array $attributes = [])
    {
        $this->fillable([
            OpenWeatherMapFields::DT->value,
            OpenWeatherMapFields::CITY_ID->value,
            OpenWeatherMapFields::CITY_NAME->value,
            OpenWeatherMapFields::TEMPERATURE_MIN->value,
            OpenWeatherMapFields::TEMPERATURE_MAX->value,
            OpenWeatherMapFields::WIND_SPEED->value,
        ]);

        parent::__construct($attributes);
    }
}
