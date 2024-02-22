gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform
    ? "transform"
    : "fixed",
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

function cursorEffect() {
  var page1part1 = document.querySelector("#page1-part1");
  var cursor = document.querySelector("#cursor");

  page1part1.addEventListener("mousemove", function (dets) {
    gsap.to(cursor, {
      x: dets.x,
      y: dets.y,
    });
  });
  page1part1.addEventListener("mouseenter", function () {
    gsap.to(cursor, {
      scale: 1,
      opacity: 1,
    });
  });
  page1part1.addEventListener("mouseleave", function () {
    gsap.to(cursor, {
      scale: 0,
      opacity: 0,
    });
  });
}
cursorEffect();

function menu() {
  var menu = document.querySelector("nav h4");
  var full = document.querySelector("#hamburger");
  var navimg = document.querySelector("nav img");
  var flag = 0;
  menu.addEventListener("click", function () {
    if (flag == 0) {
      full.style.top = 0;
      navimg.style.opacity = 0;
      flag = 1;
    } else {
      full.style.top = "-100%";
      navimg.style.opacity = 1;
      flag = 0;
    }
  });
}
menu();

function page2Animation() {
  gsap.from("#page2-bottom h2", {
    y: 120,
    stagger: 0.25,
    duration: 1,
    ScrollTrigger: {
      trigger: "#page2",
      scroller: "#main",
      start: "top 40%",
      end: "top 37%",
      scrub: 2,
    },
  });
}
page2Animation();

var swiper = new Swiper(".mySwiper", {
  spaceBetween: 20,
  slidesPerView: 4,
  centeredSlides: true,
  autoplay: {
    delay: 1500,
    disableOnInteraction: false,
  },
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var tl = gsap.timeline();
tl.from("#loader h3", {
  x: 40,
  opacity: 0,
  duration: 1,
  stagger: 0.1,
});
tl.to("#loader h3", {
  opacity: 0,
  x: -20,
  duration: 1,
  stagger: 0.1,
});
tl.to("#loader", {
  opacity: 0,
});
tl.from("#page-1heading span", {
  y: 100,
  opacity: 0,
  stagger: 0.2,
  duration: 0.5,
  delay: -0.5,
});
tl.to("#loader", {
  display: "none",
});
