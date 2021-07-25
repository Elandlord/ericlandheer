<div class="bg-white">
    @if( empty($tag))
        <div class="container mx-auto">
            <input wire:model="search" type="text" class="w-full h-full border-2 border-gray-300 py-2 px-4 rounded-md my-8" placeholder="Search here..">
        </div>
    @endif
    <div class="container mx-auto py-20">
        <div wire:loading.delay wire:target="search">
            <p class="text-center">Loading blogposts...</p>
        </div>
        <div wire:loading.remove.delay wire:target="search" class="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 text-center animate-fade-in-down" >
            @forelse($blogPosts as $blogPost)
                @include('pages.blog.partials.blog-card')
            @empty
                <h3 class="text-xl font-bold">🤨 Nothing found</h3>
            @endforelse
        </div>
    </div>
</div>

