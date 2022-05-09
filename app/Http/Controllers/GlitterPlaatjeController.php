<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Intervention\Image\Facades\Image;

class GlitterPlaatjeController extends Controller
{
    const GLITTER_PLAATJE_XML_SRC = "https://www.deelplaatjes.nl/webmasters/rss?i=dagen-vd-week";
    const WEDNESDAY = "woensdag";

    /**
     * @return array
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function getGlitterPlaatjes(): array
    {
        $httpClient = new Client();
        $response = $httpClient->get(self::GLITTER_PLAATJE_XML_SRC);
        $plaatjes = $response->getBody();

        if ($plaatjes === null) return [];

        return json_decode(json_encode(simplexml_load_string($plaatjes)))->channel->item;
    }

    /**
     * @param array $glitterPlaatjes
     * @param string $day
     * @return array
     */
    public function getGlitterPlaatjesForDay(array $glitterPlaatjes, string $day)
    {
        return array_filter($glitterPlaatjes, function($plaatje) use ($day) {
            foreach($plaatje as $value) {
                if (strpos(strtolower($value), $day) !== false) {
                    return true;
                }
            }
            return false;
        });
    }

    /**
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function wednesday()
    {
        $glitterPlaatjes = $this->getGlitterPlaatjes();
        $woensdagPlaatjes = $this->getGlitterPlaatjesForDay($glitterPlaatjes, self::WEDNESDAY);

        if (count($woensdagPlaatjes) === 0) return 'Voor {$self::WEDNESDAY} glitterplaatje :(';

        $randomPlaatje = $woensdagPlaatjes[array_rand($woensdagPlaatjes)];
        $contents = file_get_contents($randomPlaatje->plaatje_groot_url);

        return Image::make($contents)->response();
    }
}
