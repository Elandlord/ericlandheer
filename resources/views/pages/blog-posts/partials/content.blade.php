<div class="bg-white">
    <div class="container mx-auto py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div>
                <div>
                    @forelse($blogPost->formattedBody as $contentPart)
                        {!! $contentPart !!}
                    @empty
                        <h3 class="text-xl font-bold text-center">🤨 Nothing found</h3>
                    @endforelse
                </div>
            </div>
        </div>
    </div>
</div>
