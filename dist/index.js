"use strict";(()=>{var a=()=>{let e=$(".nav");gsap.set(e,{yPercent:-100,duration:.3,onComplete:()=>{e.addClass("fixed"),$(".nav_logo").removeClass("white")}}),setTimeout(()=>{gsap.to(e,{yPercent:0,duration:.3})},100)};var t=()=>{let e=$(".nav");e.removeClass("fixed"),e.attr("style","")};var n=!1;$(document).on("click",function(e){$(e.target).closest(".nav_ham, .nav_link").length||n&&i()});$(".nav_ham").add(".nav_link").on("click",function(e){e.stopPropagation(),i()});var i=()=>{$(window).width()<992&&(n?$(".nav").removeClass("open"):$(".nav").addClass("open"),n=!n)};function s(){var e=$(window).scrollTop();n||!$(".nav").attr("data-nav-home")==="true"&&(e>=250&&!$(".nav").hasClass("fixed")?a():e===0&&t())}$(window).scroll(s);s();})();
