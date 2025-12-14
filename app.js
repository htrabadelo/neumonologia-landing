const CONFIG = {
  // ARS purchase (Mercado Pago). You can paste an alias (link.mercadopago.com.ar/<alias>)
  // or a full URL (mpago.la/... or https://...).
  mpArsAliasOrLink: "acanto.taco.poso.mp",

  whatsappNumberE164: "5491166335192",
};

const I18N = {
  es: {
    brand_title: "Neumonología Basada en Anatomía Individual",
    brand_subtitle: "Más allá de Knudson",
    hero_h1: "Una guía práctica y moderna de neumonología de precisión.",
    hero_lead:
      "Integra anatomía individual, fisiología y tomografía cuantitativa para mejorar la toma de decisiones clínicas.",
    cta_buy_ars: "Comprar en ARS (Mercado Pago)",
    cta_buy_usd: "Comprar en USD (coordinar)",
    cta_whatsapp: "Consultar por WhatsApp",
    cta_note: "Si el botón de compra no abre, falta cargar el alias/link de Mercado Pago.",
    b1: "Pensado para neumonólogos, clínicos y residentes.",
    b2: "Enfoque basado en anatomía individual (más allá de valores “promedio”).",
    b3: "Lenguaje claro + estructura de consulta rápida.",
    value_h2: "Qué vas a encontrar",
    c1_h: "Marco conceptual",
    c1_p: "Por qué la anatomía individual importa y cómo aterrizarlo a la práctica cotidiana.",
    c2_h: "Herramientas clínicas",
    c2_p: "Interpretación integrada de espirometría, volúmenes, DLCO y TAC cuantitativa.",
    c3_h: "Aplicación práctica",
    c3_p: "Casos, criterios y puntos de control para decisiones más consistentes.",
    author_h2: "Autor",
    author_role: "Neumonólogo",
    author_cta: "Escribime por WhatsApp",
    faq_h2: "Preguntas frecuentes",
    faq1_q: "¿Qué estoy comprando?",
    faq1_a: "La versión digital del libro (PDF). Si querés versión impresa, consultame por WhatsApp.",
    faq2_q: "¿Cómo recibo el libro?",
    faq2_a: "Luego del pago coordinamos el envío del PDF (WhatsApp o email), según prefieras.",
    faq3_q: "¿Está en inglés?",
    faq3_a: "Sí, existe versión en inglés. Pedímela por WhatsApp.",
    cta2_h2: "¿Listo para avanzar?",
    cta2_p: "Comprá en segundos o escribime para resolver dudas.",
    footer_author: "Dr. Hugo Trabadelo",
    footer_note: "Landing informativa. Pago por Mercado Pago.",
  },
  en: {
    brand_title: "Pulmonology Based on Individual Anatomy",
    brand_subtitle: "Beyond Knudson",
    hero_h1: "A practical, modern guide to precision pulmonology.",
    hero_lead:
      "Integrates individual anatomy, physiology and quantitative CT to support better clinical decisions.",
    cta_buy_ars: "Buy in ARS (Mercado Pago)",
    cta_buy_usd: "Buy in USD (coordinate)",
    cta_whatsapp: "Ask on WhatsApp",
    cta_note: "If the buy button doesn’t open, the Mercado Pago alias/link is missing.",
    b1: "For pulmonologists, general physicians and residents.",
    b2: "Individual-anatomy approach (beyond “average” predicted values).",
    b3: "Clear writing + quick-reference structure.",
    value_h2: "What you’ll get",
    c1_h: "Conceptual framework",
    c1_p: "Why individual anatomy matters and how to apply it in daily practice.",
    c2_h: "Clinical tools",
    c2_p: "Integrated interpretation of spirometry, lung volumes, DLCO and quantitative CT.",
    c3_h: "Practical application",
    c3_p: "Cases, criteria and checkpoints for more consistent decisions.",
    author_h2: "Author",
    author_role: "Pulmonologist",
    author_cta: "Message me on WhatsApp",
    faq_h2: "FAQ",
    faq1_q: "What am I buying?",
    faq1_a: "The digital edition (PDF). For a printed edition, message me on WhatsApp.",
    faq2_q: "How do I receive it?",
    faq2_a: "After payment, we coordinate delivery of the PDF (WhatsApp or email).",
    faq3_q: "Is it available in English?",
    faq3_a: "Yes. Ask for the English edition on WhatsApp.",
    cta2_h2: "Ready to proceed?",
    cta2_p: "Buy in seconds or message me with questions.",
    footer_author: "Dr. Hugo Trabadelo",
    footer_note: "Informational landing page. Payment via Mercado Pago.",
  },
};

function buildMercadoPagoUrl(aliasOrLink) {
  const v = (aliasOrLink || "").trim();
  if (!v) return null;
  if (v.startsWith("http://") || v.startsWith("https://")) return v;
  if (v.startsWith("mpago.la/")) return `https://${v}`;
  return `https://link.mercadopago.com.ar/${encodeURIComponent(v)}`;
}

function buildWhatsAppUrl(numberE164) {
  const v = (numberE164 || "").replace(/\D/g, "");
  if (!v) return null;
  return `https://wa.me/${v}`;
}

function buildWhatsAppUrlWithText(numberE164, text) {
  const base = buildWhatsAppUrl(numberE164);
  if (!base) return null;
  const t = (text || "").trim();
  if (!t) return base;
  return `${base}?text=${encodeURIComponent(t)}`;
}

function setLang(lang) {
  const dict = I18N[lang] || I18N.es;

  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key && dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll(".lang").forEach((btn) => {
    const isActive = btn.getAttribute("data-lang") === lang;
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  const coverImg = document.getElementById("coverImg");
  if (coverImg) {
    coverImg.src = lang === "en" ? "assets/tapa_en.jpg" : "assets/tapa_es.jpg";
  }

  localStorage.setItem("landing_lang", lang);
}

function wireLinks() {
  const mpArsUrl = buildMercadoPagoUrl(CONFIG.mpArsAliasOrLink);
  const waUrl = buildWhatsAppUrl(CONFIG.whatsappNumberE164);

  const waUsdEs = buildWhatsAppUrlWithText(
    CONFIG.whatsappNumberE164,
    "Hola! Quiero comprar el libro en USD. ¿Me pasás el monto y cómo se hace el pago?"
  );

  const waUsdEn = buildWhatsAppUrlWithText(
    CONFIG.whatsappNumberE164,
    "Hi! I want to buy the book in USD. Can you share the amount and how payment works?"
  );

  // Store both; we pick based on current language at click time.
  const waUsdByLang = { es: waUsdEs, en: waUsdEn };

  const buyArsButtons = ["buyArsBtn", "buyArsBtn2"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  buyArsButtons.forEach((a) => {
    if (mpArsUrl) {
      a.href = mpArsUrl;
    } else {
      a.href = "#";
      a.addEventListener("click", (ev) => {
        ev.preventDefault();
        alert(
          "Falta configurar el alias/link de Mercado Pago en app.js (CONFIG.mpArsAliasOrLink).\nMissing Mercado Pago alias/link in app.js."
        );
      });
    }
  });

  const buyUsdButtons = ["buyUsdBtn", "buyUsdBtn2"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  buyUsdButtons.forEach((a) => {
    a.href = waUrl || "#";
    a.addEventListener("click", () => {
      const lang = document.documentElement.lang === "en" ? "en" : "es";
      const url = waUsdByLang[lang] || waUrl;
      if (url) a.href = url;
    });
  });

  const waButtons = ["waBtn", "waBtn2", "waBtn3"].map((id) => document.getElementById(id)).filter(Boolean);
  waButtons.forEach((a) => {
    if (waUrl) a.href = waUrl;
  });
}

(function init() {
  document.getElementById("year").textContent = String(new Date().getFullYear());

  wireLinks();

  const stored = localStorage.getItem("landing_lang");
  const initial = stored === "en" || stored === "es" ? stored : "es";
  setLang(initial);

  document.querySelectorAll(".lang").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang")));
  });
})();
