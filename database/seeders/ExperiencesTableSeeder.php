<?php

namespace Database\Seeders;

use App\Models\Experience;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ExperiencesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $men = Experience::create([
            'title'   => 'Full stack developer',
            'image' => '/assets/images/men.png',
            'company' => 'MEN Technology & Media',
            'city' => 'Groningen',
            'from' => Carbon::parse('01-01-2014'),
            'until' => null,
            'type' => Experience::$types['WORK'],
        ]);

        $rapide = Experience::create([
            'title'   => 'Junior Developer',
            'image' => '/assets/images/rapide.png',
            'company' => 'RAPIDE Internet',
            'city' => 'Groningen',
            'from' => Carbon::parse('01-10-2017'),
            'until' => Carbon::parse('01-09-2018'),
            'type' => Experience::$types['WORK'],
        ]);

        $bilderberg = Experience::create([
            'title'   => 'Kitchen worker',
            'image' => '/assets/images/bilderberg.jpeg',
            'company' => 'Bilderberg Landgoed Lauswolt',
            'city' => 'Beetsterzwaag',
            'from' => Carbon::parse('01-10-2010'),
            'until' => Carbon::parse('01-10-2012'),
            'type' => Experience::$types['WORK'],
        ]);

        $hanze = Experience::create([
            'title'   => 'HBO-ICT (Bachelor)',
            'image' => '/assets/images/hanze.png',
            'company' => 'Hanzehogeschool Groningen',
            'city' => 'Groningen',
            'from' => Carbon::parse('01-09-2012'),
            'until' => Carbon::parse('01-02-2020'),
            'type' => Experience::$types['SCHOOL'],
        ]);
    }
}
