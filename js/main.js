/* ===== MOBILE NAVIGATION ===== */
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navBackdrop = document.getElementById('nav-backdrop');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');
    
    function openMenu() {
        navMenu.classList.add('active');
        navToggle.classList.add('active');
        if (navBackdrop) navBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        if (navBackdrop) navBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }
    navToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        if (navMenu.classList.contains('active')) closeMenu();
        else openMenu();
    });
    if (navBackdrop) navBackdrop.addEventListener('click', closeMenu);
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (!href || href === '#' || href.charAt(0) !== '#') return;
            e.preventDefault();
            var targetId = href.substring(1);
            var targetSection = document.getElementById(targetId);
            closeMenu();
            if (targetSection) {
                var headerHeight = header ? header.offsetHeight : 0;
                var targetPosition = targetSection.offsetTop - headerHeight;
                requestAnimationFrame(function() {
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                });
            }
        });
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // Header always visible (no hide on scroll). On desktop, lighten background on scroll; on mobile keep gradient so hamburger stays visible.
    window.addEventListener('scroll', function() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (window.innerWidth > 768) {
            if (scrollTop > 50) {
                header.style.background = 'rgba(255, 253, 247, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.background = 'rgba(255, 253, 247, 0.95)';
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            }
        } else {
            header.style.boxShadow = scrollTop > 50 ? '0 2px 20px rgba(0,0,0,0.1)' : '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqItems.length === 0) {
        // No FAQ items found
        return;
    }
    
    // Add click event listeners to FAQ questions
    faqQuestions.forEach((question, index) => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const icon = this.querySelector('i');
            
            if (!faqAnswer) {
                return;
            }
            
            // Close all other FAQ items
            faqItems.forEach((otherItem, otherIndex) => {
                if (otherIndex !== index) {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.faq-question i');
                    
                    if (otherAnswer && otherIcon) {
                        otherItem.classList.remove('active');
                        otherAnswer.style.maxHeight = '0';
                        otherAnswer.style.opacity = '0';
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                }
            });
            
            // Toggle current FAQ item
            faqItem.classList.toggle('active');
            
            if (faqItem.classList.contains('active')) {
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
                faqAnswer.style.opacity = '1';
                icon.style.transform = 'rotate(180deg)';
            } else {
                faqAnswer.style.maxHeight = '0';
                faqAnswer.style.opacity = '0';
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // Update aria-expanded when active class changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                const question = target.querySelector('.faq-question');
                if (question) {
                    const isActive = target.classList.contains('active');
                    question.setAttribute('aria-expanded', isActive);
                }
            }
        });
    });
    
    // Observe all FAQ items for class changes
    faqItems.forEach(item => {
        observer.observe(item, { attributes: true });
    });
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const service = formData.get('service');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !phone || !service) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Phone number validation (Indian format)
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
                alert('Please enter a valid Indian phone number.');
                return;
            }
            
            // Get submit button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Check if running on a web server (not file:// protocol)
            const isWebServer = window.location.protocol !== 'file:';
            
            // Always use WhatsApp for now since FormSubmit.co requires server setup
            const useWhatsApp = true;
            
            if (isWebServer && !useWhatsApp) {
                // Try FormSubmit.co first (works on web servers)
                contactForm.submit();
                
                // Show success message after submission
                setTimeout(() => {
                    alert('Thank you for your inquiry! We will contact you soon. Jai Shree Krishna! 🕉️');
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
                
            } else {
                // Use WhatsApp backup (works when opening HTML files directly)
                setTimeout(() => {
                    // Create WhatsApp message
                    const whatsappMessage = `Hello Mahajan Vastra,\n\n` +
                        `Name: ${name}\n` +
                        `Phone: ${phone}\n` +
                        `Service: ${service}\n` +
                        `Message: ${message || 'No additional message'}\n\n` +
                        `Please contact me regarding vastra stitching services.`;
                    
                    // Open WhatsApp with pre-filled message
                    const whatsappUrl = `https://wa.me/919888823840?text=${encodeURIComponent(whatsappMessage)}`;
                    window.open(whatsappUrl, '_blank');
                    
                    // Reset form and button
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    alert('Thank you for your inquiry! We have opened WhatsApp for you to send your message directly.');
                }, 2000);
            }
        });
    }
});

// Parallax Scrolling Effect
document.addEventListener('DOMContentLoaded', function() {
    const parallaxContainer = document.querySelector('.parallax-container');
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    if (parallaxContainer && parallaxLayers.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxLayers.forEach((layer, index) => {
                const speed = layer.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                layer.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
});

// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    // Gallery image click handlers
    function setupGalleryClicks() {
        document.querySelectorAll('.gallery-item img, .gallery-item-horizontal img').forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openImageModal(this);
            });
        });
        
        // Also try broader selector
        document.querySelectorAll('img[data-title]').forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openImageModal(this);
            });
        });
    }
    
    // Setup clicks immediately
    setupGalleryClicks();
    
    // Also setup after a delay to ensure all images are loaded
    setTimeout(setupGalleryClicks, 500);
});

// Image modal functionality
function openImageModal(img) {
    const modal = document.getElementById('imageModal');
    if (!modal) return;
    
    const modalImg = document.getElementById('modalImage');
    const caption = document.getElementById('modalCaption');
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    if (modalImg) modalImg.src = img.src;
    if (caption) caption.textContent = img.alt || img.getAttribute('data-title') || '';
}

// Close modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (modal) {
        // Close on X button click
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
        
        // Close on backdrop click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// JustDial link handling (placeholder - replace with actual JustDial URL)
const justDialLink = document.getElementById('justDialLink');
const justDialSocial = document.getElementById('justDialSocial');

// Replace with your actual JustDial business URL
const justDialBusinessUrl = "https://www.justdial.com/Pathankot/Mahajan-God-Idols-Dresses-Stitchingvastra-And-Kids-Tuition-Centre/9999PX186-X186-250906003901-H6Y4_BZDET";

if (justDialLink) {
    justDialLink.href = justDialBusinessUrl;
    justDialLink.addEventListener('click', function(e) {
        // Track JustDial clicks
        // You can add analytics tracking here
    });
}

// Utility functions
function formatPhoneNumber(phone) {
    // Remove all non-digits
    const cleaned = phone.replace(/\D/g, '');
    
    // Handle Indian phone numbers
    if (cleaned.length === 10) {
        return `+91${cleaned}`;
    } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
        return `+${cleaned}`;
    }
    
    return cleaned;
}

function validatePhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return /^[6-9]\d{9}$/.test(cleaned);
}

function createWhatsAppMessage(data) {
    return `Hello Mahajan Vastra,\n\n` +
        `Name: ${data.name}\n` +
        `Phone: ${data.phone}\n` +
        `Service: ${data.service}\n` +
        `Message: ${data.message || 'No additional message'}\n\n` +
        `Please contact me regarding vastra stitching services.`;
}

// Service worker registration (for PWA functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                // ServiceWorker registration successful
            })
            .catch(function(err) {
                // ServiceWorker registration failed
            });
    });
}
