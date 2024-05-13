import { DateTime } from 'luxon';

$(document).ready(() => {
  // ----- HERO Animation
  ScrollTrigger.matchMedia({
    // Have the animation only on desktop
    '(min-width: 992px)': function () {
      // Hero Section
      $('.hero-intro').each(function () {
        let heroIntro = $(this);
        let heroWrap = $(this).find('.hero-intro_wrap');
        let videoBox = $(this).find('.header01_visual-box');
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: $(this),
            start: 'top top',
            end: 'center top',
            scrub: 0.2,
            markers: true,
            invalidateOnRefresh: true,
          },
        });

        // --- Set Section
        let videoBoxHeight;
        let videoBoxWidth;

        function setSectionHeight() {
          $(heroIntro).height(heroWrap.height() * 2);
          videoBoxHeight = $('.header01_visual-split').height();
          videoBoxWidth = $('.header01_visual-split').width();
        }

        function setVideoWidth() {
          let paddingGlobal = gsap.getProperty('.padding-global', 'padding-left') * 2;
          return videoBoxWidth + paddingGlobal;
        }

        function calculateVideoMove() {
          let topHeight = $(heroIntro).find('.section').eq(0).outerHeight();
          topHeight *= -1;
          console.log(topHeight);
          return topHeight - 4;
        }

        // Load
        setSectionHeight();

        // Resize
        $(window).resize(() => {
          if ($(window).width() >= 992) {
            setSectionHeight();
            $(videoBox).width(() => {
              return setVideoWidth();
            });
            $(videoBox).css({
              transform: `translate(${() => {
                return calculateVideoMove();
              }})`,
            });
          } else {
            $(heroIntro, videoBox).attr('style', '');
          }
        });

        // --- Create the Animation
        tl.fromTo(
          videoBox,
          {
            height: '101svh',
            width: () => {
              return '101svw';
            },
            y: () => {
              return calculateVideoMove();
            },
          },
          {
            height: () => {
              return videoBoxHeight;
            },
            width: () => {
              return videoBoxWidth;
            },
            y: 0,
          }
        );
        tl.fromTo(
          '.nav',
          {
            color: 'rgba(255, 255, 255, 1)',
            borderColor: 'rgba(234, 236, 240, 0)',
            backgroundColor: 'rgba(255, 255, 255, 0)',
          },
          {
            keyframes: {
              '30%': {
                color: 'rgba(51, 58, 71, 1)',
              },
              '50%': {
                borderColor: 'rgba(234, 236, 240, 1)',
                backgroundColor: 'rgba(255, 255, 255, 1)',
              },
            },
          },
          '<'
        );
        tl.to(
          '.header01_content',
          {
            keyframes: {
              '25%': { opacity: 1 },
              '50%': { opacity: 0 },
            },
          },
          '<'
        );
        tl.fromTo(
          '[hero-intro-move]',
          {
            y: '5rem',
          },
          {
            y: '0',
          },
          '<'
        );

        // Project the Time and Date
        var currentDate = new Date();

        // Date
        var month = currentDate.toLocaleString('en', { month: 'long' });
        var day = currentDate.getDate();
        var year = currentDate.getFullYear();

        // Time
        var { DateTime } = luxon;
        var userLocalTime = luxon.DateTime.local();
        var convertedTime = userLocalTime.toUTC().toFormat('HHmm');

        console.log(convertedTime);

        $('[hero-date]').text(`${month} ${day}, ${year}`);
        $('[hero-time]').text(`${convertedTime}[ZULU]`);

        // Mouse Coordinates
        $(document).mousemove(function (event) {
          $('[mouseX]').text(event.clientX);
          $('[mouseY]').text(event.clientY);
        });
      });
    },
  });
  let main;

  // ---- CAPABILITIES
  const navItems = document.querySelectorAll('.cap_navigation-item');
  const anchors = $('.cap-anchor_box .cap-anchor')
    .map(function () {
      return '#' + $(this).attr('id');
    })
    .get();

  const findCurrentAnchorIndex = () => {
    for (let i = 0; i < navItems.length; i++) {
      if (navItems[i].classList.contains('w--current')) {
        return i;
      }
    }
    return -1;
  };

  const scrollToAnchor = (id) => {
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavItemClick = (item, index, event) => {
    if (mobile.matches) {
      event.preventDefault();
      event.stopPropagation();
      navItems.forEach((item) => item.classList.remove('w--current'));
      item.classList.add('w--current');
      const slideIndex = index;
      capSwiper.slideTo(slideIndex);
    }
  };

  const mobile = window.matchMedia('(max-width: 991px)');
  const desktop = window.matchMedia('(min-width: 992px)');
  let capSwiper = null;

  const swiperMode = () => {
    const arrowPrev = $('.cap_slider-actions .slider-arrow');
    arrowPrev.addClass('capabilities-arrow');

    if (desktop.matches) {
      if (capSwiper) {
        capSwiper.destroy(true, true);
        capSwiper = null;
        $(navItems).removeClass('w--current');
      }
    } else if (mobile.matches) {
      $(navItems).removeClass('w--current');
      $(navItems).eq(0).addClass('w--current');
      if (!capSwiper) {
        capSwiper = new Swiper('.cap_content', {
          slidesPerView: 1,
          spaceBetween: 24,
          speed: 250,
          observer: true,
          centeredSlides: true,
          navigation: {
            prevEl: '.slider-arrow.prev.capabilities-arrow',
            nextEl: '.slider-arrow.next.capabilities-arrow',
          },
          on: {
            slideChange: () => {
              navItems.forEach((item, index) => {
                if (index === capSwiper.activeIndex) {
                  item.classList.add('w--current');
                } else {
                  item.classList.remove('w--current');
                }
              });
            },
          },
        });
      }
    }
  };

  // Events
  window.addEventListener('load', () => {
    swiperMode();
  });

  window.addEventListener('resize', () => {
    swiperMode();
  });

  navItems.forEach((item, index) => {
    item.addEventListener('click', (event) => {
      handleNavItemClick(item, index, event);
    });
  });

  // Desktop Arrows Click
  $('.cap_slider-actions.desktop .slider-arrow.prev').click(() => {
    const currentAnchorIndex = findCurrentAnchorIndex();
    if (currentAnchorIndex > 0) {
      scrollToAnchor(anchors[currentAnchorIndex - 1]);
    } else {
      scrollToAnchor(anchors[anchors.length - 1]);
    }
  });

  $('.cap_slider-actions.desktop .slider-arrow.next').click(() => {
    const currentAnchorIndex = findCurrentAnchorIndex();
    if (currentAnchorIndex < anchors.length - 1) {
      scrollToAnchor(anchors[currentAnchorIndex + 1]);
    } else {
      scrollToAnchor(anchors[0]);
    }
  });

  let arrowLeft = $('.w-icon-slider-left');
  let arrowRight = $('.w-icon-slider-right');
  let customArrows = $('.about__investor-arrow');

  customArrows.on('click', function (element) {
    getDirection(element);
  });

  function getDirection(element) {
    customArrows.each(function () {
      let directionID = $(this).attr('id');

      if (directionID === 'link-left') {
        if (arrowLeft.is(':hidden')) {
          $(this).hide();
        } else {
          $(this).show();
        }
      }

      if (directionID === 'link-right') {
        if (arrowRight.is(':hidden')) {
          $(this).hide();
        } else {
          $(this).show();
        }
      }
    });

    let clickedDirection = $(element).attr('id');
    if (clickedDirection === 'link-left') {
      arrowLeft.click();
    }
    if (clickedDirection === 'link-right') {
      arrowRight.click();
    }
  }

  getDirection();
});
