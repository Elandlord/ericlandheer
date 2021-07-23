<div class="container mx-auto">
    <div class="pt-8">
        @if (request()->has('tag'))
            <div>
                Filtered on: <span >{{ request()->get('tag') }} </span>
                <a class="text-blue-400" href="{{ route('pages.blog') }}"> Unset</a>
            </div>
        @endif
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  py-20">
        <div class="lg:text-center">
            <h2 class="text-base text-blue-400 font-semibold tracking-wide uppercase">Blog</h2>
            <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                My random ramblings
            </p>
            <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Below you can read various blog posts about Laravel, Vue.js or other techniques. That depends on my mood.
            </p>
        </div>
    </div>
</div>
