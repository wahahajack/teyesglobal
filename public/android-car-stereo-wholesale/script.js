(() => {
  const EMAILJS_URL = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
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
  const quantitySelect = form?.querySelector('select[name="estimated_quantity"]');
  const emailFieldError = document.getElementById('email-field-error');
  const countryFieldError = document.getElementById('country-field-error');
  const quantityFieldError = document.getElementById('quantity-field-error');
  const mobileMedia = window.matchMedia('(max-width: 767px)');
  let emailJsReadyPromise;
  let stickyCtaInitialized = false;
  let emailJsWarmupStarted = false;

  const initEmailJs = () => {
    if (!window.emailjs || window.emailjs.__teyesReady) return;
    window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    window.emailjs.__teyesReady = true;
  };

  const ensureEmailJs = () => {
    if (window.emailjs) {
      initEmailJs();
      return Promise.resolve(window.emailjs);
    }
    if (emailJsReadyPromise) return emailJsReadyPromise;

    emailJsReadyPromise = new Promise((resolve, reject) => {
      const scriptEl = document.createElement('script');
      scriptEl.src = EMAILJS_URL;
      scriptEl.async = true;
      scriptEl.defer = true;
      scriptEl.onload = () => {
        initEmailJs();
        resolve(window.emailjs);
      };
      scriptEl.onerror = () => {
        emailJsReadyPromise = null;
        reject(new Error('Failed to load EmailJS'));
      };
      document.head.appendChild(scriptEl);
    });

    return emailJsReadyPromise;
  };

  const showFieldError = (input, errorEl, msg) => {
    input?.classList.add('is-invalid');
    if (errorEl) { errorEl.textContent = msg; errorEl.hidden = false; }
  };

  const clearFieldError = (input, errorEl) => {
    input?.classList.remove('is-invalid');
    if (errorEl) { errorEl.hidden = true; errorEl.textContent = ''; }
  };

  const withTimeout = (promise, timeoutMs, timeoutMessage) => new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      reject(new Error(timeoutMessage));
    }, timeoutMs);

    promise
      .then((value) => {
        window.clearTimeout(timeoutId);
        resolve(value);
      })
      .catch((error) => {
        window.clearTimeout(timeoutId);
        reject(error);
      });
  });

  const initTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
      root.setAttribute('data-theme', saved);
      return;
    }
    if (!root.getAttribute('data-theme')) {
      root.setAttribute('data-theme', 'dark');
    }
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
    if (!heroPricingBtn || !thumbCta || stickyCtaInitialized || !mobileMedia.matches) return;

    stickyCtaInitialized = true;
    const state = { heroInView: false, formInView: false };

    const applyStickyCtaState = () => {
      if (!mobileMedia.matches) {
        thumbCta.classList.remove('is-visible', 'wa-only');
        return;
      }

      const shouldShowSticky = !state.heroInView;
      const showWaOnly = shouldShowSticky && state.formInView;

      thumbCta.classList.toggle('is-visible', shouldShowSticky);
      thumbCta.classList.toggle('wa-only', showWaOnly);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === heroPricingBtn) {
          state.heroInView = entry.isIntersecting;
        }
        if (entry.target === submitBtn) {
          state.formInView = entry.isIntersecting;
        }
      });
      applyStickyCtaState();
    }, {
      root: null,
      threshold: 0.01,
      rootMargin: '0px 0px -96px 0px'
    });

    observer.observe(heroPricingBtn);
    if (submitBtn) observer.observe(submitBtn);

    mobileMedia.addEventListener('change', applyStickyCtaState);
    window.addEventListener('orientationchange', applyStickyCtaState);
    applyStickyCtaState();
  };

  if (mobileMedia.matches) {
    initMobileStickyCta();
  } else {
    mobileMedia.addEventListener('change', (event) => {
      if (event.matches) initMobileStickyCta();
    }, { once: true });
  }

  const initImageLightbox = () => {
    const images = document.querySelectorAll('.hero-media img, .visual-photo img');
    if (!images.length) return;

    images.forEach((img) => {
      img.classList.add('zoomable-image');
      img.setAttribute('role', 'button');
      img.setAttribute('tabindex', '0');
      img.setAttribute('aria-label', 'Open image preview');
    });

    let lightbox;
    let closeBtn;
    let preview;

    const ensureLightbox = () => {
      if (lightbox) return;

      lightbox = document.createElement('div');
      lightbox.className = 'image-lightbox';
      lightbox.setAttribute('aria-hidden', 'true');

      closeBtn = document.createElement('button');
      closeBtn.type = 'button';
      closeBtn.className = 'image-lightbox-close';
      closeBtn.setAttribute('aria-label', 'Close image preview');
      closeBtn.textContent = '×';

      preview = document.createElement('img');
      preview.alt = '';

      lightbox.append(closeBtn, preview);
      document.body.appendChild(lightbox);

      closeBtn.addEventListener('click', close);
      lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) close();
      });
    };

    const close = () => {
      if (!lightbox || !preview) return;
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lightbox-open');
      preview.removeAttribute('src');
    };

    const open = (img) => {
      ensureLightbox();
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

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && lightbox?.classList.contains('is-open')) close();
    });
  };

  initImageLightbox();

  const EMAILJS_PUBLIC_KEY = 'r4hPxgrdEnnONhc9E';
  const EMAILJS_SERVICE_ID = 'service_p161z11';
  const EMAILJS_TEMPLATE_ID = 'template_wz0rjg3';

  const warmEmailJs = () => {
    if (emailJsWarmupStarted) return;
    emailJsWarmupStarted = true;
    ensureEmailJs().catch(() => {
      emailJsWarmupStarted = false;
    });
  };

  if (form) {
    form.addEventListener('focusin', warmEmailJs, { once: true });
    submitBtn?.addEventListener('pointerdown', warmEmailJs, { once: true });

    if ('IntersectionObserver' in window) {
      const formObserver = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          warmEmailJs();
          formObserver.disconnect();
        }
      }, {
        root: null,
        threshold: 0.01,
        rootMargin: '240px 0px'
      });

      formObserver.observe(form);
    }
  }

  emailInput?.addEventListener('input', () => {
    clearFieldError(emailInput, emailFieldError);
    errMsg.hidden = true;
  });

  countryInput?.addEventListener('input', () => {
    clearFieldError(countryInput, countryFieldError);
    errMsg.hidden = true;
  });

  quantitySelect?.addEventListener('change', () => {
    clearFieldError(quantitySelect, quantityFieldError);
    errMsg.hidden = true;
  });

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form) return;

    clearFieldError(emailInput, emailFieldError);
    clearFieldError(countryInput, countryFieldError);
    clearFieldError(quantitySelect, quantityFieldError);
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
      showFieldError(quantitySelect, quantityFieldError, 'Please select an option.');
      hasErrors = true;
    }
    if (hasErrors) return;

    try {
      await withTimeout(ensureEmailJs(), 7000, 'EmailJS load timeout');
    } catch (error) {
      errMsg.textContent = 'Service temporarily unavailable. Please contact info@teyesauto.com or use WhatsApp.';
      errMsg.hidden = false;
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      await withTimeout(
        window.emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form),
        12000,
        'Email send timeout'
      );
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'form_submit_success',
        form_name: 'wholesale_quote',
        form_location: 'wholesale_landing_page',
        lead_type: 'wholesale_inquiry',
        value: 1,
        event_category: 'conversion'
      });
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          form_name: 'wholesale_quote',
          form_location: 'wholesale_landing_page',
          lead_type: 'wholesale_inquiry'
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
      submitBtn.textContent = 'Request Wholesale Pricing';
    }
  });
})();
