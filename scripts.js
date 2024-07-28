gsap.registerPlugin(ScrollTrigger);

gsap.from(".header, #description, .tagline", {
  opacity: 0,
  y: 20,
  duration: 0.8,
  stagger: 0.2,
  ease: "power2.out",
});

gsap.from(".links__container", {
  opacity: 0,
  y: 10,
  duration: 0.5,
  delay: 0.8,
  ease: "power1.out",
});

gsap.from(".bio__header", {
  scrollTrigger: {
    trigger: ".bio__header",
    start: "top 85%",
  },
  duration: 0.5,
  y: 15,
  opacity: 0,
  ease: "power1.out",
});

gsap.from(".tech-item", {
  scrollTrigger: {
    trigger: ".tech-container",
    start: "top 85%",
  },
  duration: 0.5,
  scale: 0.95,
  opacity: 0,
  stagger: 0.05,
  ease: "power1.out",
});

gsap.from(".p__header", {
  scrollTrigger: {
    trigger: ".p__header",
    start: "top 85%",
  },
  duration: 0.5,
  y: 15,
  opacity: 0,
  ease: "power1.out",
});

gsap.from(".project__item", {
  scrollTrigger: {
    trigger: ".projects__wrapper",
    start: "top 85%",
  },
  duration: 0.5,
  y: 20,
  opacity: 0,
  stagger: 0.1,
  ease: "power1.out",
});

gsap.from(".email__footer", {
  scrollTrigger: {
    trigger: "#contact",
    start: "top 95%",
  },
  duration: 0.5,
  y: 15,
  opacity: 0,
  ease: "power1.out",
});

const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");

const mobileMenu = () => {
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
};

menu.addEventListener("click", mobileMenu);

const hideMobileMenu = () => {
  const menuBars = document.querySelector(".is-active");
  if (window.innerWidth <= 768 && menuBars) {
    menu.classList.toggle("is-active");
    menuLinks.classList.remove("active");
  }
};

menuLinks.addEventListener("click", hideMobileMenu);
