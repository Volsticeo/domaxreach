// testimonials.js - Complete Animation System

document.addEventListener('DOMContentLoaded', function() {

    // Testimonial Data
    const testimonialData = {
        0: {
            quote: "DoMaxReach transformed our social media presence completely. Our engagement rates tripled within just 3 months! Their creative approach and data-driven strategies exceeded all our expectations.",
            name: "Sarah Johnson",
            position: "CEO, Fashion Forward",
            company: "Fashion Industry",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
            metrics: [
                { value: "250%", label: "Engagement" },
                { value: "3M", label: "Reach" },
                { value: "180%", label: "Growth" }
            ]
        },
        1: {
            quote: "The creative team at DoMaxReach is phenomenal. They brought our vision to life in ways we never imagined possible. The attention to detail and innovative approach set them apart from everyone else in the industry.",
            name: "Michael Chen",
            position: "Founder, TechStart",
            company: "Tech Industry",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            metrics: [
                { value: "400%", label: "Revenue" },
                { value: "2.5M", label: "Users" },
                { value: "95%", label: "Retention" }
            ]
        },
        2: {
            quote: "ROI increased by 300% after implementing their digital marketing strategies. Best investment we've made! Their data-driven approach and creative campaigns delivered results beyond our wildest expectations.",
            name: "Emily Rodriguez",
            position: "Marketing Director, E-Shop Pro",
            company: "E-commerce",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
            metrics: [
                { value: "300%", label: "ROI" },
                { value: "1.8M", label: "Sales" },
                { value: "65%", label: "Conversion" }
            ]
        },
        3: {
            quote: "Exceptional service and results that speak for themselves. DoMaxReach doesn't just deliver campaigns, they deliver transformation. Our brand visibility and customer engagement reached new heights with their expertise.",
            name: "David Park",
            position: "Brand Manager, Luxury Living",
            company: "Lifestyle Brand",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
            metrics: [
                { value: "500%", label: "Visibility" },
                { value: "4.2M", label: "Impressions" },
                { value: "85%", label: "Engagement" }
            ]
        }
    };

    // DOM Elements
    const testimonialMain = document.querySelector('.testimonial-main');
    const testimonialPreviews = document.querySelectorAll('.testimonial-preview');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    const statNumbers = document.querySelectorAll('.testimonial-stats .stat-number');

    let currentTestimonial = 0;
    let isTransitioning = false;
    let autoPlayInterval;

    // Initialize testimonials
    function initTestimonials() {
        updateMainTestimonial(0);
        startAutoPlay();
        animateStatsOnScroll();
    }

    // Update main testimonial content
    function updateMainTestimonial(index, animate = true) {
        if (isTransitioning) return;

        const data = testimonialData[index];
        if (!data) return;

        isTransitioning = true;

        if (animate) {
            // Slide out animation
            testimonialMain.classList.add('slide-out');

            setTimeout(() => {
                updateContent(data);
                testimonialMain.classList.remove('slide-out');
                testimonialMain.classList.add('slide-in');

                setTimeout(() => {
                    testimonialMain.classList.remove('slide-in');
                    isTransitioning = false;
                }, 400);
            }, 400);
        } else {
            updateContent(data);
            isTransitioning = false;
        }

        // Update indicators
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });

        currentTestimonial = index;
    }

    // Update testimonial content
    function updateContent(data) {
        // Update quote
        const quote = testimonialMain.querySelector('.testimonial-quote');
        quote.textContent = data.quote;

        // Update author info
        const authorImg = testimonialMain.querySelector('.author-avatar img');
        const authorName = testimonialMain.querySelector('.author-name');
        const authorPosition = testimonialMain.querySelector('.author-position');
        const companyBadge = testimonialMain.querySelector('.company-badge span');

        authorImg.src = data.avatar;
        authorImg.alt = data.name;
        authorName.textContent = data.name;
        authorPosition.textContent = data.position;
        companyBadge.textContent = data.company;

        // Update metrics with animation
        const metricItems = testimonialMain.querySelectorAll('.metric-item');
        metricItems.forEach((item, i) => {
            if (data.metrics[i]) {
                const valueEl = item.querySelector('.metric-value');
                const labelEl = item.querySelector('.metric-label');

                // Animate metric change
                valueEl.style.transform = 'scale(0.8)';
                valueEl.style.opacity = '0';

                setTimeout(() => {
                    valueEl.textContent = data.metrics[i].value;
                    labelEl.textContent = data.metrics[i].label;
                    valueEl.style.transform = 'scale(1)';
                    valueEl.style.opacity = '1';
                }, 200);
            }
        });

        // Trigger star animation
        triggerStarAnimation();
    }

    // Navigate to next testimonial
    function nextTestimonial() {
        const next = (currentTestimonial + 1) % Object.keys(testimonialData).length;
        updateMainTestimonial(next);
        resetAutoPlay();
    }

    // Navigate to previous testimonial
    function prevTestimonial() {
        const prev = (currentTestimonial - 1 + Object.keys(testimonialData).length) % Object.keys(testimonialData).length;
        updateMainTestimonial(prev);
        resetAutoPlay();
    }

    // Trigger star twinkling animation
    function triggerStarAnimation() {
        const stars = testimonialMain.querySelectorAll('.stars-rating i');
        stars.forEach((star, index) => {
            star.style.animation = 'none';
            setTimeout(() => {
                star.style.animation = `starTwinkle 2s ease-in-out infinite`;
                star.style.animationDelay = `${index * 0.2}s`;
            }, index * 100);
        });
    }

    // Auto-play functionality
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextTestimonial, 6000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Event Listeners
    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        prevTestimonial();
    });

    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        nextTestimonial();
    });

    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function(e) {
            e.preventDefault();
            if (index !== currentTestimonial && !isTransitioning) {
                updateMainTestimonial(index);
                resetAutoPlay();
            }
        });
    });

    // Preview card clicks
    testimonialPreviews.forEach((preview, index) => {
        preview.addEventListener('click', function(e) {
            e.preventDefault();
            const testimonialIndex = parseInt(this.dataset.testimonial);
            if (testimonialIndex !== currentTestimonial && !isTransitioning) {
                updateMainTestimonial(testimonialIndex);
                resetAutoPlay();
            }
        });

        // Hover effects
        preview.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(15px) scale(1.02)';
        });

        preview.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });

    // Pause auto-play on hover
    const testimonialSection = document.querySelector('.testimonials-section');
    testimonialSection.addEventListener('mouseenter', stopAutoPlay);
    testimonialSection.addEventListener('mouseleave', startAutoPlay);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (document.activeElement.closest('.testimonials-section')) {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    prevTestimonial();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    nextTestimonial();
                    break;
                case ' ':
                    e.preventDefault();
                    nextTestimonial();
                    break;
            }
        }
    });

    // Animate statistics numbers on scroll
    function animateStatsOnScroll() {
        const statsSection = document.querySelector('.testimonial-stats');
        if (!statsSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStatNumbers();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // Animate stat numbers counting up
    function animateStatNumbers() {
        const statNumbers = document.querySelectorAll('.testimonial-stats .stat-number');

        statNumbers.forEach(stat => {
            const finalValue = stat.textContent;
            const numValue = parseFloat(finalValue);
            const suffix = finalValue.replace(/[\d.]/g, '');

            if (isNaN(numValue)) return;

            stat.textContent = '0';
            animateCounter(stat, numValue, suffix, 2000);
        });
    }

    // Counter animation utility
    function animateCounter(element, target, suffix = '', duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            if (suffix.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else if (suffix.includes('M')) {
                element.textContent = (current / 1000000).toFixed(1) + 'M';
            } else if (suffix.includes('K')) {
                element.textContent = (current / 1000).toFixed(0) + 'K';
            } else if (suffix.includes('+')) {
                element.textContent = Math.floor(current) + '+';
            } else {
                element.textContent = current.toFixed(1);
            }
        }, 16);
    }

    // Intersection Observer for testimonial reveal
    function setupRevealAnimation() {
        const revealElements = document.querySelectorAll('.testimonial-main, .testimonial-preview, .testimonial-stats');

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);

                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // Magnetic effect for buttons
    function addMagneticEffect() {
        const magneticElements = document.querySelectorAll('.testimonial-nav, .indicator');

        magneticElements.forEach(element => {
            element.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            element.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

    // Touch/Swipe support for mobile
    function addTouchSupport() {
        let touchStartX = 0;
        let touchEndX = 0;

        testimonialMain.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });

        testimonialMain.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextTestimonial(); // Swipe left - next
                } else {
                    prevTestimonial(); // Swipe right - prev
                }
            }
        }
    }

    // Initialize everything
    initTestimonials();
    setupRevealAnimation();
    addMagneticEffect();
    addTouchSupport();

    // Smooth parallax effect for background orbs
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.testimonial-orb');

        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });

        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Performance optimization - pause animations when not visible
    const testimonialObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAutoPlay();
            } else {
                stopAutoPlay();
            }
        });
    });

    if (testimonialSection) {
        testimonialObserver.observe(testimonialSection);
    }
});