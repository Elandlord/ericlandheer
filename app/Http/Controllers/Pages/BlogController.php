<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Spatie\ShikiPhp\Shiki;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        return view('pages.blog.index');
    }

    public function show(BlogPost $blogPost)
    {
        $blogPost->incrementView();

        return view('pages.blog-posts.index', compact('blogPost'));
    }
}
