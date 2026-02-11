// Contact form functionality (for contact.html)
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Form validation
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validation
            let isValid = true;
            let errorMessage = '';
            
            // Name validation
            if (name.length < 2) {
                isValid = false;
                errorMessage += 'Nama harus minimal 2 karakter.\n';
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                isValid = false;
                errorMessage += 'Email tidak valid.\n';
            }
            
            // Message validation
            if (message.length < 10) {
                isValid = false;
                errorMessage += 'Pesan harus minimal 10 karakter.\n';
            }
            
            if (!isValid) {
                alert('Harap perbaiki kesalahan berikut:\n\n' + errorMessage);
                return;
            }
            
            // If validation passes, show success message
            showFormSuccess(name, email);
        });
        
        // Real-time validation
        const formInputs = contactForm.querySelectorAll('.form-input');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
});

// Validate individual form field
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    if (field.id === 'name') {
        if (value.length < 2) {
            isValid = false;
            errorMessage = 'Nama harus minimal 2 karakter';
        }
    } else if (field.id === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Email tidak valid';
        }
    } else if (field.id === 'message') {
        if (value.length < 10) {
            isValid = false;
            errorMessage = 'Pesan harus minimal 10 karakter';
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

// Show error for a specific field
function showFieldError(field, message) {
    // Remove any existing error
    clearFieldError(field);
    
    // Add error class to field
    field.classList.add('error');
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#ff6b6b';
    errorElement.style.fontSize = '0.9rem';
    errorElement.style.marginTop = '0.3rem';
    
    // Insert after the field
    field.parentNode.appendChild(errorElement);
}

// Clear error from a field
function clearFieldError(field) {
    field.classList.remove('error');
    
    // Remove any existing error message
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Show form submission success
function showFormSuccess(name, email) {
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.innerHTML = `
        <div style="
            background-color: rgba(37, 211, 102, 0.1);
            border: 1px solid rgba(37, 211, 102, 0.3);
            border-radius: 10px;
            padding: 1.5rem;
            margin-top: 1.5rem;
            text-align: center;
        ">
            <i class="fas fa-check-circle" style="color: #25d366; font-size: 2rem; margin-bottom: 1rem;"></i>
            <h3 style="color: #25d366; margin-bottom: 0.5rem;">Pesan Terkirim!</h3>
            <p>Terima kasih <strong>${name}</strong>! Pesan Anda telah dikirim.</p>
            <p>Admin akan menghubungi Anda melalui email (<strong>${email}</strong>) segera.</p>
            <p style="margin-top: 1rem; font-size: 0.9rem;">Untuk pertanyaan mendesak, hubungi admin melalui WhatsApp.</p>
        </div>
    `;
    
    // Insert after the form
    const contactForm = document.getElementById('contactForm');
    contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
    
    // Reset form
    contactForm.reset();
    
    // Scroll to success message
    setTimeout(() => {
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
    
    // Remove success message after 10 seconds
    setTimeout(() => {
        if (successMessage.parentNode) {
            successMessage.remove();
        }
    }, 10000);
}