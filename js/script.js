// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle - Hanya aktif di mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinksContainer = document.getElementById('nav-links');
    const body = document.body;
    
    if (mobileMenuBtn && navLinksContainer) {
        // Cek jika layar mobile (lebar kurang dari 768px)
        function isMobile() {
            return window.innerWidth <= 767;
        }
        
        // Tampilkan/sembunyikan tombol menu berdasarkan ukuran layar
        function updateMenuButtonVisibility() {
            if (isMobile()) {
                mobileMenuBtn.style.display = 'flex';
                // Tutup menu saat beralih ke mobile
                navLinksContainer.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            } else {
                mobileMenuBtn.style.display = 'none';
                // Pastikan menu terbuka saat di desktop
                navLinksContainer.classList.add('active');
            }
        }
        
        // Panggil saat pertama kali load
        updateMenuButtonVisibility();
        
        // Update saat resize window
        window.addEventListener('resize', updateMenuButtonVisibility);
        
        // Mobile menu toggle handler
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (!isMobile()) return; // Hanya aktif di mobile
            
            // Toggle mobile menu
            navLinksContainer.classList.toggle('active');
            
            // Toggle icon
            if (navLinksContainer.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!isMobile()) return; // Hanya aktif di mobile
            
            if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-btn')) {
                navLinksContainer.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Close mobile menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (!isMobile()) return; // Hanya aktif di mobile
                
                navLinksContainer.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (!isMobile()) return; // Hanya aktif di mobile
            
            if (e.key === 'Escape') {
                navLinksContainer.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Animate stat numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        statNumbers.forEach(stat => {
            const text = stat.textContent;
            const target = parseInt(text.replace('+', ''));
            let current = 0;
            const increment = target / 30;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            }, 50);
        });
    }
    
    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Harap isi semua field yang diperlukan!');
                return;
            }
            
            // Email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Harap masukkan alamat email yang valid!');
                return;
            }
            
            // Show success message
            alert(`Terima kasih ${name}! Pesan Anda telah dikirim. Admin akan menghubungi Anda melalui email (${email}) segera.`);
            
            // Reset form
            contactForm.reset();
        });
    }
});

// Initialize when page loads
window.addEventListener('load', function() {
    console.log('Evemon SMP Website loaded successfully!');
    
    // Add hover effect to cards
    const cards = document.querySelectorAll('.feature-card, .community-card, .staff-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// ... kode yang sudah ada ...

// Fungsi untuk copy IP (fallback jika file copy-ip.js tidak ada)
function copyServerIP() {
    const ipAddress = 'evemonxamica.raznar.net:25067';
    
    navigator.clipboard.writeText(ipAddress).then(function() {
        console.log('IP copied to clipboard:', ipAddress);
        return true;
    }).catch(function(err) {
        console.error('Failed to copy IP:', err);
        
        // Fallback method
        const textArea = document.createElement('textarea');
        textArea.value = ipAddress;
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            return successful;
        } catch (err) {
            console.error('Fallback copy failed:', err);
            document.body.removeChild(textArea);
            return false;
        }
    });
}


// JavaScript untuk scroll effect pada navbar mobile
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    if (navbar && window.innerWidth <= 767) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 60) {
                navbar.classList.remove('scrolled');
                navbar.style.backdropFilter = 'blur(25px) saturate(180%)';
            } else {
                navbar.classList.add('scrolled');
                navbar.style.backdropFilter = 'blur(30px) saturate(200%)';
            }
            
            lastScroll = currentScroll;
        });
    }
});