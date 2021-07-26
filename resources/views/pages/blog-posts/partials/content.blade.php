<div class="bg-white">
    <div class="container mx-auto py-20">
        <div class="px-4 sm:px-6 lg:px-0">
            <div>
                <div class="overflow-x-scroll lg:overflow-x-auto">
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
