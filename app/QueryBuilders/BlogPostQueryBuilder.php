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

    public function search(string $searchParam)
    {
        $formattedSearchParam = '%'. $searchParam . '%';

        return $this->where('title', 'LIKE', $formattedSearchParam)
            ->orWhere('intro', 'LIKE', $formattedSearchParam)
            ->orWhere('formatted_body', $formattedSearchParam)
            ->orWhereHas('tags', function($query) use ($formattedSearchParam) {
                $query->where(sprintf('name->%s', app()->getLocale()), 'LIKE', $formattedSearchParam);
            });
    }
}
