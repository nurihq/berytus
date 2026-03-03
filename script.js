document.addEventListener("DOMContentLoaded", () => {
    // Theme logic
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    function setTheme(theme) {
        if (theme === 'dark' || (theme === 'system' && prefersDark.matches)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (themeToggle) themeToggle.innerHTML = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            if (themeToggle) themeToggle.innerHTML = '☀️';
        }
    }

    let currentTheme = localStorage.getItem('berytus-theme') || 'system';
    setTheme(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            localStorage.setItem('berytus-theme', currentTheme);
            setTheme(currentTheme);
        });
    }

    prefersDark.addEventListener('change', (e) => {
        if (localStorage.getItem('berytus-theme') === 'system' || !localStorage.getItem('berytus-theme')) {
            setTheme('system');
        }
    });

    // Language logic
    const langSelect = document.getElementById('lang-toggle');
    const elements = document.querySelectorAll('[data-en]');

    let currentLang = localStorage.getItem('berytus-lang') || 'ka';

    if (langSelect) {
        langSelect.value = currentLang;
    }

    function updateLanguage() {
        elements.forEach(el => {
            if (el.hasAttribute(`data-${currentLang}`)) {
                el.textContent = el.getAttribute(`data-${currentLang}`);
            }
        });
        
        if (currentLang === 'lb') {
            document.body.style.fontFamily = "'Noto Kufi Arabic', 'Inter', sans-serif";
            document.body.setAttribute('dir', 'rtl');
        } else {
            document.body.style.fontFamily = "'Inter', sans-serif";
            document.body.removeAttribute('dir');
        }

        localStorage.setItem('berytus-lang', currentLang);
    }

    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            currentLang = e.target.value;
            updateLanguage();
        });
    }

    updateLanguage();

    // 3D Tilt effect
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateY = ((x / rect.width) - 0.5) * 20;
            const rotateX = ((y / rect.height) - 0.5) * -20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
});
