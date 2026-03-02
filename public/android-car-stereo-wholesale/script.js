(() => {
  const root = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  const heroPricingBtn = document.getElementById('hero-pricing-cta');
  const thumbCta = document.querySelector('.thumb-cta');
  const form = document.getElementById('wholesale-form');
  const submitBtn = document.getElementById('form-btn');
  const errMsg = document.getElementById('form-error');
  const okMsg = document.getElementById('form-success');

  const initTheme = () => {
    const saved = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    root.setAttribute('data-theme', saved || (prefersLight ? 'light' : 'dark'));
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

  const EMAILJS_PUBLIC_KEY = 'r4hPxgrdEnnONhc9E';
  const EMAILJS_SERVICE_ID = 'service_p161z11';
  const EMAILJS_TEMPLATE_ID = 'template_wz0rjg3';

  if (window.emailjs) {
    window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form || !window.emailjs) return;

    errMsg.hidden = true;
    okMsg.hidden = true;

    const company = form.company_name?.value?.trim();
    const email = form.user_email?.value?.trim();
    const country = form.country?.value?.trim();

    if (!company || !email || !country) {
      errMsg.textContent = 'Please complete Company Name, Business Email, and Country.';
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
      window.location.href = `./thank-you.html${query ? `?${query}` : ''}`;
    } catch (error) {
      errMsg.textContent = 'Failed to send. Contact: info@teyesauto.com';
      errMsg.hidden = false;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Request Official Wholesale Pricing';
    }
  });
})();
