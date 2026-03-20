/**
 * Ofiwebcafe Business - Centralized JavaScript
 * Includes: Mobile Menu, Scroll Reveal, Back to Top, and animations.
 */

document.addEventListener("DOMContentLoaded", function () {
    // --- 0. GLOBAL PAGE REVEAL ---
    document.body.classList.add("page-loaded");

    // --- 1. MOBILE MENU LOGIC ---
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const navLinks = document.getElementById("nav-links");
    const menuIcon = mobileMenuBtn?.querySelector("i");
    let scrollPos = 0;

    function openMenu() {
        scrollPos = window.scrollY;
        navLinks.classList.add("mobile-active");
        document.body.classList.add("menu-open");
        document.body.style.top = `-${scrollPos}px`;
        if (menuIcon) menuIcon.classList.replace("fa-bars", "fa-xmark");
        
        // Stagger animation for menu items
        const links = navLinks.querySelectorAll("a, .mobile-menu-socials a");
        links.forEach((link, index) => {
            link.style.transitionDelay = `${0.1 + index * 0.05}s`;
            link.style.opacity = "1";
            link.style.transform = "translateY(0)";
        });
    }

    function closeMenu() {
        navLinks.classList.remove("mobile-active");
        document.body.classList.remove("menu-open");
        document.body.style.top = '';
        window.scrollTo(0, scrollPos);
        if (menuIcon) menuIcon.classList.replace("fa-xmark", "fa-bars");
        
        // Reset link states for next opening
        const links = navLinks.querySelectorAll("a, .mobile-menu-socials a");
        links.forEach(link => {
            link.style.transitionDelay = "0s";
            link.style.opacity = "";
            link.style.transform = "";
        });
    }

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener("click", () => {
            if (navLinks.classList.contains("mobile-active")) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close menu when clicking links
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                if (navLinks.classList.contains("mobile-active")) {
                    closeMenu();
                }
            });
        });
    }

    // --- 2. BACK TO TOP & SCROLL PROGRESS ---
    const backToTopButton = document.getElementById("backToTop");
    if (backToTopButton) {
        const circle = backToTopButton.querySelector(".progress-ring__circle");
        const radius = circle ? circle.r.baseVal.value : 0;
        const circumference = radius * 2 * Math.PI;

        if (circle) {
            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = `${circumference}`;
        }

        function setProgress(percent) {
            if (circle) {
                const offset = circumference - (percent / 100) * circumference;
                circle.style.strokeDashoffset = offset;
            }
        }

        window.addEventListener("scroll", () => {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            let scrollPercent = 0;
            if (docHeight > 0) {
                scrollPercent = (scrollY / docHeight) * 100;
            }
            setProgress(scrollPercent);

            if (scrollY > 300) {
                backToTopButton.classList.add("show");
            } else {
                backToTopButton.classList.remove("show");
            }
        });

        backToTopButton.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // --- 3. SCROLL REVEAL ANIMATIONS ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { 
        threshold: 0.1, 
        rootMargin: '0px 0px -50px 0px' 
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 4. TESTIMONIAL SLIDER LOGIC ---
    const slider = document.getElementById('testimonials-grid')?.parentElement;
    const dots = document.querySelectorAll('#testimonial-dots .dot');

    if (slider && dots.length > 0) {
        slider.addEventListener('scroll', () => {
            const scrollLeft = slider.scrollLeft;
            const width = slider.offsetWidth;
            const index = Math.round(scrollLeft / width);
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        });
        
        // Optional: Touch drag support could be improved here if needed
    }
});
