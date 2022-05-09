<?php

use App\Http\Controllers\GlitterPlaatjeController;
use App\Http\Controllers\Pages\BlogController;
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

Route::get('/', [HomepageController::class, 'index'])->name('pages.home');
Route::get('/blog', [BlogController::class, 'index'])->name('pages.blog');
Route::get('/blog/{blogPost}', [BlogController::class, 'show'])->name('pages.blog.detail');
Route::get('/geef-mij-een-glitterplaatje', [GlitterPlaatjeController::class, 'forToday'])->name('break.wednesday');
