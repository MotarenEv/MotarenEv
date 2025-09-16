// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact page functionality
    initializeContactForm();
    initializeFAQ();
    initializeQuickActions();
});

// Contact Form Functionality
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateContactForm(form)) {
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        
        try {
            // Simulate form submission (replace with actual API call)
            await submitContactForm(form);
            
            // Show success message
            showSuccessMessage('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.');
            
            // Reset form
            form.reset();
            
        } catch (error) {
            // Show error message
            showErrorMessage('Sorry, there was an error sending your message. Please try again or contact us directly.');
            console.error('Form submission error:', error);
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

// Form Validation
function validateContactForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    // Name validation
    if (field.name === 'name' && value) {
        if (value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long';
        }
    }
    
    // Message validation
    if (field.name === 'message' && value) {
        if (value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long';
        }
    }
    
    // Update field appearance
    if (isValid) {
        field.classList.remove('error');
        field.classList.add('success');
        removeFieldError(field);
    } else {
        field.classList.remove('success');
        field.classList.add('error');
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    removeFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #ef4444;
        font-size: 0.85rem;
        margin-top: 0.25rem;
        animation: slideDown 0.3s ease;
    `;
    
    field.parentNode.appendChild(errorDiv);
}

function removeFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Simulate form submission
async function submitContactForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate random success/failure for demo
    if (Math.random() > 0.1) { // 90% success rate
        console.log('Form submitted successfully:', data);
        return Promise.resolve();
    } else {
        return Promise.reject(new Error('Simulated network error'));
    }
}

// Success/Error Messages
function showSuccessMessage(message) {
    const existingMessage = document.querySelector('.success-message, .error-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message show';
    messageDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        ${message}
    `;
    
    const form = document.getElementById('contactForm');
    form.insertBefore(messageDiv, form.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function showErrorMessage(message) {
    const existingMessage = document.querySelector('.success-message, .error-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'error-message show';
    messageDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        ${message}
    `;
    
    const form = document.getElementById('contactForm');
    form.insertBefore(messageDiv, form.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// FAQ Functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// Quick Actions Functionality
function initializeQuickActions() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const action = this.querySelector('span').textContent.toLowerCase();
            
            switch(action) {
                case 'book test ride':
                    handleTestRideBooking();
                    break;
                case 'download brochure':
                    handleBrochureDownload();
                    break;
                case 'find dealer':
                    handleDealerSearch();
                    break;
                case 'live chat':
                    handleLiveChat();
                    break;
                default:
                    console.log('Action not implemented:', action);
            }
        });
    });
}

// Quick Action Handlers
function handleTestRideBooking() {
    // Scroll to contact form and pre-fill subject
    const subjectSelect = document.getElementById('subject');
    if (subjectSelect) {
        subjectSelect.value = 'test-ride';
        subjectSelect.scrollIntoView({ behavior: 'smooth' });
        
        // Show notification
        showNotification('Test ride booking form is ready! Please fill in your details below.');
    }
}

function handleBrochureDownload() {
    // Simulate brochure download
    showNotification('Downloading brochure... This may take a moment.');
    
    setTimeout(() => {
        showNotification('Brochure downloaded successfully! Check your downloads folder.');
    }, 2000);
}

function handleDealerSearch() {
    // Simulate dealer search
    showNotification('Finding nearest dealers...');
    
    setTimeout(() => {
        showNotification('Found 5 dealers near you! Check the map section for locations.');
    }, 1500);
}

function handleLiveChat() {
    // Simulate live chat
    showNotification('Connecting to live chat...');
    
    setTimeout(() => {
        showNotification('Live chat is currently offline. Please use the contact form or call us directly.');
    }, 1000);
}

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <span>${message}</span>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #2563eb;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Add notification animation styles
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .notification {
        animation: slideInRight 0.3s ease;
    }
`;
document.head.appendChild(notificationStyle);

// Phone number formatting
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length >= 10) {
        value = value.substring(0, 10);
        value = value.replace(/(\d{5})(\d{5})/, '$1 $2');
    }
    
    input.value = value;
}

// Add phone formatting to phone input
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }
});

// Form auto-save functionality
function autoSaveForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        // Load saved data
        const savedValue = localStorage.getItem(`contact_${input.name}`);
        if (savedValue && !input.value) {
            input.value = savedValue;
        }
        
        // Save data on input
        input.addEventListener('input', function() {
            localStorage.setItem(`contact_${this.name}`, this.value);
        });
    });
}

// Clear saved form data on successful submission
function clearSavedFormData() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        localStorage.removeItem(`contact_${input.name}`);
    });
}

// Initialize auto-save
document.addEventListener('DOMContentLoaded', function() {
    autoSaveForm();
});

// Update clear function to be called on successful form submission
const originalShowSuccessMessage = showSuccessMessage;
showSuccessMessage = function(message) {
    clearSavedFormData();
    originalShowSuccessMessage(message);
};

// Smooth scroll for anchor links
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

// Add loading animation for better UX
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);

