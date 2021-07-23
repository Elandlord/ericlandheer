<div class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="lg:text-center">
            <h2 class="text-base text-blue-400 font-semibold tracking-wide uppercase">My career</h2>
            <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                So far
            </p>
        </div>

        @if($career->count() > 0)
            <div class="mt-4">
                <h2 class="py-4 text-2xl font-bold">Jobs</h2>
                <hr>
                <div class="pb-8"></div>
                <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                    @forelse($career as $job)
                    <div class="relative">
                        <dt>
                            <div class="absolute flex items-center justify-center h-12 w-12 ">
                                <img src="{{ $job->image }}" />
                            </div>
                            <p class="ml-16 text-lg leading-6 font-bold text-gray-900">{{ $job->title }}</p>
                            <p class="ml-16 text-gray-400 py-1">{{ $job->company }} - {{ $job->city }}</p>
                            <p class="ml-16 text-blue-400 py-1">{{ $job->from->format('F Y') }} - @if( !empty($job->until)) {{ $job->until->format('F Y') }} @else now @endif</p>
                        </dt>
                        <dd class="mt-2 ml-16 text-base text-gray-500">
                            {{ $job->description }}
                        </dd>
                    </div>
                    @empty

                    @endforelse
                </dl>
            </div>
        @endif

        @if($education->count() > 0)
            <div class="mt-10">
                <h2 class="py-4 text-2xl font-bold">Education</h2>
                <hr>
                <div class="pb-8"></div>
                <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                    @forelse($education as $school)
                        <div class="relative">
                            <dt>
                                <div class="absolute flex items-center justify-center h-12 w-12 ">
                                    <img src="{{ $school->image }}" />
                                </div>
                                <p class="ml-16 text-lg leading-6 font-bold text-gray-900">{{ $school->title }}</p>
                                <p class="ml-16 text-gray-400 py-1">{{ $school->company }} - {{ $school->city }}</p>
                                <p class="ml-16 text-blue-400 py-1">{{ $school->from->format('F Y') }} - @if( !empty($school->until)) {{ $school->until->format('F Y') }} @else now @endif</p>
                            </dt>
                            <dd class="mt-2 ml-16 text-base text-gray-500">
                                {{ $job->description }}
                            </dd>
                        </div>
                    @empty

                    @endforelse
                </dl>
            </div>
        @endif
    </div>
</div>
