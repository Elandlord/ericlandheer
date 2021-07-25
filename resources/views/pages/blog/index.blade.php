@extends('master.master')

@section('content')
    {{ Breadcrumbs::render('blog') }}
    @include('pages.blog.partials.banner')
    <livewire:blog-posts tag="{{ request()->get('tag') }}"></livewire:blog-posts>
{{--    @include('pages.blog.partials.blog-posts')--}}
@endsection
