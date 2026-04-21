import { onMounted, onBeforeUnmount } from 'vue';

export function useReveal() {
    let io: IntersectionObserver | null = null;
    let fallback: ReturnType<typeof setTimeout> | null = null;

    onMounted(() => {
        if (typeof window === 'undefined') return;
        document.documentElement.classList.add('js-reveal');
        const els = document.querySelectorAll<HTMLElement>('.reveal');
        const markIn = (el: Element) => el.classList.add('in');
        els.forEach((el) => {
            const r = el.getBoundingClientRect();
            if (r.top < window.innerHeight * 0.95) markIn(el);
        });
        io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        markIn(e.target);
                        io?.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.08, rootMargin: '0px 0px -5% 0px' },
        );
        els.forEach((el) => {
            if (!el.classList.contains('in')) io?.observe(el);
        });
        fallback = setTimeout(() => els.forEach(markIn), 2000);
    });

    onBeforeUnmount(() => {
        io?.disconnect();
        if (fallback) clearTimeout(fallback);
    });
}
