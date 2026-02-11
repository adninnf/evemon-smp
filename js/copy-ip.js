// Fungsi untuk menyalin IP ke clipboard
document.addEventListener('DOMContentLoaded', function() {
    const serverIp = 'evemonxamica.raznar.net:25067';
    const copyIpBtn = document.getElementById('copy-ip-btn');
    const playNowBtn = document.getElementById('play-now-btn');
    const copyStatus = document.getElementById('copy-status');
    const serverIpElement = document.getElementById('server-ip');
    
    // Fungsi untuk menyalin teks ke clipboard
    function copyToClipboard(text) {
        return new Promise((resolve, reject) => {
            // Coba menggunakan Clipboard API modern
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text)
                    .then(() => resolve(true))
                    .catch(() => {
                        // Fallback untuk browser lama
                        fallbackCopyText(text) ? resolve(true) : reject(false);
                    });
            } else {
                // Gunakan fallback
                fallbackCopyText(text) ? resolve(true) : reject(false);
            }
        });
    }
    
    // Fallback method untuk browser lama
    function fallbackCopyText(text) {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            return successful;
        } catch (err) {
            console.error('Fallback copy failed:', err);
            return false;
        }
    }
    
    // Fungsi untuk menampilkan status copy
    function showCopyStatus(message, isSuccess = true) {
        if (!copyStatus) return;
        
        copyStatus.textContent = message;
        copyStatus.className = 'copy-status ' + (isSuccess ? 'success' : 'error');
        
        // Reset status setelah 3 detik
        setTimeout(() => {
            copyStatus.textContent = '';
            copyStatus.className = 'copy-status';
        }, 3000);
    }
    
    // Fungsi untuk memberikan feedback visual saat copy
    function animateCopyButton(button, isSuccess = true) {
        if (!button) return;
        
        const originalHTML = button.innerHTML;
        const originalColor = button.style.color;
        
        if (isSuccess) {
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.style.color = '#00ff88';
            button.style.backgroundColor = 'rgba(0, 255, 136, 0.2)';
            button.style.borderColor = 'rgba(0, 255, 136, 0.4)';
        } else {
            button.innerHTML = '<i class="fas fa-times"></i>';
            button.style.color = '#ff5555';
            button.style.backgroundColor = 'rgba(255, 85, 85, 0.2)';
            button.style.borderColor = 'rgba(255, 85, 85, 0.4)';
        }
        
        // Kembalikan ke state semula setelah 1.5 detik
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.color = originalColor;
            button.style.backgroundColor = '';
            button.style.borderColor = '';
        }, 1500);
    }
    
    // Event listener untuk tombol copy IP
    if (copyIpBtn) {
        copyIpBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            copyToClipboard(serverIp)
                .then(() => {
                    showCopyStatus('IP berhasil disalin!', true);
                    animateCopyButton(copyIpBtn, true);
                    
                    // Tambahkan efek pada teks IP
                    if (serverIpElement) {
                        serverIpElement.style.color = '#00ff88';
                        setTimeout(() => {
                            serverIpElement.style.color = '';
                        }, 1000);
                    }
                })
                .catch(() => {
                    showCopyStatus('Gagal menyalin IP', false);
                    animateCopyButton(copyIpBtn, false);
                });
        });
    }
    
    // Event listener untuk tombol Play Now
    if (playNowBtn) {
        playNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            copyToClipboard(serverIp)
                .then(() => {
                    showCopyStatus('IP berhasil disalin ke clipboard!', true);
                    
                    // Animasi tombol Play Now
                    const originalText = playNowBtn.innerHTML;
                    playNowBtn.innerHTML = '<i class="fas fa-check"></i> IP Disalin!';
                    playNowBtn.style.backgroundColor = 'rgba(0, 255, 136, 0.3)';
                    playNowBtn.style.borderColor = 'rgba(0, 255, 136, 0.5)';
                    
                    // Kembalikan ke state semula setelah 2 detik
                    setTimeout(() => {
                        playNowBtn.innerHTML = originalText;
                        playNowBtn.style.backgroundColor = '';
                        playNowBtn.style.borderColor = '';
                    }, 2000);
                    
                    // Tambahkan efek klik yang menarik
                    playNowBtn.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        playNowBtn.style.transform = '';
                    }, 200);
                })
                .catch(() => {
                    showCopyStatus('Gagal menyalin IP', false);
                    
                    // Animasi error
                    playNowBtn.style.backgroundColor = 'rgba(255, 85, 85, 0.3)';
                    playNowBtn.style.borderColor = 'rgba(255, 85, 85, 0.5)';
                    
                    setTimeout(() => {
                        playNowBtn.style.backgroundColor = '';
                        playNowBtn.style.borderColor = '';
                    }, 2000);
                });
        });
    }
    
    // Tambahkan efek hover pada IP untuk menunjukkan bisa diklik
    if (serverIpElement) {
        serverIpElement.style.cursor = 'pointer';
        serverIpElement.title = 'Klik untuk menyalin IP';
        
        serverIpElement.addEventListener('click', function(e) {
            if (e.target !== copyIpBtn) {
                copyIpBtn.click();
            }
        });
        
        // Efek hover
        serverIpElement.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
        });
        
        serverIpElement.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    }
    
    // Tambahkan tooltip untuk tombol copy
    if (copyIpBtn) {
        copyIpBtn.title = 'Salin IP Server';
        
        // Animasi halus untuk menarik perhatian saat pertama kali load
        setTimeout(() => {
            copyIpBtn.style.transform = 'scale(1.1)';
            copyIpBtn.style.boxShadow = '0 0 15px rgba(64, 156, 255, 0.5)';
            
            setTimeout(() => {
                copyIpBtn.style.transform = '';
                copyIpBtn.style.boxShadow = '';
            }, 1000);
        }, 2000);
    }
});