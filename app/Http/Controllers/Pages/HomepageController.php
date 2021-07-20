<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Carbon\Carbon;
use Illuminate\Http\Request;

class HomepageController extends Controller
{
    public function index()
    {
        $hanze = Experience::make([
            'title'   => 'HBO-ICT (Bachelor)',
            'image' => '/assets/images/hanze.png',
            'company' => 'Hanzehogeschool Groningen',
            'city' => 'Groningen',
            'from' => Carbon::parse('01-09-2012')->format('F Y'),
            'until' => Carbon::parse('01-02-2020')->format('F Y'),
            'type' => Experience::$types['SCHOOL'],
        ]);

        $bilderberg = Experience::make([
            'title'   => 'Kitchen worker',
            'image' => '/assets/images/bilderberg.jpeg',
            'company' => 'Bilderberg Landgoed Lauswolt',
            'city' => 'Beetsterzwaag',
            'from' => Carbon::parse('01-10-2010')->format('F Y'),
            'until' => Carbon::parse('01-10-2012')->format('F Y'),
            'type' => Experience::$types['WORK'],
        ]);

        $rapide = Experience::make([
            'title'   => 'Junior Developer',
            'image' => '/assets/images/rapide.png',
            'company' => 'RAPIDE Internet',
            'city' => 'Groningen',
            'from' => Carbon::parse('01-10-2017')->format('F Y'),
            'until' => Carbon::parse('01-09-2018')->format('F Y'),
            'type' => Experience::$types['WORK'],
        ]);

        $men = Experience::make([
            'title'   => 'Full stack developer',
            'image' => '/assets/images/men.png',
            'company' => 'MEN Technology & Media',
            'city' => 'Groningen',
            'from' => Carbon::parse('01-01-2014')->format('F Y'),
            'until' => null,
            'type' => Experience::$types['WORK'],
        ]);

        $career = collect([$men, $rapide, $bilderberg]);
        $education = collect([$hanze]);

        return view('pages.homepage.index', [
            'career' => $career,
            'education' => $education,
        ]);
    }
}
