<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Spatie\ShikiPhp\Shiki;

class BlogController extends Controller
{
    public function index()
    {
        $blogPosts = BlogPost::latest()->get();

        return view('pages.blog.index', compact('blogPosts'));
    }

    public function show(BlogPost $blogPost)
    {
        $blogPost->incrementView();

        return view('pages.blog-posts.index', compact('blogPost'));
    }
}
