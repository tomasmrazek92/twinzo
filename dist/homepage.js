"use strict";(()=>{$(document).ready(function(){function y(){let t=$(".hero_step"),s=$(window).width()>991;function c(){let e=$("[js-scrollflip-element='zone']"),n=$("[js-scrollflip-element='target']").first();gsap.registerPlugin(ScrollTrigger,Flip),ScrollTrigger.normalizeScroll(!0);let a;a&&(a.kill(),gsap.set(n,{clearProps:"all"})),a=gsap.timeline({scrollTrigger:{trigger:$(".hero_step").eq(2),start:"top top",end:"bottom top",scrub:!0}}),e.each(function(l){let p=e.eq(l+1);if(p.length){let h=p.offset().top+p.innerHeight()/2,v=$(this).offset().top+$(this).innerHeight()/2,S=h-v;a.add(Flip.fit(n[0],p[0],{duration:S,ease:"power2.inOut"}))}})}let g=()=>{let e=gsap.timeline({scrollTrigger:{trigger:t.eq(0),start:"top top",end:"center top",invalidateOnRefresh:!0,toggleActions:"play none none reverse",onEnter:()=>{$(".nav").addClass("scrolled"),$(".nav").addClass("pushed")},onLeaveBack:()=>{$(".nav").removeClass("scrolled"),$(".nav").removeClass("pushed")}}});e.fromTo($(".nav_logo"),{color:"white"},{color:"inherit"}),e.fromTo($(".container.cc-nav"),{maxWidth:"100%"},{maxWidth:"90%"},"<"),e.fromTo($(".nav_menu-button-mask"),{width:0},{width:$("[data-nav-btn]").outerWidth()},"<"),e.fromTo($("[data-nav-btn]"),{xPercent:"100%",opacity:0},{xPercent:"0%",opacity:1},"<")},d=()=>{let e=$(".hp-hero_visual"),n=$(".hp-hero_phone"),a=$(".hp-hero_phone-video"),l=gsap.timeline({scrollTrigger:{trigger:t.eq(0),start:"top top",end:"bottom top",scrub:1,onLeave:m}});s?l.to(e,{width:"200%"}):l.to(e,{height:"200%",paddingTop:"0%"}),l.to(n,{rotate:-90,y:"-4rem"},"<"),l.to(a,{rotate:90},"<")},u=()=>{let e=$("[data-hero-hide]");gsap.timeline({scrollTrigger:{trigger:t.eq(0),start:"100 top",toggleActions:"play none none reverse"}}).to(e,{opacity:0},"<")},r=$("[data-step-text]"),i=e=>{gsap.to(r,{yPercent:50,opacity:0,duration:.3,onComplete:()=>{r.text(r.attr(e)),gsap.to(r,{yPercent:0,opacity:1})}})},w=()=>{let e=$(".cc-hp-steps"),n=gsap.timeline({scrollTrigger:{trigger:t.eq(1),start:"top top",toggleActions:"play none none reverse"}});gsap.set(e,{opacity:0}),n.to(e,{opacity:1,duration:0,delay:.2})},x=()=>{let e=$(".cc-hp-steps");gsap.timeline({scrollTrigger:{trigger:t.eq(1),start:"top top",toggleActions:"play none none reverse"}}).fromTo([$(".hp-steps_head"),$(".hp-steps_content")],{opacity:0},{opacity:1,duration:.5,delay:.3},"<")},b=()=>{let e=gsap.timeline({scrollTrigger:{trigger:t.eq(1),start:"top top",end:"33% top",toggleActions:"play none none reverse",toggleClass:{targets:$(".hp-steps_head-item").eq(0),className:"active"},onEnterBack:()=>{i("data-paragraph-01")}}})},C=()=>{let e=$(".hp-steps_visual-inner"),n=gsap.timeline({scrollTrigger:{trigger:t.eq(1),start:"33% top",end:"66% top",toggleActions:"play none none reverse",toggleClass:{targets:$(".hp-steps_head-item").eq(1),className:"active"},onEnter:()=>{i("data-paragraph-02")},onEnterBack:()=>{i("data-paragraph-02")}}})},q=()=>{let e=$(".hp-steps_visual-inner"),n=gsap.timeline({scrollTrigger:{trigger:t.eq(1),start:"66% top",toggleActions:"play none none none",onLeaveBack:()=>{$(".hp-steps_head-item").eq(2).removeClass("active"),$(".section.cc-hp-steps").removeClass("cc-fullscreen"),$(".nav").addClass("pushed")},onEnter:()=>{$(".hp-steps_head-item").eq(2).addClass("active"),$(".section.cc-hp-steps").addClass("cc-fullscreen"),$(".nav").removeClass("pushed"),i("data-paragraph-03")},onLeave:c}})},A=()=>{gsap.timeline({scrollTrigger:{trigger:t.eq(2),start:"top top",end:"bottom top",scrub:1}}).to($("[data-steps-ui]"),{opacity:0},"<")},P=()=>{gsap.timeline({scrollTrigger:{trigger:$(".section.cc-hp-devices"),start:"top center",toggleActions:"play none none reverse"}}).to($(".hp-devices_desktop"),{opacity:1})},k=()=>{let e=$("[data-devices-content]");gsap.timeline({scrollTrigger:{trigger:e,start:"top center",toggleActions:"play none none reverse"}}).fromTo($("[data-devices-ui]"),{opacity:0},{opacity:1,stagger:.2});let a=0;function l(){let p=["Anytime","Anywhere"];if(a<p.length){let h=$("[data-devices-ui] h2");h.text(p[a]),gsap.timeline({scrollTrigger:{trigger:e,start:"top center"},onComplete:()=>{a=(a+1)%p.length,l()}}).fromTo(h,{y:"50%",opacity:0},{y:"0%",opacity:1,duration:2,ease:"expo.out"})}}l()},E=()=>{let e=gsap.timeline({scrollTrigger:{trigger:$(".hp-types_wall"),start:"top top",toggleActions:"play none none reverse",markers:!0,onEnter:()=>{$(".nav").removeClass("scrolled"),$(".nav").addClass("fixed")},onLeaveBack:()=>{$(".nav").addClass("scrolled"),$(".nav").removeClass("fixed")}}})},o=gsap.timeline();o.add(g),o.add(d),o.add(u),o.add(w),o.add(x),o.add(b),o.add(C),o.add(q),o.add(A),o.add(P),o.add(k),o.add(E)}y();function f(){let t=$(".hp-types_wall"),s=t.find("h2"),c=s.attr("data-headline-text").split(","),g=$(".hp-types_visual img"),d=r=>{let i=gsap.timeline();return i.to(s,{yPercent:50,opacity:0,duration:.3}),i.to(s,{text:c[r],duration:0}),i.to([s,g.eq(r)],{yPercent:0,opacity:1}),i},u=gsap.timeline({scrollTrigger:{trigger:t,start:"top top",end:"bottom bottom",scrub:1}});for(let r=1;r<c.length;r++)u.add(d(r));ScrollTrigger.create({trigger:t,start:"top top",end:"bottom bottom",onEnterBack:()=>{d(0)}})}function T(){gsap.timeline({scrollTrigger:{trigger:$("[data-types-pocket]"),start:"center bottom",end:"bottom bottom",scrub:1}}).fromTo([$(".hp-types_visual-overlay"),$("[data-types-pocket] h2")],{opacity:0,yPercent:50},{opacity:1,yPercent:0,stagger:.3})}f(),T();let z=new Swiper(".hp-testimonials_slider",{slidesPerView:1,effect:"fade",fadeEffect:{crossFade:!0},autoHeight:!0,loop:!0,navigation:{nextEl:".swiper-arrow.next",prevEl:".swiper-arrow.prev"}});function m(){var t=$(".hp-hero_phone").outerWidth(),s=$(".hp-hero_phone").height();$(".hp-steps_visual").css({width:s,height:t})}m(),$(window).resize(m);function _(t,s){let c;return function(...g){clearTimeout(c),c=setTimeout(()=>t.apply(this,g),s)}}window.addEventListener("resize",_(function(){location.reload()},300))});})();