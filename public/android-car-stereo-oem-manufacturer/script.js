(() => {
  const e = document.documentElement,
    t = document.getElementById("theme-toggle"),
    n = document.getElementById("hero-pricing-cta"),
    i = document.querySelector(".thumb-cta"),
    a = document.getElementById("wholesale-form"),
    o = document.getElementById("form-btn"),
    r = document.getElementById("form-error"),
    d = document.getElementById("form-success"),
    s = document.getElementById("form-ts"),
    c = a?.querySelector('input[name="user_email"]'),
    l = a?.querySelector('input[name="country"]'),
    m = document.getElementById("email-field-error"),
    u = document.getElementById("country-field-error"),
    w = document.getElementById("quantity-field-error"),
    g = "teyes_last_submit_ts",
    h = Date.now();
  let v,
    y = !1;
  ((window.dataLayer = window.dataLayer || []),
    (window.gtag =
      window.gtag ||
      function () {
        window.dataLayer.push(arguments);
      }),
    s && (s.value = String(h)));
  const b = (e, t, n) => {
      (e?.classList.add("is-invalid"),
        t && ((t.textContent = n), (t.hidden = !1)));
    },
    p = (e, t) => {
      (e?.classList.remove("is-invalid"),
        t && ((t.hidden = !0), (t.textContent = "")));
    };
  t?.addEventListener("click", () => {
    const t =
      "dark" === (e.getAttribute("data-theme") || "dark") ? "light" : "dark";
    (e.setAttribute("data-theme", t), localStorage.setItem("theme", t));
  });
  const f = () => {
    (
      v ||
      ((v = new Promise((e, t) => {
        window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
        const n = document.createElement("script");
        ((n.async = !0),
          (n.src = "https://www.googletagmanager.com/gtm.js?id=GTM-MSPH5TMK"),
          (n.onload = e),
          (n.onerror = () => t(new Error("Failed to load GTM"))),
          document.head.appendChild(n));
      })),
      v)
    ).catch(() => {});
  };
  (["pointerdown", "keydown", "touchstart"].forEach((e) => {
    window.addEventListener(e, f, { once: !0, passive: !0 });
  }),
    "requestIdleCallback" in window
      ? window.addEventListener(
          "load",
          () => {
            window.requestIdleCallback(
              () => {
                window.setTimeout(f, 5e3);
              },
              { timeout: 8e3 },
            );
          },
          { once: !0 },
        )
      : window.addEventListener(
          "load",
          () => {
            window.setTimeout(f, 5e3);
          },
          { once: !0 },
        ));
  (() => {
    if (!n || !i) return;
    const e = window.matchMedia("(max-width: 767px)"),
      t = { heroVisible: !0, formVisible: !1 },
      a = () => {
        if (!e.matches) return void i.classList.remove("is-visible", "wa-only");
        const n = !t.heroVisible;
        (i.classList.toggle("is-visible", n),
          i.classList.toggle("wa-only", n && t.formVisible));
      },
      r = (e, n, i) => {
        if (!e || !("IntersectionObserver" in window)) return null;
        const o = new IntersectionObserver((e) => {
          const i = e[0];
          ((t[n] = Boolean(i?.isIntersecting)), a());
        }, i);
        return (o.observe(e), o);
      },
      d = r(n, "heroVisible", { threshold: 0.2 }),
      s = r(o, "formVisible", {
        threshold: 0.2,
        rootMargin: "0px 0px -96px 0px",
      });
    if (!d || !s) {
      const e = (e, t = 0) => {
          if (!e) return !1;
          const n = e.getBoundingClientRect();
          return n.bottom > 0 && n.top < window.innerHeight - t;
        },
        i = () => {
          ((t.heroVisible = e(n)), (t.formVisible = e(o, 96)), a());
        };
      return (
        window.addEventListener("scroll", i, { passive: !0 }),
        window.addEventListener("resize", i),
        window.addEventListener("orientationchange", i),
        void i()
      );
    }
    const c = () => a();
    ("function" == typeof e.addEventListener
      ? e.addEventListener("change", c)
      : "function" == typeof e.addListener && e.addListener(c),
      a());
  })();
  const E = () => {
    const e = document.querySelectorAll(".hero-media img, .visual-photo img");
    if (!e.length) return;
    e.forEach((e) => {
      (e.classList.add("zoomable-image"),
        e.setAttribute("role", "button"),
        e.setAttribute("tabindex", "0"),
        e.setAttribute("aria-label", "Open image preview"));
    });
    const t = document.createElement("div");
    ((t.className = "image-lightbox"), t.setAttribute("aria-hidden", "true"));
    const n = document.createElement("button");
    ((n.type = "button"),
      (n.className = "image-lightbox-close"),
      n.setAttribute("aria-label", "Close image preview"),
      (n.textContent = "×"));
    const i = document.createElement("img");
    ((i.alt = ""), t.append(n, i), document.body.appendChild(t));
    const a = () => {
        (t.classList.remove("is-open"),
          t.setAttribute("aria-hidden", "true"),
          document.body.classList.remove("lightbox-open"),
          i.removeAttribute("src"));
      },
      o = (e) => {
        ((i.src = e.currentSrc || e.src),
          (i.alt = e.alt || ""),
          t.classList.add("is-open"),
          t.setAttribute("aria-hidden", "false"),
          document.body.classList.add("lightbox-open"));
      };
    (e.forEach((e) => {
      (e.addEventListener("click", () => o(e)),
        e.addEventListener("keydown", (t) => {
          ("Enter" !== t.key && " " !== t.key) || (t.preventDefault(), o(e));
        }));
    }),
      n.addEventListener("click", a),
      t.addEventListener("click", (e) => {
        e.target === t && a();
      }),
      window.addEventListener("keydown", (e) => {
        "Escape" === e.key && t.classList.contains("is-open") && a();
      }));
  };
  "requestIdleCallback" in window
    ? window.requestIdleCallback(E, { timeout: 2500 })
    : window.setTimeout(E, 1200);
  let _,
    k = !1;
  const L = () => {
      window.emailjs &&
        !window.emailjs.__teyesInitialized &&
        (window.emailjs.init({ publicKey: "r4hPxgrdEnnONhc9E" }),
        (window.emailjs.__teyesInitialized = !0));
    },
    P = () => {
      if (k) return;
      ((k = !0),
        [
          ["preconnect", "https://cdn.jsdelivr.net"],
          ["dns-prefetch", "//cdn.jsdelivr.net"],
          ["preconnect", "https://api.emailjs.com"],
          ["dns-prefetch", "//api.emailjs.com"],
        ].forEach(([e, t]) => {
          if (document.head.querySelector(`link[rel="${e}"][href="${t}"]`))
            return;
          const n = document.createElement("link");
          ((n.rel = e),
            (n.href = t),
            "preconnect" === e && (n.crossOrigin = "anonymous"),
            document.head.appendChild(n));
        }));
    },
    q = async () =>
      window.emailjs
        ? (L(), window.emailjs)
        : (P(),
          (_ ||
            (_ = new Promise((e, t) => {
              const n = document.createElement("script");
              ((n.src =
                "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"),
                (n.async = !0),
                (n.onload = () => {
                  (L(), e(window.emailjs));
                }),
                (n.onerror = () => t(new Error("Failed to load EmailJS"))),
                document.head.appendChild(n));
            })),
          _)),
    I = () => {
      (P(), q().catch(() => {}));
    },
    x = () => {
      y ||
        ((y = !0),
        window.dataLayer &&
          dataLayer.push({
            event: "form_start",
            form_name: "manufacturing_quote",
            form_location: "manufacturing_landing_page",
          }));
    };
  (a?.addEventListener("focusin", x, { once: !0 }),
    a?.addEventListener("input", x, { once: !0 }),
    a?.addEventListener("change", x, { once: !0 }),
    a?.addEventListener("focusin", I, { once: !0 }),
    a?.addEventListener("pointerdown", I, { once: !0 }),
    a &&
      ("IntersectionObserver" in window
        ? new IntersectionObserver(
            (e, t) => {
              e[0]?.isIntersecting && (I(), t.disconnect());
            },
            { rootMargin: "240px 0px" },
          ).observe(a)
        : window.addEventListener(
            "load",
            () => {
              window.setTimeout(I, 1200);
            },
            { once: !0 },
          )),
    "requestIdleCallback" in window
      ? window.addEventListener(
          "load",
          () => {
            window.requestIdleCallback(I, { timeout: 3500 });
          },
          { once: !0 },
        )
      : window.addEventListener(
          "load",
          () => {
            window.setTimeout(I, 1800);
          },
          { once: !0 },
        ),
    c?.addEventListener("input", () => {
      (p(c, m), (r.hidden = !0));
    }),
    l?.addEventListener("input", () => {
      (p(l, u), (r.hidden = !0));
    }),
    a
      ?.querySelector('select[name="estimated_quantity"]')
      ?.addEventListener("change", () => {
        (p(a.estimated_quantity, w), (r.hidden = !0));
      }),
    a?.addEventListener("submit", async (e) => {
      if ((e.preventDefault(), !a)) return;
      (window.dataLayer &&
          dataLayer.push({
            event: "form_submit_attempt",
            form_name: "manufacturing_quote",
            form_location: "manufacturing_landing_page",
          }),
        p(c, m),
        p(l, u),
        p(a.estimated_quantity, w),
        (r.hidden = !0),
        (d.hidden = !0));
      const t = a.website?.value?.trim();
      if (t) return;
      const n = Date.now();
      if (n - (Number(a.form_ts?.value) || h) < 2500)
        return (
          (r.textContent = "Please review your details and try again."),
          void (r.hidden = !1)
        );
      const i = Number(localStorage.getItem(g) || 0);
      if (i && n - i < 15e3)
        return (
          (r.textContent =
            "Please wait a few seconds before submitting again."),
          void (r.hidden = !1)
        );
      const s = a.user_email?.value?.trim(),
        v = a.country?.value?.trim(),
        y = a.estimated_quantity?.value?.trim(),
        f = a.user_email;
      let E = !1;
      if (
        (s
          ? f?.validity.valid ||
            (b(
              f,
              m,
              "Please enter a valid business email, e.g. name@company.com",
            ),
            (E = !0))
          : (b(f, m, "Business email is required."), (E = !0)),
        v || (b(l, u, "Country is required."), (E = !0)),
        y || (b(a.estimated_quantity, w, "Please select an option."), (E = !0)),
        E)
      )
        return;
      if (v.length >= 2) {
        try {
          await q();
        } catch (e) {
          return (
            (r.textContent =
              "Service is temporarily unavailable. Please try again, or contact info@teyesauto.com / WhatsApp."),
            void (r.hidden = !1)
          );
        }
        ((o.disabled = !0), (o.textContent = "Sending..."));
        try {
          (await window.emailjs.sendForm(
            "service_p161z11",
            "template_at1z02w",
            a,
          ),
            localStorage.setItem(g, String(Date.now())),
            window.dataLayer &&
              dataLayer.push({
                event: "form_submit_success",
                form_name: "manufacturing_quote",
                form_location: "manufacturing_landing_page",
                lead_type: "oem_inquiry",
                value: 1,
                event_category: "conversion",
              }));
          const e = new URLSearchParams(window.location.search),
            t = new URLSearchParams();
          ([
            "utm_source",
            "utm_medium",
            "utm_campaign",
            "utm_content",
            "utm_term",
            "gclid",
            "gbraid",
            "wbraid",
            "fbclid",
          ].forEach((n) => {
            const i = e.get(n);
            i && t.set(n, i);
          }),
            t.set("lead", "1"));
          const n = t.toString();
          window.location.href =
            "/android-car-stereo-oem-manufacturer/thank-you.html" +
            (n ? `?${n}` : "");
        } catch (e) {
          ((r.textContent =
            "Submission failed. Please try again, or contact info@teyesauto.com / WhatsApp."),
            (r.hidden = !1));
        } finally {
          ((o.disabled = !1), (o.textContent = "Get Pricing & MOQ"));
        }
      } else b(l, u, "Please enter a valid country name.");
    }));
})();
