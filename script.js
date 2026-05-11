document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling for Navbar Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const target = document.querySelector(targetId);
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. 3D Carousel Logic
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;

    function updateCarousel() {
        items.forEach(item => {
            item.classList.remove('active', 'prev', 'next');
        });

        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        const nextIndex = (currentIndex + 1) % items.length;

        items[currentIndex].classList.add('active');
        items[prevIndex].classList.add('prev');
        items[nextIndex].classList.add('next');
    }

    if(prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateCarousel();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % items.length;
            updateCarousel();
        });
    }

    // 4. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 5. 4D Mouse Parallax Effect for Desktop
    const isDesktop = window.matchMedia("(min-width: 1025px)").matches;
    
    if(isDesktop) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 50;

            // 3D rotation for specific containers
            const dynamicContainers = document.querySelectorAll('.dynamic-3d-container');
            dynamicContainers.forEach(container => {
                const element = container.querySelector('.dynamic-3d-element');
                if(element) {
                    element.style.transform = `rotateY(${xAxis}deg) rotateX(${-yAxis}deg)`;
                }
            });

            // Position Parallax for floating cards
            const parallaxElements = document.querySelectorAll('.parallax');
            parallaxElements.forEach(el => {
                const speed = el.getAttribute('data-speed') || 0.05;
                const x = (window.innerWidth - e.pageX) * speed;
                const y = (window.innerHeight - e.pageY) * speed;
                el.style.transform = `translateX(${x}px) translateY(${y}px) translateZ(50px)`;
            });
        });
        
        // Reset transform on mouse leave
        document.addEventListener('mouseleave', () => {
            const elements = document.querySelectorAll('.dynamic-3d-element');
            elements.forEach(el => {
                el.style.transform = `rotateY(-15deg) rotateX(5deg)`; // Reset to initial state
            });
            const parallaxElements = document.querySelectorAll('.parallax');
            parallaxElements.forEach(el => {
                el.style.transform = `translateX(0px) translateY(0px) translateZ(50px)`;
            });
        });
    }
});
