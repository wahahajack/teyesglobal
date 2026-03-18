(() => {
    const root = document.documentElement;
    const themeBtn = document.getElementById('theme-toggle');
    const heroPricingBtn = document.getElementById('hero-pricing-cta');
    const thumbCta = document.querySelector('.thumb-cta');
    const form = document.getElementById('wholesale-form');
    const submitBtn = document.getElementById('form-btn');
    const errMsg = document.getElementById('form-error');
    const okMsg = document.getElementById('form-success');
    const emailInput = form?.querySelector('input[name="user_email"]');
    const countryInput = form?.querySelector('input[name="country"]');
    const countryOptions = Array.from(document.querySelectorAll('#country-list option')).map((option) => option.value);
    const countrySet = new Set(countryOptions.map((value) => value.toLowerCase()));
    const emailFieldError = document.getElementById('email-field-error');
    const countryFieldError = document.getElementById('country-field-error');
    const quantityFieldError = document.getElementById('quantity-field-error');

    const showFieldError = (input, errorEl, msg) => {
        input?.classList.add('is-invalid');
        if (errorEl) { errorEl.textContent = msg; errorEl.hidden = false; }
    };

    const clearFieldError = (input, errorEl) => {
        input?.classList.remove('is-invalid');
        if (errorEl) { errorEl.hidden = true; errorEl.textContent = ''; }
    };

    const initTheme = () => {
        const saved = localStorage.getItem('theme');
        root.setAttribute('data-theme', saved || 'dark');
    };

    const toggleTheme = () => {
        const current = root.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    };

    initTheme();
    themeBtn?.addEventListener('click', toggleTheme);

    const initMobileStickyCta = () => {
        if (!heroPricingBtn || !thumbCta) return;

        const isMobile = () => window.matchMedia('(max-width: 767px)').matches;
        const isInViewport = (el, bottomOffset = 0) => {
            if (!el) return false;
            const rect = el.getBoundingClientRect();
            return rect.bottom > 0 && rect.top < (window.innerHeight - bottomOffset);
        };

        const syncStickyCta = () => {
            if (!isMobile()) {
                thumbCta.classList.remove('is-visible', 'wa-only');
                return;
            }

            const heroCtaInView = isInViewport(heroPricingBtn);
            const formCtaInView = isInViewport(submitBtn, 96);
            const shouldShowSticky = !heroCtaInView;

            thumbCta.classList.toggle('is-visible', shouldShowSticky);
            thumbCta.classList.toggle('wa-only', shouldShowSticky && formCtaInView);
        };

        let ticking = false;
        const queueSync = () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(() => {
                syncStickyCta();
                ticking = false;
            });
        };

        window.addEventListener('scroll', queueSync, { passive: true });
        window.addEventListener('resize', queueSync);
        window.addEventListener('orientationchange', queueSync);
        syncStickyCta();
    };

    initMobileStickyCta();

    const initImageLightbox = () => {
        const images = document.querySelectorAll('.hero-media img, .visual-photo img');
        if (!images.length) return;

        images.forEach((img) => {
            img.classList.add('zoomable-image');
            img.setAttribute('role', 'button');
            img.setAttribute('tabindex', '0');
            img.setAttribute('aria-label', 'Open image preview');
        });

        const lightbox = document.createElement('div');
        lightbox.className = 'image-lightbox';
        lightbox.setAttribute('aria-hidden', 'true');

        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'image-lightbox-close';
        closeBtn.setAttribute('aria-label', 'Close image preview');
        closeBtn.textContent = '×';

        const preview = document.createElement('img');
        preview.alt = '';

        lightbox.append(closeBtn, preview);
        document.body.appendChild(lightbox);

        const close = () => {
            lightbox.classList.remove('is-open');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('lightbox-open');
            preview.removeAttribute('src');
        };

        const open = (img) => {
            preview.src = img.currentSrc || img.src;
            preview.alt = img.alt || '';
            lightbox.classList.add('is-open');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.classList.add('lightbox-open');
        };

        images.forEach((img) => {
            img.addEventListener('click', () => open(img));
            img.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    open(img);
                }
            });
        });

        closeBtn.addEventListener('click', close);
        lightbox.addEventListener('click', (event) => {
            if (event.target === lightbox) close();
        });
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && lightbox.classList.contains('is-open')) close();
        });
    };

    initImageLightbox();

    const EMAILJS_PUBLIC_KEY = 'r4hPxgrdEnnONhc9E';
    const EMAILJS_SERVICE_ID = 'service_p161z11';
    const EMAILJS_TEMPLATE_ID = 'template_at1z02w';

    if (window.emailjs) {
        window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }

    emailInput?.addEventListener('input', () => {
        clearFieldError(emailInput, emailFieldError);
        errMsg.hidden = true;
    });

    countryInput?.addEventListener('input', () => {
        clearFieldError(countryInput, countryFieldError);
        errMsg.hidden = true;
    });

    // Detect user's country on page load
    const detectAndSetCountry = async () => {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            const userCountry = data.country_name;
            
            // Check if detected country matches our list
            if (userCountry && countrySet.has(userCountry.toLowerCase())) {
                countryInput.value = userCountry;
                countryInput.setAttribute('data-detected', 'true');
            }
        } catch (e) {
            // Silently fail - user can manual enter country
        }
    };

    if (countryInput) {
        detectAndSetCountry();
    }

    form?.querySelector('select[name="estimated_quantity"]')?.addEventListener('change', () => {
        clearFieldError(form.estimated_quantity, quantityFieldError);
        errMsg.hidden = true;
    });

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!form) return;

        clearFieldError(emailInput, emailFieldError);
        clearFieldError(countryInput, countryFieldError);
        clearFieldError(form.estimated_quantity, quantityFieldError);
        errMsg.hidden = true;
        okMsg.hidden = true;

        const honeypot = form.website?.value?.trim();
        if (honeypot) return;

        const email = form.user_email?.value?.trim();
        const country = form.country?.value?.trim();
        const estimatedQuantity = form.estimated_quantity?.value?.trim();
        const emailField = form.user_email;

        let hasErrors = false;
        if (!email) {
            showFieldError(emailField, emailFieldError, 'Business email is required.');
            hasErrors = true;
        } else if (!emailField?.validity.valid) {
            showFieldError(emailField, emailFieldError, 'Please enter a valid business email, e.g. name@company.com');
            hasErrors = true;
        }
        if (!country) {
            showFieldError(countryInput, countryFieldError, 'Country is required.');
            hasErrors = true;
        }
        if (!estimatedQuantity) {
            showFieldError(form.estimated_quantity, quantityFieldError, 'Please select an option.');
            hasErrors = true;
        }
        if (hasErrors) return;

        const normalizedCountry = country.toLowerCase();
        if (!countrySet.has(normalizedCountry)) {
            showFieldError(countryInput, countryFieldError, 'Please choose a country from the list.');
            return;
        }

        if (!window.emailjs) {
            errMsg.textContent = 'Service temporarily unavailable. Please contact info@teyesauto.com or use WhatsApp.';
            errMsg.hidden = false;
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            await window.emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
            const currentParams = new URLSearchParams(window.location.search);
            const tracked = new URLSearchParams();
            ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'].forEach((key) => {
                const value = currentParams.get(key);
                if (value) tracked.set(key, value);
            });
            tracked.set('lead', '1');
            const query = tracked.toString();
            okMsg.textContent = 'Request received. Redirecting...';
            okMsg.hidden = false;
            setTimeout(() => {
                window.location.href = `./thank-you.html${query ? `?${query}` : ''}`;
            }, 600);
        } catch (error) {
            errMsg.textContent = 'Failed to send. Contact: info@teyesauto.com';
            errMsg.hidden = false;
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Request Quote';
        }
    });
})();
