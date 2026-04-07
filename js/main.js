// ==========================================
// ARRECIFE RESTAURANTE - MAIN JS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Navigation ---
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const body = document.body;

  // Create overlay element
  const overlay = document.createElement('div');
  overlay.classList.add('nav-overlay');
  body.appendChild(overlay);

  function toggleMenu() {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
    body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    overlay.classList.remove('active');
    body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  // Close menu on nav link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // --- Header scroll effect ---
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
  });

  // --- Active nav link on scroll ---
  const sections = document.querySelectorAll('section[id]');

  function highlightNav() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (navLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLink.style.color = '#0D6B6E';
          navLink.style.fontWeight = '700';
        } else {
          navLink.style.color = '';
          navLink.style.fontWeight = '';
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNav);

  // --- Reservation form ---
  const reservaForm = document.getElementById('reserva-form');

  if (reservaForm) {
    reservaForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(reservaForm);
      const name = formData.get('name');
      const email = formData.get('email');

      // Show confirmation (frontend only)
      const wrapper = reservaForm.parentElement;
      const originalContent = wrapper.innerHTML;

      wrapper.innerHTML = `
        <div style="text-align: center; padding: 40px 20px;">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#0D6B6E" stroke-width="2" style="margin-bottom: 20px;">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <h3 style="font-family: 'Playfair Display', serif; font-size: 1.5rem; margin-bottom: 10px; color: #333;">Gracias, ${name}!</h3>
          <p style="color: #666; margin-bottom: 20px;">Tu solicitud de reserva ha sido recibida. Te contactaremos pronto a <strong>${email}</strong>.</p>
          <button class="btn btn-outline" onclick="location.reload()" style="cursor: pointer;">Hacer otra reserva</button>
        </div>
      `;
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Fade-in animation on scroll ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply to cards and sections
  document.querySelectorAll('.menu-card, .galeria-item, .contacto-item, .historia-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

});
