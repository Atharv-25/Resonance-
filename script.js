/* ============================================
   RESONANCE — Minimal Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initNavScroll();
    initWaitlistForm();
    initHeroParallax();
    initStaggeredReveals();
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
    const submitBtn = document.getElementById('submitBtn');
    if (!form) return;

    const nameInput = form.querySelector('[name="name"]');
    const emailInput = form.querySelector('[name="email"]');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');

    let isSubmitting = false;

    // Real-time validation on blur
    nameInput.addEventListener('blur', () => validateName());
    emailInput.addEventListener('blur', () => validateEmail());

    // Clear errors on input
    nameInput.addEventListener('input', () => {
        nameInput.classList.remove('input-error');
        nameError.textContent = '';
    });
    emailInput.addEventListener('input', () => {
        emailInput.classList.remove('input-error');
        emailError.textContent = '';
    });

    function validateName() {
        const val = nameInput.value.trim();
        if (!val) {
            nameInput.classList.add('input-error');
            nameInput.classList.remove('input-success');
            nameError.textContent = 'Please enter your name.';
            return false;
        }
        if (val.length < 2) {
            nameInput.classList.add('input-error');
            nameInput.classList.remove('input-success');
            nameError.textContent = 'Name must be at least 2 characters.';
            return false;
        }
        nameInput.classList.remove('input-error');
        nameInput.classList.add('input-success');
        nameError.textContent = '';
        return true;
    }

    function validateEmail() {
        const val = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!val) {
            emailInput.classList.add('input-error');
            emailInput.classList.remove('input-success');
            emailError.textContent = 'Please enter your email.';
            return false;
        }
        if (!emailRegex.test(val)) {
            emailInput.classList.add('input-error');
            emailInput.classList.remove('input-success');
            emailError.textContent = 'Please enter a valid email address.';
            return false;
        }
        emailInput.classList.remove('input-error');
        emailInput.classList.add('input-success');
        emailError.textContent = '';
        return true;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        const nameValid = validateName();
        const emailValid = validateEmail();

        if (!nameValid || !emailValid) return;

        // Set loading state
        isSubmitting = true;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Joining...';

        // Simulate brief delay for UX
        setTimeout(() => {
            const data = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                college: form.querySelector('[name="college"]').value.trim(),
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

            isSubmitting = false;
        }, 600);
    });
}

/* --- Hero Parallax on Scroll --- */
function initHeroParallax() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const heroHeight = window.innerHeight;
                const progress = Math.min(scrollY / heroHeight, 1);

                heroContent.style.opacity = 1 - progress * 0.8;
                heroContent.style.transform = `translateY(${progress * 40}px)`;
                ticking = false;
            });
            ticking = true;
        }
    });
}

/* --- Staggered Reveal Delays --- */
function initStaggeredReveals() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.1}s`;
    });
}
