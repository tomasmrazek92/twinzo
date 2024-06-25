let tl = gsap.timeline({ paused: true });

tl.to('.pricing_price-tag', { yPercent: -100 });

$('#yearly').on('click', function () {
  tl.reverse();

  $('.pricing_toggle-item').removeClass('cc-active');
  $(this).addClass('cc-active');
});

$('#monthly').on('click', function () {
  tl.play();

  $('.pricing_toggle-item').removeClass('cc-active');
  $(this).addClass('cc-active');
});

$(document).ready(function () {
  let logoTl;

  function initLogo() {
    killLogoTl();

    logoTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.nav_homepage-big',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    logoTl.add(shrinkLogo());
  }

  const shrinkLogo = () => {
    let tl = gsap.timeline();

    tl.to('.nav_logo', {
      width: '7.5rem',
      left: 'auto',
      y: '0%',
    });

    return tl;
  };

  function killLogoTl() {
    if (logoTl) {
      logoTl.kill();
      gsap.set('.nav_logo', { clearProps: 'all' });
      shrinkLogo();
    }
  }

  // Homepage Logo
  if (window.location.pathname === '/') {
    // Initial animation setup
    initLogo();

    // SETUP RESIZE
    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        initLogo();
      }, 250);
    });
  }

  function killHomepageAnimation() {
    if (window.location.pathname === '/') {
      $('.nav_logo').removeClass('start');
      killLogoTl;
    }
  }

  function initHomepageAnimation() {
    if (window.location.pathname === '/') {
      $('.nav_logo').addClass('start');
      initLogo();
    }
  }

  let menuOpen = false;
  let scrollPosition;

  $('.cc-nav').on('click', function (event) {
    if ($(event.target).closest('.w-nav-button, .nav_menu-inner_link').length) {
      openMenu();
    } else if (menuOpen) {
      $('.nav').removeClass('open');
      menuOpen = false;
      initHomepageAnimation();
    }
  });

  const openMenu = () => {
    if (!menuOpen) {
      scrollPosition = $(window).scrollTop();
      $('html, body').scrollTop(0).addClass('overflow-hidden');
      $('.nav').addClass('open');
      killHomepageAnimation();
    } else {
      $('html, body').scrollTop(scrollPosition).removeClass('overflow-hidden');
      $('.nav').removeClass('open');
      initHomepageAnimation();
    }
    menuOpen = !menuOpen;
  };
});
