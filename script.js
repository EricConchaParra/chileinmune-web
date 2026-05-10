const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const slides = [...document.querySelectorAll(".hero-slide")];
const dots = [...document.querySelectorAll("[data-dot]")];
const prev = document.querySelector("[data-prev]");
const next = document.querySelector("[data-next]");
const testimonials = [...document.querySelectorAll(".testimonial")];

let activeSlide = 0;
let activeTestimonial = 0;
let slideTimer;
let testimonialTimer;

function setHeaderState() {
  header.classList.toggle("is-scrolled", window.scrollY > 10);
}

function showSlide(index) {
  activeSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === activeSlide);
  });

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === activeSlide);
  });
}

function restartSlideTimer() {
  window.clearInterval(slideTimer);
  slideTimer = window.setInterval(() => showSlide(activeSlide + 1), 6500);
}

function showTestimonial(index) {
  activeTestimonial = (index + testimonials.length) % testimonials.length;

  testimonials.forEach((testimonial, testimonialIndex) => {
    testimonial.classList.toggle("is-active", testimonialIndex === activeTestimonial);
  });
}

function closeNav() {
  nav.classList.remove("is-open");
  document.body.classList.remove("nav-open");
  navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  document.body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    closeNav();
  }
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    showSlide(Number(dot.dataset.dot));
    restartSlideTimer();
  });
});

prev.addEventListener("click", () => {
  showSlide(activeSlide - 1);
  restartSlideTimer();
});

next.addEventListener("click", () => {
  showSlide(activeSlide + 1);
  restartSlideTimer();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();
showSlide(0);
restartSlideTimer();

testimonialTimer = window.setInterval(() => {
  showTestimonial(activeTestimonial + 1);
}, 5200);

window.addEventListener("beforeunload", () => {
  window.clearInterval(slideTimer);
  window.clearInterval(testimonialTimer);
});
