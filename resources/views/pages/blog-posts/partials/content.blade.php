<div class="bg-white">
    <div class="container mx-auto py-20">
        <div class="px-4 sm:px-6 lg:px-8">
            <div>
                <div class="overflow-x-scroll">
                    @forelse($blogPost->formatted_body as $contentPart)
                        <div>
                            {!! $contentPart !!}
                        </div>
                    @empty
                        <h3 class="text-xl font-bold text-center">🤨 Nothing found</h3>
                    @endforelse
                </div>
            </div>
        </div>
    </div>
</div>
