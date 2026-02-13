/* ===== MOBILE NAVIGATION ===== */
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        
        // Add animation class
        if (navMenu.classList.contains('active')) {
            navMenu.style.animation = 'slideInRight 0.4s ease';
        }
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Calculate scroll position with header offset
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                // Scroll to section
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after a short delay to allow scroll to start
                setTimeout(() => {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }, 300);
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
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
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add hover effect for mobile menu
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Header scroll effect
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Add background to header on scroll
        if (scrollTop > 50) {
            header.style.background = 'rgba(255, 253, 247, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 253, 247, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
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
    
    // FAQ Accordion - Complete Solution
document.addEventListener('DOMContentLoaded', function() {
    // Get all FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Check if FAQ items exist
    if (faqItems.length === 0) {
        console.log('❌ No FAQ items found');
        return;
    }
    
    console.log(`✅ Found ${faqItems.length} FAQ items`);
    
    // Add click event to each FAQ question
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        
        if (!question) {
            console.log(`❌ No question found for item ${index + 1}`);
            return;
        }
        
        // Add click event listener
        question.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log(`🔍 FAQ ${index + 1} clicked`);
            
            // Close all other FAQ items
            faqItems.forEach((otherItem, otherIndex) => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    console.log(`🔍 Closed FAQ ${otherIndex + 1}`);
                }
            });
            
            // Toggle current item
            const isActive = item.classList.contains('active');
            item.classList.toggle('active');
            
            console.log(`🔍 FAQ ${index + 1} is now ${isActive ? 'closed' : 'open'}`);
        });
        
        // Add keyboard support
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
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
    
    console.log('✅ FAQ accordion setup complete!');
});
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
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
        // You can change this to true when deploying to a real web server
        const useWhatsApp = true; // Set to false when you have a real web server
        
        if (isWebServer && !useWhatsApp) {
            // Try FormSubmit.co first (works on web servers)
            console.log('=== FORM SUBMISSION DEBUG ===');
            console.log('Submitting to:', contactForm.action);
            console.log('Form data:', Object.fromEntries(formData));
            console.log('Current URL:', window.location.href);
            
            // Submit to FormSubmit.co
            contactForm.submit();
            
            // Show success message after submission
            setTimeout(() => {
                // Simple success message instead of missing function
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
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .review-card, .about-content, .contact-content');
    animatedElements.forEach(el => observer.observe(el));
    
    // Click-to-call functionality enhancement
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track phone clicks (you can add analytics here)
            console.log('Phone link clicked:', this.href);
        });
    });
    
    // WhatsApp click tracking
    const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me/"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track WhatsApp clicks
            console.log('WhatsApp link clicked:', this.href);
        });
    });
    
    // Directions link tracking
    const directionsLinks = document.querySelectorAll('.directions-link');
    directionsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track directions clicks
            console.log('Directions link clicked');
        });
    });
    
    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
    
    // Simulate loading Google Business photos
    setTimeout(() => {
        const imageContainer = document.querySelector('.hero-image .image-container');
        if (imageContainer) {
            imageContainer.style.opacity = '1';
            imageContainer.style.transform = 'translateY(0)';
        }
    }, 500);
    
    // JustDial link handling (placeholder - replace with actual JustDial URL)
    const justDialLink = document.getElementById('justDialLink');
    const justDialSocial = document.getElementById('justDialSocial');
    
    // Replace with your actual JustDial business URL
    const justDialBusinessUrl = "https://www.justdial.com/Pathankot/Mahajan-God-Idols-Dresses-Stitchingvastra-And-Kids-Tuition-Centre/9999PX186-X186-250906003901-H6Y4_BZDET";
    
    if (justDialLink) {
        justDialLink.href = justDialBusinessUrl;
        justDialLink.addEventListener('click', function(e) {
            // Track JustDial clicks
            console.log('JustDial link clicked');
            // You can add analytics tracking here
        });
    }
    
    if (justDialSocial) {
        justDialSocial.href = justDialBusinessUrl;
        justDialSocial.addEventListener('click', function(e) {
            // Track JustDial social clicks
            console.log('JustDial social link clicked');
        });
    }
    
    console.log('🕉️ Mahajan Vastra website loaded successfully!');
    console.log('📱 Mobile navigation ready');
    console.log('📞 Click-to-call functionality active');
    console.log('💬 WhatsApp integration ready');
    console.log('🗺️ Directions functionality active');
    console.log('🏪 JustDial integration ready (placeholder URL)');
    
    // Image Popup Modal
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalDirection = document.getElementById('modalDirection');
    const closeModal = document.querySelector('.close-modal');
    
    // Gallery image click handlers
    function setupGalleryClicks() {
        console.log('Setting up gallery clicks...');
        
        document.querySelectorAll('.gallery-item img, .gallery-item-horizontal img').forEach(img => {
            console.log('Found gallery image:', img.src);
            img.style.cursor = 'pointer';
            img.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Gallery image clicked!', this.src);
                openImageModal(this);
            });
        });
        
        // Also try broader selector
        document.querySelectorAll('img[data-title]').forEach(img => {
            console.log('Found image with data-title:', img.src);
            img.style.cursor = 'pointer';
            img.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Data-title image clicked!', this.src);
                openImageModal(this);
            });
        });
    }
    
    // Setup clicks immediately
    setupGalleryClicks();
    
    // Also setup after a delay to ensure all images are loaded
    setTimeout(setupGalleryClicks, 500);
    setTimeout(setupGalleryClicks, 1000);
    setTimeout(setupGalleryClicks, 2000);
    
    function openImageModal(imgElement) {
        // Get data attributes
        const title = imgElement.dataset.title || imgElement.alt;
        const link = imgElement.dataset.link || '#';
        
        // Set modal content
        modalImage.src = imgElement.src;
        modalImage.alt = imgElement.alt;
        modalTitle.textContent = title;
        modalDescription.textContent = `Beautiful vastra from ${title}`;
        
        // Set directions button link and label
        const modalDirectionText = document.getElementById('modalDirectionText');
        if (link && link !== '#') {
            modalDirection.href = link;
            modalDirection.style.display = 'inline-flex';
            if (modalDirectionText) {
                modalDirectionText.textContent = (link.indexOf('maps.google') !== -1 || link.indexOf('google.com/maps') !== -1) ? 'Get Directions' : 'View location';
            }
        } else {
            modalDirection.href = '#';
            modalDirection.style.display = 'none';
        }
        
        // Show modal
        imageModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal handlers
    closeModal.addEventListener('click', function() {
        imageModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            imageModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            imageModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});
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
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}
