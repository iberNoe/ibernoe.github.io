export function initUtilities() {
    // Top Neon Scroll Progress Bar
    const scrollProgressBar = document.getElementById('scroll-progress-bar');
    let isScrollingProgress = false;

    if (scrollProgressBar) {
        window.addEventListener('scroll', () => {
            if (!isScrollingProgress) {
                window.requestAnimationFrame(() => {
                    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    const scrolledRatio = (winScroll / height) * 100;
                    scrollProgressBar.style.width = scrolledRatio + "%";
                    isScrollingProgress = false;
                });
                isScrollingProgress = true;
            }
        }, { passive: true });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbar = document.getElementById('navbar');
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}
