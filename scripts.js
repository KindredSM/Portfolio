const text = new SplitType("#description, .header");
gsap.registerPlugin(ScrollTrigger);

gsap.to(".char", {
  y: 0,
  stagger: 0.02,
  delay: 0.5,
  duration: 0.05,
});
gsap.from(".links__container", {
  duration: 1.5,
  delay: 0.5,
  y: 30,
  opacity: 0,
  ease: "power4.out",
});
gsap.from(".tech", {
  scrollTrigger: {
    trigger: ".tech",
    start: "20px 80%",
  },
  duration: 1.5,
  x: -20,
  opacity: 0,
  ease: "power4.out",
});
gsap.from(".bio__container", {
  scrollTrigger: {
    trigger: ".bio__container",
    start: "20px 80%",
  },
  duration: 1.5,
  x: 20,
  opacity: 0,
  ease: "power4.out",
});

gsap.from(".p__header", {
  scrollTrigger: {
    trigger: ".p__header",
    start: "20px 80%",
  },
  duration: 1.5,
  y: -20,
  opacity: 0,
  ease: "power4.out",
});
gsap.from(".projects__wrapper", {
  scrollTrigger: {
    trigger: ".projects__wrapper",
    start: "20px 80%",
  },
  duration: 1.5,
  y: -20,
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
