export const swipers = [];

export const createSwiper = (componentSelector, swiperSelector, classSelector, options) => {
  // Globals
  const arrows = '.slider-arrow';
  const pagination = '.swiper-navigation';
  // For Each
  $(componentSelector).each(function () {
    // Tag Instance
    let index = $(this).index();
    let instanceClass = `${classSelector}_${index}`;
    $(this).find(swiperSelector).addClass(instanceClass);
    $(this).find(arrows).addClass(instanceClass);
    $(this).find(pagination).addClass(instanceClass);

    // Build Options
    let swiperOptions = Object.assign({}, options, {
      speed: 250,
      navigation: {
        prevEl: `${arrows}.prev.${instanceClass}`,
        nextEl: `${arrows}.next.${instanceClass}`,
      },
      pagination: {
        el: `${pagination}.${instanceClass}`,
        type: 'bullets',
        bulletActiveClass: 'w-active',
        bulletClass: 'w-slider-dot',
      },
    });

    // Update Options
    for (let key in options) {
      if (key in swiperOptions) {
        swiperOptions[key] = options[key];
      }
    }

    // Init Slider
    let swiper = new Swiper(`${swiperSelector}.${instanceClass}`, swiperOptions);

    // Push to Global for possible references
    // store swiper instance in object using classSelector as key
    swipers[classSelector] = swipers[classSelector] || {};
    swipers[classSelector][index] = swiper;
  });
};

export const revealNav = () => {
  let nav = $('.nav');
  gsap.set(nav, {
    yPercent: -100,
    duration: 0.3,
    onComplete: () => {
      nav.addClass('fixed');
      $('.nav_logo').removeClass('white');
    },
  });
  setTimeout(() => {
    gsap.to(nav, { yPercent: 0, duration: 0.3 });
  }, 100);
};

export const revertNav = () => {
  let nav = $('.nav');
  gsap.to(nav, {
    yPercent: -100,
    duration: 0.3,
    onComplete: () => {
      nav.removeClass('fixed');
    },
  });
};

export const hideNav = () => {
  let nav = $('.nav');
  nav.removeClass('fixed');
  nav.attr('style', '');
};
