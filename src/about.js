let horizontalRow = $('[horizontal-scroll="row"]');
let horizontalItem = $('[horizontal-scroll="item"]');
let horizontalSection = $('[horizontal-scroll="section"]');
let moveDistance;

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: horizontalSection,
    start: 'top top',
    end: 'bottom bottom',
    invalidateOnRefresh: true,
    scrub: 1,
    markers: true,
  },
});

// Gsap
tl.to(horizontalRow, {
  x: () => -moveDistance,
  duration: 1,
});

function calculateScroll() {
  // Desktop
  let scrollResistance = 1;

  let moveAmount = horizontalItem.length;
  let minHeight = scrollResistance * horizontalItem.outerWidth() * horizontalItem.length;

  horizontalSection.css('height', '200vh');

  moveDistance = horizontalRow.outerWidth() - $(window).width();
  horizontalSection.css('min-height', minHeight + 'px');
}

// Init
calculateScroll();
window.onresize = function () {
  calculateScroll();
};
