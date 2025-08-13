// subtle-background-textures.js - Updated with perfectly symmetrical diagonal lines
// Diagonal lines with perfect center-aligned symmetry and increased coverage

class SubtleBackgroundTextures {
    constructor() {
        this.elements = [];
        this.currentSection = 'hero';
        this.isScrolling = false;
        this.scrollTimeout = null;
        this.animationRefs = new Set();
        this.mouseX = window.innerWidth / 2;
        this.mouseY = window.innerHeight / 2;
        this.currentHoverState = 'default';

        // Updated configurations with more diagonal lines for symmetrical coverage
        this.sectionConfigs = {
            'hero': {
                elements: [
                    { type: 'dots', count: 35, size: [2, 4], colors: ['#F7D54F', '#EBEBDF'] },
                    { type: 'diagonal-lines', count: 20, size: [120, 220], colors: ['#F7D54F', '#EBEBDF'] }
                ]
            },
            'about': {
                elements: [
                    { type: 'circles', count: 18, size: [3, 6], colors: ['#001C4C', '#EBEBDF'] },
                    { type: 'triangles', count: 10, size: [4, 8], colors: ['#F7D54F'] },
                    { type: 'diagonal-lines', count: 16, size: [100, 180], colors: ['#001C4C'] }
                ]
            },
            'services': {
                elements: [
                    { type: 'squares', count: 16, size: [2, 5], colors: ['#001C4C', '#EBEBDF'] },
                    { type: 'diagonal-lines', count: 24, size: [110, 200], colors: ['#F7D54F', '#EBEBDF'] }
                ]
            },
            'portfolio': {
                elements: [
                    { type: 'sparkles', count: 28, size: [1, 3], colors: ['#F7D54F', '#EBEBDF'] },
                    { type: 'dots', count: 16, size: [2, 4], colors: ['#001C4C'] },
                    { type: 'diagonal-lines', count: 28, size: [80, 140], colors: ['#F7D54F'] }
                ]
            },
            'contact': {
                elements: [
                    { type: 'circles', count: 14, size: [3, 6], colors: ['#EBEBDF', '#F7D54F'] },
                    { type: 'dots', count: 18, size: [1, 3], colors: ['#001C4C'] },
                    { type: 'diagonal-lines', count: 18, size: [100, 180], colors: ['#EBEBDF'] }
                ]
            }
        };

        this.init();
    }

    init() {
        this.createCanvas();
        this.addStyles();
        this.createSleekCursor(); // Restore original cursor
        this.setupSectionObserver();
        this.generateCurrentSectionTextures();
        this.initEventListeners(); // Restore cursor events
        this.initScrollOptimization();
    }

    createCanvas() {
        this.canvas = document.createElement('div');
        this.canvas.className = 'subtle-background-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
            will-change: opacity;
        `;
        document.body.appendChild(this.canvas);
    }

    addStyles() {
        const styles = `
            <style id="subtle-background-styles">
                .subtle-element {
                    position: absolute;
                    pointer-events: none;
                    will-change: transform, opacity;
                }

                .dot {
                    border-radius: 50%;
                    opacity: 0.3;
                }

                .diagonal-line {
                    height: 1px;
                    transform-origin: left center;
                    opacity: 0.25;
                    background: linear-gradient(90deg,
                        transparent,
                        currentColor,
                        currentColor,
                        transparent
                    );
                }

                .sparkle {
                    border-radius: 50%;
                    opacity: 0.4;
                    filter: blur(0.5px);
                }

                .triangle {
                    width: 0;
                    height: 0;
                    opacity: 0.3;
                }

                .circle {
                    border-radius: 50%;
                    border: 1px solid;
                    opacity: 0.25;
                }

                .square {
                    opacity: 0.3;
                    transform: rotate(45deg);
                }

                @media (max-width: 768px) {
                    .subtle-element {
                        opacity: 0.2 !important;
                    }
                    
                    .diagonal-line {
                        opacity: 0.15 !important;
                    }
                }
            </style>
        `;

        if (!document.getElementById('subtle-background-styles')) {
            document.head.insertAdjacentHTML('beforeend', styles);
        }
    }

    // ===== ORIGINAL CURSOR FUNCTIONALITY RESTORED =====
    createSleekCursor() {
        // Only create custom cursor on desktop
        if (window.innerWidth <= 768) return;

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

    handleResize() {
        // Recreate cursor for mobile/desktop changes
        if (window.innerWidth <= 768) {
            this.removeCursor();
        } else if (!this.cursor) {
            this.createSleekCursor();
        }

        // Regenerate textures for new screen size
        if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.clearCanvas();
            this.generateCurrentSectionTextures();
        }, 300);
    }

    removeCursor() {
        if (this.cursor) {
            this.cursor.remove();
            this.cursor = null;
        }
    }

    pauseAnimations() {
        this.animationRefs.forEach(tween => tween.pause());
    }

    resumeAnimations() {
        this.animationRefs.forEach(tween => tween.play());
    }
    // ===== END ORIGINAL CURSOR FUNCTIONALITY =====

    setupSectionObserver() {
        this.sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    const sectionId = this.getSectionId(entry.target);
                    if (sectionId && sectionId !== this.currentSection) {
                        this.transitionToSection(sectionId);
                    }
                }
            });
        }, {
            threshold: [0.3, 0.5, 0.7],
            rootMargin: '0px 0px 0px 0px'
        });

        // Observe sections
        const sections = document.querySelectorAll('section, .section, [data-section], #hero, #about, #services, #portfolio, #contact');
        sections.forEach(section => {
            this.sectionObserver.observe(section);
        });
    }

    getSectionId(element) {
        if (element.id) return element.id;
        if (element.dataset.section) return element.dataset.section;

        const classList = element.className.toLowerCase();
        if (classList.includes('hero')) return 'hero';
        if (classList.includes('about')) return 'about';
        if (classList.includes('services') || classList.includes('service')) return 'services';
        if (classList.includes('portfolio') || classList.includes('work') || classList.includes('projects')) return 'portfolio';
        if (classList.includes('contact')) return 'contact';

        // Position-based fallback
        const rect = element.getBoundingClientRect();
        const scrollY = window.scrollY;
        const totalPos = rect.top + scrollY;

        if (totalPos < window.innerHeight * 0.8) return 'hero';
        if (totalPos < window.innerHeight * 1.8) return 'about';
        if (totalPos < window.innerHeight * 2.8) return 'services';
        if (totalPos < window.innerHeight * 3.8) return 'portfolio';

        return 'contact';
    }

    transitionToSection(sectionId) {
        if (!this.sectionConfigs[sectionId] || this.isScrolling) return;

        this.currentSection = sectionId;

        // Very gentle fade transition
        this.animationRefs.forEach(tween => tween.kill());
        this.animationRefs.clear();

        gsap.to(this.canvas.children, {
            opacity: 0,
            duration: 1,
            stagger: 0.05,
            ease: "power2.out",
            onComplete: () => {
                this.clearCanvas();
                this.generateCurrentSectionTextures();
            }
        });
    }

    generateCurrentSectionTextures() {
        const config = this.sectionConfigs[this.currentSection];
        if (!config) return;

        // Mobile optimization - reduce counts significantly
        const isMobile = window.innerWidth <= 768;
        const reductionFactor = isMobile ? 0.4 : 1;

        config.elements.forEach((elementConfig, index) => {
            if (elementConfig.type === 'diagonal-lines') {
                // Handle diagonal lines separately for perfect symmetrical positioning
                this.createSymmetricalDiagonalLines(elementConfig, reductionFactor);
            } else {
                const count = Math.floor(elementConfig.count * reductionFactor);
                // Create immediately with no delay for other elements too
                for (let i = 0; i < count; i++) {
                    this.createElement(elementConfig, i);
                }
            }
        });
    }

    createSymmetricalDiagonalLines(config, reductionFactor) {
        const count = Math.floor(config.count * reductionFactor);
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // Create grid-based scattered positioning across the entire screen
        const cols = Math.ceil(Math.sqrt(count / 2)) * 2; // Ensure even distribution
        const rows = Math.ceil(count / cols);
        const cellWidth = screenWidth / cols;
        const cellHeight = screenHeight / rows;

        for (let i = 0; i < count; i++) {
            // Create immediately with no delay
            const element = document.createElement('div');
            element.className = 'subtle-element diagonal-line';

            const size = config.size[0] + Math.random() * (config.size[1] - config.size[0]);
            const color = config.colors[Math.floor(Math.random() * config.colors.length)];

            // Scatter lines across the screen in a grid pattern with randomness
            const col = i % cols;
            const row = Math.floor(i / cols);

            // Base position in grid cell
            const baseX = col * cellWidth;
            const baseY = row * cellHeight;

            // Add randomness within the cell for natural scatter
            const x = baseX + (Math.random() * cellWidth * 0.8) + (cellWidth * 0.1);
            const y = baseY + (Math.random() * cellHeight * 0.8) + (cellHeight * 0.1);

            // Alternate between \ and / diagonals
            const rotation = (i % 2 === 0) ? 45 : -45;

            this.styleDiagonalLine(element, size, color, x, y, rotation);
            this.canvas.appendChild(element);
            this.animateDiagonalLine(element, i);

            this.elements.push(element);
        }
    }

    styleDiagonalLine(element, size, color, x, y, rotation) {
        element.style.left = x + 'px';
        element.style.top = y + 'px';
        element.style.width = size + 'px';
        element.style.color = color;
        element.style.transform = `rotate(${rotation}deg)`;
        element.style.opacity = '0';
    }

    animateDiagonalLine(element, index) {
        // Instant entrance - no delay
        const entranceTween = gsap.fromTo(element,
            {
                opacity: 0,
                scaleX: 0
            },
            {
                opacity: 0.25,
                scaleX: 1,
                duration: 0.5, // Much faster
                delay: 0, // No delay
                ease: "power2.out"
            }
        );
        this.animationRefs.add(entranceTween);

        // Very gentle floating movement
        const floatTween = gsap.to(element, {
            x: `+=${(Math.random() - 0.5) * 30}`,
            y: `+=${(Math.random() - 0.5) * 30}`,
            duration: 25 + Math.random() * 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
        this.animationRefs.add(floatTween);

        // Subtle opacity pulsing
        const pulseTween = gsap.to(element, {
            opacity: 0.4,
            duration: 10 + Math.random() * 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
        this.animationRefs.add(pulseTween);
    }

    createElement(config, index) {
        const element = document.createElement('div');
        element.className = `subtle-element ${config.type.slice(0, -1)}`;

        // Smaller sizes
        const size = config.size[0] + Math.random() * (config.size[1] - config.size[0]);

        // Random color
        const color = config.colors[Math.floor(Math.random() * config.colors.length)];

        // More spread out positioning - avoid center clustering
        const margin = 100;
        const x = margin + Math.random() * (window.innerWidth - margin * 2);
        const y = margin + Math.random() * (window.innerHeight - margin * 2);

        this.styleElement(element, config.type.slice(0, -1), size, color, x, y);
        this.canvas.appendChild(element);
        this.animateElement(element, config.type.slice(0, -1), index);

        this.elements.push(element);
    }

    styleElement(element, type, size, color, x, y) {
        element.style.left = x + 'px';
        element.style.top = y + 'px';
        element.style.opacity = '0';

        switch (type) {
            case 'dot':
            case 'sparkle':
                element.style.width = size + 'px';
                element.style.height = size + 'px';
                element.style.background = color;
                break;

            case 'triangle':
                element.style.borderLeft = `${size/2}px solid transparent`;
                element.style.borderRight = `${size/2}px solid transparent`;
                element.style.borderBottom = `${size}px solid ${color}`;
                break;

            case 'circle':
                element.style.width = size + 'px';
                element.style.height = size + 'px';
                element.style.borderColor = color;
                break;

            case 'square':
                element.style.width = size + 'px';
                element.style.height = size + 'px';
                element.style.background = color;
                break;
        }
    }

    animateElement(element, type, index) {
        // Instant entrance for all elements
        const entranceTween = gsap.fromTo(element,
            {
                opacity: 0,
                scale: 0
            },
            {
                opacity: this.getOpacityForType(type),
                scale: 1,
                duration: 0.5, // Much faster
                delay: 0, // No delay
                ease: "power2.out"
            }
        );
        this.animationRefs.add(entranceTween);

        // Very gentle floating
        const floatTween = gsap.to(element, {
            x: `+=${(Math.random() - 0.5) * 60}`,
            y: `+=${(Math.random() - 0.5) * 60}`,
            duration: 15 + Math.random() * 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
        this.animationRefs.add(floatTween);

        // Subtle type-specific animation (NO ROTATION for any elements)
        const mainTween = this.getSubtleAnimationForType(element, type);
        if (mainTween) this.animationRefs.add(mainTween);
    }

    getOpacityForType(type) {
        // Much lower opacities
        const opacities = {
            dot: 0.3, sparkle: 0.4,
            triangle: 0.3, circle: 0.25, square: 0.3
        };
        return opacities[type] || 0.3;
    }

    getSubtleAnimationForType(element, type) {
        switch (type) {
            case 'sparkle':
                return gsap.to(element, {
                    opacity: 0.6,
                    duration: 3,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });

            case 'triangle':
            case 'square':
                // Scale animation instead of rotation
                return gsap.to(element, {
                    scale: 1.2,
                    duration: 12,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });

            case 'circle':
                return gsap.to(element, {
                    scale: 1.2,
                    duration: 8,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });

            default:
                return null;
        }
    }

    initScrollOptimization() {
        // Much gentler scroll optimization - lightweight approach
        window.addEventListener('scroll', () => {
            if (!this.isScrolling) {
                this.isScrolling = true;
                // Use will-change for better performance
                this.canvas.style.willChange = 'opacity';
                gsap.to(this.canvas, { opacity: 0.7, duration: 0.2 });
            }

            clearTimeout(this.scrollTimeout);
            this.scrollTimeout = setTimeout(() => {
                this.isScrolling = false;
                gsap.to(this.canvas, {
                    opacity: 1,
                    duration: 0.5,
                    onComplete: () => {
                        this.canvas.style.willChange = 'auto';
                    }
                });
            }, 150);
        }, { passive: true });

        // Pause animations when tab is hidden for performance
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.animationRefs.forEach(tween => tween.pause());
            } else {
                this.animationRefs.forEach(tween => tween.play());
            }
        });
    }

    clearCanvas() {
        this.animationRefs.forEach(tween => tween.kill());
        this.animationRefs.clear();
        this.canvas.innerHTML = '';
        this.elements = [];
    }

    destroy() {
        this.clearCanvas();
        if (this.sectionObserver) this.sectionObserver.disconnect();
        if (this.canvas) this.canvas.remove();
        this.removeCursor();
    }
}

// Initialize function
function initSubtleBackgroundTextures() {
    if (typeof gsap === 'undefined') {
        console.warn('GSAP is not loaded. Subtle background textures will not work.');
        return;
    }

    // Initialize subtle background textures
    const subtleBackground = new SubtleBackgroundTextures();

    // Global reference
    window.subtleBackground = subtleBackground;

    console.log('✨ Subtle background textures with symmetrical diagonal lines initialized successfully!');
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSubtleBackgroundTextures);
} else {
    initSubtleBackgroundTextures();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SubtleBackgroundTextures };
}
