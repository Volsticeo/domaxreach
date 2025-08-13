// interactions.js - Advanced interactions and effects

document.addEventListener('DOMContentLoaded', function() {

    // Cursor Trail Effect
    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    document.body.appendChild(cursorTrail);

    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        const speed = 0.1;
        trailX += (mouseX - trailX) * speed;
        trailY += (mouseY - trailY) * speed;

        cursorTrail.style.transform = `translate(${trailX}px, ${trailY}px)`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Tilt Effect for Cards (excluding testimonial cards to avoid conflicts)
    const tiltCards = document.querySelectorAll('.service-card, .portfolio-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Smooth Page Transitions
    const links = document.querySelectorAll('a:not(.nav-link)');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Image Gallery Lightbox
    const portfolioImages = document.querySelectorAll('.portfolio-image img');

    portfolioImages.forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();

            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${this.src}" alt="${this.alt}">
                    <button class="lightbox-close">&times;</button>
                </div>
            `;

            document.body.appendChild(lightbox);

            // Animate in
            setTimeout(() => {
                lightbox.classList.add('active');
            }, 10);

            // Close lightbox
            const closeBtn = lightbox.querySelector('.lightbox-close');
            closeBtn.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', closeLightbox);

            function closeLightbox(e) {
                if (e.target === lightbox || e.target === closeBtn) {
                    lightbox.classList.remove('active');
                    setTimeout(() => {
                        lightbox.remove();
                    }, 300);
                }
            }
        });
    });

    // Progress Bar on Scroll
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;

        progressBar.style.width = scrolled + '%';
    });

    // Service Card Hover Effects
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            // Add glow effect to icon
            const icon = this.querySelector('.service-icon');
            icon.style.boxShadow = '0 0 30px rgba(247, 213, 79, 0.5)';

            // Animate features list
            const features = this.querySelectorAll('.service-features li');
            features.forEach((feature, i) => {
                feature.style.animation = `slideInLeft 0.3s ease ${i * 0.1}s forwards`;
            });
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.boxShadow = '';

            const features = this.querySelectorAll('.service-features li');
            features.forEach(feature => {
                feature.style.animation = '';
            });
        });
    });

    // Dynamic Background Gradient
    let gradientAngle = 0;

    function animateGradient() {
        gradientAngle += 0.5;
        const gradient = `linear-gradient(${gradientAngle}deg, 
            rgba(247, 213, 79, 0.05) 0%, 
            transparent 50%, 
            rgba(0, 28, 76, 0.05) 100%)`;

        document.body.style.backgroundImage = gradient;
        requestAnimationFrame(animateGradient);
    }

    // Uncomment to enable gradient animation
    // animateGradient();

    // Sound Effects (optional)
    const soundEnabled = false; // Set to true to enable sounds

    if (soundEnabled) {
        const hoverSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBT');

        const clickableElements = document.querySelectorAll('button, .glass-button, .nav-link');

        clickableElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                hoverSound.currentTime = 0;
                hoverSound.volume = 0.1;
                hoverSound.play().catch(() => {});
            });
        });
    }

    // Scroll-based Animations
    const animatedElements = document.querySelectorAll('[data-animation]');

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animation = entry.target.dataset.animation;
                entry.target.classList.add(animation);
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });

    // Dynamic Text Color on Hover
    const dynamicTextElements = document.querySelectorAll('h1, h2, h3');

    dynamicTextElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #F7D54F, #EBEBDF)';
            this.style.webkitBackgroundClip = 'text';
            this.style.webkitTextFillColor = 'transparent';
            this.style.backgroundClip = 'text';
        });

        element.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.webkitBackgroundClip = '';
            this.style.webkitTextFillColor = '';
            this.style.backgroundClip = '';
        });
    });

    // Particle Effect on Click
    document.addEventListener('click', function(e) {
        if (e.target.closest('.glass-button, .primary-cta, .submit-btn')) {
            createParticles(e.clientX, e.clientY);
        }
    });

    function createParticles(x, y) {
        const particleCount = 15;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            const size = Math.random() * 8 + 4;
            const destinationX = (Math.random() - 0.5) * 100;
            const destinationY = (Math.random() - 0.5) * 100;
            const rotation = Math.random() * 360;
            const delay = Math.random() * 200;

            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                background: #F7D54F;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                animation: particleAnimation 1s ease-out ${delay}ms forwards;
            `;

            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 1000 + delay);
        }
    }

    // Smooth Show/Hide for Elements
    function smoothShow(element, duration = 300) {
        element.style.display = 'block';
        element.style.opacity = '0';

        setTimeout(() => {
            element.style.transition = `opacity ${duration}ms ease`;
            element.style.opacity = '1';
        }, 10);
    }

    function smoothHide(element, duration = 300) {
        element.style.transition = `opacity ${duration}ms ease`;
        element.style.opacity = '0';

        setTimeout(() => {
            element.style.display = 'none';
        }, duration);
    }

    // Copy to Clipboard for Contact Info
    const contactInfoElements = document.querySelectorAll('.info-card p');

    contactInfoElements.forEach(element => {
        element.style.cursor = 'pointer';

        element.addEventListener('click', function() {
            const text = this.textContent;
            navigator.clipboard.writeText(text).then(() => {
                // Show feedback
                const feedback = document.createElement('div');
                feedback.className = 'copy-feedback';
                feedback.textContent = 'Copied!';
                feedback.style.cssText = `
                    position: fixed;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    background: #F7D54F;
                    color: #000;
                    padding: 10px 20px;
                    border-radius: 20px;
                    font-weight: 600;
                    z-index: 10000;
                    animation: fadeInOut 2s ease;
                `;

                document.body.appendChild(feedback);

                setTimeout(() => {
                    feedback.remove();
                }, 2000);
            });
        });
    });

    // Keyboard Navigation (removed testimonial-specific navigation to avoid conflicts)
    document.addEventListener('keydown', function(e) {
        // ESC to close lightbox/modals
        if (e.key === 'Escape') {
            const lightbox = document.querySelector('.lightbox.active');
            if (lightbox) {
                lightbox.classList.remove('active');
                setTimeout(() => lightbox.remove(), 300);
            }
        }
    });

    // Performance Optimization - Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Optimized scroll handler
    const optimizedScroll = debounce(() => {
        // Add scroll-based logic here
    }, 100);

    window.addEventListener('scroll', optimizedScroll);

    // Preload critical images
    const criticalImages = [
        'placeholder-hero.jpg',
        'placeholder-team.jpg'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Initialize all interactive elements
    console.log('DoMaxReach - All interactions loaded successfully!');
});

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes particleAnimation {
        to {
            transform: translate(var(--x), var(--y)) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes fadeInOut {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .cursor-trail {
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(247, 213, 79, 0.3), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        mix-blend-mode: screen;
        transform: translate(-50%, -50%);
    }
    
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lightbox.active {
        opacity: 1;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-content img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: #EBEBDF;
        font-size: 40px;
        cursor: pointer;
        transition: transform 0.3s ease;
    }
    
    .lightbox-close:hover {
        transform: rotate(90deg);
    }
    
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #F7D54F, #EBEBDF);
        z-index: 10001;
        transition: width 0.3s ease;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(247, 213, 79, 0.5);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

document.head.appendChild(style);