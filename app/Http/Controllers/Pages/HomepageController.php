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
        $career = Experience::findMany(range(1, 3));
        $education = Experience::findMany([4]);

        return view('pages.homepage.index', [
            'career' => $career,
            'education' => $education,
        ]);
    }
}
