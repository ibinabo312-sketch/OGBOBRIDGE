// main.js - Comprehensive JavaScript for OgboBridge Website

document.addEventListener('DOMContentLoaded', function() {
    // ===== GLOBAL VARIABLES AND CONFIGURATION =====
    const CONFIG = {
        scrollOffset: 0.3,
        animationThreshold: 0.1,
        shakeAnimationDuration: 500
    };

    // ===== CORE INITIALIZATION =====
    function initializeApplication() {
        setupProgressLines();
        setupNavigation();
        setupLanguageSystem();
        setupScrollAnimations();
        setupIconAnimations();
        setupFormHandlers();
        setupFAQSystem();
    }

    // ===== PROGRESS LINE SYSTEM =====
    function setupProgressLines() {
        const progressLines = document.querySelectorAll('.ogbobridge-progress-line, .ogbobridge-about-progress-line, .ogbobridge-blog-progress-line, #services-progress-line');
        
        progressLines.forEach(progressLine => {
            if (isProgressLineNeeded(progressLine)) {
                initializeProgressLine(progressLine);
            } else {
                progressLine.style.display = 'none';
            }
        });
    }

    function isProgressLineNeeded(progressLine) {
        const pageContent = document.querySelector('main, .ogbobridge-hero, .ogbobridge-services, .ogbobridge-about, .ogbobridge-blog-content');
        return pageContent && pageContent.offsetHeight > window.innerHeight * 1.5;
    }

    function initializeProgressLine(progressLine) {
        function updateProgress() {
            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const docHeight = getPageContentHeight();
            
            const scrollPercent = scrollTop / (docHeight - windowHeight);
            const progress = Math.min(100, Math.max(0, scrollPercent * 100));
            
            progressLine.style.height = `${progress}%`;
            progressLine.style.opacity = progress > 0 && progress < 100 ? '1' : '0';
        }

        function getPageContentHeight() {
            const contentSections = document.querySelectorAll('section, main, .ogbobridge-hero, .ogbobridge-services, .ogbobridge-about');
            let maxBottom = 0;
            
            contentSections.forEach(section => {
                const rect = section.getBoundingClientRect();
                maxBottom = Math.max(maxBottom, rect.bottom + window.pageYOffset);
            });
            
            return maxBottom;
        }

        window.addEventListener('scroll', updateProgress);
        window.addEventListener('resize', updateProgress);
        updateProgress();
    }

    // ===== NAVIGATION SYSTEM =====
    function setupNavigation() {
        setupMobileNavigation();
        setupSmoothScrolling();
        setupHeaderEffects();
    }

    function setupMobileNavigation() {
        const mobileMenuBtns = document.querySelectorAll('.ogbobridge-mobile-menu-btn');
        const mainNavs = document.querySelectorAll('.ogbobridge-nav');
        
        mobileMenuBtns.forEach((btn, index) => {
            btn.addEventListener('click', function() {
                const nav = mainNavs[index];
                nav.classList.toggle('ogbobridge-active');
                this.classList.toggle('ogbobridge-active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.ogbobridge-nav') && !e.target.closest('.ogbobridge-mobile-menu-btn')) {
                mainNavs.forEach(nav => nav.classList.remove('ogbobridge-active'));
                mobileMenuBtns.forEach(btn => btn.classList.remove('ogbobridge-active'));
            }
        });
    }

    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
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
    }

    function setupHeaderEffects() {
        const headers = document.querySelectorAll('.ogbobridge-header');
        
        window.addEventListener('scroll', function() {
            headers.forEach(header => {
                if (window.scrollY > 10) {
                    header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
                } else {
                    header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.05)';
                }
            });
        });
    }

    // ===== LANGUAGE SYSTEM =====
    function setupLanguageSystem() {
        const translations = {
            en: {
                // Navigation
                'nav.home': 'Home',
                'nav.services': 'Services',
                'nav.about': 'About',
                'nav.news': 'News',
                'nav.contact': 'Contact Us',
                
                // Hero Sections
                'hero.title': 'OgboBridge: <span>Your Bridge to West African IT Talent</span>',
                'hero.subtitle': 'German project management meets curated tech excellence from Nigeria, delivering scalable, reliable solutions.',
                'hero.cta': 'Discover Talent',
                
                // Features
                'features.title': 'Why Choose OgboBridge?',
                'features.global.title': 'Global Reach',
                'features.global.desc': 'Connect with talent and opportunities from around the world.',
                'features.trusted.title': 'Trusted Partnerships',
                'features.trusted.desc': 'We vet all professionals to ensure quality and reliability.',
                'features.fast.title': 'Fast Matching',
                'features.fast.desc': 'Our AI-powered system quickly matches you with ideal partners.',
                'features.secure.title': 'Secure Platform',
                'features.secure.desc': 'Your data and transactions are protected with enterprise-grade security.',
                'features.support.title': 'Dedicated Support',
                'features.support.desc': 'Our team is always available to assist with any challenges.',
                
                // Services
                'services.title': 'Our Services',
                'services.subtitle': 'Streamlined solutions that bridge German businesses with West African IT excellence',
                'services.talent.title': 'Talent Placement',
                'services.talent.desc': 'We connect you with pre-vetted, highly skilled IT professionals from West Africa.',
                'services.project.title': 'Project Management',
                'services.project.desc': 'German-led project management ensures seamless integration and delivery.',
                'services.quality.title': 'Quality Screening',
                'services.quality.desc': 'Rigorous vetting process ensures only top-tier talent with verified skills.',
                'services.learn': 'Learn more',
                
                // Add all other translation keys from your HTML files...
            },
            de: {
                // Navigation
                'nav.home': 'Startseite',
                'nav.services': 'Dienstleistungen',
                'nav.about': 'Über uns',
                'nav.news': 'Nachrichten',
                'nav.contact': 'Kontakt',
                
                // Hero Sections
                'hero.title': 'OgboBridge: <span>Ihre Brücke zu westafrikanischen IT-Talenten</span>',
                'hero.subtitle': 'Deutsches Projektmanagement trifft auf kuratierte Tech-Exzellenz aus Nigeria, liefert skalierbare, zuverlässige Lösungen.',
                'hero.cta': 'Talent entdecken',
                
                // Features
                'features.title': 'Warum OgboBridge wählen?',
                'features.global.title': 'Globale Reichweite',
                'features.global.desc': 'Verbinden Sie sich mit Talenten und Möglichkeiten aus der ganzen Welt.',
                'features.trusted.title': 'Vertrauenswürdige Partnerschaften',
                'features.trusted.desc': 'Wir prüfen alle Fachkräfte, um Qualität und Zuverlässigkeit zu gewährleisten.',
                'features.fast.title': 'Schnelle Vermittlung',
                'features.fast.desc': 'Unser KI-gestütztes System bringt Sie schnell mit idealen Partnern zusammen.',
                'features.secure.title': 'Sichere Plattform',
                'features.secure.desc': 'Ihre Daten und Transaktionen sind mit Enterprise-Grade-Sicherheit geschützt.',
                'features.support.title': 'Engagierte Unterstützung',
                'features.support.desc': 'Unser Team steht Ihnen jederzeit zur Verfügung, um bei allen Herausforderungen zu helfen.',
                
                // Services
                'services.title': 'Unsere Dienstleistungen',
                'services.subtitle': 'Streamlined-Lösungen, die deutsche Unternehmen mit westafrikanischer IT-Exzellenz verbinden',
                'services.talent.title': 'Talentvermittlung',
                'services.talent.desc': 'Wir verbinden Sie mit geprüften, hochqualifizierten IT-Fachkräften aus Westafrika.',
                'services.project.title': 'Projektmanagement',
                'services.project.desc': 'Deutsches Projektmanagement gewährleistet nahtlose Integration und Lieferung.',
                'services.quality.title': 'Qualitätsprüfung',
                'services.quality.desc': 'Rigoroses Prüfverfahren stellt sicher, dass nur Top-Talente mit verifizierten Fähigkeiten vermittelt werden.',
                'services.learn': 'Mehr erfahren',
                
                // Add all other German translations...
            }
        };

        let currentLang = localStorage.getItem('ogbobridge_language') || 'en';

        function setLanguage(lang) {
            currentLang = lang;
            localStorage.setItem('ogbobridge_language', lang);
            
            // Update text content
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (translations[lang] && translations[lang][key]) {
                    element.textContent = translations[lang][key];
                }
            });
            
            // Update HTML content
            document.querySelectorAll('[data-i18n-html]').forEach(element => {
                const key = element.getAttribute('data-i18n-html');
                if (translations[lang] && translations[lang][key]) {
                    element.innerHTML = translations[lang][key];
                }
            });
            
            // Update language displays
            updateLanguageDisplays(lang);
            triggerIconShake();
        }

        function updateLanguageDisplays(lang) {
            const displays = document.querySelectorAll('#ogbobridge-currentLanguage, #ogbobridge-mobileCurrentLanguage, #services-current-language, #services-mobile-current-language');
            displays.forEach(display => {
                display.textContent = lang === 'en' ? 'EN' : 'DE';
            });

            // Update active language options
            document.querySelectorAll('.ogbobridge-language-option, .ogbobridge-mobile-language-option').forEach(option => {
                if (option.getAttribute('data-lang') === lang) {
                    option.classList.add('ogbobridge-active');
                } else {
                    option.classList.remove('ogbobridge-active');
                }
            });
        }

        // Initialize language functionality
        function initLanguageSystem() {
            // Set initial language
            setLanguage(currentLang);
            
            // Desktop language toggle
            document.querySelectorAll('.ogbobridge-language-btn, #services-language-toggle').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const dropdown = this.nextElementSibling;
                    if (dropdown) dropdown.classList.toggle('ogbobridge-active');
                });
            });
            
            // Mobile language toggle
            document.querySelectorAll('.ogbobridge-mobile-language-btn, #services-mobile-language-toggle').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const dropdown = this.nextElementSibling;
                    if (dropdown) dropdown.classList.toggle('ogbobridge-active');
                });
            });
            
            // Language option selection
            document.querySelectorAll('.ogbobridge-language-option, .ogbobridge-mobile-language-option').forEach(option => {
                option.addEventListener('click', function() {
                    const lang = this.getAttribute('data-lang');
                    setLanguage(lang);
                    
                    // Close all dropdowns
                    document.querySelectorAll('.ogbobridge-language-dropdown, .ogbobridge-mobile-language-dropdown').forEach(dropdown => {
                        dropdown.classList.remove('ogbobridge-active');
                    });
                });
            });
            
            // Close dropdowns when clicking outside
            document.addEventListener('click', function() {
                document.querySelectorAll('.ogbobridge-language-dropdown, .ogbobridge-mobile-language-dropdown').forEach(dropdown => {
                    dropdown.classList.remove('ogbobridge-active');
                });
            });
        }

        initLanguageSystem();
    }

    // ===== SCROLL ANIMATION SYSTEM =====
    function setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.ogbobridge-scroll-animate, .services-scroll-animate, .ogbobridge-about-scroll-animate, .ogbobridge-blog-scroll-animate, .ogbocontact-scroll-animate');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('ogbobridge-animated');
                    
                    // Trigger icon shake when element comes into view
                    const icons = entry.target.querySelectorAll('i');
                    triggerShakeAnimation(icons);
                }
            });
        }, {
            threshold: CONFIG.animationThreshold,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // ===== ICON ANIMATION SYSTEM =====
    function setupIconAnimations() {
        // Initial icon shake on page load
        setTimeout(triggerIconShake, 1000);
        
        // Icon shake on language change is handled in setLanguage function
    }

    function triggerIconShake() {
        const allIcons = document.querySelectorAll('i.fas, i.fab, i.far');
        triggerShakeAnimation(allIcons);
    }

    function triggerShakeAnimation(icons) {
        icons.forEach(icon => {
            // Remove existing shake classes
            icon.classList.remove('ogbobridge-icon-shake', 'ogbobridge-blog-icon-shake');
            
            // Force reflow
            void icon.offsetWidth;
            
            // Add appropriate shake class based on context
            if (icon.closest('.ogbobridge-blog-hero, .ogbobridge-blog-content, .ogbobridge-blog-newsletter')) {
                icon.classList.add('ogbobridge-blog-icon-shake');
            } else {
                icon.classList.add('ogbobridge-icon-shake');
            }
        });
    }

    // ===== FORM HANDLING SYSTEM =====
    function setupFormHandlers() {
        setupContactForms();
        setupNewsletterForms();
    }

    function setupContactForms() {
        document.querySelectorAll('.ogbocontact-form, .ogbobridge-contact-form').forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Basic validation
                const requiredFields = this.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.style.borderColor = 'red';
                    } else {
                        field.style.borderColor = '';
                    }
                });
                
                if (isValid) {
                    // Simulate form submission
                    const submitBtn = this.querySelector('button[type="submit"]');
                    const originalText = submitBtn.innerHTML;
                    
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                    submitBtn.disabled = true;
                    
                    setTimeout(() => {
                        alert('Thank you for your message! We will get back to you soon.');
                        this.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 2000);
                }
            });
        });
    }

    function setupNewsletterForms() {
        document.querySelectorAll('.ogbobridge-newsletter-form, .ogbobridge-blog-newsletter-form').forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const emailInput = this.querySelector('input[type="email"]');
                
                if (emailInput.value) {
                    // Simulate subscription
                    emailInput.value = '';
                    alert('Thank you for subscribing to our newsletter!');
                }
            });
        });
    }

    // ===== FAQ SYSTEM =====
    function setupFAQSystem() {
        document.querySelectorAll('.ogbocontact-faq-item').forEach(item => {
            const question = item.querySelector('.ogbocontact-faq-question');
            
            question.addEventListener('click', () => {
                // Close all other items
                document.querySelectorAll('.ogbocontact-faq-item').forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('ogbocontact-active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('ogbocontact-active');
            });
        });
    }

    // ===== SERVICE-SPECIFIC INITIALIZATIONS =====
    function setupServiceSpecificFeatures() {
        // Service page interactions
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // Service link smooth scrolling
        document.querySelectorAll('.service-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ===== PERFORMANCE OPTIMIZATIONS =====
    function setupPerformanceOptimizations() {
        // Throttle scroll events [citation:5]
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(function() {
                    scrollTimeout = null;
                    // Handle scroll-based updates here
                }, 10);
            }
        });

        // Prevent layout shifts by ensuring consistent scrollbar [citation:1]
        function preventLayoutShift() {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            if (scrollbarWidth) {
                document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
            }
        }

        preventLayoutShift();
        window.addEventListener('resize', preventLayoutShift);
    }

    // ===== INITIALIZE EVERYTHING =====
    initializeApplication();
    setupServiceSpecificFeatures();
    setupPerformanceOptimizations();

    // Re-initialize when navigating back (for single-page app behavior)
    window.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            initializeApplication();
        }
    });
});

// Additional CSS that should be added to maintain animations
const additionalStyles = `
/* Progress Line Styles */
.ogbobridge-progress-line,
.ogbobridge-about-progress-line,
.ogbobridge-blog-progress-line {
    position: fixed;
    top: 0;
    right: 0;
    width: 4px;
    background: linear-gradient(to bottom, #667eea, #764ba2);
    z-index: 1000;
    transition: height 0.1s ease, opacity 0.3s ease;
}

/* Icon Shake Animations */
.ogbobridge-icon-shake {
    animation: ogbobridgeShake 0.5s ease-in-out;
}

.ogbobridge-blog-icon-shake {
    animation: ogbobridgeBlogShake 0.5s ease-in-out;
}

@keyframes ogbobridgeShake {
    0%, 100% { transform: translateX(0) rotate(0deg); }
    25% { transform: translateX(-2px) rotate(-5deg); }
    75% { transform: translateX(2px) rotate(5deg); }
}

@keyframes ogbobridgeBlogShake {
    0%, 100% { transform: scale(1) rotate(0deg); }
    50% { transform: scale(1.1) rotate(10deg); }
}

/* Scroll Animation Base */
.ogbobridge-scroll-animate,
.services-scroll-animate,
.ogbobridge-about-scroll-animate,
.ogbobridge-blog-scroll-animate,
.ogbocontact-scroll-animate {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.ogbobridge-animated {
    opacity: 1;
    transform: translateY(0);
}

/* Mobile Navigation */
.ogbobridge-nav {
    transition: transform 0.3s ease;
}

@media (max-width: 768px) {
    .ogbobridge-nav:not(.ogbobridge-active) {
        transform: translateX(100%);
    }
}

/* Language Dropdown */
.ogbobridge-language-dropdown,
.ogbobridge-mobile-language-dropdown {
    display: none;
}

.ogbobridge-language-dropdown.ogbobridge-active,
.ogbobridge-mobile-language-dropdown.ogbobridge-active {
    display: block;
}

/* FAQ Animations */
.ogbocontact-faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
}

.ogbocontact-faq-item.ogbocontact-active .ogbocontact-faq-answer {
    max-height: 500px;
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);