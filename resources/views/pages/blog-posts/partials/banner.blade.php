<div class="container mx-auto py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
            <h2 class="text-base text-blue-400 font-semibold tracking-wide uppercase">{{ $blogPost->created_at->diffForHumans() }}</h2>
            <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {{ $blogPost->title }}
            </p>
            <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                {{ $blogPost->intro }}
            </p>
        </div>
    </div>
</div>

