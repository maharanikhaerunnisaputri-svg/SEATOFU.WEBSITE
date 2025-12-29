(() => {
  "use strict";

  // ===== SMOOTH SCROLL =====
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if(target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ===== HEADER SCROLL SHADOW =====
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    if(window.scrollY > 50) {
      header.classList.add("header-shadow");
    } else {
      header.classList.remove("header-shadow");
    }
  });

  // ===== BUTTON HOVER ANIMATION =====
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      btn.style.transform = "scale(1.05)";
      btn.style.transition = "transform 0.3s ease";
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "scale(1)";
    });
  });

  // ===== OPTIONAL: LAZY LOAD IMAGE =====
  const lazyImages = document.querySelectorAll("img");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        const img = entry.target;
        if(img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }
        observer.unobserve(img);
      }
    });
  }, { threshold: 0.1 });

  lazyImages.forEach(img => {
    if(img.dataset.src) observer.observe(img);
  });

})();

