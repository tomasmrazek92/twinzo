// ------ MENU

// -- Base
var menuOpenAnim = false;
const navbar = '.navbar_wrapper';
const menuLinksBox = '.nav_links';
const menuLinks = '.nav_links-inner';
const menuLinksItems = '.nav_link';
const dropDownDesc = '.nav_dropdown-menu_description p';
const menuButton = '.nav_ham';

// -- Menu Animation
function createNavReveal() {
  let navReveal = gsap
    .timeline({
      paused: true,
      onComplete: () => {
        disableScroll();
      },
    })
    .fromTo(menuLinksBox, { display: 'none' }, { display: 'flex' }, '<')
    .fromTo(menuLinks, { yPercent: -100 }, { yPercent: 0 }, '<');
  return navReveal;
}

// Scroll Disabler
let scrollPosition;
const disableScroll = () => {
  if (!menuOpenAnim) {
    scrollPosition = $(window).scrollTop();
    $('html, body').scrollTop(0).addClass('overflow-hidden');
  } else {
    $('html, body').scrollTop(scrollPosition).removeClass('overflow-hidden');
  }
  menuOpenAnim = !menuOpenAnim;
};

let navReveal;
let hamAnim;

// GSAP's matchMedia
ScrollTrigger.matchMedia({
  '(max-width: 991px)': function () {
    // Apply the animation only on screens with a max-width of 991px
    navReveal = createNavReveal();
    hamAnim = menuToggle();
  },
});

// -- Actions
// Open on Click
$(menuButton).on('click', () => openMenu());

// Add class on scroll
window.onscroll = () => {
  let scrollHeight = $(navbar).height();
  if ($(navbar)) {
    if (window.scrollY > scrollHeight / 2) {
      $(navbar).addClass('pinned');
    } else {
      $(navbar).removeClass('pinned');
    }
  }
};

// Dropdown Open
$(document).on('click', function (event) {
  var nav_dropdown = '.nav_dropdown';
  console.log($(event.target));
  if (
    (!$(event.target).is(nav_dropdown) && !$(event.target).parents().is(nav_dropdown)) ||
    $(event.target).closest(nav_dropdown).find('.w-dropdown-toggle').hasClass('w--open')
  ) {
    $(navbar).removeClass('open');
    return;
  }

  if (!$(navbar).hasClass('pinned')) {
    $(navbar).addClass('open');
  }
});

// Dropdown Texts
$('.nav_dropdown-menu_links')
  .find(menuLinksItems)
  .on('mouseenter', function () {
    // Find the index of the current menu link
    var currentIndex = $(this).index();
    console.log(currentIndex);

    // Find the corresponding p tag inside nav_dropdown-menu_description
    var pTag = $(this).closest('.nav_dropdown-menu').find(dropDownDesc).eq(currentIndex);
    console.log(pTag);

    // Hide all p tags and fadeIn the current index
    $(dropDownDesc).hide();
    pTag.fadeTo('fast', 1);
  });

// -- Functions
function openMenu() {
  if (navReveal) {
    playMenuAnimation();
  }
}

function playMenuAnimation() {
  if (!menuOpenAnim) {
    navReveal.play();
    hamAnim.play();
  } else {
    navReveal.reverse();
    hamAnim.reverse();
    disableScroll();
  }
}

function menuToggle() {
  var tl = new TimelineMax({ paused: true });
  tl.fromTo($(menuButton).find('.nav_ham-line').eq(0), 0.2, { y: '0' }, { y: '4' })
    .fromTo($(menuButton).find('.nav_ham-line').eq(2), 0.2, { y: '0' }, { y: '-4' }, '<')
    .fromTo(
      $(menuButton).find('.nav_ham-line').eq(1),
      0.2,
      { xPercent: 0, opacity: 1 },
      { xPercent: 100, opacity: 0 },
      '<'
    )
    .fromTo($(menuButton).find('.nav_ham-line').eq(0), 0.2, { rotationZ: 0 }, { rotationZ: 45 })
    .fromTo(
      $(menuButton).find('.nav_ham-line').eq(2),
      0.2,
      { rotationZ: 0 },
      { rotationZ: -45 },
      '<'
    );

  return tl;
}
