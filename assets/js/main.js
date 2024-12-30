// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations for elements
    initializeAnimations();

    // Add smooth scrolling for anchor links
    initializeSmoothScroll();

    // Initialize intersection observer for scroll animations
    initializeScrollAnimations();
});

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
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

// Class to Handle Modal Logic
class ZohoFormModal {
    constructor(formUrl, triggerSelector, modalId) {
        this.formUrl = formUrl;
        this.triggerSelector = triggerSelector;
        this.modalId = modalId;
        this.initialize();
        this.preloadForm();
    }

    initialize() {
        const modalHTML = `
            <div class="modal-overlay" id="${this.modalId}">
                <div class="modal-container">
                    <button class="modal-close">×</button>
                    <iframe 
                        class="modal-iframe"
                        src="about:blank"
                        loading="eager">
                    </iframe>
                </div>
            </div>
            <iframe 
                id="preloadFrame-${this.modalId}"
                src="${this.formUrl}"
                style="position: absolute; width: 0; height: 0; border: 0; visibility: hidden;"
                loading="eager">
            </iframe>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        this.modal = document.getElementById(this.modalId);
        this.iframe = this.modal.querySelector('iframe');
        this.closeButton = this.modal.querySelector('.modal-close');
        this.preloadFrame = document.getElementById(`preloadFrame-${this.modalId}`);

        this.addEventListeners();
    }

    preloadForm() {
        // The preload frame is already loading the form
        this.preloadFrame.addEventListener('load', () => {
            console.log(`Form preloaded for modal ${this.modalId}`);
        });
    }

    addEventListeners() {
        document.querySelectorAll(this.triggerSelector).forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal();
            });
        });

        this.closeButton.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    openModal() {
        // Use the preloaded form content
        if (this.preloadFrame.contentWindow) {
            this.iframe.src = this.formUrl;
            document.body.classList.add('modal-open');
            this.modal.classList.add('active');
        }
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.classList.remove('modal-open');

        setTimeout(() => {
            this.iframe.src = 'about:blank';
        }, 200);
    }
}

// Initialize modals for both primary and secondary buttons
document.addEventListener('DOMContentLoaded', () => {
    // Modal for the primary button
    new ZohoFormModal(
        'https://forms.zohopublic.com/talentinthecloud/form/PearWaitingList/formperma/xtmool5P4DRilibwvSXq6OMwLis9gIk1V9uOSW-QInI',
        '.btn-primary',
        'formModal-primary'
    );

    // Modal for the secondary button
    new ZohoFormModal(
        'https://forms.zohopublic.com/talentinthecloud/form/CompanyWaitList/formperma/h3YTORD3JfEZAsixG2XZJG1DBPK8LInUOILd1iY_okA',
        '.btn-secondary',
        'formModal-secondary'
    );
});

// Rewards Section Animation
class RewardsSection {
    constructor() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
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

        this.cards.forEach((card, index) => {
            observer.observe(card);
            card.setAttribute('data-milestone', index + 1);
        });

        if (this.totalEarnings) {
            observer.observe(this.totalEarnings);
        }
    }

    animateCard(card) {
        card.classList.add('active');

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

        this.featureCards.forEach(card => observer.observe(card));

        if (this.statsSection) {
            observer.observe(this.statsSection);
        }
    }
}

// Initialize section
new HiringSection();

// Feather icons rendering
document.addEventListener('DOMContentLoaded', () => {
    feather.replace();
});