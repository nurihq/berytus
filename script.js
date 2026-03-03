document.addEventListener("DOMContentLoaded", () => {
    const langBtn = document.getElementById('lang-toggle');
    const elements = document.querySelectorAll('[data-en]');

    let currentLang = localStorage.getItem('berytus-lang') || 'ka'; // Default to Georgian

    function updateLanguage() {
        // Update button text to show the target language flag
        langBtn.textContent = currentLang === 'en' ? '🇬🇪' : '🇺🇸';

        // Update elements with text
        elements.forEach(el => {
            if (el.hasAttribute(`data-${currentLang}`)) {
                el.textContent = el.getAttribute(`data-${currentLang}`);
            }
        });

        localStorage.setItem('berytus-lang', currentLang);
    }

    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ka' : 'en';
        updateLanguage();
    });

    updateLanguage();

    // 3D Tilt effect for glassmorphism cards
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.

            // Calculate rotation
            const rotateY = ((x / rect.width) - 0.5) * 20; // Max rotation 10deg
            const rotateX = ((y / rect.height) - 0.5) * -20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
});
