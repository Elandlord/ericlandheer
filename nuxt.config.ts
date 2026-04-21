export default defineNuxtConfig({
    compatibilityDate: '2026-04-18',
    future: { compatibilityVersion: 4 },
    devtools: { enabled: true },

    modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@vueuse/nuxt'],

    css: ['~/assets/css/main.css'],

    nitro: {
        preset: process.env.NITRO_PRESET ?? 'node-server',
    },

    app: {
        head: {
            htmlAttrs: { lang: 'en', class: 'dark' },
            title: 'Eric Landheer · Full stack web developer',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'description', content: 'Groningen-based full stack engineer. Laravel, Symfony, Vue, Nuxt, Go. Building reliable, scalable products.' },
                { name: 'theme-color', content: '#050814' },
                { property: 'og:title', content: 'Eric Landheer' },
                { property: 'og:description', content: 'Full stack web developer, Groningen.' },
                { property: 'og:image', content: '/assets/images/eric.png' },
            ],
            link: [
                { rel: 'icon', type: 'image/png', href: '/favicon.png' },
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap',
                },
            ],
        },
    },

    routeRules: {
        '/blog': { redirect: { to: '/', statusCode: 301 } },
        '/blog/**': { redirect: { to: '/', statusCode: 301 } },
    },

    typescript: { strict: true },
});
