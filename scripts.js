let camera, scene, renderer, sphere;

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.SphereGeometry(100, 100, 100);

  const material = new THREE.PointsMaterial({
    color: 0x000000,
    size: 0.3,
  });

  sphere = new THREE.Points(geometry, material);

  scene.add(sphere);

  camera.position.z = 200;
}

function animate() {
  requestAnimationFrame(animate);

  // sphere.rotation.x += 0.002;
  sphere.rotation.y += 0.002;

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);

init();
animate();

gsap.registerPlugin(ScrollTrigger);

// gsap.(".white__box", {
//   scrollTrigger: {
//     trigger: ".hero__container",
//   },
//   duration: 4,
//   x: 1300,
//   width: 0,
//   ease: "power4.out",
// });
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
  ease: "power4.out",
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
