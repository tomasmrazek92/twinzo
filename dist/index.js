"use strict";(()=>{var n=!1;$(document).on("click",function(e){$(e.target).closest(".nav_ham, .nav_menu").length||n&&a()});$(".nav_ham").on("click",function(e){e.stopPropagation(),a()});var a=()=>{$(window).width()<992&&(n?$(".nav").removeClass("open"):$(".nav").addClass("open"),n=!n)};function t(){var e=$(window).scrollTop();n||$(".nav").attr("data-nav-home")!=="true"&&(e>=100&&!$(".nav").hasClass("fixed")?$(".nav").addClass("fixed"):e===0&&$(".nav").removeClass("fixed"))}$(window).scroll(t);t();})();
