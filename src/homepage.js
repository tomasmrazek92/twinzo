$(document).ready(function () {
  // #region HeroAnimation
  function HeroAnimation() {
    let heroSteps = $('.hero_step');
    let isDesktop = $(window).width() > 991;

    // Functions
    function flipPhone() {
      // SETUP ELEMENTS
      let zoneEl = $("[js-scrollflip-element='zone']"),
        targetEl = $("[js-scrollflip-element='target']").first();

      gsap.registerPlugin(ScrollTrigger, Flip);
      ScrollTrigger.normalizeScroll(true);

      // SETUP TIMELINE
      let tl;
      if (tl) {
        tl.kill();
        gsap.set(targetEl, { clearProps: 'all' });
      }
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: $('.hero_step').eq(2),
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
      zoneEl.each(function (index) {
        let nextZoneEl = zoneEl.eq(index + 1);
        if (nextZoneEl.length) {
          let nextZoneDistance = nextZoneEl.offset().top + nextZoneEl.innerHeight() / 2;
          let thisZoneDistance = $(this).offset().top + $(this).innerHeight() / 2;
          let zoneDifference = nextZoneDistance - thisZoneDistance;
          tl.add(
            Flip.fit(targetEl[0], nextZoneEl[0], {
              duration: zoneDifference,
              ease: 'power2.inOut',
            })
          );
        }
      });
    }

    // 00
    const step00 = () => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSteps.eq(0),
          start: 'top top',
          end: 'center top',
          invalidateOnRefresh: true,
          toggleActions: 'play none none reverse',
          onEnter: () => {
            $('.nav').addClass('scrolled');
            $('.nav').addClass('pushed');
          },
          onLeaveBack: () => {
            $('.nav').removeClass('scrolled');
            $('.nav').removeClass('pushed');
          },
        },
      });
      tl.fromTo($('.nav_logo'), { color: 'white' }, { color: 'inherit' });
      tl.fromTo($('.container.cc-nav'), { maxWidth: '100%' }, { maxWidth: '90%' }, '<');
      tl.fromTo(
        $('.nav_menu-button-mask'),
        { width: 0 },
        { width: $('[data-nav-btn]').outerWidth() },
        '<'
      );
      tl.fromTo(
        $('[data-nav-btn]'),
        { xPercent: '100%', opacity: 0 },
        { xPercent: '0%', opacity: 1 },
        '<'
      );
    };

    // 01
    const step01 = () => {
      let heroVisual = $('.hp-hero_visual');
      let heroPhone = $('.hp-hero_phone');
      let heroVideo = $('.hp-hero_phone-video');

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSteps.eq(0),
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          onLeave: adjustImages,
        },
      });

      if (isDesktop) {
        tl.to(heroVisual, { width: '200%' });
      } else {
        tl.to(heroVisual, { height: '200%', paddingTop: '0%' });
      }
      tl.to(heroPhone, { rotate: -90, y: '-4rem' }, '<');
      tl.to(heroVideo, { rotate: 90 }, '<');
    };

    const step01_01 = () => {
      let contentToHide = $('[data-hero-hide]');
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSteps.eq(0),
          start: '100 top',
          toggleActions: 'play none none reverse',
        },
      });
      tl.to(contentToHide, { opacity: 0 }, '<');
    };

    // 02
    const dataStepText = $('[data-step-text]');
    const dataStepAnimation = (attr) => {
      gsap.to(dataStepText, {
        yPercent: 50,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          dataStepText.text(dataStepText.attr(attr));
          gsap.to(dataStepText, { yPercent: 0, opacity: 1 });
        },
      });
    };
    const step02 = () => {
      let section = $('.cc-hp-steps');
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSteps.eq(1),
          start: 'top top',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.set(section, { opacity: 0 });

      tl.to(section, { opacity: 1, duration: 0, delay: 0.2 });
    };

    const step02_00 = () => {
      let section = $('.cc-hp-steps');
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSteps.eq(1),
          start: 'top top',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        [$('.hp-steps_head'), $('.hp-steps_content')],
        { opacity: 0 },
        { opacity: 1, duration: 0.5, delay: 0.3 },
        '<'
      );
    };

    const step02_01 = () => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSteps.eq(1),
          start: 'top top',
          end: '33% top',
          toggleActions: 'play none none reverse',
          toggleClass: { targets: $('.hp-steps_head-item').eq(0), className: 'active' },
          onEnterBack: () => {
            dataStepAnimation('data-paragraph-01');
          },
        },
      });
    };

    const step02_02 = () => {
      let heroPhone = $('.hp-steps_visual-inner');
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSteps.eq(1),
          start: '33% top',
          end: '66% top',
          toggleActions: 'play none none reverse',
          toggleClass: { targets: $('.hp-steps_head-item').eq(1), className: 'active' },
          onEnter: () => {
            dataStepAnimation('data-paragraph-02');
          },
          onEnterBack: () => {
            dataStepAnimation('data-paragraph-02');
          },
        },
      });
    };

    const step02_03 = () => {
      let heroPhone = $('.hp-steps_visual-inner');
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSteps.eq(1),
          start: '66% top',
          toggleActions: 'play none none none',
          onLeaveBack: () => {
            $('.hp-steps_head-item').eq(2).removeClass('active');
            $('.section.cc-hp-steps').removeClass('cc-fullscreen');
            $('.nav').addClass('pushed');
          },
          onEnter: () => {
            $('.hp-steps_head-item').eq(2).addClass('active');
            $('.section.cc-hp-steps').addClass('cc-fullscreen');
            $('.nav').removeClass('pushed');
            dataStepAnimation('data-paragraph-03');
          },
          onLeave: flipPhone,
        },
      });
    };

    // 03
    const step03_00 = () => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSteps.eq(2),
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
      tl.to($('[data-steps-ui]'), { opacity: 0 }, '<');
    };
    const step03 = () => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $('.section.cc-hp-devices'),
          start: 'top center',
          toggleActions: 'play none none reverse',
        },
      });

      tl.to($('.hp-devices_desktop'), { opacity: 1 });
    };

    // 04
    const step04 = () => {
      let stepContent = $('[data-devices-content]');

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: stepContent,
          start: 'top center',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo($('[data-devices-ui]'), { opacity: 0 }, { opacity: 1, stagger: 0.2 });

      // Headline Loop
      let currentIndex = 0;
      function animateText() {
        let words = ['Anytime', 'Anywhere'];

        if (currentIndex < words.length) {
          const textElement = $('[data-devices-ui] h2');
          textElement.text(words[currentIndex]);

          let tl8 = gsap.timeline({
            scrollTrigger: {
              trigger: stepContent,
              start: 'top center',
            },
            onComplete: () => {
              // Increment to next word or loop to start
              currentIndex = (currentIndex + 1) % words.length;
              animateText(); // Restart animation with new word
            },
          });

          // Initial animation from 100% bottom to 0%
          tl8.fromTo(
            textElement,
            {
              y: '50%',
              opacity: 0,
            },
            {
              y: '0%',
              opacity: 1,
              duration: 2,
              ease: 'expo.out',
            }
          );
        }
      }
      animateText();
    };

    // Dark Menu
    const darkMenu = () => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $('.hp-types_wall'),
          start: 'top top',
          toggleActions: 'play none none reverse',
          markers: true,
          onEnter: () => {
            $('.nav').removeClass('scrolled');
            $('.nav').addClass('fixed');
          },
          onLeaveBack: () => {
            $('.nav').addClass('scrolled');
            $('.nav').removeClass('fixed');
          },
        },
      });
    };

    // main
    let main = gsap.timeline();

    main.add(step00);
    main.add(step01);
    main.add(step01_01);
    main.add(step02);
    main.add(step02_00);
    main.add(step02_01);
    main.add(step02_02);
    main.add(step02_03);
    main.add(step03_00);
    main.add(step03);
    main.add(step04);
    main.add(darkMenu);
  }

  // Init
  HeroAnimation();

  // #endregion

  // #region Types Animation
  function typeAnimation() {
    let typesSection = $('.hp-types_wall');
    let heading = typesSection.find('h2');
    let headingText = heading.attr('data-headline-text').split(',');
    let image = $('.hp-types_visual img');

    const typesStepAnimation = (index) => {
      let tl = gsap.timeline();
      tl.to(heading, {
        yPercent: 50,
        opacity: 0,
        duration: 0.3,
      });
      tl.to(heading, { text: headingText[index], duration: 0 });
      tl.to([heading, image.eq(index)], { yPercent: 0, opacity: 1 });
      return tl;
    };

    let main = gsap.timeline({
      scrollTrigger: {
        trigger: typesSection,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    // Add animations for the other steps
    for (let i = 1; i < headingText.length; i++) {
      main.add(typesStepAnimation(i));
    }

    // Add the first step animation only for scrolling back
    ScrollTrigger.create({
      trigger: typesSection,
      start: 'top top',
      end: 'bottom bottom',
      onEnterBack: () => {
        typesStepAnimation(0);
      },
    });
  }
  function typePocket() {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $('[data-types-pocket]'),
        start: 'center bottom',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    tl.fromTo(
      [$('.hp-types_visual-overlay'), $('[data-types-pocket] h2')],
      { opacity: 0, yPercent: 50 },
      { opacity: 1, yPercent: 0, stagger: 0.3 }
    );
  }

  // Init
  typeAnimation();
  typePocket();

  // #endregion

  // #region Swiper
  const swiper = new Swiper('.hp-testimonials_slider', {
    // Optional parameters
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    autoHeight: true,
    loop: true,
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-arrow.next',
      prevEl: '.swiper-arrow.prev',
    },
  });
  // #endregion

  // #region Helpers

  // ___ Match the size of hero and following image
  function adjustImages() {
    var img1Width = $('.hp-hero_phone').outerWidth();
    var img1Height = $('.hp-hero_phone').height();

    // Set the width of the second image to the height of the first image and vice versa
    $('.hp-steps_visual').css({
      width: img1Height,
      height: img1Width,
    });
  }

  adjustImages();

  $(window).resize(adjustImages);

  // ___ Refresh the page on resize
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  window.addEventListener(
    'resize',
    debounce(function () {
      location.reload();
    }, 300)
  );

  // #endregion
});
