export default defineNuxtPlugin((nuxtApp) => {
    let observer: IntersectionObserver | null = null;

    if (import.meta.client) {
        observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const el = entry.target as HTMLElement;
                        const delay = Number(el.dataset.revealDelay ?? 0);
                        window.setTimeout(() => el.classList.add('is-visible'), delay);
                        observer!.unobserve(el);
                    }
                }
            },
            { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
        );
    }

    nuxtApp.vueApp.directive('reveal', {
        getSSRProps() {
            return { class: 'reveal' };
        },
        mounted(el: HTMLElement, binding) {
            el.classList.add('reveal');
            if (binding.value != null) {
                el.dataset.revealDelay = String(binding.value);
            }
            observer?.observe(el);
        },
        unmounted(el: HTMLElement) {
            observer?.unobserve(el);
        },
    });
});
