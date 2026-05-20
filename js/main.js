/* Nick Jr's Burgers & Gyros — interactions */
(function () {
  "use strict";

  var nav = document.querySelector(".nav");
  var onScroll = function () {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  }

  // Scroll reveal
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // Menu filtering
  var tabs = document.querySelectorAll(".menu-tab");
  var groups = document.querySelectorAll(".menu-group");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var cat = tab.getAttribute("data-cat");
      tabs.forEach(function (t) { t.classList.remove("active"); });
      tab.classList.add("active");
      groups.forEach(function (g) {
        g.style.display = (cat === "all" || g.getAttribute("data-cat") === cat) ? "" : "none";
      });
    });
  });

  // Reservation form (front-end demo)
  document.querySelectorAll("form[data-demo]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var msg = form.querySelector(".form-success");
      if (msg) { msg.classList.add("show"); msg.scrollIntoView({ behavior: "smooth", block: "center" }); }
      form.reset();
    });
  });

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
