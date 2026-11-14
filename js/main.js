/* Atlas — portfolio interactions */
(function () {
  "use strict";

  /* ---------- current year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- sticky nav shadow ---------- */
  var nav = document.querySelector(".nav");
  var onScroll = function () {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 10);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    // close menu when a link is clicked
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- animated counters ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count") || "0");
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1400;
    var start = null;
    function frame(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      var val = (target * eased).toFixed(decimals);
      el.textContent = prefix + val + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    var cio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- lightbox gallery ---------- */
  var shots = Array.prototype.slice.call(document.querySelectorAll(".shot"));
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbCaption = document.getElementById("lbCaption");
  var lbClose = document.getElementById("lbClose");
  var lbPrev = document.getElementById("lbPrev");
  var lbNext = document.getElementById("lbNext");
  var current = 0;
  var lastFocus = null;

  function show(index) {
    current = (index + shots.length) % shots.length;
    var shot = shots[current];
    var img = shot.querySelector("img");
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCaption.textContent = shot.getAttribute("data-caption") || img.alt || "";
  }

  function openLb(index) {
    lastFocus = document.activeElement;
    show(index);
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lbClose.focus();
    document.addEventListener("keydown", onKey);
  }

  function closeLb() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onKey);
    if (lastFocus) lastFocus.focus();
  }

  function onKey(e) {
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  }

  shots.forEach(function (shot, i) {
    shot.addEventListener("click", function () { openLb(i); });
  });
  if (lightbox) {
    lbClose.addEventListener("click", closeLb);
    lbPrev.addEventListener("click", function () { show(current - 1); });
    lbNext.addEventListener("click", function () { show(current + 1); });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLb();
    });
  }

  /* ---------- contact form (mailto) ---------- */
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function () {
      var name = form.querySelector('[name="name"]');
      var biz = form.querySelector('[name="business"]');
      var msg = form.querySelector('[name="message"]');
      var subject = encodeURIComponent(
        "Portfolio inquiry from " + (name && name.value ? name.value : "a visitor")
      );
      var body = encodeURIComponent(
        "Name: " + (name ? name.value : "") +
        "\nBusiness: " + (biz ? biz.value : "") +
        "\n\nMessage:\n" + (msg ? msg.value : "")
      );
      form.action = "mailto:hello@atlas-studio.example?subject=" + subject + "&body=" + body;
      // allow the default mailto submission to proceed
    });
  }
})();
