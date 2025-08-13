// interactive-elements.js - Fixed GSAP Interactive Elements with Stable Cursor
// Note: Make sure GSAP CDN is loaded before this script

class InteractiveElements {
    constructor() {
        this.particles = [];
        this.lines = [];
        this.maxParticles = window.innerWidth > 768 ? 18 : 10;
        this.isScrolling = false;
        this.mouseX = window.innerWidth / 2;
        this.mouseY = window.innerHeight / 2;
        this.currentHoverState = 'default'; // Track current state

        this.init();
    }

    init() {
        this.createCanvas();
        this.createSleekCursor();
        this.createParticles();
        this.initEventListeners();
        this.startAnimationLoop();
    }

    createCanvas() {
        // Create interactive canvas container
        this.canvas = document.createElement('div');
        this.canvas.className = 'interactive-canvas';
        document.body.appendChild(this.canvas);
    }

    createSleekCursor() {
        // Only create custom cursor on desktop
        if (window.innerWidth <= 768) return;

        // Main sleek cursor
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor';
        document.body.appendChild(this.cursor);

        // Initial positioning (center of screen)
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        this.cursor.style.left = (centerX - 6) + 'px';
        this.cursor.style.top = (centerY - 6) + 'px';

        // Mouse event listeners
        document.addEventListener('mousemove', (e) => this.updateSleekCursor(e));

        // Improved hover detection with debouncing
        this.setupHoverDetection();

        // Force cursor visibility on mouse enter
        document.addEventListener('mouseenter', () => {
            if (this.cursor) {
                this.cursor.style.opacity = '1';
            }
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            if (this.cursor) {
                this.cursor.style.opacity = '0';
            }
        });
    }

    setupHoverDetection() {
        let hoverTimeout;
        const cardSelector = '.glass-card';
        const interactiveSelector = 'a, button, .glass-button, input, textarea, select, [role="button"], .clickable';

        // Use a single mousemove event for more stable detection
        document.addEventListener('mousemove', (e) => {
            clearTimeout(hoverTimeout);

            hoverTimeout = setTimeout(() => {
                const elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY);
                if (!elementUnderMouse) return;

                // Check what type of element we're over
                const isOverCard = elementUnderMouse.closest(cardSelector);
                const isOverInteractive = elementUnderMouse.closest(interactiveSelector);

                let newState = 'default';

                if (isOverCard && !isOverInteractive) {
                    newState = 'card-hover';
                } else if (isOverInteractive) {
                    newState = 'hover';
                }

                // Only update if state actually changed
                if (newState !== this.currentHoverState) {
                    this.updateCursorState(newState);
                    this.currentHoverState = newState;
                }
            }, 10); // Small delay to prevent rapid state changes
        });
    }

    updateCursorState(state) {
        if (!this.cursor) return;

        // Remove all state classes
        this.cursor.classList.remove('hover', 'card-hover');

        // Add new state class
        if (state !== 'default') {
            this.cursor.classList.add(state);
        }
    }

    updateSleekCursor(e) {
        if (!this.cursor) return;

        this.mouseX = e.clientX;
        this.mouseY = e.clientY;

        // Update main cursor position with smooth transition
        gsap.to(this.cursor, {
            left: (this.mouseX - 6) + 'px',
            top: (this.mouseY - 6) + 'px',
            duration: 0.1,
            ease: "power2.out"
        });
    }

    createParticle() {
        const particle = document.createElement('div');
        const types = ['', 'blue', 'white'];
        const randomType = types[Math.floor(Math.random() * types.length)];

        particle.className = `particle ${randomType}`;

        // Random initial position
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        this.canvas.appendChild(particle);

        const particleData = {
            element: particle,
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            life: Math.random() * 400 + 300
        };

        this.particles.push(particleData);

        // Animate particle with GSAP
        this.animateParticle(particleData);
    }

    animateParticle(particle) {
        // Floating animation with more movement
        gsap.to(particle.element, {
            x: particle.x + (Math.random() - 0.5) * 300,
            y: particle.y + (Math.random() - 0.5) * 300,
            duration: Math.random() * 12 + 8,
            ease: "none",
            repeat: -1,
            yoyo: true,
            onUpdate: () => {
                // Update particle position for line connections
                const rect = particle.element.getBoundingClientRect();
                particle.x = rect.left + window.scrollX;
                particle.y = rect.top + window.scrollY;
            }
        });

        // Enhanced opacity pulse with higher values
        gsap.to(particle.element, {
            opacity: Math.random() * 0.5 + 0.4,
            duration: Math.random() * 4 + 2,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true
        });

        // Add subtle scale animation for more life
        gsap.to(particle.element, {
            scale: Math.random() * 0.5 + 0.8,
            duration: Math.random() * 6 + 4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });
    }

    createConnectionLine(particle1, particle2) {
        const line = document.createElement('div');
        line.className = Math.random() > 0.6 ? 'connection-line blue' : 'connection-line';

        this.canvas.appendChild(line);

        const distance = this.getDistance(particle1, particle2);
        const angle = Math.atan2(particle2.y - particle1.y, particle2.x - particle1.x);

        // Position and style the line
        line.style.left = particle1.x + 'px';
        line.style.top = particle1.y + 'px';
        line.style.width = distance + 'px';
        line.style.transform = `rotate(${angle}rad)`;
        line.style.transformOrigin = '0 0';

        // Enhanced line appearance animation
        gsap.fromTo(line,
            { opacity: 0, scaleX: 0 },
            {
                opacity: 0.9,
                scaleX: 1,
                duration: 0.8,
                ease: "power2.out"
            }
        );

        // Auto remove after longer time
        setTimeout(() => {
            if (line.parentNode) {
                gsap.to(line, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        if (line.parentNode) {
                            line.parentNode.removeChild(line);
                        }
                    }
                });
            }
        }, 3500);
    }

    getDistance(p1, p2) {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }

    checkConnections() {
        // Throttle connection checking to prevent performance issues
        if (this.isScrolling) return;

        const connectionDistance = 180;

        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const distance = this.getDistance(this.particles[i], this.particles[j]);

                if (distance < connectionDistance && Math.random() > 0.96) {
                    this.createConnectionLine(this.particles[i], this.particles[j]);
                }
            }
        }
    }

    initEventListeners() {
        // Scroll optimization
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            this.isScrolling = true;
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.isScrolling = false;
            }, 150);
        });

        // Mouse interaction with particles
        if (window.innerWidth > 768) {
            document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        }

        // Resize handler
        window.addEventListener('resize', () => this.handleResize());

        // Visibility change to pause animations when tab is not active
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });
    }

    handleMouseMove(e) {
        // Only run on desktop and not while scrolling
        if (window.innerWidth <= 768 || this.isScrolling) return;

        const mouseX = e.clientX + window.scrollX;
        const mouseY = e.clientY + window.scrollY;

        // Enhanced particle attraction to mouse
        this.particles.forEach(particle => {
            const distance = this.getDistance({ x: mouseX, y: mouseY }, particle);

            if (distance < 120) {
                const force = (120 - distance) / 120 * 0.03;
                const angle = Math.atan2(mouseY - particle.y, mouseX - particle.x);

                gsap.to(particle.element, {
                    x: `+=${Math.cos(angle) * force}`,
                    y: `+=${Math.sin(angle) * force}`,
                    duration: 0.3,
                    ease: "power2.out"
                });

                // Brighten particles near cursor
                gsap.to(particle.element, {
                    opacity: 1,
                    scale: 1.2,
                    duration: 0.2,
                    ease: "power2.out",
                    yoyo: true,
                    repeat: 1
                });
            }
        });
    }

    handleResize() {
        // Adjust particle count based on screen size
        const newMaxParticles = window.innerWidth > 768 ? 18 : 10;

        if (newMaxParticles < this.particles.length) {
            // Remove excess particles
            const excess = this.particles.length - newMaxParticles;
            for (let i = 0; i < excess; i++) {
                const particle = this.particles.pop();
                if (particle && particle.element.parentNode) {
                    particle.element.parentNode.removeChild(particle.element);
                }
            }
        } else if (newMaxParticles > this.particles.length) {
            // Add more particles
            const needed = newMaxParticles - this.particles.length;
            for (let i = 0; i < needed; i++) {
                this.createParticle();
            }
        }

        this.maxParticles = newMaxParticles;

        // Recreate cursor for mobile/desktop changes
        if (window.innerWidth <= 768) {
            this.removeCursor();
        } else if (!this.cursor) {
            this.createSleekCursor();
        }
    }

    removeCursor() {
        if (this.cursor) {
            this.cursor.remove();
            this.cursor = null;
        }
    }

    startAnimationLoop() {
        let lastTime = 0;
        const fps = 60;
        const interval = 1000 / fps;

        const animate = (currentTime) => {
            if (currentTime - lastTime >= interval) {
                this.update();
                lastTime = currentTime;
            }

            if (!document.hidden) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    update() {
        // Check connections more frequently for more lines
        if (Math.random() > 0.92 && !this.isScrolling) {
            this.checkConnections();
        }

        // Clean up old particles and create new ones
        this.particles.forEach((particle, index) => {
            particle.life--;

            if (particle.life <= 0) {
                // Fade out and remove
                gsap.to(particle.element, {
                    opacity: 0,
                    scale: 0,
                    duration: 1.2,
                    onComplete: () => {
                        if (particle.element.parentNode) {
                            particle.element.parentNode.removeChild(particle.element);
                        }
                    }
                });

                this.particles.splice(index, 1);

                // Create a new particle to maintain count
                setTimeout(() => {
                    if (this.particles.length < this.maxParticles) {
                        this.createParticle();
                    }
                }, Math.random() * 1500 + 800);
            }
        });
    }

    pauseAnimations() {
        // Pause all GSAP animations
        gsap.globalTimeline.pause();
    }

    resumeAnimations() {
        // Resume all GSAP animations
        gsap.globalTimeline.play();
    }

    // Enhanced scroll-triggered particle burst effect
    createScrollBurst(x, y) {
        if (this.isScrolling || window.innerWidth <= 768) return;

        const burstCount = 8;

        for (let i = 0; i < burstCount; i++) {
            const burstParticle = document.createElement('div');
            burstParticle.className = 'particle';
            burstParticle.style.left = x + 'px';
            burstParticle.style.top = y + 'px';
            burstParticle.style.opacity = '1';
            burstParticle.style.transform = 'scale(1.5)';

            this.canvas.appendChild(burstParticle);

            // Enhanced burst animation
            const angle = (i / burstCount) * Math.PI * 2;
            const distance = Math.random() * 80 + 40;

            gsap.to(burstParticle, {
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                opacity: 0,
                scale: 0,
                rotation: Math.random() * 360,
                duration: 1.2,
                ease: "power2.out",
                onComplete: () => {
                    if (burstParticle.parentNode) {
                        burstParticle.parentNode.removeChild(burstParticle);
                    }
                }
            });
        }
    }

    // Add method to create subtle particle effects when moving over cards
    createCardEffect(x, y) {
        if (window.innerWidth <= 768) return;

        const effectParticle = document.createElement('div');
        effectParticle.className = 'particle blue';
        effectParticle.style.left = x + 'px';
        effectParticle.style.top = y + 'px';
        effectParticle.style.opacity = '0.6';
        effectParticle.style.transform = 'scale(0.8)';

        this.canvas.appendChild(effectParticle);

        // Animate effect particle
        gsap.to(effectParticle, {
            x: (Math.random() - 0.5) * 20,
            y: (Math.random() - 0.5) * 20,
            opacity: 0,
            scale: 0.3,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => {
                if (effectParticle.parentNode) {
                    effectParticle.parentNode.removeChild(effectParticle);
                }
            }
        });
    }
}

// Enhanced intersection observer for scroll effects
class ScrollInteractionEnhancer {
    constructor(interactiveElements) {
        this.interactiveElements = interactiveElements;
        this.init();
    }

    init() {
        // Create intersection observer for scroll effects
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger enhanced particle burst when elements come into view
                    const rect = entry.boundingClientRect;
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;

                    this.interactiveElements.createScrollBurst(centerX, centerY);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -5% 0px'
        });

        // Observe key elements
        const elementsToObserve = document.querySelectorAll('.glass-card, .section-header');
        elementsToObserve.forEach(el => this.observer.observe(el));

        // Add subtle mousemove listener for card effects
        document.addEventListener('mousemove', (e) => {
            const target = e.target.closest('.glass-card');
            if (target && Math.random() > 0.95) { // Very occasional subtle effects on cards
                this.interactiveElements.createCardEffect(e.clientX, e.clientY);
            }
        });
    }
}

// Initialize when DOM is loaded and GSAP is available
function initInteractiveElements() {
    if (typeof gsap === 'undefined') {
        console.warn('GSAP is not loaded. Interactive elements will not work.');
        return;
    }

    // Initialize interactive elements
    const interactiveElements = new InteractiveElements();

    // Initialize scroll interaction enhancer
    const scrollEnhancer = new ScrollInteractionEnhancer(interactiveElements);

    // Global reference for other scripts to access
    window.interactiveElements = interactiveElements;

    console.log('Enhanced sleek interactive elements initialized successfully');
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInteractiveElements);
} else {
    initInteractiveElements();
}

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { InteractiveElements, ScrollInteractionEnhancer };
}