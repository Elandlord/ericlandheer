<div class="container mx-auto mb-20">
    <div>
        @forelse($blog ?? collect() as $newsMessage)
            // Blog post here
        @empty
            <div class="text-center">
                <h3 class="text-xl font-bold">🤨 Nothing found</h3>
            </div>
        @endforelse
    </div>
</div>
