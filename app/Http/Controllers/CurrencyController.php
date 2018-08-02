<?php

namespace App\Http\Controllers;

use \GuzzleHttp\Client;

class CurrencyController extends Controller
{

    private $httpClient;


    public function getCurrency(Client $client)
    {
        $this->httpClient = $client;

        $currencyList = $this->getLastCurrency();

        return response($currencyList, 200);
    }


    protected function getLastCurrency()
    {
        $lastUSD = null;
        $lastEUR = null;
        $countDays = 0; //get currency for +$countDays or -$countDays (today $countDays = 0)

        $currencyList = $this->getCurrencyNBU($countDays); //get currency list for today
        $currentUsdRate = $currencyList[0]->rate;
        $currentEurRate = $currencyList[1]->rate;

        //Get last changes currency
        while (!$lastUSD && !$lastEUR) {

            $lastCurrencyList = $this->getCurrencyNBU(--$countDays);
            $tmpUsdRate = $lastCurrencyList[0]->rate;
            $tmpEurRate = $lastCurrencyList[1]->rate;

            if (!$lastUSD && $this->diffRate($currentUsdRate, $tmpUsdRate)) {
                $lastUSD = $lastCurrencyList[0];
            }

            if (!$lastEUR && $this->diffRate($currentEurRate, $tmpEurRate)) {
                $lastEUR = $lastCurrencyList[1];
            }
        };

        return array_merge($currencyList, [$lastUSD, $lastEUR]);
    }


    protected function diffRate($currentRate, $lastRate)
    {
        return $currentRate * 1000000 - $lastRate * 1000000;
    }


    protected function date($day = 0)
    {
        $newDay = time() + ($day * 24 * 60 * 60);

        return date('Ymd', $newDay);
    }


    protected function getCurrencyNBU($day = 0)
    {
        $url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date={$this->date($day)}&json";

        try {
            $res = $this->httpClient->request('GET', $url);
            $currencyList = array_filter(json_decode($res->getBody()), function ($item) {
                return $item->cc === 'USD' || $item->cc === 'EUR';
            });

            return array_values($currencyList); //сбросить ключи массива
        } catch (\GuzzleHttp\Exception\ClientException $exception) {
            response()->json(['message' => 'NBU service unavailable'], '503')->send();
            exit();
        }
    }


//    public function test(Client $client)
//    {
//
//        dd($client);
//
//        $currencyList = $this->getLastCurrency();
//
//
//        return response($currencyList, 200);
//
//    }

}
