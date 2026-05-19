document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Reveal-on-scroll animation
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    window.addEventListener('resize', checkReveal);
    checkReveal(); // Initial check

    // Interactive slide navigation
    const slides = document.querySelectorAll('.slide');
    const navDots = document.querySelectorAll('.slide-nav-dot');
    let currentSlide = 0;
    
    function updateSlideNavigation() {
        slides.forEach((slide, index) => {
            const slideTop = slide.getBoundingClientRect().top;
            const slideHeight = slide.offsetHeight;
            
            if (slideTop <= 100 && slideTop > -slideHeight + 100) {
                currentSlide = index;
                updateActiveDot();
            }
        });
    }
    
    function updateActiveDot() {
        navDots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            scrollToSlide(index);
        });
    });
    
    function scrollToSlide(index) {
        if (index >= 0 && index < slides.length) {
            window.scrollTo({
                top: slides[index].offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    window.addEventListener('scroll', updateSlideNavigation);
    updateSlideNavigation(); // Initial update

    // Keyboard navigation for slides
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            scrollToSlide(Math.min(currentSlide + 1, slides.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            scrollToSlide(Math.max(currentSlide - 1, 0));
        }
    });
});