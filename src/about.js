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

$(document).ready(function () {
  let horizontalTl;
  let horizontalRow = $('[horizontal-scroll="row"]');
  let horizontalItem = $('[horizontal-scroll="item"]');
  let horizontalSection = $('[horizontal-scroll="section"]');

  function isMobile() {
    return window.innerWidth <= 991; // Adjust breakpoint as needed
  }
  function setupHorizontalScroll() {
    if (isMobile()) {
      if (horizontalTl) {
        console.log('kill');
        horizontalTl.kill(); // Kill the timeline
        ScrollTrigger.getById('horizontalScroll')?.kill(); // Kill the ScrollTrigger instance by ID

        gsap.set(horizontalRow, {
          clearProps: 'all',
        });
        gsap.set(horizontalSection, {
          height: 'auto',
          minHeight: 'none',
        });
      }
    } else {
      let moveDistance;
      horizontalTl = gsap.timeline({
        scrollTrigger: {
          id: 'horizontalScroll', // Add an ID to the ScrollTrigger
          trigger: horizontalSection,
          start: 'top top',
          end: 'bottom bottom',
          invalidateOnRefresh: true,
          scrub: 1,
        },
      });

      horizontalTl.to(horizontalRow, {
        x: () => -moveDistance,
        duration: 1,
      });

      function calculateScroll() {
        let scrollResistance = 1;
        let minHeight = scrollResistance * horizontalItem.outerWidth() * horizontalItem.length;
        horizontalSection.css('height', '200vh');
        moveDistance = horizontalRow.outerWidth() - $(window).width();
        console.log(moveDistance);
        horizontalSection.css('min-height', minHeight + 'px');
      }
      calculateScroll();
    }
  }
  // Initialize on load and resize
  setupHorizontalScroll();
  $(window).resize(setupHorizontalScroll);
});
