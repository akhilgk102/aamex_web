const {
  aboutFeatures,
  automotiveModels,
  bikeModels,
  brochureGallery,
  featuredFamilies,
  heroSlides,
  marqueeItems,
  powerReasons,
  siteMeta,
  smartAdvantages,
  tubularModels,
} = window.AAMEX_CONTENT;

const navItems = [
  { key: "home", label: "Home", href: "./index.html" },
  { key: "product", label: "Product", href: "./product.html" },
  { key: "about", label: "About", href: "./about.html" },
  { key: "contact", label: "Contact", href: "./contact.html" },
];

const pageKey = document.body.dataset.page;
const logoPath = "./site-images/aamex-logo1.svg";
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function renderHeader() {
  const mount = document.querySelector("[data-site-header]");
  if (!mount) return;

  const links = navItems
    .map(
      (item) => `
        <a class="site-nav__link ${item.key === pageKey ? "is-active" : ""}" href="${item.href}">
          ${item.label}
        </a>
      `
    )
    .join("");

  mount.innerHTML = `
    <div class="container">
      <div class="header-bar">
        <a class="brand" href="./index.html" aria-label="${siteMeta.brand} home">
          <img class="brand__logo" src="${logoPath}" alt="${siteMeta.brand} logo" />
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav-panel">
          <span></span>
          <span></span>
        </button>
        <nav class="site-nav" id="site-nav-panel" aria-label="Primary">
          ${links}
          <a class="button button--small" href="./contact.html">Enquire Now</a>
        </nav>
      </div>
    </div>
  `;
}

function renderFooter() {
  const mount = document.querySelector("[data-site-footer]");
  if (!mount) return;

  const footerLinks = navItems
    .map((item) => `<a href="${item.href}">${item.label}</a>`)
    .join("");

  mount.innerHTML = `
    <div class="container footer-grid">
      <div>
        <p class="footer-eyebrow">${siteMeta.brand}</p>
        <img class="footer-logo" src="${logoPath}" alt="${siteMeta.brand} logo" />
        <p>${siteMeta.description}</p>
      </div>
      <div>
        <p class="footer-eyebrow">Explore</p>
        <div class="footer-links">${footerLinks}</div>
      </div>
      <div>
        <p class="footer-eyebrow">Contact</p>
        <p>${siteMeta.contact.distributor}</p>
        <p>${siteMeta.contact.address}</p>
        <p><a href="tel:${normalizePhone(siteMeta.contact.phones[0])}">${siteMeta.contact.phones[0]}</a></p>
        <p><a href="tel:${normalizePhone(siteMeta.contact.customerCare)}">${siteMeta.contact.customerCare}</a></p>
        <p><a href="${siteMeta.contact.website}" target="_blank" rel="noreferrer">www.aamex.in</a></p>
      </div>
    </div>
  `;
}

function normalizePhone(phone) {
  return phone.replace(/[^\d+]/g, "");
}

function isLogoAsset(path = "") {
  return path.toLowerCase().endsWith(".svg");
}

function renderMarquee() {
  const track = document.querySelector("[data-marquee-track]");
  if (!track) return;

  const chips = [...marqueeItems, ...marqueeItems]
    .map((item) => `<span class="marquee-chip">${item}</span>`)
    .join("");

  track.innerHTML = chips;
}

function renderHeroActions(actions = []) {
  if (!actions.length) return "";

  return `
    <div class="hero__actions">
      ${actions
        .map((action) => {
          const attrs = action.external
            ? ' target="_blank" rel="noreferrer"'
            : "";

          return `
            <a class="button${action.variant === "ghost" ? " button--ghost" : ""}" href="${action.href}"${attrs}>
              ${action.label}
            </a>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderHeroFacts(facts = []) {
  if (!facts.length) return "";

  return `
    <ul class="hero__facts">
      ${facts.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  `;
}

function renderHeroChips(chips = []) {
  if (!chips.length) return "";

  return `
    <div class="hero__chips">
      ${chips.map((item) => `<span>${item}</span>`).join("")}
    </div>
  `;
}

function renderHeroSlider() {
  const mount = document.querySelector("[data-hero-slider]");
  const slides = heroSlides[pageKey];
  if (!mount || !slides?.length) return;

  const gridClass = pageKey === "home" ? "hero__grid" : "hero__grid hero__grid--inner";

  mount.innerHTML = `
    <div class="container">
      <div class="hero-slider panel">
        <div class="${gridClass}">
          <div class="hero__copy">
            <div class="hero-slider__copy-track">
              ${slides
                .map(
                  (slide, index) => `
                    <article
                      class="hero-copy-slide${index === 0 ? " is-active" : ""}"
                      data-hero-copy-slide
                      aria-hidden="${index === 0 ? "false" : "true"}"
                    >
                      <p class="section-label">${slide.label}</p>
                      <h1>${slide.title}</h1>
                      <p class="hero__lead">${slide.lead}</p>
                      ${renderHeroActions(slide.actions)}
                      ${renderHeroFacts(slide.facts)}
                      ${renderHeroChips(slide.chips)}
                    </article>
                  `
                )
                .join("")}
            </div>
          </div>
          <div class="hero__visual">
            <div class="hero-slider__visual-track">
              ${slides
                .map((slide, index) => {
                  const mediaClass = isLogoAsset(slide.image) ? " media-frame--logo" : "";

                  return `
                    <figure
                      class="hero-visual-slide${index === 0 ? " is-active" : ""}"
                      data-hero-visual-slide
                      aria-hidden="${index === 0 ? "false" : "true"}"
                    >
                      <div class="media-frame panel${mediaClass}">
                        <img src="${slide.image}" alt="${slide.alt}" loading="${index === 0 ? "eager" : "lazy"}" />
                      </div>
                    </figure>
                  `;
                })
                .join("")}
            </div>
          </div>
        </div>
        <div class="hero-slider__footer">
          <div class="hero-slider__dots" role="tablist" aria-label="Hero slides">
            ${slides
              .map(
                (slide, index) => `
                  <button
                    class="hero-slider__dot${index === 0 ? " is-active" : ""}"
                    type="button"
                    data-hero-dot="${index}"
                    aria-label="Show slide ${index + 1}: ${slide.label}"
                    aria-selected="${index === 0 ? "true" : "false"}"
                  ></button>
                `
              )
              .join("")}
          </div>
          <p class="hero-slider__status">
            <span data-hero-current>01</span> / ${String(slides.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    </div>
  `;

  const copyNodes = Array.from(mount.querySelectorAll("[data-hero-copy-slide]"));
  const visualNodes = Array.from(mount.querySelectorAll("[data-hero-visual-slide]"));
  const dotNodes = Array.from(mount.querySelectorAll("[data-hero-dot]"));
  const currentLabel = mount.querySelector("[data-hero-current]");
  const slideCount = Math.min(copyNodes.length, visualNodes.length);

  if (slideCount < 2) return;

  let activeIndex = 0;
  let timerId = 0;

  const showSlide = (nextIndex) => {
    activeIndex = (nextIndex + slideCount) % slideCount;

    copyNodes.forEach((slide, index) => {
      const isActive = index === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    visualNodes.forEach((slide, index) => {
      const isActive = index === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    dotNodes.forEach((dot, index) => {
      const isActive = index === activeIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-selected", String(isActive));
    });

    if (currentLabel) {
      currentLabel.textContent = String(activeIndex + 1).padStart(2, "0");
    }
  };

  const stopAutoplay = () => {
    if (timerId) {
      window.clearInterval(timerId);
      timerId = 0;
    }
  };

  const startAutoplay = () => {
    stopAutoplay();
    timerId = window.setInterval(() => {
      showSlide(activeIndex + 1);
    }, 5200);
  };

  dotNodes.forEach((dot) => {
    dot.addEventListener("click", () => {
      showSlide(Number(dot.dataset.heroDot));
      if (!prefersReducedMotion) startAutoplay();
    });
  });

  if (prefersReducedMotion) return;

  mount.addEventListener("mouseenter", stopAutoplay);
  mount.addEventListener("mouseleave", startAutoplay);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  startAutoplay();
}

function renderFeaturedFamilies(selector, limit = featuredFamilies.length) {
  const mount = document.querySelector(selector);
  if (!mount) return;

  mount.innerHTML = featuredFamilies
    .slice(0, limit)
    .map(
      (family, index) => `
        <article class="family-card panel" data-reveal style="transition-delay:${index * 80}ms">
          <div class="family-card__media ${family.imageClass}">
            <img src="${family.image}" alt="${family.name}" loading="lazy" />
          </div>
          <div class="family-card__body">
            <p class="section-label">${family.category}</p>
            <h3>${family.name}</h3>
            <p>${family.summary}</p>
            <div class="spec-tags">
              ${family.capacities.map((item) => `<span>${item}</span>`).join("")}
            </div>
            <p class="family-card__meta">${family.warranty}</p>
            <ul class="inline-list">
              ${family.bullets.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
        </article>
      `
    )
    .join("");
}

function renderReasons() {
  const mount = document.querySelector("[data-reasons-grid]");
  if (!mount) return;

  mount.innerHTML = powerReasons
    .map(
      (reason, index) => `
        <article class="info-card panel" data-reveal style="transition-delay:${index * 70}ms">
          <p class="info-card__count">0${index + 1}</p>
          <h3>${reason.title}</h3>
          <p>${reason.text}</p>
        </article>
      `
    )
    .join("");
}

function renderBulletList(selector, items) {
  const mount = document.querySelector(selector);
  if (!mount) return;

  mount.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
}

function buildTableRows(items) {
  return items
    .map(
      (item) => `
        <tr>
          <td>${item.model}</td>
          <td>${item.capacity}</td>
          <td>${item.warranty}</td>
          <td>${item.proRata}</td>
        </tr>
      `
    )
    .join("");
}

function renderTables() {
  const tubular = document.querySelector("[data-table='tubular']");
  const automotive = document.querySelector("[data-table='automotive']");
  const bike = document.querySelector("[data-table='bike']");

  if (tubular) tubular.innerHTML = buildTableRows(tubularModels);
  if (automotive) automotive.innerHTML = buildTableRows(automotiveModels);
  if (bike) bike.innerHTML = buildTableRows(bikeModels);
}

function parseModelName(model) {
  const match = model.match(/^(.*?)\s*\((.*?)\)$/);

  if (!match) {
    return {
      code: model.trim(),
      name: model.trim(),
    };
  }

  return {
    code: match[1].trim(),
    name: match[2].trim(),
  };
}

function toAssetSlug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function getModelImage(item, group) {
  const { name } = parseModelName(item.model);

  if (group === "tubular") {
    return `./site-images/${toAssetSlug(name)}.png`;
  }

  if (group === "automotive") {
    return "./site-images/automotive-series.png";
  }

  return "./site-images/bike-series.png";
}

function renderModelGrid(selector, items, group, categoryLabel) {
  const mount = document.querySelector(selector);
  if (!mount) return;

  mount.innerHTML = items
    .map((item, index) => {
      const { code, name } = parseModelName(item.model);
      const displayName = name === code ? `${code} Battery` : name;
      return `
        <article class="model-card" data-reveal style="transition-delay:${(index % 6) * 60}ms">
          <div class="model-card__art">
            <img
              src="${getModelImage(item, group)}"
              alt="${displayName}"
              loading="lazy"
            />
          </div>
          <div class="model-card__body">
            <p class="section-label">${categoryLabel}</p>
            <h3>${displayName}</h3>
            <p class="model-card__code">${code}</p>
            <div class="model-card__specs">
              <span>${item.capacity}</span>
              <span>${item.warranty}</span>
              ${item.proRata !== "—" ? `<span>${item.proRata} pro-rata</span>` : ""}
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderModelShowcase() {
  renderModelGrid("[data-model-grid='tubular']", tubularModels, "tubular", "Tubular model");
  renderModelGrid("[data-model-grid='automotive']", automotiveModels, "automotive", "Automotive model");
  renderModelGrid("[data-model-grid='bike']", bikeModels, "bike", "Bike model");
}

function renderGallery(selector, items = brochureGallery) {
  const mount = document.querySelector(selector);
  if (!mount) return;

  mount.innerHTML = items
    .map((item, index) => {
      const mediaClass = isLogoAsset(item.image) ? " gallery-card__media--logo" : "";

      return `
        <article class="gallery-card panel" data-reveal style="transition-delay:${index * 90}ms">
          <div class="gallery-card__media${mediaClass}">
            <img src="${item.image}" alt="${item.title}" loading="lazy" />
          </div>
          <div class="gallery-card__body">
            <p class="section-label">Brand visual</p>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderContactDetails() {
  const phoneList = document.querySelector("[data-contact-phones]");
  if (!phoneList) return;

  const phones = [
    ...siteMeta.contact.phones,
    siteMeta.contact.customerCare,
  ];

  phoneList.innerHTML = phones
    .map(
      (phone) => `
        <a class="contact-chip" href="tel:${normalizePhone(phone)}">${phone}</a>
      `
    )
    .join("");
}

function initPreloader() {
  const preloader = document.querySelector("[data-page-preloader]");
  if (!preloader) return;

  let isClosed = false;
  const minimumDuration = prefersReducedMotion ? 0 : 2000;
  const cleanupDelay = prefersReducedMotion ? 80 : 320;

  const closePreloader = () => {
    if (isClosed) return;

    isClosed = true;
    document.body.classList.remove("is-preloading");
    preloader.classList.add("is-hidden");

    window.setTimeout(() => {
      preloader.setAttribute("aria-hidden", "true");
      preloader.remove();
    }, cleanupDelay);
  };

  const queueClose = () => {
    const remaining = Math.max(0, minimumDuration - performance.now());
    window.setTimeout(closePreloader, remaining);
  };

  if (document.readyState === "complete") {
    queueClose();
    return;
  }

  window.addEventListener(
    "load",
    () => {
      queueClose();
    },
    { once: true }
  );

  window.setTimeout(queueClose, minimumDuration + 3200);
}

function initObserver() {
  const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
  if (!revealItems.length) return;

  const revealItem = (item) => item.classList.add("is-visible");
  const foldLimit = window.innerHeight * 0.92;

  revealItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < foldLimit && rect.bottom > 0) revealItem(item);
  });

  const pendingItems = revealItems.filter((item) => !item.classList.contains("is-visible"));
  if (!pendingItems.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealItem(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  pendingItems.forEach((item) => observer.observe(item));
}

function initTilt() {
  const tiltItems = document.querySelectorAll("[data-tilt]");
  tiltItems.forEach((item) => {
    item.addEventListener("pointermove", (event) => {
      const rect = item.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 10;
      const rotateX = ((y / rect.height) - 0.5) * -10;
      item.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    item.addEventListener("pointerleave", () => {
      item.style.transform = "";
    });
  });
}

function initHeaderState() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const toggle = header.querySelector(".nav-toggle");
  const nav = header.querySelector(".site-nav");

  toggle?.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    nav?.classList.toggle("is-open");
    document.body.classList.toggle("menu-open");
  });

  window.addEventListener(
    "scroll",
    () => {
      header.classList.toggle("is-scrolled", window.scrollY > 16);
    },
    { passive: true }
  );
}

function initForm() {
  const form = document.querySelector("[data-demo-form]");
  if (!form) return;

  const message = form.querySelector("[data-form-message]");
  const captchaChallenge = form.querySelector("[data-captcha-challenge]");
  const captchaInput = form.querySelector("[data-captcha-input]");
  const captchaRefresh = form.querySelector("[data-captcha-refresh]");

  const setFormMessage = (text, type) => {
    message.textContent = text;
    message.classList.remove("is-error", "is-success");
    message.classList.add("is-visible");
    if (type) message.classList.add(type);
  };

  const buildCaptcha = () => {
    const first = Math.floor(Math.random() * 8) + 2;
    const second = Math.floor(Math.random() * 7) + 2;

    if (Math.random() > 0.45) {
      return {
        prompt: `${first} + ${second} = ?`,
        answer: String(first + second),
      };
    }

    return {
      prompt: `${first + second} - ${first} = ?`,
      answer: String(second),
    };
  };

  const refreshCaptcha = () => {
    if (!captchaChallenge || !captchaInput) return;
    const captcha = buildCaptcha();
    captchaChallenge.textContent = `Answer this: ${captcha.prompt}`;
    form.dataset.captchaAnswer = captcha.answer;
    captchaInput.value = "";
  };

  captchaRefresh?.addEventListener("click", refreshCaptcha);
  refreshCaptcha();

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (captchaInput && captchaInput.value.trim() !== form.dataset.captchaAnswer) {
      setFormMessage("Please solve the CAPTCHA correctly before submitting.", "is-error");
      refreshCaptcha();
      captchaInput?.focus();
      return;
    }

    setFormMessage(
      "Thanks. CAPTCHA verified. The enquiry form layout is ready and can be connected to your email or CRM in the next step.",
      "is-success"
    );
    form.reset();
    refreshCaptcha();
  });
}

function initCurrentYear() {
  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = new Date().getFullYear();
}

function initFloatingActions() {
  const waNumber = normalizePhone(siteMeta.contact.customerCare).replace("+", "");

  const wrap = document.createElement("div");
  wrap.className = "floating-actions";
  wrap.innerHTML = `
    <a
      class="floating-action floating-action--whatsapp"
      href="https://wa.me/${waNumber}"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 11.5a8 8 0 0 1-11.8 7l-3.2.9.9-3.1A8 8 0 1 1 20 11.5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9.5 8.8c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .5.4l.5 1.3c.1.3 0 .5-.1.7l-.4.5c-.1.1-.2.2-.1.4.3.6 1.2 1.9 2.7 2.6.2.1.4 0 .5-.1l.6-.7c.2-.2.4-.2.6-.1l1.3.6c.2.1.3.3.2.6l-.2.8c-.1.3-.3.5-.6.6-.4.1-1 .2-1.8-.1-1-.4-2-.9-3.1-2-1-1-1.7-2-2-3-.2-.8-.1-1.4 0-1.8.1-.3.3-.5.5-.6Z" fill="currentColor"/>
      </svg>
    </a>
    <button class="floating-action floating-action--top" type="button" aria-label="Go to top">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m6 14 6-6 6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 9v8" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
      </svg>
    </button>
  `;

  document.body.appendChild(wrap);

  const topButton = wrap.querySelector(".floating-action--top");

  const syncTopButton = () => {
    topButton?.classList.toggle("is-visible", window.scrollY > 260);
  };

  topButton?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

  syncTopButton();
  window.addEventListener("scroll", syncTopButton, { passive: true });
}

function initCursorFx() {
  if (prefersReducedMotion || !window.matchMedia("(pointer:fine)").matches) return;

  const root = document.createElement("div");
  root.className = "cursor-fx";
  root.innerHTML = `
    <div class="cursor-fx__trail"></div>
    <div class="cursor-fx__halo"></div>
    <div class="cursor-fx__ring"></div>
    <div class="cursor-fx__core"></div>
  `;

  const sparks = Array.from({ length: 10 }, (_, index) => {
    const spark = document.createElement("span");
    spark.className = "cursor-fx__spark";
    spark.dataset.index = String(index);
    root.appendChild(spark);
    return spark;
  });

  document.body.appendChild(root);

  let posX = 0;
  let posY = 0;
  let rafId = 0;
  let sparkIndex = 0;
  let lastSparkTime = 0;
  let lastMoveX = 0;
  let lastMoveY = 0;
  let settleTimer = 0;

  const render = () => {
    root.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
    rafId = 0;
  };

  const fireSpark = () => {
    const spark = sparks[sparkIndex % sparks.length];
    sparkIndex += 1;
    const angle = Math.random() * 360;
    const travel = 12 + Math.random() * 18;
    spark.style.setProperty("--angle", `${angle}deg`);
    spark.style.setProperty("--travel", `${travel}px`);
    spark.classList.remove("is-fired");
    void spark.offsetWidth;
    spark.classList.add("is-fired");
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      const dx = event.clientX - lastMoveX;
      const dy = event.clientY - lastMoveY;
      const distance = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      posX = event.clientX;
      posY = event.clientY;
      lastMoveX = event.clientX;
      lastMoveY = event.clientY;
      root.classList.add("is-active");

      if (!rafId) rafId = requestAnimationFrame(render);

      if (distance > 0.6) {
        root.style.setProperty("--cursor-angle", `${angle}deg`);
        root.style.setProperty("--cursor-speed", Math.min(2.4, 1 + distance / 16).toFixed(2));
        root.style.setProperty("--trail-length", `${Math.min(58, 20 + distance * 1.15)}px`);
      }

      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        root.style.setProperty("--cursor-speed", "1");
        root.style.setProperty("--trail-length", "18px");
      }, 80);

      const now = performance.now();
      if (now - lastSparkTime > 34) {
        fireSpark();
        lastSparkTime = now;
      }
    },
    { passive: true }
  );

  window.addEventListener("pointerdown", () => {
    root.classList.add("is-clicking");
    fireSpark();
    fireSpark();
    window.setTimeout(() => root.classList.remove("is-clicking"), 180);
  });

  window.addEventListener(
    "pointerover",
    (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const interactive = target?.closest(
        "a, button, input, textarea, select, label, summary, [role='button']"
      );
      root.classList.toggle("is-hovering", Boolean(interactive));
      if (interactive) fireSpark();
    },
    { passive: true }
  );

  window.addEventListener("pointerleave", () => {
    root.classList.remove("is-active");
  });
}

function initScrollEnergy() {
  if (prefersReducedMotion) return;

  const doc = document.documentElement;
  const wrap = document.createElement("div");
  wrap.className = "electric-progress";
  wrap.innerHTML = `
    <div class="electric-progress__bar"></div>
    <div class="electric-progress__rail"></div>
    <div class="electric-progress__node"></div>
  `;
  document.body.appendChild(wrap);
  const bar = wrap.querySelector(".electric-progress__bar");
  const node = wrap.querySelector(".electric-progress__node");

  let lastScroll = window.scrollY;
  let energy = 0;
  let ticking = false;
  let decayId = 0;

  const applyState = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    doc.style.setProperty("--scroll-progress", progress.toFixed(4));
    doc.style.setProperty("--scroll-energy", energy.toFixed(4));
    bar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
    node.style.opacity = progress > 0.02 ? "1" : "0";
  };

  const decayEnergy = () => {
    energy *= 0.92;
    if (energy < 0.02) energy = 0;
    applyState();
    if (energy > 0) {
      decayId = requestAnimationFrame(decayEnergy);
    } else {
      decayId = 0;
    }
  };

  const update = () => {
    const currentScroll = window.scrollY;
    const delta = Math.abs(currentScroll - lastScroll);
    lastScroll = currentScroll;
    energy = Math.min(1, Math.max(energy, delta / 120));
    applyState();
    ticking = false;

    if (decayId) cancelAnimationFrame(decayId);
    decayId = requestAnimationFrame(decayEnergy);
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  applyState();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", applyState);
}

function boot() {
  renderHeader();
  renderFooter();
  renderHeroSlider();
  renderMarquee();
  renderFeaturedFamilies("[data-home-families]", 4);
  renderFeaturedFamilies("[data-product-families]");
  renderReasons();
  renderBulletList("[data-about-features]", aboutFeatures);
  renderBulletList("[data-smart-advantages]", smartAdvantages);
  renderTables();
  renderModelShowcase();
  renderGallery("[data-product-gallery]");
  renderGallery("[data-about-gallery]", brochureGallery.slice(0, 3));
  renderContactDetails();
  initPreloader();

  initObserver();
  initTilt();
  initHeaderState();
  initForm();
  initCurrentYear();
  initFloatingActions();
  initCursorFx();
  initScrollEnergy();
}

boot();
