<section class="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="mb-10 flex items-end justify-between gap-4">
        <div>
            <p class="text-sm uppercase tracking-[0.25em] text-cyan-300">Career</p>
            <h2 class="mt-2 text-3xl font-bold text-white">Experience So Far</h2>
        </div>
    </div>

    @if($career->count() > 0)
        <div>
            <h3 class="text-xl font-semibold text-white">Jobs</h3>
            <div class="mt-5 grid gap-4 lg:grid-cols-2">
                @foreach($career as $job)
                    <article class="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
                        <div class="flex items-start gap-4">
                            <img class="h-12 w-12 rounded-lg object-contain" src="{{ $job->image }}" alt="{{ $job->company }} logo">
                            <div>
                                <p class="text-lg font-semibold text-white">{{ $job->title }}</p>
                                <p class="text-sm text-slate-400">{{ $job->company }} | {{ $job->city }}</p>
                                <p class="mt-1 text-sm font-medium text-cyan-300">{{ $job->from->format('F Y') }} - @if(!empty($job->until)) {{ $job->until->format('F Y') }} @else now @endif</p>
                            </div>
                        </div>
                        <p class="mt-4 text-sm leading-relaxed text-slate-300">{{ $job->description }}</p>
                    </article>
                @endforeach
            </div>
        </div>
    @endif

    @if($education->count() > 0)
        <div class="mt-12">
            <h3 class="text-xl font-semibold text-white">Education</h3>
            <div class="mt-5 grid gap-4 lg:grid-cols-2">
                @foreach($education as $school)
                    <article class="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
                        <div class="flex items-start gap-4">
                            <img class="h-12 w-12 rounded-lg object-contain" src="{{ $school->image }}" alt="{{ $school->company }} logo">
                            <div>
                                <p class="text-lg font-semibold text-white">{{ $school->title }}</p>
                                <p class="text-sm text-slate-400">{{ $school->company }} | {{ $school->city }}</p>
                                <p class="mt-1 text-sm font-medium text-cyan-300">{{ $school->from->format('F Y') }} - @if(!empty($school->until)) {{ $school->until->format('F Y') }} @else now @endif</p>
                            </div>
                        </div>
                        <p class="mt-4 text-sm leading-relaxed text-slate-300">{{ $school->description }}</p>
                    </article>
                @endforeach
            </div>
        </div>
    @endif
</section>
