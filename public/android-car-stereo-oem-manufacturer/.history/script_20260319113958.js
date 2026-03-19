(() => {
    const root = document.documentElement;
    const themeBtn = document.getElementById('theme-toggle');
    const heroPricingBtn = document.getElementById('hero-pricing-cta');
    const thumbCta = document.querySelector('.thumb-cta');
    const form = document.getElementById('wholesale-form');
    const submitBtn = document.getElementById('form-btn');
    const errMsg = document.getElementById('form-error');
    const okMsg = document.getElementById('form-success');
    const formTsField = document.getElementById('form-ts');
    const emailInput = form?.querySelector('input[name="user_email"]');
    const countryInput = form?.querySelector('input[name="country"]');
    const emailFieldError = document.getElementById('email-field-error');
    const countryFieldError = document.getElementById('country-field-error');
    const quantityFieldError = document.getElementById('quantity-field-error');
    const MIN_FORM_FILL_MS = 2500;
    const SUBMIT_COOLDOWN_MS = 15000;
    const LAST_SUBMIT_KEY = 'teyes_last_submit_ts';
    const GTM_ID = 'GTM-MSPH5TMK';
    const GTM_IDLE_DELAY_MS = 2500;
    const formInitTs = Date.now();
    let analyticsLoadPromise;
    let hasTrackedFormStart = false;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
        window.dataLayer.push(arguments);
    };

    if (formTsField) {
        formTsField.value = String(formInitTs);
    }

    const showFieldError = (input, errorEl, msg) => {
        input?.classList.add('is-invalid');
        if (errorEl) { errorEl.textContent = msg; errorEl.hidden = false; }
    };

    const clearFieldError = (input, errorEl) => {
        input?.classList.remove('is-invalid');
        if (errorEl) { errorEl.hidden = true; errorEl.textContent = ''; }
    };

    const toggleTheme = () => {
        const current = root.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    };

    themeBtn?.addEventListener('click', toggleTheme);

    const loadAnalytics = () => {
        if (analyticsLoadPromise) return analyticsLoadPromise;

        analyticsLoadPromise = new Promise((resolve, reject) => {
            window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
            script.onload = resolve;
            script.onerror = () => reject(new Error('Failed to load GTM'));
            document.head.appendChild(script);
        });

        return analyticsLoadPromise;
    };

    const primeAnalytics = () => {
        void loadAnalytics().catch(() => undefined);
    };

    ['pointerdown', 'keydown', 'touchstart'].forEach((eventName) => {
        window.addEventListener(eventName, primeAnalytics, { once: true, passive: true });
    });
    window.setTimeout(primeAnalytics, GTM_IDLE_DELAY_MS);

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
    const EMAILJS_SRC = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    let emailJsLoadPromise;

    const initEmailJs = () => {
        if (!window.emailjs || window.emailjs.__teyesInitialized) return;
        window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
        window.emailjs.__teyesInitialized = true;
    };

    const loadEmailJs = async () => {
        if (window.emailjs) {
            initEmailJs();
            return window.emailjs;
        }

        if (!emailJsLoadPromise) {
            emailJsLoadPromise = new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = EMAILJS_SRC;
                script.async = true;
                script.onload = () => {
                    initEmailJs();
                    resolve(window.emailjs);
                };
                script.onerror = () => reject(new Error('Failed to load EmailJS'));
                document.head.appendChild(script);
            });
        }

        return emailJsLoadPromise;
    };

    const primeEmailJs = () => {
        void loadEmailJs().catch(() => undefined);
    };

    const trackFormStart = () => {
        if (hasTrackedFormStart) return;
        hasTrackedFormStart = true;
        if (window.dataLayer) {
            dataLayer.push({
                'event': 'form_start',
                'form_name': 'manufacturing_quote',
                'form_location': 'manufacturing_landing_page'
            });
        }
    };

    form?.addEventListener('focusin', trackFormStart, { once: true });
    form?.addEventListener('input', trackFormStart, { once: true });
    form?.addEventListener('change', trackFormStart, { once: true });
    form?.addEventListener('focusin', primeEmailJs, { once: true });
    form?.addEventListener('pointerdown', primeEmailJs, { once: true });

    emailInput?.addEventListener('input', () => {
        clearFieldError(emailInput, emailFieldError);
        errMsg.hidden = true;
    });

    countryInput?.addEventListener('input', () => {
        clearFieldError(countryInput, countryFieldError);
        errMsg.hidden = true;
    });

    form?.querySelector('select[name="estimated_quantity"]')?.addEventListener('change', () => {
        clearFieldError(form.estimated_quantity, quantityFieldError);
        errMsg.hidden = true;
    });

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!form) return;

        // GTM tracking
        if (window.gtag) {
            gtag('event', 'form_submit_attempt', {
                'event_category': 'engagement',
                'event_label': 'manufacturing_quote_request'
            });
        }
        if (window.dataLayer) {
            dataLayer.push({
                'event': 'form_submit_attempt',
                'form_name': 'manufacturing_quote',
                'form_location': 'manufacturing_landing_page'
            });
        }

        clearFieldError(emailInput, emailFieldError);
        clearFieldError(countryInput, countryFieldError);
        clearFieldError(form.estimated_quantity, quantityFieldError);
        errMsg.hidden = true;
        okMsg.hidden = true;

        const honeypot = form.website?.value?.trim();
        if (honeypot) return;

        const now = Date.now();
        const startedAt = Number(form.form_ts?.value) || formInitTs;
        if (now - startedAt < MIN_FORM_FILL_MS) {
            errMsg.textContent = 'Please review your details and try again.';
            errMsg.hidden = false;
            return;
        }

        const lastSubmitTs = Number(localStorage.getItem(LAST_SUBMIT_KEY) || 0);
        if (lastSubmitTs && now - lastSubmitTs < SUBMIT_COOLDOWN_MS) {
            errMsg.textContent = 'Please wait a few seconds before submitting again.';
            errMsg.hidden = false;
            return;
        }

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

        // Allow any country name input - don't restrict to predefined list
        // This allows for flexibility while still collecting the data
        const isValidCountry = country.length >= 2;
        
        if (!isValidCountry) {
            showFieldError(countryInput, countryFieldError, 'Please enter a valid country name.');
            return;
        }

        try {
            await loadEmailJs();
        } catch (error) {
            errMsg.textContent = 'Service is temporarily unavailable. Please try again, or contact info@teyesauto.com / WhatsApp.';
            errMsg.hidden = false;
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            await window.emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
            localStorage.setItem(LAST_SUBMIT_KEY, String(Date.now()));
            
            // GTM conversion tracking
            if (window.gtag) {
                gtag('event', 'form_submission', {
                    'event_category': 'conversion',
                    'event_label': 'manufacturing_quote_submitted'
                });
            }
            if (window.dataLayer) {
                dataLayer.push({
                    'event': 'form_submit',
                    'value': 1,
                    'event_category': 'conversion'
                });
            }
            const currentParams = new URLSearchParams(window.location.search);
            const tracked = new URLSearchParams();
            ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'].forEach((key) => {
                const value = currentParams.get(key);
                if (value) tracked.set(key, value);
            });
            tracked.set('lead', '1');
            const query = tracked.toString();
            window.location.href = `./thank-you.html${query ? `?${query}` : ''}`;
        } catch (error) {
            errMsg.textContent = 'Submission failed. Please try again, or contact info@teyesauto.com / WhatsApp.';
            errMsg.hidden = false;
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Request Factory Quote';
        }
    });
})();
