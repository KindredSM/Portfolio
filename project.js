// Project page animations and functionality
document.addEventListener('DOMContentLoaded', function() {
  // Add fade-in animation to project content
  const projectElements = document.querySelectorAll('#project');
  projectElements.forEach(element => {
    element.classList.add('fade');
  });
  
  // Mobile menu toggle functionality for project pages
  const mobileMenuBtn = document.getElementById('mobile-menu');
  const navbarMenu = document.querySelector('.navbar__menu');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navbarMenu.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });
  }
});