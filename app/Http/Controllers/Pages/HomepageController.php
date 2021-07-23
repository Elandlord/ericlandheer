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
        $career = Experience::work()->get();

        $education = Experience::school()->get();

        return view('pages.homepage.index', [
            'career' => $career,
            'education' => $education,
        ]);
    }
}
