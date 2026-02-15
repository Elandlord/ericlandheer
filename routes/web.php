<?php

use App\Http\Controllers\GlitterPlaatjeController;
use App\Http\Controllers\Pages\HomepageController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::permanentRedirect('/blog', '/');
Route::redirect('/blog/{any}', '/', 301)->where('any', '.*');

Route::get('/', [HomepageController::class, 'index'])->name('pages.home');
Route::get('/geef-mij-een-glitterplaatje', [GlitterPlaatjeController::class, 'forToday'])->name('break.wednesday');
