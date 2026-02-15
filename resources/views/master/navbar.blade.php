<nav class="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
    <div class="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="{{ route('pages.home') }}" class="flex items-center gap-3">
            <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/20 text-cyan-300">EL</span>
            <span class="flex flex-col leading-tight">
                <span class="font-semibold text-slate-100">Eric Landheer</span>
                <span class="text-xs uppercase tracking-[0.2em] text-slate-400">Full Stack Engineer</span>
            </span>
        </a>

        <div class="hidden items-center gap-3 md:flex">
            <a href="{{ route('pages.home') }}" class="rounded-full px-4 py-2 text-sm font-medium transition @if(request()->route() && request()->route()->getName() === 'pages.home') bg-cyan-400 text-slate-950 @else text-slate-200 hover:bg-white/10 @endif">
                Home
            </a>
            <a href="https://github.com/elandlord" target="_blank" rel="noreferrer" class="rounded-full border border-cyan-300/40 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:border-cyan-200 hover:text-cyan-100">
                GitHub
            </a>
        </div>

        <button
            type="button"
            class="inline-flex items-center justify-center rounded-lg border border-white/15 p-2 text-slate-100 transition hover:bg-white/10 md:hidden"
            data-mobile-menu-button
            aria-controls="mobile-menu"
            aria-expanded="false"
        >
            <span class="sr-only">Toggle menu</span>
            <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        </button>
    </div>

    <div id="mobile-menu" class="hidden border-t border-white/10 bg-slate-950/95 px-4 py-3 md:hidden" data-mobile-menu>
        <a href="{{ route('pages.home') }}" class="block rounded-lg px-3 py-2 text-sm font-medium @if(request()->route() && request()->route()->getName() === 'pages.home') bg-cyan-400 text-slate-950 @else text-slate-100 hover:bg-white/10 @endif">
            Home
        </a>
        <a href="https://github.com/elandlord" target="_blank" rel="noreferrer" class="mt-2 block rounded-lg border border-cyan-300/40 px-3 py-2 text-sm font-medium text-cyan-200 hover:border-cyan-200 hover:text-cyan-100">
            GitHub
        </a>
    </div>
</nav>
