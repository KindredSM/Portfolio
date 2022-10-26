gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero__container", {
  scrollTrigger: {
    trigger: ".hero__container",
    start: "20px 80%",
  },
  duration: 1.5,
  y: -50,
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
  y: -30,
  opacity: 0,
  ease: "power4.out",
});
gsap.from(".projects__wrapper", {
  scrollTrigger: {
    trigger: ".projects__wrapper",
    start: "20px 80%",
  },
  duration: 1.5,
  y: -30,
  opacity: 0,
  ease: "bounce",
});
gsap.from("#contact", {
  scrollTrigger: {
    trigger: "#contact",
    start: "20px 80%",
  },
  duration: 1.5,
  opacity: 0,
  ease: "power4.out",
});

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );

// const renderer = new THREE.WebGL1Renderer();

// renderer.setSize(window.innerWidth, window.innerHeight);

// document.body.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// camera.position.z = 5;

// function animate() {
//   requestAnimationFrame(animate);

//   renderer.render(scene, camera);
// }

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
