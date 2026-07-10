/* --------------------------------------------------
   M Shradha — Academic Portfolio Interactions
-------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

  // Dynamic Year in Footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* --------------------------------------------------
     Theme Toggle (Light / Dark)
  -------------------------------------------------- */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = themeToggleBtn.querySelector('i');
  const themeText = themeToggleBtn.querySelector('.theme-text');
  
  // Check local storage or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const setDarkTheme = () => {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.className = 'fa-solid fa-sun';
    themeText.textContent = 'Light Mode';
    localStorage.setItem('theme', 'dark');
  };
  
  const setLightTheme = () => {
    document.documentElement.removeAttribute('data-theme');
    themeIcon.className = 'fa-solid fa-moon';
    themeText.textContent = 'Dark Mode';
    localStorage.setItem('theme', 'light');
  };

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    setDarkTheme();
  } else {
    setLightTheme();
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      setLightTheme();
    } else {
      setDarkTheme();
    }
  });

  /* --------------------------------------------------
     Mobile Navigation Overlay
  -------------------------------------------------- */
  const menuToggle = document.getElementById('menuToggle');
  const closeMenu = document.getElementById('closeMenu');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleOverlay = () => {
    mobileMenuOverlay.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  };

  if (menuToggle && closeMenu && mobileMenuOverlay) {
    menuToggle.addEventListener('click', toggleOverlay);
    closeMenu.addEventListener('click', toggleOverlay);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuOverlay.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
  });

  /* --------------------------------------------------
     Contact Form Validation & Submission
  -------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      // Basic validation check
      if (!name || !email || !message) {
        alert('Please fill out all required fields.');
        return;
      }

      // Mock API call / Email sending
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      setTimeout(() => {
        // Success feedback
        submitBtn.style.display = 'none';
        formSuccess.style.display = 'flex';
        
        // Reset inputs
        contactForm.reset();
        
        // Re-enable form after a delay
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
          submitBtn.style.display = 'block';
          formSuccess.style.display = 'none';
        }, 5000);
      }, 1500);
    });
  }

  /* --------------------------------------------------
     Active Link Highlight on Scroll
  -------------------------------------------------- */
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    let scrollPos = window.scrollY + 100; // Offset for navbar

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll);

  /* --------------------------------------------------
     Interactive Certificate Slider & Vault Register
  -------------------------------------------------- */
  const listItems = document.querySelectorAll('.vault-list-item');
  const sliderImg = document.getElementById('sliderImg');
  const sliderPlaceholder = document.getElementById('sliderPlaceholder');
  const sliderTitle = document.getElementById('sliderTitle');
  const sliderIssuer = document.getElementById('sliderIssuer');
  const sliderCurrent = document.getElementById('sliderCurrent');
  const sliderTotal = document.getElementById('sliderTotal');
  const prevSlideBtn = document.getElementById('prevSlideBtn');
  const nextSlideBtn = document.getElementById('nextSlideBtn');

  let currentSlide = 0;
  const totalSlides = listItems.length;

  if (sliderTotal) {
    sliderTotal.textContent = totalSlides;
  }

  const updateSlider = (index) => {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    currentSlide = index;

    listItems.forEach((item, i) => {
      if (i === currentSlide) {
        item.classList.add('active');
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        item.classList.remove('active');
      }
    });

    const activeItem = listItems[currentSlide];
    const imageSrc = activeItem.dataset.image;
    const title = activeItem.dataset.title;
    const issuer = activeItem.dataset.issuer;

    if (sliderTitle) sliderTitle.textContent = title;
    if (sliderIssuer) sliderIssuer.textContent = issuer;
    if (sliderCurrent) sliderCurrent.textContent = currentSlide + 1;

    if (imageSrc && imageSrc !== 'placeholder') {
      if (sliderImg) {
        sliderImg.src = imageSrc;
        sliderImg.style.display = 'block';
      }
      if (sliderPlaceholder) sliderPlaceholder.style.display = 'none';
    } else {
      if (sliderImg) {
        sliderImg.style.display = 'none';
      }
      if (sliderPlaceholder) {
        sliderPlaceholder.style.display = 'flex';
        const placeholderTitle = sliderPlaceholder.querySelector('h4');
        if (placeholderTitle) placeholderTitle.textContent = title;
      }
    }
  };

  listItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      updateSlider(index);
    });
  });

  if (prevSlideBtn) {
    prevSlideBtn.addEventListener('click', () => {
      updateSlider(currentSlide - 1);
    });
  }

  if (nextSlideBtn) {
    nextSlideBtn.addEventListener('click', () => {
      updateSlider(currentSlide + 1);
    });
  }

  /* --------------------------------------------------
     Certificate Image Lightbox Modal
  -------------------------------------------------- */
  const certModal = document.getElementById('certModal');
  const certModalImg = document.getElementById('certModalImg');
  const certModalCaption = document.getElementById('certModalCaption');
  const closeCertModal = document.getElementById('closeCertModal');

  // Lightbox Trigger 1: Main Slider Image Click
  if (sliderImg) {
    sliderImg.addEventListener('click', () => {
      const currentImgSrc = sliderImg.getAttribute('src');
      if (currentImgSrc && currentImgSrc !== '') {
        certModal.style.display = 'block';
        certModalImg.src = currentImgSrc;
        certModalCaption.textContent = sliderTitle ? sliderTitle.textContent : "Certificate Preview";
        document.body.classList.add('no-scroll');
      }
    });
  }

  // Lightbox Trigger 2: Timeline "View Completion Certificate" Buttons
  const timelineCertButtons = document.querySelectorAll('.btn-timeline-cert');
  timelineCertButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const imageSrc = btn.dataset.image;
      const captionText = btn.dataset.caption || "Certificate Preview";
      
      certModal.style.display = 'block';
      certModalImg.src = imageSrc;
      certModalCaption.textContent = captionText;
      document.body.classList.add('no-scroll');
    });
  });

  if (closeCertModal && certModal) {
    closeCertModal.addEventListener('click', () => {
      certModal.style.display = 'none';
      document.body.classList.remove('no-scroll');
    });

    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) {
        certModal.style.display = 'none';
        document.body.classList.remove('no-scroll');
      }
    });
  }

});