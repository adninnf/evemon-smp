// music.js - Background Music Control (Simplified)
document.addEventListener('DOMContentLoaded', function() {
    // Buat elemen audio jika belum ada
    let audio = document.getElementById('background-music');
    
    if (!audio) {
        audio = document.createElement('audio');
        audio.id = 'background-music';
        audio.loop = true;
        audio.autoplay = false;
        audio.style.display = 'none';
        
        const source = document.createElement('source');
        source.src = 'music/background-music.mp3';
        source.type = 'audio/mpeg';
        
        audio.appendChild(source);
        document.body.appendChild(audio);
    }
    
    // Cari atau buat tombol musik
    let toggleButton = document.getElementById('music-toggle');
    
    if (!toggleButton) {
        // Cari navbar
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            const musicItem = document.createElement('li');
            musicItem.className = 'music-toggle-item';
            
            toggleButton = document.createElement('button');
            toggleButton.id = 'music-toggle';
            toggleButton.className = 'music-toggle-btn';
            toggleButton.title = 'Click to Play/Pause Music';
            toggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
            
            musicItem.appendChild(toggleButton);
            navLinks.appendChild(musicItem);
        }
    }
    
    // Jika masih tidak ada tombol, keluar
    if (!toggleButton) return;
    
    const icon = toggleButton.querySelector('i');
    
    // Load state dari localStorage
    let musicState = JSON.parse(localStorage.getItem('musicState')) || {
        playing: false,
        volume: 0.5  // Volume tetap ada tapi tidak ada kontrol mute
    };
    
    // Set volume awal
    audio.volume = musicState.volume;
    
    // Update icon berdasarkan state
    function updateIcon() {
        if (musicState.playing) {
            icon.className = 'fas fa-volume-up';
            icon.style.color = 'var(--primary-color)';
            toggleButton.classList.add('playing');
        } else {
            icon.className = 'fas fa-volume-mute';
            icon.style.color = '';
            toggleButton.classList.remove('playing');
        }
    }
    
    // Fungsi untuk play/pause saja
    function toggleMusic() {
        if (musicState.playing) {
            audio.pause();
            musicState.playing = false;
        } else {
            audio.play().then(() => {
                musicState.playing = true;
                saveState();
                updateIcon();
            }).catch(error => {
                console.log('Autoplay blocked:', error);
                // Jika autoplay diblokir, minta interaksi user
                musicState.playing = false;
                saveState();
                updateIcon();
                // Tampilkan toast atau feedback
                showMusicToast('Click again to play music');
            });
        }
        saveState();
        updateIcon();
    }
    
    // Toast notification sederhana
    function showMusicToast(message) {
        const toast = document.createElement('div');
        toast.className = 'music-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(15, 25, 45, 0.9);
            backdrop-filter: blur(10px);
            color: white;
            padding: 10px 20px;
            border-radius: 8px;
            border: 1px solid var(--border-color);
            z-index: 1000;
            font-size: 0.9rem;
            animation: fadeInOut 2s ease-in-out;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 2000);
    }
    
    // Tambahkan style untuk toast animation
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
                20% { opacity: 1; transform: translateX(-50%) translateY(0); }
                80% { opacity: 1; transform: translateX(-50%) translateY(0); }
                100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Simpan state ke localStorage
    function saveState() {
        localStorage.setItem('musicState', JSON.stringify(musicState));
    }
    
    // Inisialisasi
    function initMusic() {
        updateIcon();
        
        // Coba resume musik jika sebelumnya sedang play
        if (musicState.playing) {
            audio.play().catch(error => {
                console.log('Could not autoplay:', error);
                musicState.playing = false;
                saveState();
                updateIcon();
            });
        }
    }
    
    // Event listener untuk click saja
    toggleButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMusic();
    });
    
    // Volume control dengan wheel (opsional, bisa dihapus)
    toggleButton.addEventListener('wheel', function(e) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.05 : 0.05;
        musicState.volume = Math.max(0.1, Math.min(1, musicState.volume + delta));
        audio.volume = musicState.volume;
        saveState();
        
        // Feedback visual
        toggleButton.style.transform = 'scale(1.05)';
        setTimeout(() => {
            toggleButton.style.transform = '';
        }, 150);
    });
    
    // Simpan state ketika tab/window ditutup
    window.addEventListener('beforeunload', function() {
        musicState.playing = !audio.paused;
        saveState();
    });
    
    // Handle page visibility change (tab switch) - lebih sederhana
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && musicState.playing) {
            audio.pause();
        } else if (!document.hidden && musicState.playing) {
            audio.play().catch(error => {
                console.log('Could not resume:', error);
            });
        }
    });
    
    // Inisialisasi
    initMusic();
    
    // Debug info
    console.log('Simple music player initialized. State:', musicState);
});