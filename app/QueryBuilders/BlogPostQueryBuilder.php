<?php

namespace App\QueryBuilders;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class BlogPostQueryBuilder extends Builder
{
    public function forTag(string $tag)
    {
        return $this->whereHas('tags', function($query) use ($tag) {
            $query->where(sprintf('slug->%s', app()->getLocale()), Str::slug($tag));
        });
    }
}
