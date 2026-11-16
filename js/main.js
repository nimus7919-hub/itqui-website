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
  var ogImage = document.querySelector('meta[property="og:image"]');

  var copy = {
    en: {
      title: "Itqui — Carrying your updates",
      desc: "Itqui is a dispatch bot that keeps your TMS or CRM updated from driver texts — status and location — so dispatchers spend less time chasing updates.",
      og: "A dispatch bot that carries status and location updates from driver texts into your TMS or CRM.",
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
      title: "Itqui — Llevamos tus actualizaciones",
      desc: "Itqui es un bot de despacho que mantiene su TMS o CRM actualizado a partir de los mensajes de los conductores — estatus y ubicación — para que los despachadores dediquen menos tiempo a perseguir actualizaciones.",
      og: "Un bot de despacho que lleva las actualizaciones de estatus y ubicación de los mensajes de los conductores a su TMS o CRM.",
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
  };

  function currentLang() {
    return root.getAttribute("data-lang") === "es" ? "es" : "en";
  }

  function setLang(lang, persist) {
    if (lang !== "es") lang = "en";
    root.lang = lang;
    root.setAttribute("data-lang", lang);
    var t = copy[lang];
    document.title = t.title;
    if (metaDesc) metaDesc.setAttribute("content", t.desc);
    if (ogTitle) ogTitle.setAttribute("content", t.title);
    if (ogDesc) ogDesc.setAttribute("content", t.og);
    if (ogLocale) ogLocale.setAttribute("content", t.locale);
    if (ogImage) ogImage.setAttribute("content", t.image);
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
      var t = copy[lang];
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
