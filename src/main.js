// Universal OgboBridge App - Works on all pages without modules
class UniversalOgboBridgeApp {
    constructor() {
        this.init();
    }
    
    init() {
        console.log('Universal OgboBridge App Initializing...');
        
        // Initialize all core functionality
        this.initializeMobileNavigation();
        this.initializeSmoothScrolling();
        this.initializeScrollAnimations();
        this.initializeReadMoreButtons();
        this.initializeFAQ();
        this.initializeForms();
        this.initializeHorizontalScrolling();
        
        // Mark as loaded
        document.body.classList.add('ogbobridge-loaded');
        
        console.log('Universal OgboBridge App Initialized');
    }
    
    // Mobile Navigation
    initializeMobileNavigation() {
        const mobileMenuBtn = document.getElementById('ogbobridge-mobileMenuBtn');
        const mainNav = document.getElementById('ogbobridge-mainNav');
        
        if (mobileMenuBtn && mainNav) {
            mobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                mainNav.classList.toggle('ogbobridge-active');
                mobileMenuBtn.classList.toggle('ogbobridge-active');
                
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    if (mainNav.classList.contains('ogbobridge-active')) {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-times');
                    } else {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        }
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mainNav && mainNav.classList.contains('ogbobridge-active') && 
                !mainNav.contains(e.target) && 
                !mobileMenuBtn?.contains(e.target)) {
                mainNav.classList.remove('ogbobridge-active');
                mobileMenuBtn?.classList.remove('ogbobridge-active');
                
                const icon = mobileMenuBtn?.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        // Mobile bottom nav active states
        document.querySelectorAll('.ogbobridge-mobile-nav-item').forEach(item => {
            item.addEventListener('click', function() {
                document.querySelectorAll('.ogbobridge-mobile-nav-item').forEach(i => {
                    i.classList.remove('ogbobridge-active');
                });
                this.classList.add('ogbobridge-active');
            });
        });
    }
    
    // Smooth Scrolling
    initializeSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#') && href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const headerHeight = document.querySelector('.ogbobridge-header')?.offsetHeight || 0;
                        const targetPosition = target.offsetTop - headerHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
    // Scroll Animations
    initializeScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('ogbobridge-animated');
                    // Also add contact-specific animated class
                    if (entry.target.classList.contains('ogbocontact-scroll-animate')) {
                        entry.target.classList.add('ogbocontact-animated');
                    }
                }
            });
        }, { threshold: 0.1 });
        
        // Observe all scroll animate elements
        document.querySelectorAll('.ogbobridge-scroll-animate, .ogbobridge-about-scroll-animate, .ogbocontact-scroll-animate').forEach(el => {
            observer.observe(el);
        });
        
        // Progress line - stops before footer
        const progressLine = document.getElementById('ogbobridge-progressLine');
        const footer = document.querySelector('.ogbobridge-footer');
        
        if (progressLine && footer) {
            window.addEventListener('scroll', () => {
                const scrollPosition = window.scrollY;
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight;
                const footerTop = footer.offsetTop;
                
                // Calculate scroll percentage, but stop before footer
                const maxScroll = footerTop - windowHeight;
                const scrollPercent = (scrollPosition / maxScroll) * 100;
                
                // Only show progress line if we haven't reached the footer
                if (scrollPosition < maxScroll) {
                    progressLine.style.height = `${Math.min(100, scrollPercent)}%`;
                    progressLine.style.opacity = '1';
                } else {
                    progressLine.style.opacity = '0';
                }
            });
        }
        
        // Header shadow on scroll
        const header = document.querySelector('.ogbobridge-header');
        if (header) {
            window.addEventListener('scroll', () => {
                header.style.boxShadow = window.scrollY > 10 ? 
                    '0 5px 20px rgba(0, 0, 0, 0.1)' : 
                    '0 2px 15px rgba(0, 0, 0, 0.08)';
                    
                // Add/remove background when scrolled
                if (window.scrollY > 50) {
                    header.style.background = 'rgba(255, 255, 255, 0.95)';
                    header.style.backdropFilter = 'blur(10px)';
                } else {
                    header.style.background = 'var(--ogbobridge-header-bg)';
                    header.style.backdropFilter = 'none';
                }
            });
        }
    }
    
    // Horizontal Scrolling
    initializeHorizontalScrolling() {
        const scrollContent = document.getElementById('ogbobridge-scrollContent');
        
        if (scrollContent) {
            // Pause on hover
            scrollContent.addEventListener('mouseenter', () => {
                scrollContent.classList.add('ogbobridge-paused');
            });
            
            scrollContent.addEventListener('mouseleave', () => {
                scrollContent.classList.remove('ogbobridge-paused');
            });
        }
    }
    
    // Read More Buttons
    initializeReadMoreButtons() {
        document.querySelectorAll('.ogbobridge-read-more').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const textContainer = this.previousElementSibling;
                
                if (textContainer && textContainer.classList.contains('ogbobridge-story-text')) {
                    // Toggle the expanded class
                    textContainer.classList.toggle('ogbobridge-expanded');
                    this.classList.toggle('ogbobridge-expanded');
                    
                    // Update button text
                    const isExpanded = textContainer.classList.contains('ogbobridge-expanded');
                    if (isExpanded) {
                        this.innerHTML = '<i class="fas fa-chevron-up"></i> Read Less';
                    } else {
                        this.innerHTML = '<i class="fas fa-chevron-down"></i> Read More';
                    }
                }
            });
        });
    }
    
    // FAQ Accordion
    initializeFAQ() {
        const faqItems = document.querySelectorAll('.ogbocontact-faq-item');
        
        if (faqItems.length === 0) {
            console.log('No FAQ items found on this page');
            return;
        }

        faqItems.forEach(item => {
            const question = item.querySelector('.ogbocontact-faq-question');
            if (question) {
                question.addEventListener('click', () => {
                    // Close other items
                    document.querySelectorAll('.ogbocontact-faq-item').forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('ogbocontact-active')) {
                            otherItem.classList.remove('ogbocontact-active');
                            const otherIcon = otherItem.querySelector('.ogbocontact-faq-question i');
                            if (otherIcon) {
                                otherIcon.classList.remove('fa-chevron-up');
                                otherIcon.classList.add('fa-chevron-down');
                            }
                        }
                    });
                    
                    // Toggle current item
                    item.classList.toggle('ogbocontact-active');
                    
                    const icon = question.querySelector('i');
                    if (icon) {
                        icon.classList.toggle('fa-chevron-down');
                        icon.classList.toggle('fa-chevron-up');
                    }
                });
            }
        });
    }
    
    // Form Handling
    initializeForms() {
        document.querySelectorAll('.ogbobridge-contact-form, .ogbocontact-form, .ogbobridge-newsletter-form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(form);
            });
        });
    }
    
    handleFormSubmission(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        // Reset previous error states
        inputs.forEach(input => {
            input.style.borderColor = '';
            const errorMessage = input.parentNode.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
        
        // Validate inputs
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff4757';
                
                // Add error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.style.color = '#ff4757';
                errorMessage.style.fontSize = '12px';
                errorMessage.style.marginTop = '5px';
                errorMessage.textContent = 'This field is required';
                input.parentNode.appendChild(errorMessage);
            }
        });
        
        if (isValid) {
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.style.cssText = `
                    background: #2ecc71;
                    color: white;
                    padding: 15px;
                    border-radius: 8px;
                    margin-top: 20px;
                    text-align: center;
                    animation: fadeIn 0.5s ease;
                `;
                
                successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                
                form.appendChild(successMessage);
                
                // Reset form
                form.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 2000);
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.OgboBridgeApp = new UniversalOgboBridgeApp();
    });
} else {
    window.OgboBridgeApp = new UniversalOgboBridgeApp();
}