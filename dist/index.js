"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/utils/globalFunctions.js
  var swipers = [];
  var createSwiper = (componentSelector, swiperSelector, classSelector, options) => {
    const arrows = ".slider-arrow";
    const pagination = ".swiper-navigation";
    $(componentSelector).each(function() {
      let index = $(this).index();
      let instanceClass = `${classSelector}_${index}`;
      $(this).find(swiperSelector).addClass(instanceClass);
      $(this).find(arrows).addClass(instanceClass);
      $(this).find(pagination).addClass(instanceClass);
      let swiperOptions = Object.assign({}, options, {
        speed: 250,
        navigation: {
          prevEl: `${arrows}.prev.${instanceClass}`,
          nextEl: `${arrows}.next.${instanceClass}`
        },
        pagination: {
          el: `${pagination}.${instanceClass}`,
          type: "bullets",
          bulletActiveClass: "w-active",
          bulletClass: "w-slider-dot"
        }
      });
      for (let key in options) {
        if (key in swiperOptions) {
          swiperOptions[key] = options[key];
        }
      }
      let swiper = new Swiper(`${swiperSelector}.${instanceClass}`, swiperOptions);
      swipers[classSelector] = swipers[classSelector] || {};
      swipers[classSelector][index] = swiper;
    });
  };

  // src/index.js
  $(document).ready(() => {
    ScrollTrigger.matchMedia({
      // Desktop
      "(min-width: 992px)": function() {
        $(".hero-intro").each(function() {
          let heroIntro = $(this);
          let heroWrap = $(this).find(".hero-intro_wrap");
          let videoBox = $(this).find(".header01_visual-box");
          let tl = gsap.timeline({
            scrollTrigger: {
              trigger: $(this),
              start: "top top",
              end: "center top",
              scrub: 0.2,
              markers: true,
              invalidateOnRefresh: true
            }
          });
          let videoBoxHeight;
          let videoBoxWidth;
          function setSectionHeight() {
            $(heroIntro).height(heroWrap.height() * 2);
            videoBoxHeight = $(".header01_visual-split").height();
            videoBoxWidth = $(".header01_visual-split").width();
          }
          function setVideoWidth() {
            let paddingGlobal = gsap.getProperty(".padding-global", "padding-left") * 2;
            return videoBoxWidth + paddingGlobal + 4;
          }
          function calculateVideoMove() {
            let topHeight = $(heroIntro).find(".section").eq(0).outerHeight();
            topHeight *= -1;
            console.log(topHeight);
            return topHeight - 4;
          }
          setSectionHeight();
          $(window).resize(() => {
            if ($(window).width() >= 992) {
              setSectionHeight();
              $(videoBox).width(() => {
                return setVideoWidth();
              });
              $(videoBox).css({
                transform: `translate(${() => {
                  return calculateVideoMove();
                }})`
              });
            } else {
              $(heroIntro, videoBox).attr("style", "");
            }
          });
          tl.fromTo(
            videoBox,
            {
              height: "101vh",
              width: () => {
                return setVideoWidth();
              },
              y: () => {
                return calculateVideoMove();
              }
            },
            {
              height: () => {
                return videoBoxHeight;
              },
              width: () => {
                return videoBoxWidth;
              },
              y: 0
            }
          );
          tl.to(
            ".header01_content",
            {
              keyframes: {
                "25%": { opacity: 1 },
                "50%": { opacity: 0 }
              }
            },
            "<"
          );
        });
      }
    });
    let main;
    if ($(".company_content").length) {
      createSwiper(".company_content", ".company_slider", "company-swiper", {
        slidesPerView: 2,
        spaceBetween: 16
      });
    }
    if ($(".career_component").length) {
      createSwiper(".career_component", ".career_slider", "career-swiper", {
        slidesPerView: 1.25,
        spaceBetween: 16,
        breakpoints: {
          // when window width is >= 480px
          479: {
            slidesPerView: 2,
            spaceBetween: 24
          }
        }
      });
    }
    if ($(".stories_component").length) {
      const slideLength = $(".stories_slider .swiper-slide").length;
      if (slideLength === 0) {
        $(".stories_component").closest(".section").hide();
      } else if (slideLength === 1) {
        $(".stories_slider .swiper-slide").css("max-width", "54rem");
        $(".stories_component .arrows-group").hide();
      } else {
        createSwiper(".stories_component", ".stories_slider-cms", "stories-swiper", {
          slidesPerView: "auto",
          spaceBetween: 16
        });
      }
    }
    if ($(".platform-prev_component").length) {
      createSwiper(".platform-prev_component", ".platform-prev_slider", "platprevs-swiper", {
        slidesPerView: "auto",
        spaceBetween: 0
      });
    }
    const navItems = document.querySelectorAll(".cap_navigation-item");
    const anchors = $(".cap-anchor_box .cap-anchor").map(function() {
      return "#" + $(this).attr("id");
    }).get();
    const findCurrentAnchorIndex = () => {
      for (let i = 0; i < navItems.length; i++) {
        if (navItems[i].classList.contains("w--current")) {
          return i;
        }
      }
      return -1;
    };
    const scrollToAnchor = (id) => {
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    };
    const handleNavItemClick = (item, index, event) => {
      if (mobile.matches) {
        event.preventDefault();
        event.stopPropagation();
        navItems.forEach((item2) => item2.classList.remove("w--current"));
        item.classList.add("w--current");
        const slideIndex = index;
        capSwiper.slideTo(slideIndex);
      }
    };
    const mobile = window.matchMedia("(max-width: 991px)");
    const desktop = window.matchMedia("(min-width: 992px)");
    let capSwiper = null;
    const swiperMode = () => {
      const arrowPrev = $(".cap_slider-actions .slider-arrow");
      arrowPrev.addClass("capabilities-arrow");
      if (desktop.matches) {
        if (capSwiper) {
          capSwiper.destroy(true, true);
          capSwiper = null;
          $(navItems).removeClass("w--current");
        }
      } else if (mobile.matches) {
        $(navItems).removeClass("w--current");
        $(navItems).eq(0).addClass("w--current");
        if (!capSwiper) {
          capSwiper = new Swiper(".cap_content", {
            slidesPerView: 1,
            spaceBetween: 24,
            speed: 250,
            observer: true,
            centeredSlides: true,
            navigation: {
              prevEl: ".slider-arrow.prev.capabilities-arrow",
              nextEl: ".slider-arrow.next.capabilities-arrow"
            },
            on: {
              slideChange: () => {
                navItems.forEach((item, index) => {
                  if (index === capSwiper.activeIndex) {
                    item.classList.add("w--current");
                  } else {
                    item.classList.remove("w--current");
                  }
                });
              }
            }
          });
        }
      }
    };
    window.addEventListener("load", () => {
      swiperMode();
    });
    window.addEventListener("resize", () => {
      swiperMode();
    });
    navItems.forEach((item, index) => {
      item.addEventListener("click", (event) => {
        handleNavItemClick(item, index, event);
      });
    });
    $(".cap_slider-actions.desktop .slider-arrow.prev").click(() => {
      const currentAnchorIndex = findCurrentAnchorIndex();
      if (currentAnchorIndex > 0) {
        scrollToAnchor(anchors[currentAnchorIndex - 1]);
      } else {
        scrollToAnchor(anchors[anchors.length - 1]);
      }
    });
    $(".cap_slider-actions.desktop .slider-arrow.next").click(() => {
      const currentAnchorIndex = findCurrentAnchorIndex();
      if (currentAnchorIndex < anchors.length - 1) {
        scrollToAnchor(anchors[currentAnchorIndex + 1]);
      } else {
        scrollToAnchor(anchors[0]);
      }
    });
    let arrowLeft = $(".w-icon-slider-left");
    let arrowRight = $(".w-icon-slider-right");
    let customArrows = $(".about__investor-arrow");
    customArrows.on("click", function(element) {
      getDirection(element);
    });
    function getDirection(element) {
      customArrows.each(function() {
        let directionID = $(this).attr("id");
        if (directionID === "link-left") {
          if (arrowLeft.is(":hidden")) {
            $(this).hide();
          } else {
            $(this).show();
          }
        }
        if (directionID === "link-right") {
          if (arrowRight.is(":hidden")) {
            $(this).hide();
          } else {
            $(this).show();
          }
        }
      });
      let clickedDirection = $(element).attr("id");
      if (clickedDirection === "link-left") {
        arrowLeft.click();
      }
      if (clickedDirection === "link-right") {
        arrowRight.click();
      }
    }
    getDirection();
    var menuOpenAnim = false;
    const navbar = ".navbar_wrapper";
    const menuLinksBox = ".nav_links";
    const menuLinks = ".nav_links-inner";
    const menuLinksItems = ".nav_link";
    const menuButton = ".nav_ham";
    function createNavReveal() {
      let navReveal2 = gsap.timeline({
        paused: true,
        onComplete: () => {
          disableScroll();
        }
      }).fromTo(menuLinksBox, { display: "none" }, { display: "flex" }, "<").fromTo(menuLinks, { yPercent: -100 }, { yPercent: 0 }, "<");
      return navReveal2;
    }
    let scrollPosition;
    const disableScroll = () => {
      if (!menuOpenAnim) {
        scrollPosition = $(window).scrollTop();
        $("html, body").scrollTop(0).addClass("overflow-hidden");
      } else {
        $("html, body").scrollTop(scrollPosition).removeClass("overflow-hidden");
      }
      menuOpenAnim = !menuOpenAnim;
    };
    let navReveal;
    let hamAnim;
    ScrollTrigger.matchMedia({
      "(max-width: 991px)": function() {
        navReveal = createNavReveal();
        hamAnim = menuToggle();
      }
    });
    $(menuButton).on("click", () => openMenu());
    window.onscroll = () => {
      if ($(navbar)) {
        if (window.scrollY > 60) {
          $(navbar).addClass("pinned");
        } else {
          $(navbar).removeClass("pinned");
        }
      }
    };
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
      tl.fromTo($(menuButton).find(".nav_ham-line").eq(0), 0.2, { y: "0" }, { y: "4" }).fromTo($(menuButton).find(".nav_ham-line").eq(2), 0.2, { y: "0" }, { y: "-4" }, "<").fromTo(
        $(menuButton).find(".nav_ham-line").eq(1),
        0.2,
        { xPercent: 0, opacity: 1 },
        { xPercent: 100, opacity: 0 },
        "<"
      ).fromTo($(menuButton).find(".nav_ham-line").eq(0), 0.2, { rotationZ: 0 }, { rotationZ: 45 }).fromTo(
        $(menuButton).find(".nav_ham-line").eq(2),
        0.2,
        { rotationZ: 0 },
        { rotationZ: -45 },
        "<"
      );
      return tl;
    }
  });
})();
//# sourceMappingURL=index.js.map
