<div class="container mx-auto py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center">
            <div class="flex justify-center mb-4 md:mr-12">
                <div class="w-40 h-40 md:w-100 md:h-100 rounded-full overflow-hidden">
                    <img class="w-full h-full object-cover" src="{{ $blogPost->blogImage }}" />
                </div>
            </div>
            <div>
                <div class="mb-4">
                    @forelse($blogPost->tags as $tag)
                        <span class="text-white bg-blue-400 py-1 px-2 rounded-md mr-2">{{ $tag->name }}</span>
                    @empty
                    @endforelse
                </div>

                <h2 class="text-base text-blue-400 font-semibold tracking-wide uppercase">{{ $blogPost->created_at->diffForHumans() }}</h2>
                <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    {{ $blogPost->title }}
                </p>
                <p class="mt-4 max-w-2xl text-xl text-gray-500 leading-loose">
                    {!! nl2br(strip_divs($blogPost->intro)) !!}
                </p>
            </div>

        </div>
    </div>
</div>

