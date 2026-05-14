



  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  hamburgerBtn.addEventListener('click', () => {
    const isOpen = mobileNavOverlay.classList.toggle('is-open');
    hamburgerBtn.classList.toggle('is-active');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNavOverlay.classList.remove('is-open');
      hamburgerBtn.classList.remove('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    });
  });







window.addEventListener('scroll', () => {
    if (rafId) cancelAnimationFrame(rafId);

    rafId = requestAnimationFrame(() => {
        if (heroImg && window.scrollY < window.innerHeight) {
            heroImg.style.transform = `scale(1.15) translateY(${window.scrollY * 0.35}px)`;
        }
        rafId = null;
    });
}, { passive: true });




  const statNumbers = document.querySelectorAll('.stat-number');

  const parseStat = (str) => {
    const match = str.match(/^(\d+)(.*)$/);
    if (match) return { num: parseInt(match[1]), suffix: match[2] };
    return { num: parseInt(str) || 0, suffix: '' };
  };

  statNumbers.forEach(stat => {
    const parsed = parseStat(stat.innerText);
    stat.setAttribute('data-target', parsed.num);
    stat.setAttribute('data-suffix', parsed.suffix);
    stat.innerText = '0' + parsed.suffix; 
  });

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stat = entry.target;
        const target = parseInt(stat.getAttribute('data-target'));
        const suffix = stat.getAttribute('data-suffix');
        let current = 0;

        const updateCounter = () => {
          const speed = 25; 
          current += (target - current) / speed;
          
          if (target - current < 0.5) {
            stat.innerText = target + suffix;
          } else {
            stat.innerText = Math.ceil(current) + suffix;
            requestAnimationFrame(updateCounter);
          }
        };
        
        updateCounter();
        observer.unobserve(stat);
      }
    });
  }, { threshold: 0.5 }); 

  statNumbers.forEach(stat => counterObserver.observe(stat));








  const form = document.querySelector('.form form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const showError = (input, message) => {
    input.classList.add('error');
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
      errorElement = document.createElement('span');
      errorElement.classList.add('error-message');
      input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    errorElement.innerText = message;
  };

  const clearError = (input) => {
    input.classList.remove('error');
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
      errorElement.remove();
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    if (nameInput.value.trim().length < 2) {
      showError(nameInput, 'Unesite validno ime i prezime.');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, 'Unesite ispravnu email adresu.');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    if (messageInput.value.trim().length < 10) {
      showError(messageInput, 'Poruka mora sadržavati barem 10 karaktera.');
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (isValid) {
      const submitBtn = form.querySelector('.contact-submit');
      const originalContent = submitBtn.innerHTML;
      
      submitBtn.innerHTML = 'PORUKA POSLANA ✓';
      submitBtn.style.background = 'var(--color-secondary)';
      submitBtn.style.color = '#fff';
      
      form.reset();
      
      setTimeout(() => {
        submitBtn.innerHTML = originalContent;
        submitBtn.style.background = '';
        submitBtn.style.color = '';
      }, 3000);
    }
  });










  (function () {
 
  const MATCH_DATE = new Date('2026-04-12T14:30:00Z');

  const els = {
    d: document.getElementById('cd-d'),
    h: document.getElementById('cd-h'),
    m: document.getElementById('cd-m'),
    s: document.getElementById('cd-s'),
    container: document.getElementById('countdown'),
  };

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function tick() {
    const diff = MATCH_DATE - Date.now();

    if (diff <= 0) {
      els.container.innerHTML = '<span class="cd-live">UTAKMICA U TOKU!</span>';
      return;
    }

    els.d.textContent = pad(Math.floor(diff / 86400000));
    els.h.textContent = pad(Math.floor((diff % 86400000) / 3600000));
    els.m.textContent = pad(Math.floor((diff % 3600000) / 60000));
    els.s.textContent = pad(Math.floor((diff % 60000) / 1000));

    setTimeout(tick, 1000);
  }

  tick();
})();
