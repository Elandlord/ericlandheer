<?php

use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

Breadcrumbs::for('home', function (BreadcrumbTrail $trail) {
    $trail->push('Home', route('pages.home'));
});

Breadcrumbs::for('blog', function (BreadcrumbTrail $trail) {
    $trail->parent('home');
    $trail->push('Blog', route('pages.blog'));
});

Breadcrumbs::for('blog.detail', function (BreadcrumbTrail $trail, $blogPost) {
    $trail->parent('blog');
    $trail->push($blogPost->title, route('pages.blog.detail', $blogPost->slug));
});
