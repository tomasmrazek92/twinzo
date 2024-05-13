import { createSwiper } from '$utils/globalFunctions';

// ----- SWIPERS
if ($('.company_content').length) {
  createSwiper('.company_content', '.company_slider', 'company-swiper', {
    slidesPerView: 2,
    spaceBetween: 16,
  });
}

if ($('.career_component').length) {
  createSwiper('.career_component', '.career_slider', 'career-swiper', {
    slidesPerView: 1.25,
    spaceBetween: 16,
    breakpoints: {
      // when window width is >= 480px
      479: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
    },
  });
}

if ($('.stories_component').length) {
  const slideLength = $('.stories_slider .swiper-slide').length;
  if (slideLength === 0) {
    $('.stories_component').closest('.section').hide();
  } else if (slideLength === 1) {
    $('.stories_slider .swiper-slide').css('max-width', '54rem');
    $('.stories_component .arrows-group').hide();
  } else {
    createSwiper('.stories_component', '.stories_slider-cms', 'stories-swiper', {
      slidesPerView: 'auto',
      spaceBetween: 16,
    });
  }
}

if ($('.platform-prev_component').length) {
  createSwiper('.platform-prev_component', '.platform-prev_slider', 'platprevs-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 0,
  });
}
