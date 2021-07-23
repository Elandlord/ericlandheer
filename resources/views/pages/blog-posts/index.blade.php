@extends('master.master')

@section('content')
    {{ Breadcrumbs::render('blog.detail', $blogPost) }}
    @include('pages.blog-posts.partials.banner')
    @include('pages.blog-posts.partials.content')
@endsection
