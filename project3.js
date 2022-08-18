// const options = {
//   root: null,
// };

// const navbar = document.querySelector(".navbar");
// window.onscroll = () => {
//   if (window.scrollY > 50) {
//     navbar.classList.add("nav-active");
//   } else {
//     navbar.classList.remove("nav-active");
//   }
// };

// const observer = new IntersectionObserver(function (entries, observer) {
//   entries.forEach((entry) => {
//     if (!entry.isIntersecting) {
//       return;
//     }
//     console.log(entry.target);
//     entry.target.classList.toggle("fade");
//     observer.unobserve(entry.target);
//   });
// }, options);

// observer.observe(project);

// const menu = document.querySelector("#mobile-menu");
// const menuLinks = document.querySelector(".navbar__menu");

// // Display Mobile Menu
// const mobileMenu = () => {
//   menu.classList.toggle("is-active");
//   menuLinks.classList.toggle("active");
// };

// menu.addEventListener("click", mobileMenu);
