// Blokir klik kanan
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Blokir Ctrl+U, Ctrl+S, Ctrl+Shift+I, F12
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        return false;
    }
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
        e.preventDefault();
        return false;
    }
});

// Blokir drag image
document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

function showAlert(message) {
    // Hapus alert sebelumnya
    const oldAlert = document.querySelector('.protection-alert');
    if (oldAlert) oldAlert.remove();
    
    // Buat alert baru
    const alert = document.createElement('div');
    alert.className = 'protection-alert';
    alert.innerHTML = message;
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff4757, #ff3838);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 99999;
        font-family: 'Poppins', sans-serif;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
        border-left: 5px solid white;
    `;
    
    // Tambahkan style animasi
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 3000);
}