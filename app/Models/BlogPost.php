<?php

namespace App\Models;

use App\Casts\FlexibleBody;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\ShikiPhp\Shiki;
use Whitecube\NovaFlexibleContent\Concerns\HasFlexible;
use Whitecube\NovaFlexibleContent\Value\FlexibleCast;

class BlogPost extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;
    use HasFlexible;

    protected $fillable = [
        'title',
        'slug',
        'intro',
        'body',
    ];

    protected $casts = [
        'body' => FlexibleCast::class,
    ];

    protected static function booted()
    {
        static::saving(function ($blogPost) {
            $blogPost->slug = Str::slug($blogPost->title);
        });
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function getBlogImageAttribute(): ?string
    {
        return optional($this->getMedia('blog_image')
            ->first())
            ->getUrl() ?? 'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80';
    }

    public function getFormattedBodyAttribute(): Collection
    {
        $contentParts = $this->body->map( function($contentPart) {
            $content = $contentPart->getAttributes()['section'];

            $code = Str::between($content, '-beginCode', '-endCode');

            $formattedBody = Str::replaceFirst('-beginCode', '', $content);
            $formattedBody = Str::replaceFirst('-endCode', '', $formattedBody);

            $formattedBody = Str::replace($code, Shiki::highlight(
                code: $code,
                language: 'php',
                theme: 'github-light',
            ), $formattedBody);

            return $formattedBody;
        });

        return $contentParts;
    }

    public function registerMediaConversions(Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->width(130)
            ->height(130);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('blog_image')->singleFile();
    }
}
