<?php

namespace App\Models;

enum OpenWeatherMapFields: string
{
    case ID = 'id';
    case DT = 'dt';
    case CITY_ID = 'city_id';
    case CITY_NAME = 'city_name';
    case TEMPERATURE_MIN = 'temperature_min';
    case TEMPERATURE_MAX = 'temperature_max';
    case WIND_SPEED = 'wind_speed';
    case CREATED_AT = 'created_at';
    case UPDATED_AT = 'updated_at';
}
