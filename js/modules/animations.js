export function initAnimations() {
    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    };

    const revealOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // Removed strobe lights effect to prevent mobile scroll lag
}
