<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Spatie\ShikiPhp\Shiki;

class BlogController extends Controller
{
    public function index()
    {
        $blogPosts = BlogPost::all();

        return view('pages.blog.index', compact('blogPosts'));
    }

    public function show(BlogPost $blogPost)
    {
        return view('pages.blog-posts.index', compact('blogPost'));
    }
}
