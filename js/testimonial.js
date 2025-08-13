// testimonials.js - Enhanced Version

class TestimonialManager {
    constructor() {
        this.testimonials = [
            {
                id: 1,
                name: "Alex Johnson",
                position: "CEO, TechFlow Solutions",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
                rating: 5,
                content: "DoMaxReach transformed our digital presence completely. Our ROI increased by 300% in just 6 months.",
                projectType: "Digital Marketing"
            },
            {
                id: 2,
                name: "Sarah Chen",
                position: "Marketing Director, StyleCo",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80",
                rating: 5,
                content: "The creative campaign they designed for us was absolutely stunning. Our engagement rates skyrocketed!",
                projectType: "Creative Design"
            },
            {
                id: 3,
                name: "Michael Rodriguez",
                position: "Founder, EcoVenture",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
                rating: 5,
                content: "Professional, innovative, and results-driven. DoMaxReach exceeded all our expectations!",
                projectType: "Brand Strategy"
            },
            {
                id: 4,
                name: "Emma Thompson",
                position: "VP Marketing, FreshFoods",
                avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80",
                rating: 5,
                content: "Their social media strategy doubled our followers and tripled our conversion rates. Amazing work!",
                projectType: "Social Media"
            },
            {
                id: 5,
                name: "David Kumar",
                position: "CTO, InnovateHub",
                avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&q=80",
                rating: 5,
                content: "Data-driven insights that actually work. Our analytics improved and so did our bottom line!",
                projectType: "Analytics"
            },
            {
                id: 6,
                name: "Lisa Park",
                position: "Brand Manager, LuxuryLifestyle",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
                rating: 5,
                content: "Outstanding creativity and execution. They brought our vision to life better than we imagined!",
                projectType: "Branding"
            },
            {
                id: 7,
                name: "James Wilson",
                position: "CEO, StartupLab",
                avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80",
                rating: 5,
                content: "From strategy to execution, DoMaxReach delivered beyond our wildest dreams. Truly exceptional!",
                projectType: "Growth Strategy"
            },
            {
                id: 8,
                name: "Rachel Adams",
                position: "Director, HealthTech Plus",
                avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80",
                rating: 5,
                content: "The most professional and creative team we've worked with. Our brand transformation was incredible!",
                projectType: "Rebranding"
            },
            {
                id: 9,
                name: "Marcus Thompson",
                position: "COO, FinanceForward",
                avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=100&q=80",
                rating: 5,
                content: "They helped us scale from startup to market leader. Their strategic insights were game-changing!",
                projectType: "Scale Strategy"
            },
            {
                id: 10,
                name: "Nina Patel",
                position: "Head of Digital, RetailMax",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
                rating: 5,
                content: "Incredible attention to detail and customer service. They truly understand modern digital marketing!",
                projectType: "E-commerce"
            },
            {
                id: 11,
                name: "Robert Chen",
                position: "Founder, GreenTech Solutions",
                avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&q=80",
                rating: 5,
                content: "DoMaxReach helped us launch our sustainable brand with campaigns that truly resonated with our audience.",
                projectType: "Launch Campaign"
            },
            {
                id: 12,
                name: "Amanda Foster",
                position: "Creative Director, ArtSpace",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
                rating: 5,
                content: "Their creative vision exceeded our wildest expectations. The brand refresh was absolutely perfect!",
                projectType: "Creative Strategy"
            },
            {
                id: 13,
                name: "Kevin Zhang",
                position: "VP Growth, CloudSync",
                avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&q=80",
                rating: 5,
                content: "Results-driven approach that delivered measurable impact. Our user acquisition cost dropped by 40%!",
                projectType: "Growth Marketing"
            },
            {
                id: 14,
                name: "Sophie Martinez",
                position: "Brand Manager, WellnessPlus",
                avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80",
                rating: 5,
                content: "They understood our wellness brand perfectly and created campaigns that spoke to our community's heart.",
                projectType: "Community Building"
            },
            {
                id: 15,
                name: "Thomas Anderson",
                position: "CEO, TechInnovate",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
                rating: 5,
                content: "Working with DoMaxReach was transformative. They helped us pivot our entire digital strategy successfully.",
                projectType: "Digital Transformation"
            }
        ];

        this.currentPage = 0;
        this.cardsPerPage = 6; // Always show 6 cards in 3x2 grid
        this.totalPages = Math.ceil(this.testimonials.length / this.cardsPerPage);

        this.container = document.getElementById('testimonials-container');
        this.dotsContainer = document.getElementById('testimonials-dots');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');

        this.autoPlayInterval = null;
        this.autoPlayDelay = 8000; // Increased to 8 seconds
        this.isAutoPlayEnabled = true; // Default to enabled
        this.isTransitioning = false; // Prevent animation glitches

        this.init();
    }

    init() {
        this.createAutoPlayToggle();
        this.renderTestimonials();
        this.renderDots();
        this.bindEvents();
        this.updateNavigation();
        this.startAutoPlay();
    }

    createAutoPlayToggle() {
        // Create toggle button in the navigation area
        const navigation = document.querySelector('.testimonials-navigation');

        const toggleWrapper = document.createElement('div');
        toggleWrapper.className = 'autoplay-toggle-wrapper';
        toggleWrapper.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
            position: absolute;
            top: -50px;
            right: 0;
            font-size: 12px;
            color: var(--alabaster);
        `;

        const toggleLabel = document.createElement('span');
        toggleLabel.textContent = 'Auto-play';
        toggleLabel.style.opacity = '0.8';

        const toggleContainer = document.createElement('label');
        toggleContainer.className = 'toggle-switch';
        toggleContainer.style.cssText = `
            position: relative;
            display: inline-block;
            width: 45px;
            height: 24px;
            cursor: pointer;
        `;

        const toggleInput = document.createElement('input');
        toggleInput.type = 'checkbox';
        toggleInput.checked = this.isAutoPlayEnabled;
        toggleInput.style.cssText = `
            opacity: 0;
            width: 0;
            height: 0;
        `;

        const toggleSlider = document.createElement('span');
        toggleSlider.className = 'toggle-slider';
        toggleSlider.style.cssText = `
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 28, 76, 0.3);
            transition: 0.3s ease;
            border-radius: 24px;
            border: 1px solid rgba(0, 28, 76, 0.4);
            backdrop-filter: blur(10px);
        `;

        const toggleHandle = document.createElement('span');
        toggleHandle.style.cssText = `
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 3px;
            bottom: 2px;
            background: var(--mustard);
            transition: 0.3s ease;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(247, 213, 79, 0.3);
            transform: ${this.isAutoPlayEnabled ? 'translateX(21px)' : 'translateX(0)'};
        `;

        // Update slider appearance based on state
        if (this.isAutoPlayEnabled) {
            toggleSlider.style.background = 'rgba(247, 213, 79, 0.2)';
            toggleSlider.style.borderColor = 'rgba(247, 213, 79, 0.4)';
        }

        toggleSlider.appendChild(toggleHandle);
        toggleContainer.appendChild(toggleInput);
        toggleContainer.appendChild(toggleSlider);

        toggleWrapper.appendChild(toggleLabel);
        toggleWrapper.appendChild(toggleContainer);

        // Add event listener
        toggleInput.addEventListener('change', (e) => {
            this.isAutoPlayEnabled = e.target.checked;

            // Update visual state
            if (this.isAutoPlayEnabled) {
                toggleSlider.style.background = 'rgba(247, 213, 79, 0.2)';
                toggleSlider.style.borderColor = 'rgba(247, 213, 79, 0.4)';
                toggleHandle.style.transform = 'translateX(21px)';
                this.startAutoPlay();
            } else {
                toggleSlider.style.background = 'rgba(0, 28, 76, 0.3)';
                toggleSlider.style.borderColor = 'rgba(0, 28, 76, 0.4)';
                toggleHandle.style.transform = 'translateX(0)';
                this.pauseAutoPlay();
            }
        });

        // Insert before navigation
        navigation.parentNode.insertBefore(toggleWrapper, navigation);
    }

    renderTestimonials() {
        if (this.isTransitioning) return;

        const start = this.currentPage * this.cardsPerPage;
        const end = start + this.cardsPerPage;
        const currentTestimonials = this.testimonials.slice(start, end);

        // Fade out existing cards first
        const existingCards = this.container.querySelectorAll('.testimonial-card');
        if (existingCards.length > 0) {
            this.isTransitioning = true;

            existingCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                }, index * 50);
            });

            // Wait for fade out to complete, then render new cards
            setTimeout(() => {
                this.container.innerHTML = '';
                this.renderNewCards(currentTestimonials);
            }, existingCards.length * 50 + 200);
        } else {
            this.renderNewCards(currentTestimonials);
        }
    }

    renderNewCards(testimonials) {
        testimonials.forEach((testimonial, index) => {
            const card = this.createTestimonialCard(testimonial, index);
            this.container.appendChild(card);
        });

        // Trigger entrance animation with improved timing
        setTimeout(() => {
            const cards = this.container.querySelectorAll('.testimonial-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                    card.classList.add('fade-in');
                }, index * 100);
            });

            // Reset transition flag after all animations complete
            setTimeout(() => {
                this.isTransitioning = false;
            }, cards.length * 100 + 200);
        }, 100);
    }

    createTestimonialCard(testimonial, index) {
        const card = document.createElement('div');
        card.className = 'testimonial-card glass-card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.95)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

        card.innerHTML = `
            <div class="client-photo">
                <div class="client-avatar">
                    <img src="${testimonial.avatar}" alt="${testimonial.name}" loading="lazy">
                </div>
            </div>
            <div class="testimonial-content-wrapper">
                <div class="client-header">
                    <div class="client-info">
                        <h4>${testimonial.name}</h4>
                        <span class="position">${testimonial.position}</span>
                    </div>
                    <div class="rating">
                        ${this.generateStars(testimonial.rating)}
                    </div>
                </div>
                <div class="testimonial-quote">
                    <div class="quote-mark">"</div>
                    <p>${testimonial.content}</p>
                </div>
                <div class="testimonial-footer">
                    <span class="project-type">${testimonial.projectType}</span>
                </div>
            </div>
        `;

        // Add hover effects
        card.addEventListener('mouseenter', () => {
            if (this.isAutoPlayEnabled) {
                this.pauseAutoPlay();
            }
        });

        card.addEventListener('mouseleave', () => {
            if (this.isAutoPlayEnabled) {
                this.startAutoPlay();
            }
        });

        return card;
    }

    generateStars(rating) {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars += '<i class="fas fa-star"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
    }

    renderDots() {
        this.dotsContainer.innerHTML = '';

        for (let i = 0; i < this.totalPages; i++) {
            const dot = document.createElement('div');
            dot.className = `dot ${i === this.currentPage ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToPage(i));
            this.dotsContainer.appendChild(dot);
        }
    }

    bindEvents() {
        this.prevBtn.addEventListener('click', () => {
            if (!this.isTransitioning) {
                this.previousPage();
            }
        });

        this.nextBtn.addEventListener('click', () => {
            if (!this.isTransitioning) {
                this.nextPage();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isTransitioning) {
                if (e.key === 'ArrowLeft') {
                    this.previousPage();
                } else if (e.key === 'ArrowRight') {
                    this.nextPage();
                }
            }
        });
    }

    nextPage() {
        if (this.isTransitioning) return;

        if (this.currentPage < this.totalPages - 1) {
            this.currentPage++;
        } else {
            this.currentPage = 0; // Loop back to first page
        }
        this.updatePage();
    }

    previousPage() {
        if (this.isTransitioning) return;

        if (this.currentPage > 0) {
            this.currentPage--;
        } else {
            this.currentPage = this.totalPages - 1; // Loop to last page
        }
        this.updatePage();
    }

    goToPage(pageIndex) {
        if (this.isTransitioning || pageIndex === this.currentPage) return;

        this.currentPage = pageIndex;
        this.updatePage();
    }

    updatePage() {
        this.renderTestimonials();
        this.updateDots();
        this.updateNavigation();

        if (this.isAutoPlayEnabled) {
            this.restartAutoPlay();
        }
    }

    updateDots() {
        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentPage);
        });
    }

    updateNavigation() {
        // Always enable navigation for infinite loop
        this.prevBtn.disabled = false;
        this.nextBtn.disabled = false;
    }

    startAutoPlay() {
        if (!this.isAutoPlayEnabled) return;

        this.pauseAutoPlay(); // Clear existing interval
        this.autoPlayInterval = setInterval(() => {
            if (!this.isTransitioning) {
                this.nextPage();
            }
        }, this.autoPlayDelay);
    }

    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    restartAutoPlay() {
        if (!this.isAutoPlayEnabled) return;

        this.pauseAutoPlay();
        setTimeout(() => {
            this.startAutoPlay();
        }, 1000); // Wait 1 second before restarting
    }

    addTestimonial(testimonial) {
        testimonial.id = this.testimonials.length + 1;
        this.testimonials.push(testimonial);
        this.totalPages = Math.ceil(this.testimonials.length / this.cardsPerPage);
        this.renderDots();
    }

    removeTestimonial(id) {
        this.testimonials = this.testimonials.filter(t => t.id !== id);
        this.totalPages = Math.ceil(this.testimonials.length / this.cardsPerPage);

        if (this.currentPage >= this.totalPages) {
            this.currentPage = Math.max(0, this.totalPages - 1);
        }

        this.updatePage();
    }

    destroy() {
        this.pauseAutoPlay();
        // Remove event listeners if needed
        const toggleWrapper = document.querySelector('.autoplay-toggle-wrapper');
        if (toggleWrapper) {
            toggleWrapper.remove();
        }
    }
}

// Initialize testimonials when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const testimonialManager = new TestimonialManager();

    // Make it globally accessible for debugging
    window.testimonialManager = testimonialManager;
});

// Optional: Add intersection observer for performance
if ('IntersectionObserver' in window) {
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };

    const testimonialObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe testimonial section when it's created
    document.addEventListener('DOMContentLoaded', () => {
        const testimonialSection = document.querySelector('.testimonials-section');
        if (testimonialSection) {
            testimonialObserver.observe(testimonialSection);
        }
    });
}