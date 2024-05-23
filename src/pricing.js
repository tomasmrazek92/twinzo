let tl = gsap.timeline({ paused: true });

tl.to('.pricing_price-tag', { yPercent: -100 });

$('#yearly').on('click', function () {
  tl.reverse();

  $('.pricing_toggle-item').removeClass('cc-active');
  $(this).addClass('cc-active');
});

$('#monthly').on('click', function () {
  tl.play();

  $('.pricing_toggle-item').removeClass('cc-active');
  $(this).addClass('cc-active');
});
