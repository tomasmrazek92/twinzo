"use strict";(()=>{var y=0,w=!1,_=gsap.timeline({defaults:{duration:.5},paused:!0,repeat:-1,onRepeat:function(){y++,y>=2&&w&&(this.repeat(0),H())}}),H=()=>{$(".page-load").fadeOut("slow",()=>{lenis.start()})};_.to(".page-load_logo",{opacity:1,stagger:.2}).to(".page-load_t",{width:"100%"}).to(".page-load_logo",{opacity:1},"<").to(".page-load_brand",{opacity:0});$(document).ready(function(){_.play()});$(window).on("load",function(){w=!0});$(document).ready(function(){function T(){let t=$(".hero_step"),o=$(window).width()>991;o&&gsap.set($(".nav_logo"),{color:"white"},"<");function p(){let e=$("[js-scrollflip-element='zone']"),r=$("[js-scrollflip-element='target']").first();gsap.registerPlugin(ScrollTrigger,Flip),ScrollTrigger.normalizeScroll(!0);let a;a&&(a.kill(),gsap.set(r,{clearProps:"all"})),a=gsap.timeline({scrollTrigger:{trigger:$(".hero_step").eq(2),start:"top top",end:"bottom top",scrub:!0}}),e.each(function(l){let c=e.eq(l+1);if(c.length){let m=c.offset().top+c.innerHeight()/2,v=$(this).offset().top+$(this).innerHeight()/2,B=m-v;a.add(Flip.fit(r[0],c[0],{duration:B,ease:"power2.inOut"}))}})}let d=()=>{let e=gsap.timeline({scrollTrigger:{trigger:t.eq(0),start:o?"top top-8px":"75% top",end:"center top",invalidateOnRefresh:!0,scrub:o?1:!1,onEnter:()=>{$(".nav").addClass("dark"),$(".nav").addClass("pushed")},onLeaveBack:()=>{$(".nav").removeClass("dark"),$(".nav").removeClass("pushed")}}});e.fromTo($(".container.cc-nav"),{maxWidth:"100%"},{maxWidth:"90%"}),o&&e.set($(".nav_logo"),{color:"white"},"<"),o&&e.fromTo($(".nav_menu-button-mask"),{width:0},{width:"auto"},"<"),e.to($(".nav_logo-t"),{width:"auto"},"<"),e.to($(".nav_logo-mask").eq(1),{width:0},"<"),o&&e.fromTo($("[data-nav-btn]"),{xPercent:"100%",opacity:0},{xPercent:"0%",opacity:1},"<"),e.fromTo($(".nav_bg"),{opacity:0},{opacity:1,duration:.1},"<"),e.set($(".nav_logo"),{color:"inherit"})},g=()=>{let e=$(".hp-hero_visual"),r=$(".hp-hero_phone"),a=$(".hp-hero_phone-video"),l=gsap.timeline({scrollTrigger:{trigger:t.eq(0),start:"top top",end:"bottom top",scrub:1,onLeave:()=>{f()}}});o?l.to(e,{width:"200%"}):(l.to(e,{height:"200%",paddingTop:"0%"}),l.fromTo(e,{borderTopLeftRadius:"1.6rem",borderTopRightRadius:"1.6rem"},{borderTopLeftRadius:"0rem",borderTopRightRadius:"0rem"},"<")),l.to(r,{rotate:-90,y:"-4rem"},"<"),l.to(a,{rotate:90},"<")},h=()=>{let e=$("[data-hero-hide]");gsap.timeline({scrollTrigger:{trigger:t.eq(0),start:"100 top",toggleActions:"play none none reverse"}}).to(e,{opacity:0},"<")},i=$("[data-step-text]"),s=e=>{gsap.to(i,{yPercent:50,opacity:0,duration:.3,onComplete:()=>{i.text(i.attr(e)),gsap.to(i,{yPercent:0,opacity:1})}})},u=e=>{let r=$(".hp-steps_phone-video"),a=gsap.timeline();return a.to(r,{opacity:0,duration:.2}),a.to(r.eq(e),{opacity:1,duration:.2}),a},q=()=>{let e=$(".cc-hp-steps"),r=gsap.timeline({scrollTrigger:{trigger:t.eq(1),start:"top top",toggleActions:"play none none reverse"}});gsap.set(e,{opacity:0}),r.to(e,{opacity:1,duration:0,delay:.2})},P=()=>{let e=$(".cc-hp-steps");gsap.timeline({scrollTrigger:{trigger:t.eq(1),start:"top top",toggleActions:"play none none reverse"}}).fromTo([$(".hp-steps_head"),$(".hp-steps_content")],{opacity:0},{opacity:1,duration:.5,delay:.3},"<")},A=()=>{let e=gsap.timeline({scrollTrigger:{trigger:t.eq(1),start:"top top",end:"33% top",toggleActions:"play none none reverse",toggleClass:{targets:$(".hp-steps_head-item").eq(0),className:"active"},onEnterBack:()=>{s("data-paragraph-01"),u(0)}}})},E=()=>{let e=$(".hp-steps_visual-inner"),r=gsap.timeline({scrollTrigger:{trigger:t.eq(1),start:"33% top",end:"66% top",toggleActions:"play none none reverse",toggleClass:{targets:$(".hp-steps_head-item").eq(1),className:"active"},onEnter:()=>{s("data-paragraph-02"),u(1)},onEnterBack:()=>{s("data-paragraph-02"),u(1)}}})},S=()=>{let e=$(".hp-steps_visual-inner"),r=gsap.timeline({scrollTrigger:{trigger:t.eq(1),start:"66% top",toggleActions:"play none none none",onLeaveBack:()=>{$(".hp-steps_head-item").eq(2).removeClass("active"),$(".section.cc-hp-steps").removeClass("cc-fullscreen"),$(".nav").addClass("pushed")},onEnter:()=>{$(".hp-steps_head-item").eq(2).addClass("active"),$(".section.cc-hp-steps").addClass("cc-fullscreen"),$(".nav").removeClass("pushed"),s("data-paragraph-03"),u(2)},onLeave:p}})},L=()=>{gsap.timeline({scrollTrigger:{trigger:t.eq(2),start:"top top",end:"bottom top",scrub:1}}).to($("[data-steps-ui]"),{opacity:0},"<")},R=()=>{gsap.timeline({scrollTrigger:{trigger:$(".section.cc-hp-devices"),start:"top center",toggleActions:"play none none reverse"}}).to($(".hp-devices_desktop"),{opacity:1})},W=()=>{let e=$("[data-devices-content]");gsap.timeline({scrollTrigger:{trigger:e,start:"top center",toggleActions:"play none none reverse"}}).fromTo($("[data-devices-ui]"),{opacity:0},{opacity:1,stagger:.2});let a=0;function l(){let c=["Anytime","Anywhere"];if(a<c.length){let m=$("[data-devices-ui] h2");m.text(c[a]),gsap.timeline({scrollTrigger:{trigger:e,start:"top center"},onComplete:()=>{a=(a+1)%c.length,l()}}).fromTo(m,{y:"50%",opacity:0},{y:"0%",opacity:1,duration:2,ease:"expo.out"})}}l()},z=()=>{let e=gsap.timeline({scrollTrigger:{trigger:$(".hp-types_wall"),start:"top top",toggleActions:"play none none reverse",onEnter:()=>{$(".nav").removeClass("dark"),$(".nav").addClass("fixed")},onLeaveBack:()=>{$(".nav").addClass("dark"),$(".nav").removeClass("fixed")}}})},n=gsap.timeline();n.add(d),n.add(g),n.add(h),n.add(q),n.add(P),n.add(A),n.add(E),n.add(S),n.add(L),n.add(R),n.add(W),n.add(z)}T();function b(){let t=$(".hp-types_wall"),o=t.find("h2"),p=o.attr("data-headline-text").split(","),d=$(".hp-types_visual .hp-types_phone-video"),g=i=>{let s=gsap.timeline();return s.to(o,{yPercent:50,opacity:0,duration:.3}),s.to(d,{opacity:0,duration:.3},"<"),s.to(o,{text:p[i],duration:0}),s.to(o,{yPercent:0,opacity:1}),s.to(d[i],{opacity:1},"<"),s},h=gsap.timeline({scrollTrigger:{trigger:t,start:"top top",end:"bottom bottom",scrub:1}});for(let i=1;i<p.length;i++)h.add(g(i));ScrollTrigger.create({trigger:t,start:"top top",end:"bottom bottom",onEnterBack:()=>{g(0)}})}function x(){gsap.timeline({scrollTrigger:{trigger:$("[data-types-pocket]"),start:"center bottom",end:"bottom bottom",scrub:1}}).fromTo([$(".hp-types_visual-overlay"),$("[data-types-pocket] h2")],{opacity:0,yPercent:50},{opacity:1,yPercent:0,stagger:.3})}b(),x();let V=new Swiper(".hp-testimonials_slider",{slidesPerView:1,effect:"fade",fadeEffect:{crossFade:!0},autoHeight:!0,loop:!0,navigation:{nextEl:".swiper-arrow.next",prevEl:".swiper-arrow.prev"}});function f(){var t=$(".hp-hero_phone").outerWidth(),o=$(".hp-hero_phone").height();$(".hp-steps_visual").css({width:o,height:t})}f(),$(window).resize(f);function C(t,o){let p;return function(){let d=this,g=arguments,h=function(){p=null,t.apply(d,g)};clearTimeout(p),p=setTimeout(h,o)}}var k=$(window).width();$(window).on("resize",C(function(){var t=$(window).width();t<=991?t!==k&&location.reload():location.reload()},300)),$(window).on("beforeunload",function(){$(window).scrollTop(0)})});})();
