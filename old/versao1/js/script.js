// script.js — Smooth scroll, reveal on scroll, and simple contact handler

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(!target) return;
    target.scrollIntoView({behavior:'smooth', block:'start'});
    // small offset for sticky header (if needed)
    window.scrollBy(0, -10);
  });
});

// IntersectionObserver to reveal .animate elements
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -80px 0px',
  threshold: 0.12
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with .animate
document.querySelectorAll('.animate').forEach(el => observer.observe(el));

// Simple contact form submit handler (demo)
function submitContact(e){
  e.preventDefault();
  const name = document.getElementById('c-name').value.trim();
  const email = document.getElementById('c-email').value.trim();
  const msg = document.getElementById('c-msg').value.trim();
  const feedback = document.getElementById('contact-feedback');

  if(!name || !email || !msg){
    feedback.textContent = 'Preencha todos os campos.';
    return;
  }

  // Simulação de envio (substitua por integração real, ex: Formspree, API, etc.)
  feedback.textContent = 'Enviando...';
  setTimeout(() => {
    feedback.textContent = 'Mensagem enviada! Obrigado — retornaremos em até 48h.';
    document.querySelector('.contact-form').reset();
  }, 900);
}

// Optional: add simple header shrink on scroll
(function headerBehavior(){
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 30) header.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)';
    else header.style.boxShadow = 'none';
  });
})();
