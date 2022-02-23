<?php

namespace App\Exceptions;

enum OpenWeatherMapExceptionMessages: string
{
    case REQUEST_HAS_BEEN_FAILED = 'Request has been failed';
    case INCOMPLETE_DATA = 'Incomplete data';
}
