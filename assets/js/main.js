// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations for elements
    initializeAnimations();
    
    // Add smooth scrolling for anchor links
    initializeSmoothScroll();
    
    // Initialize intersection observer for scroll animations
    initializeScrollAnimations();
});

function initializeAnimations() {
    // Add animation classes to elements when they become visible
    const animatedElements = document.querySelectorAll('.card, .btn, h1, h2, .hero-video');
    animatedElements.forEach(element => {
        element.classList.add('animate-in');
    });
}

function initializeSmoothScroll() {
    // Add smooth scrolling to all anchor links
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
}

function initializeScrollAnimations() {
    // Create intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all sections and cards
    document.querySelectorAll('.section, .card').forEach(element => {
        observer.observe(element);
    });
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const heroPattern = document.querySelector('.hero-pattern');
    if (heroPattern) {
        const scrolled = window.pageYOffset;
        heroPattern.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Simple Modal for Zoho Form
class ZohoFormModal {
    constructor() {
        this.formUrl = 'https://forms.zohopublic.com/talentinthecloud/form/PearWaitingList/formperma/xtmool5P4DRilibwvSXq6OMwLis9gIk1V9uOSW-QInI';
        this.initialize();
    }

    initialize() {
        // Create modal HTML
        const modalHTML = `
            <div class="modal-overlay" id="formModal">
                <div class="modal-container">
                    <button class="modal-close">×</button>
                    <iframe 
                        class="modal-iframe"
                        src="about:blank"
                        loading="lazy">
                    </iframe>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Cache DOM elements
        this.modal = document.getElementById('formModal');
        this.iframe = this.modal.querySelector('iframe');
        this.closeButton = this.modal.querySelector('.modal-close');

        // Add event listeners
        this.addEventListeners();
    }

    addEventListeners() {
        // Handle waiting list button clicks
        document.querySelectorAll('[href="#join-waiting-list"]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal();
            });
        });

        // Close button
        this.closeButton.addEventListener('click', () => this.closeModal());

        // Close on overlay click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    openModal() {
        // Set iframe source
        this.iframe.src = this.formUrl;
        
        // Show modal
        document.body.classList.add('modal-open');
        this.modal.classList.add('active');
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        
        // Reset iframe
        setTimeout(() => {
            this.iframe.src = 'about:blank';
        }, 200);
    }
}

// Initialize modal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.zohoModal = new ZohoFormModal();
});

// Rewards Section Animation
// Rewards Section Animations
class RewardsSection {
    constructor() {
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        // Get elements
        this.progressBar = document.querySelector('.journey-progress');
        this.cards = document.querySelectorAll('.milestone-card');
        this.totalEarnings = document.querySelector('.total-earnings');

        if (this.cards.length > 0) {
            this.setupIntersectionObserver();
        }
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.2,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('milestone-card')) {
                        this.animateCard(entry.target);
                    } else if (entry.target.classList.contains('total-earnings')) {
                        entry.target.classList.add('active');
                    }
                }
            });
        }, options);

        // Observe milestone cards
        this.cards.forEach((card, index) => {
            observer.observe(card);
            card.setAttribute('data-milestone', index + 1);
        });

        // Observe total earnings
        if (this.totalEarnings) {
            observer.observe(this.totalEarnings);
        }
    }

    animateCard(card) {
        // Add active class to card
        card.classList.add('active');

        // Update progress bar
        if (this.progressBar) {
            const milestone = parseInt(card.getAttribute('data-milestone'));
            const progress = (milestone / this.cards.length) * 100;
            this.progressBar.style.width = `${progress}%`;
        }
    }
}

// Initialize rewards section
window.addEventListener('load', () => {
    new RewardsSection();
});


// Hiring Companies Section Animations
class HiringSection {
    constructor() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        this.featureCards = document.querySelectorAll('.feature-card');
        this.statsSection = document.querySelector('.company-stats');

        if (this.featureCards.length > 0 || this.statsSection) {
            this.setupObserver();
        }
    }

    setupObserver() {
        const options = {
            threshold: 0.2,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, options);

        // Observe feature cards
        this.featureCards.forEach(card => observer.observe(card));

        // Observe stats section
        if (this.statsSection) {
            observer.observe(this.statsSection);
        }
    }
}

// Initialize section
new HiringSection();