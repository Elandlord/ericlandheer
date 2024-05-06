<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Intervention\Image\Facades\Image;

class GlitterPlaatjeController extends Controller
{
    const GLITTER_PLAATJE_XML_SRC = "https://www.deelplaatjes.nl/webmasters/rss?i=dagen-vd-week";
    const DAYS_LOOKUP_TABLE = [
        'zondag',
        'maandag',
        'dinsdag',
        'woensdag',
        'donderdag',
        'vrijdag',
        'zaterdag',
    ];

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
                if (!is_string($value)) {
                    continue;
                }

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
    public function forToday()
    {
        $today = self::DAYS_LOOKUP_TABLE[now()->dayOfWeek];

        $glitterPlaatjes = $this->getGlitterPlaatjes();
        $glitterPlaatjesToday = $this->getGlitterPlaatjesForDay($glitterPlaatjes, $today);

        if (count($glitterPlaatjesToday) === 0) return 'Geen {$today} glitterplaatje gevonden :(';

        $randomPlaatje = $glitterPlaatjesToday[array_rand($glitterPlaatjesToday)];
        $contents = file_get_contents($randomPlaatje->plaatje_groot_url);

        return Image::make($contents)->response();
    }
}
