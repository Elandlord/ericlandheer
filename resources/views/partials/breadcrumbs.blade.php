<div class="bg-gray-100 py-2">
    <div class="container mx-auto">
        @unless ($breadcrumbs->isEmpty())
            <div class="flex">
                @foreach ($breadcrumbs as $breadcrumb)
                    @if (!is_null($breadcrumb->url) && !$loop->last)
                        <a class="pr-2" href="{{ $breadcrumb->url }}">{{ $breadcrumb->title }}</a> <span class="pr-2">/</span>
                    @else
                        <p class="text-blue-400 font-bold">{{ $breadcrumb->title }}</p>
                    @endif

                @endforeach
            </div>

        @endunless
    </div>
</div>


