import { hideNav, revealNav } from './utils/globalFunctions';

let menuOpen = false;
let openClass = 'open';

$(document).on('click', function (event) {
  if (!$(event.target).closest('.nav_ham, .nav_menu').length) {
    if (menuOpen) {
      openMenu();
    }
  }
});

$('.nav_ham').on('click', function (event) {
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
    if ($('.nav').attr('data-nav-home') !== 'true') {
      if (scroll >= 100 && !$('.nav').hasClass('fixed')) {
        $('.nav').addClass('fixed');
      } else if (scroll === 0) {
        $('.nav').removeClass('fixed');
      }
    }
  }
}

$(window).scroll(checkNav);
checkNav();
