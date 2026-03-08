// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    // Navbar scroll effect and lights flash effect
    const navbar = document.getElementById('navbar');
    const lights = document.querySelectorAll('.bg-glow, .laser');

    let lastScrollY = window.scrollY;
    let flashTimeout;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Navbar
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Top Neon Scroll Progress Bar
        const scrollProgressBar = document.getElementById('scroll-progress-bar');
        if (scrollProgressBar) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolledRatio = (winScroll / height) * 100;
            scrollProgressBar.style.width = scrolledRatio + "%";
        }

        // Flashes on scroll down (hip-hop strobe beat)
        if (currentScrollY > lastScrollY + 20) {
            clearTimeout(flashTimeout);

            // First beat
            lights.forEach(light => light.classList.add('flash'));

            flashTimeout = setTimeout(() => {
                lights.forEach(light => light.classList.remove('flash'));

                // Second rapid beat
                setTimeout(() => {
                    lights.forEach(light => light.classList.add('flash'));

                    setTimeout(() => {
                        lights.forEach(light => light.classList.remove('flash'));
                    }, 40);
                }, 60);
            }, 40);
        }

        lastScrollY = currentScrollY;
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Handle window resize to prevent menu getting stuck
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Fire when 15% of the element is visible
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Smooth scroll for anchor links (if browser doesn't support CSS scroll-behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for navbar height
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Card hover effect (3D tilt effect - optional)
    // Removed for simpler implementation, but CSS hover states handle the heavy lifting
});
