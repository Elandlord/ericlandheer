@extends('master.master')

@section('content')
    {{ Breadcrumbs::render('blog') }}
    @include('pages.blog.partials.banner')
    @include('pages.blog.partials.blog-posts')
@endsection
