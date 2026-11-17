(function () {
  "use strict";

  var root = document.documentElement;
  var form = document.getElementById("demo-form");
  var statusEl = document.getElementById("form-status");
  var menuBtn = document.querySelector(".menu-btn");
  var nav = document.getElementById("site-nav");
  var toggleBtns = document.querySelectorAll("[data-set-lang]");
  var metaDesc = document.querySelector('meta[name="description"]');
  var ogTitle = document.querySelector('meta[property="og:title"]');
  var ogDesc = document.querySelector('meta[property="og:description"]');
  var ogLocale = document.querySelector('meta[property="og:locale"]');
  var ogLocaleAlt = document.querySelector('meta[property="og:locale:alternate"]');
  var labelled = document.querySelectorAll("[data-aria-en]");
  var ogImage = document.querySelector('meta[property="og:image"]');
  var twTitle = document.querySelector('meta[name="twitter:title"]');
  var twDesc = document.querySelector('meta[name="twitter:description"]');
  var page = document.body.getAttribute("data-page") === "carriers" ? "carriers" : "home";

  var copy = {
    home: {
      en: {
        title: "Itqui — Back-office software for owner-operators",
        desc: "Back-office software for U.S. owner-operators and small fleets. Type in booked loads or paste the text from your rate confirmation; Itqui keeps the books. Custom setups for fleets with dispatchers.",
        og: "Back-office software for U.S. owner-operators and small fleets. Enter the loads you've booked; Itqui keeps the books. Custom setups for fleets with dispatchers.",
        locale: "en_US",
        image: "assets/itqui-black-gold-en.jpg",
        subject: function (company) {
          return "Demo request — " + (company || "Itqui");
        },
        bodyLabel: {
          name: "Name",
          company: "Company",
          email: "Email",
          phone: "Phone",
          size: "Fleet size",
          message: "Message"
        },
        sent: "Your email app should open with the request addressed to contacto@itqui.com.mx. If it does not, please write to us at that address."
      },
      es: {
        title: "Itqui — Software de back office para transportistas independientes",
        desc: "Software de back office para transportistas independientes y flotas pequeñas en Estados Unidos. Escriba las cargas contratadas o pegue el texto de la confirmación de tarifa; Itqui lleva la contabilidad. También configuraciones a la medida para flotas con despachadores.",
        og: "Software de back office para transportistas independientes y flotas pequeñas. Ingrese las cargas que ya contrató; Itqui lleva la contabilidad. También configuraciones a la medida para flotas con despachadores.",
        locale: "es_MX",
        image: "assets/itqui-negro-oro-es.jpg",
        subject: function (company) {
          return "Solicitud de demostración — " + (company || "Itqui");
        },
        bodyLabel: {
          name: "Nombre",
          company: "Empresa",
          email: "Correo",
          phone: "Teléfono",
          size: "Tamaño de flota",
          message: "Mensaje"
        },
        sent: "Su aplicación de correo debería abrirse con la solicitud dirigida a contacto@itqui.com.mx. Si no es así, escríbanos a esa dirección."
      }
    },
    carriers: {
      en: {
        title: "Itqui — Custom setup for fleets with dispatchers",
        desc: "A custom setup for fleets with multiple trucks and dispatchers. We connect to how you already get driver text messages, attach our bot, and integrate it into your system. Custom quote.",
        og: "A custom setup for fleets with dispatchers: we connect to how you already get driver texts, attach our bot, and integrate it into your system. Custom quote.",
        locale: "en_US",
        image: "assets/itqui-black-gold-en.jpg",
        subject: function (company) {
          return "Demo request — " + (company || "Itqui");
        },
        bodyLabel: {
          name: "Name",
          company: "Company",
          email: "Email",
          phone: "Phone",
          size: "Fleet size",
          message: "Message"
        },
        sent: "Your email app should open with the request addressed to contacto@itqui.com.mx. If it does not, please write to us at that address."
      },
      es: {
        title: "Itqui — Configuración a la medida para flotas con despachadores",
        desc: "Una configuración a la medida para flotas con varios camiones y despachadores. Nos conectamos a cómo ya reciben los mensajes de texto de los conductores, instalamos nuestro bot y lo integramos a su sistema. Cotización personalizada.",
        og: "Una configuración a la medida para flotas con despachadores: nos conectamos a cómo ya reciben los mensajes de los conductores, instalamos nuestro bot y lo integramos a su sistema. Cotización personalizada.",
        locale: "es_MX",
        image: "assets/itqui-negro-oro-es.jpg",
        subject: function (company) {
          return "Solicitud de demostración — " + (company || "Itqui");
        },
        bodyLabel: {
          name: "Nombre",
          company: "Empresa",
          email: "Correo",
          phone: "Teléfono",
          size: "Tamaño de flota",
          message: "Mensaje"
        },
        sent: "Su aplicación de correo debería abrirse con la solicitud dirigida a contacto@itqui.com.mx. Si no es así, escríbanos a esa dirección."
      }
    }
  };

  function currentLang() {
    return root.getAttribute("data-lang") === "es" ? "es" : "en";
  }

  function setLang(lang, persist) {
    if (lang !== "es") lang = "en";
    root.lang = lang;
    root.setAttribute("data-lang", lang);
    var t = copy[page][lang];
    document.title = t.title;
    if (metaDesc) metaDesc.setAttribute("content", t.desc);
    if (ogTitle) ogTitle.setAttribute("content", t.title);
    if (ogDesc) ogDesc.setAttribute("content", t.og);
    if (ogLocale) ogLocale.setAttribute("content", t.locale);
    if (ogLocaleAlt) ogLocaleAlt.setAttribute("content", lang === "es" ? "en_US" : "es_MX");
    labelled.forEach(function (el) {
      var label = el.getAttribute("data-aria-" + lang);
      if (label) el.setAttribute("aria-label", label);
    });
    if (ogImage) ogImage.setAttribute("content", t.image);
    if (twTitle) twTitle.setAttribute("content", t.title);
    if (twDesc) twDesc.setAttribute("content", t.og);
    toggleBtns.forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-set-lang") === lang ? "true" : "false");
    });
    if (persist !== false) {
      try { localStorage.setItem("itqui-lang", lang); } catch (e) {}
      try {
        var url = new URL(location.href);
        url.searchParams.set("lang", lang);
        history.replaceState(null, "", url);
      } catch (e) {}
    }
  }

  setLang(currentLang(), false);
  toggleBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.getAttribute("data-set-lang"), true);
    });
  });

  function closeNav() {
    document.body.classList.remove("nav-open");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var lang = currentLang();
      var t = copy[page][lang];
      var data = {
        name: (form.name.value || "").trim(),
        company: (form.company.value || "").trim(),
        email: (form.email.value || "").trim(),
        phone: (form.phone.value || "").trim(),
        size: (form.size.value || "").trim(),
        message: (form.message.value || "").trim()
      };
      var lines = [];
      Object.keys(t.bodyLabel).forEach(function (key) {
        if (data[key]) lines.push(t.bodyLabel[key] + ": " + data[key]);
      });
      var mailto =
        "mailto:contacto@itqui.com.mx?subject=" +
        encodeURIComponent(t.subject(data.company)) +
        "&body=" +
        encodeURIComponent(lines.join("\n"));
      if (statusEl) statusEl.textContent = t.sent;
      window.location.href = mailto;
    });
  }
})();
