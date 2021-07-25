<?php

namespace App\Http\Livewire;

use App\Models\BlogPost;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Livewire\Component;

class BlogPosts extends Component
{
    public Collection $blogPosts;
    public string $search = '';
    public string $tag = '';

    public function getBlogPostsBuilder(): Builder
    {
        $blogPostQueryBuilder = BlogPost::latest();

        if ($this->tag) {
            $blogPostQueryBuilder->forTag($this->tag);
        }

        return $blogPostQueryBuilder;
    }

    public function render()
    {
        $blogPostsQueryBuilder = $this->getBlogPostsBuilder();

        if( !empty($this->search)) {
            $blogPostsQueryBuilder->search($this->search);
        }

        $this->blogPosts = $blogPostsQueryBuilder->get();

        return view('pages.blog.partials.blog-posts');
    }
}
