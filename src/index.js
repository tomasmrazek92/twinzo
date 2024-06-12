import { hideNav, revealNav } from './utils/globalFunctions';

let menuOpen = false;
let openClass = 'open';

$(document).on('click', function (event) {
  if (!$(event.target).closest('.nav_ham, .nav_link').length) {
    if (menuOpen) {
      openMenu();
    }
  }
});

$('.nav_ham')
  .add('.nav_link')
  .on('click', function (event) {
    event.stopPropagation();
    openMenu();
  });

const openMenu = () => {
  if ($(window).width() < 992) {
    if (!menuOpen) {
      $('.nav').addClass('open');
    } else {
      $('.nav').removeClass('open');
    }
    menuOpen = !menuOpen;
  }
};

function checkNav() {
  var scroll = $(window).scrollTop();

  if (!menuOpen) {
    if (!$('.nav').attr('data-nav-home') === 'true') {
      if (scroll >= 250 && !$('.nav').hasClass('fixed')) {
        revealNav();
      } else if (scroll === 0) {
        hideNav();
      }
    }
  }
}

$(window).scroll(checkNav);
checkNav();
