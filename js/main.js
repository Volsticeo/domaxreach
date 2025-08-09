// main.js - Main JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('.main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/Show header on scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Active Navigation Link
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // Form Validation and Submission
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Simple validation
            let isValid = true;
            const requiredFields = ['name', 'email', 'message'];

            requiredFields.forEach(field => {
                const input = this.querySelector(`#${field}`);
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff6b6b';
                } else {
                    input.style.borderColor = '';
                }
            });

            // Email validation
            const emailInput = this.querySelector('#email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                isValid = false;
                emailInput.style.borderColor = '#ff6b6b';
            }

            if (isValid) {
                // Show success message
                showFormMessage('success', 'Thank you! Your message has been sent successfully.');

                // Reset form
                this.reset();
            } else {
                showFormMessage('error', 'Please fill in all required fields correctly.');
            }
        });
    }

    // Show form message
    function showFormMessage(type, message) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;

        // Insert after form
        const form = document.querySelector('.contact-form');
        form.appendChild(messageDiv);

        // Remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailRegex.test(emailInput.value)) {
                // Show success feedback
                emailInput.style.borderColor = '#51cf66';
                emailInput.value = '';
                emailInput.placeholder = 'Successfully subscribed!';

                setTimeout(() => {
                    emailInput.placeholder = 'Enter your email';
                    emailInput.style.borderColor = '';
                }, 3000);
            } else {
                emailInput.style.borderColor = '#ff6b6b';
            }
        });
    }

    // Lazy Loading Images
    const images = document.querySelectorAll('img');

    const imageOptions = {
        threshold: 0,
        rootMargin: '0px 0px 50px 0px'
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Add loading class to body after page loads
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});