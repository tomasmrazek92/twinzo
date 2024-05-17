let menuOpen = false;
let openClass = 'open';

$('.nav_ham')
  .add('.nav_link')
  .on('click', function () {
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
