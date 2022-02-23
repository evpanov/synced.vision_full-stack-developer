<?php

namespace App\Services\OpenWeatherMap;

use App\Exceptions\OpenWeatherMapException;
use App\Exceptions\OpenWeatherMapExceptionMessages;
use App\Models\OpenWeatherMapFields;
use App\Models\OpenWeatherMapModel;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OpenWeatherMapService
{
    private string $city;

    private int $responseStatus;
    private string $responseBody;

    public function __construct(private string $gateway, private string $appid)
    {
    }

    public function sendRequest(): void
    {
        $query = [
            'q' => trim($this->city),
            'units' => 'metric',
            'appid' => $this->appid
        ];

        Log::channel('openWeatherMap')->info('Request', [
            'gateway' => $this->gateway,
            'query' => $query
        ]);

        try {
            $response = Http::get($this->gateway, $query);

            $this->responseStatus = $response->status();
            $this->responseBody = $response->body();

        } catch (\Throwable $e) {
            throw new OpenWeatherMapException(OpenWeatherMapExceptionMessages::REQUEST_HAS_BEEN_FAILED->value);
        } finally {
            Log::channel('openWeatherMap')->info('Response', [
                'status' => $this->responseStatus,
                'body' => $this->responseBody
            ]);
        }
    }

    public function storeData(): bool
    {
        $parsedBody = $this->getData();

        if ($parsedBody[OpenWeatherMapFields::CITY_ID->value] === null) {
            throw new OpenWeatherMapException(OpenWeatherMapExceptionMessages::INCOMPLETE_DATA->value);
        }

        $model = OpenWeatherMapModel::where(OpenWeatherMapFields::CITY_ID->value, $parsedBody[OpenWeatherMapFields::CITY_ID->value])
            ->first();

        if ($model === null) {
            $model = new OpenWeatherMapModel($parsedBody);
        } else {
            $model->fill($parsedBody);
        }

        $model->save();

        return true;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;
        return $this;
    }

    public function getData(): array
    {
        $decodedBody = json_decode($this->responseBody);

        return [
            OpenWeatherMapFields::DT->value => $decodedBody->list[0]->dt ?? null,
            OpenWeatherMapFields::CITY_ID->value => $decodedBody->city->id ?? null,
            OpenWeatherMapFields::CITY_NAME->value => $decodedBody->city->name ?? null,
            OpenWeatherMapFields::TEMPERATURE_MIN->value => $decodedBody->list[0]->main->temp_min ?? null,
            OpenWeatherMapFields::TEMPERATURE_MAX->value => $decodedBody->list[0]->main->temp_max ?? null,
            OpenWeatherMapFields::WIND_SPEED->value => $decodedBody->list[0]->wind->speed ?? null,
        ];
    }
}
