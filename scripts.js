gsap.registerPlugin(ScrollTrigger);

gsap.from(".github", {
  scrollTrigger: {
    trigger: ".links__container",
    start: "20px 80%",
  },
  duration: 1,
  y: -100,
  opacity: -1,
  ease: "power4.out",
});
gsap.from(".email", {
  scrollTrigger: {
    trigger: ".links__container",
    start: "20px 80%",
  },
  duration: 1.3,
  y: -90,
  opacity: -1,
  ease: "power4.out",
});
gsap.from(".cv", {
  scrollTrigger: {
    trigger: ".links__container",
    start: "20px 80%",
  },
  duration: 1.5,
  y: -80,
  opacity: -1,
  ease: "power4.out",
});
gsap.from(".linkedin", {
  scrollTrigger: {
    trigger: ".links__container",
    start: "20px 80%",
  },
  duration: 2,
  y: -70,
  opacity: -1,
  ease: "power4.out",
});

gsap.from(".bio__container", {
  scrollTrigger: {
    trigger: ".bio__container",
    start: "20px 80%",
  },
  duration: 1.5,
  y: -50,
  opacity: 0,
  ease: "power4.out",
});

gsap.from(".p__header", {
  scrollTrigger: {
    trigger: ".p__header",
    start: "20px 80%",
  },
  duration: 1.5,
  x: -50,
  opacity: 0,
  ease: "power4.out",
});

const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");
const navLogo = document.querySelector("#navbar__logo");

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
navLogo.addEventListener("click", hideMobileMenu);
