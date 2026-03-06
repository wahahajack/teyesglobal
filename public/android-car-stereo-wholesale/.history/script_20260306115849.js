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
    if (!('IntersectionObserver' in window)) return;

    const isMobile = () => window.matchMedia('(max-width: 767px)').matches;
    const setVisible = (visible) => thumbCta.classList.toggle('is-visible', visible && isMobile());

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setVisible(!entry.isIntersecting);
    }, { threshold: 0.15 });

    observer.observe(heroPricingBtn);
    window.addEventListener('resize', () => {
      if (!isMobile()) setVisible(false);
    });
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
  const EMAILJS_TEMPLATE_ID = 'template_wz0rjg3';

  if (window.emailjs) {
    window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  emailInput?.addEventListener('invalid', () => {
    if (emailInput.validity.valueMissing) {
      emailInput.setCustomValidity('Business email is required.');
      return;
    }
    if (emailInput.validity.typeMismatch) {
      emailInput.setCustomValidity('Please enter a valid business email, for example name@company.com.');
      return;
    }
    emailInput.setCustomValidity('Please enter a valid business email.');
  });

  emailInput?.addEventListener('input', () => {
    emailInput.setCustomValidity('');
    errMsg.hidden = true;
  });

  countryInput?.addEventListener('input', () => {
    countryInput.setCustomValidity('');
    errMsg.hidden = true;
  });

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form) return;

    errMsg.hidden = true;
    okMsg.hidden = true;

    const honeypot = form.website?.value?.trim();
    if (honeypot) return;

    const company = form.company_name?.value?.trim();
    const email = form.user_email?.value?.trim();
    const country = form.country?.value?.trim();
    const emailField = form.user_email;

    if (!company || !email || !country) {
      errMsg.textContent = 'Please fill in all required fields.';
      errMsg.hidden = false;
      return;
    }

    if (!emailField?.checkValidity()) {
      emailField.reportValidity();
      errMsg.textContent = 'Please enter a valid business email format.';
      errMsg.hidden = false;
      return;
    }

    const normalizedCountry = country.toLowerCase();
    if (!countrySet.has(normalizedCountry)) {
      countryInput?.setCustomValidity('Please select a country from the list.');
      countryInput?.reportValidity();
      errMsg.textContent = 'Please choose a country from the dropdown list.';
      errMsg.hidden = false;
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
      submitBtn.textContent = 'Get 2026 Wholesale Pricing';
    }
  });
})();
