<?php

namespace App\Http\Controllers;

use App\Exceptions\OpenWeatherMapException;
use App\Models\OpenWeatherMapFields;
use App\Providers\AppServiceProvider;
use App\Services\OpenWeatherMap\OpenWeatherMapService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Str;

class WeatherController extends Controller
{
    private const PARAM_CITY = 'city';
    private const PARAM_SOURCE = 'source';

    private const SOURCE_API = 'api';
    private const SOURCE_DB = 'db';

    private OpenWeatherMapService $openWeatherMap;

    public function __construct()
    {
        $this->openWeatherMap = app(AppServiceProvider::OPEN_WEATHER_MAP);
    }

    public function getData(Request $request): JsonResponse
    {
        $city = $request->get(self::PARAM_CITY);
        $source = $request->get(self::PARAM_SOURCE);

        $rows = [];

        if ($source === self::SOURCE_API) {
            $rows = $this->getRowsFromApi($city);
        } else if ($source === self::SOURCE_DB) {
            $row = $this->getRowFromDb($request->get(self::PARAM_CITY));

            if ($row !== null) {
                $rows = [
                    $row
                ];
            }
        }

        return response()->json([
            'rows' => $rows,
            'city' => $city
        ]);
    }

    private function getRowsFromApi(string $city): array
    {
        $this->openWeatherMap->setCity($city);

        try {
            $this->openWeatherMap->sendRequest();
            $this->openWeatherMap->storeData();
        } catch (OpenWeatherMapException $e) {
            return [];
        }

        $responseData = json_decode($this->openWeatherMap->getResponseBody());

        if (count($responseData->list) === 0) {
            return [];
        }

        $data = [];

        foreach ($responseData->list as $item) {
            $data[] = [
                OpenWeatherMapFields::ID->value => Str::uuid(),
                OpenWeatherMapFields::DT->value => date('Y-m-d h:i:s a', $item->dt) ?? null,
                OpenWeatherMapFields::TEMPERATURE_MIN->value => $item->main->temp_min ?? null,
                OpenWeatherMapFields::TEMPERATURE_MAX->value => $item->main->temp_max ?? null,
                OpenWeatherMapFields::WIND_SPEED->value => $item->wind->speed ?? null,
            ];
        }

        return $data;
    }

    private function getRowFromDb(string $city): ?array
    {
        $this->openWeatherMap->setCity($city);
        $data = $this->openWeatherMap->loadData();

        return $data === null ? null : [
            OpenWeatherMapFields::ID->value => Str::uuid(),
            OpenWeatherMapFields::DT->value => $data->{OpenWeatherMapFields::DT->value},
            OpenWeatherMapFields::TEMPERATURE_MIN->value => $data->{OpenWeatherMapFields::TEMPERATURE_MIN->value},
            OpenWeatherMapFields::TEMPERATURE_MAX->value => $data->{OpenWeatherMapFields::TEMPERATURE_MAX->value},
            OpenWeatherMapFields::WIND_SPEED->value => $data->{OpenWeatherMapFields::WIND_SPEED->value},
            OpenWeatherMapFields::UPDATED_AT->value => $data->{OpenWeatherMapFields::UPDATED_AT->value},
        ];
    }
}
