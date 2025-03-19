// Performance Optimization
// Debounce function to limit the rate at which a function can fire
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Throttle function to limit the number of times a function can be called
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Custom Cursor with optimized performance
const cursor = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-dot-outline');

if (cursor && cursorOutline) {
    const moveCursor = throttle((e) => {
        requestAnimationFrame(() => {
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            cursorOutline.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        });
    }, 10);

    document.addEventListener('mousemove', moveCursor);
}

// Optimized Parallax Effect
document.addEventListener('mousemove', throttle((e) => {
    const parallaxElements = document.querySelectorAll('.parallax');
    if (parallaxElements.length) {
        requestAnimationFrame(() => {
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-speed') || 0.1;
                const x = (window.innerWidth - e.pageX * speed) / 100;
                const y = (window.innerHeight - e.pageY * speed) / 100;
                element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            });
        });
    }
}, 10));

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Section Transition Effects
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Ripple Effect
document.querySelectorAll('.ripple').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple-effect');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size/2}px`;
        ripple.style.top = `${e.clientY - rect.top - size/2}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Optimized Scroll Progress Indicator
const scrollProgress = document.querySelector('.scroll-progress');
if (scrollProgress) {
    const updateScrollProgress = throttle(() => {
        requestAnimationFrame(() => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        });
    }, 10);

    window.addEventListener('scroll', updateScrollProgress);
}

// Optimized AOS (Animate On Scroll) Initialization
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        disable: window.innerWidth < 768 ? true : false
    });
}

// Optimized Particles Animation
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    // Reduce number of particles for better performance
    const particleCount = 30;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        fragment.appendChild(particle);
    }
    
    particlesContainer.appendChild(fragment);
}

// Create particles only if needed
if (document.querySelector('.particles')) {
    createParticles();
}

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menuToggle.classList.contains('active') && 
            !menuToggle.contains(e.target) && 
            !navLinks.contains(e.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// Smooth scroll for navigation links with performance optimization
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Close mobile menu if open
            if (menuToggle && menuToggle.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
            
            // Smooth scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Detect reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Disable all animations if user prefers reduced motion
if (prefersReducedMotion) {
    document.documentElement.classList.add('reduced-motion');
}

// Change navbar on scroll with performance optimization
const mainNav = document.querySelector('.main-nav');
if (mainNav) {
    const updateNavbar = throttle(() => {
        requestAnimationFrame(() => {
            if (window.scrollY > 50) {
                mainNav.classList.add('scrolled');
            } else {
                mainNav.classList.remove('scrolled');
            }
        });
    }, 10);

    window.addEventListener('scroll', updateNavbar);
}

// Lazy load images for better performance
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
});

// Make sure skill popups work
document.addEventListener('DOMContentLoaded', function() {
    // Add this code at the beginning of the file for skill popups
    const skillItems = document.querySelectorAll('.expertise .skill-item');
    
    skillItems.forEach(item => {
        const popup = item.querySelector('.skill-popup');
        
        if (popup) {
            // Show popup on hover
            item.addEventListener('mouseenter', function() {
                popup.style.opacity = '1';
                popup.style.visibility = 'visible';
                popup.style.transform = 'translateX(-50%) translateY(5px)';
                popup.style.pointerEvents = 'auto';
            });
            
            // Hide popup when mouse leaves the skill item
            item.addEventListener('mouseleave', function() {
                popup.style.opacity = '0';
                popup.style.visibility = 'hidden';
                popup.style.pointerEvents = 'none';
            });
        }
    });
});

// Disable multilingual hover effect - keep everything in Nepali only
document.addEventListener('DOMContentLoaded', function() {
    // We're not using the .multilang hover effect anymore
    // This function is kept as a placeholder in case we need to reimplement later
    console.log('Website is now fully in Nepali');
});

// Design gallery modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // Find elements needed for the modal
    const modal = document.querySelector('.fullscreen-modal');
    const modalImg = document.querySelector('.modal-content');
    const modalCaption = document.querySelector('.modal-caption');
    const closeModal = document.querySelector('.close-modal');
    const viewButtons = document.querySelectorAll('.view-btn');
    
    if (modal && modalImg && viewButtons.length > 0) {
        // When user clicks on view button
        viewButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Find the gallery item and get image source
                const galleryItem = this.closest('.gallery-item');
                const imgSrc = galleryItem.querySelector('img').getAttribute('src');
                const caption = galleryItem.querySelector('.overlay span').textContent;
                
                // Set image and caption in modal
                modal.style.display = 'flex';
                modalImg.src = imgSrc;
                
                if (modalCaption) {
                    modalCaption.textContent = caption;
                }
                
                // Prevent scrolling while modal is open
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close modal when clicking X button
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            });
        }
        
        // Close modal when clicking outside the image
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
});

// Language Switcher Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create language switch button
    const langSwitch = document.createElement('div');
    langSwitch.className = 'lang-switch';
    langSwitch.setAttribute('data-active', 'np'); // Default to Nepali
    langSwitch.innerHTML = `
        <i class="fas fa-globe"></i>
        <span class="lang-np">नेपाली</span>
        <span> / </span>
        <span class="lang-en">EN</span>
    `;

    // Add language switcher to navigation
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.appendChild(langSwitch);
    }

    // Set up click event for language switching
    langSwitch.addEventListener('click', function() {
        const currentLang = this.getAttribute('data-active');
        
        if (currentLang === 'np') {
            // Switch to English
            this.setAttribute('data-active', 'en');
            switchLanguage('en');
        } else {
            // Switch to Nepali
            this.setAttribute('data-active', 'np');
            switchLanguage('np');
        }
    });

    // Function to switch languages
    function switchLanguage(lang) {
        // Get all elements with data-en attribute
        const elements = document.querySelectorAll('[data-en]');
        
        elements.forEach(element => {
            if (lang === 'en') {
                // Save original text if not already saved
                if (!element.hasAttribute('data-np')) {
                    element.setAttribute('data-np', element.innerText);
                }
                element.innerText = element.getAttribute('data-en');
            } else {
                // Switch back to Nepali
                if (element.hasAttribute('data-np')) {
                    element.innerText = element.getAttribute('data-np');
                }
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Store preference in localStorage
        localStorage.setItem('language', lang);
    }

    // Check for saved language preference
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
        langSwitch.setAttribute('data-active', savedLang);
        switchLanguage(savedLang);
    }
}); 