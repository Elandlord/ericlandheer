<div class="bg-white">
    <div class="container mx-auto py-20">
        <div class="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 text-center">
            @forelse($blogPosts as $blogPost)
                <div class="flex flex-col flex-1 py-8 px-8 bg-white shadow-lg rounded-lg my-8">
                    <div class="flex justify-center md:justify-end -mt-16">
                        <img class="w-20 h-20 object-cover rounded-full border-2 border-blue-400" src="{{ $blogPost->blogImage }}">
                    </div>
                    <div class="text-left">
                        <h2 class="text-gray-800 text-2xl font-semibold">{{ $blogPost->title }}</h2>
                        <p class="mt-2 text-gray-600 py-4">{!! strip_divs($blogPost->intro) !!}</p>
                    </div>
                    <div class="mt-auto">
                        <div class="flex mt-4">
                            @forelse($blogPost->tags as $tag)
                                <a href="{{ route('pages.blog', ['tag' => $tag->name]) }}" class="text-white bg-blue-400 py-1 px-2 rounded-md mr-2">{{ $tag->name }}</a>
                            @empty
                            @endforelse
                        </div>
                        <div class="flex justify-between mt-4">
                            <a href="{{ route('pages.blog.detail', ['blogPost' => $blogPost->slug]) }}" class="text-base font-medium text-blue-400">Read more</a>
                            <p class="text-base font-medium text-blue-400">{{ $blogPost->created_at->diffForHumans() }}</p>
                        </div>
                    </div>

                </div>
            @empty
                <h3 class="text-xl font-bold">🤨 Nothing found</h3>
            @endforelse
        </div>
    </div>
</div>

