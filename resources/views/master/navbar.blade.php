<nav class="bg-white shadow-lg">
    <div class="max-w-6xl mx-auto px-4">
        <div class="flex justify-between">
            <div class="flex space-x-7">
                <div>
                    <!-- Website Logo -->
                    <a href="/" class="flex items-center py-4 px-2">
                        <span class="font-semibold text-base">Eric Landheer</span>
                        <span class="px-2">|</span>
                        <span class="text-gray-400">
                            Webdeveloper
                        </span>
                    </a>
                </div>
                <!-- Primary Navbar items -->
                <div class="hidden md:flex items-center space-x-1">
                    <a href="{{ route('pages.home') }}" class="@if(request()->route()->getName() === 'pages.home') font-bold bg-blue-400 text-white @else text-black hover:bg-blue-300 transition-duration-300 hover:text-white @endif px-3 py-2 rounded-md text-sm font-medium" aria-current="page">
                        <span class="pr-2">🏡 Home</span>
                    </a>

                    <a href="{{ route('pages.blog') }}" class="@if(in_array(request()->route()->getName(), ['pages.blog', 'pages.blog.detail'])) font-bold bg-blue-400 text-white @else text-black hover:bg-blue-300 transition-duration-300 hover:text-white @endif px-3 py-2 rounded-md text-sm font-medium">
                        <span class="pr-2">✍🏻</span> Blog
                    </a>
                </div>
            </div>
            <!-- Secondary Navbar items -->
            <div class="hidden md:flex items-center space-x-3 ">
                <a href="https://www.github.com/elandlord" class="py-2 px-2 font-medium text-white bg-blue-400 rounded">Github</a>
            </div>
            <!-- Mobile menu button -->
            <div class="md:hidden flex items-center">
                <button class="outline-none mobile-menu-button">
                    <svg class=" w-6 h-6 text-gray-500 hover:text-blue-400 "
                         x-show="!showMenu"
                         fill="none"
                         stroke-linecap="round"
                         stroke-linejoin="round"
                         stroke-width="2"
                         viewBox="0 0 24 24"
                         stroke="currentColor"
                    >
                        <path d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </div>
    </div>
    <!-- mobile menu -->
    <div class="hidden mobile-menu">
        <ul class="">
            <li><a href="{{ route('pages.home') }}" class="@if(request()->route()->getName() === 'pages.home') text-white bg-blue-400 font-bold @endif block text-sm px-2 py-4"><span class="pr-2">🏡</span> Home</a></li>
            <li><a href="{{ route('pages.blog') }}" class="@if(in_array(request()->route()->getName(), ['pages.blog', 'pages.blog.detail'])) text-white bg-blue-400 font-bold @endif block text-sm px-2 py-4"><span class="pr-2">✍🏻</span> Blog</a></li>
        </ul>
    </div>
    <script>
        const btn = document.querySelector("button.mobile-menu-button");
        const menu = document.querySelector(".mobile-menu");

        btn.addEventListener("click", () => {
            menu.classList.toggle("hidden");
        });
    </script>
</nav>
