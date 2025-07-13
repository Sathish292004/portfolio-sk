// Initialize EmailJS
(function() {
    emailjs.init("qZIYhXxrpZsJvqR3G"); // Your EmailJS public key
})();

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
});

// Navigation scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Mobile menu toggle (basic implementation)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    // This is a basic implementation - you might want to enhance this
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
}

// Toast notification system
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const submitLoader = document.getElementById('submitLoader');
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
        showToast('Please fill in all required fields.', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    submitText.style.display = 'none';
    submitLoader.style.display = 'flex';
    
    try {
        const result = await emailjs.send(
            'service_t6r1q71', // Your EmailJS service ID
            'template_oqenx3n', // Your EmailJS template ID
            {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                to_email: 'Sathishsince2004@gmail.com'
            }
        );
        
        if (result.status === 200) {
            showToast("Your message has been sent successfully. I'll get back to you soon!", 'success');
            
            // Reset form
            document.getElementById('contactForm').reset();
        }
    } catch (error) {
        console.error('EmailJS error:', error);
        showToast('Failed to send message. Please try again or contact me directly.', 'error');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitText.style.display = 'inline';
        submitLoader.style.display = 'none';
        
        // Re-initialize Lucide icons for the loader icon
        lucide.createIcons();
    }
});

// Intersection Observer for animations (optional enhancement)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add animation classes to elements when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to cards
    const cards = document.querySelectorAll('.card, .skill-card, .service-card, .project-card, .experience-card, .contact-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Add active navigation highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary) !important;
        font-weight: 500;
    }
`;
document.head.appendChild(style);