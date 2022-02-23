<?php

namespace App\Services\OpenWeatherMap;

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

    public function sendRequest(): bool
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

            return true;
        } catch (\Exception $e) {

        } finally {
            Log::channel('openWeatherMap')->info('Response', [
                'status' => $this->responseStatus,
                'body' => $this->responseBody
            ]);
        }

        return false;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;
        return $this;
    }
}
