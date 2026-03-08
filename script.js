/* ============================================
   RESONANCE — Minimal Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initNavScroll();
    initWaitlistForm();
});

/* --- Scroll Reveal --- */
function initScrollReveal() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

/* --- Nav Background on Scroll --- */
function initNavScroll() {
    const nav = document.getElementById('nav');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                nav.classList.toggle('scrolled', window.scrollY > 60);
                ticking = false;
            });
            ticking = true;
        }
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

/* --- Waitlist Form --- */
function initWaitlistForm() {
    const form = document.getElementById('waitlistForm');
    const success = document.getElementById('successMsg');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const data = {
            name: form.querySelector('[name="name"]').value,
            email: form.querySelector('[name="email"]').value,
            college: form.querySelector('[name="college"]').value,
            timestamp: new Date().toISOString(),
        };

        // Save to localStorage
        const list = JSON.parse(localStorage.getItem('resonance_waitlist') || '[]');
        list.push(data);
        localStorage.setItem('resonance_waitlist', JSON.stringify(list));

        // Update counter
        const counterEl = document.getElementById('counter');
        const count = parseInt(counterEl.textContent.replace(/,/g, '')) + 1;
        counterEl.textContent = count.toLocaleString();

        // Show success
        form.style.display = 'none';
        success.classList.add('show');
    });
}
