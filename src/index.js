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

// #region scrollDisabler
$('[scroll="disable"]').on('click', function () {
  if (typeof lenis !== 'undefined') {
    lenis.stop();
  } else {
    $('html').addClass('no-scroll');
  }
});

$('[scroll="enable"]').on('click', function () {
  if (typeof lenis !== 'undefined') {
    lenis.start();
  } else {
    $('html').removeClass('no-scroll');
  }
});

// #endregion

// #region Countries
$(document).ready(function () {
  const selectElement = $('#country');
  function createCountryOptions(countries) {
    return countries.map((country) => {
      const option = document.createElement('option');
      option.value = country.Name;
      option.textContent = country.Name;
      option.setAttribute('data-code', country.Code);
      return option;
    });
  }
  const countryOptions = createCountryOptions(countries);
  countryOptions.forEach((option) => selectElement.append(option));
});
// #endregion
