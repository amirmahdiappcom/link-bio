// script.js
// GSAP + ScrollTrigger animations
gsap.registerPlugin(ScrollTrigger);

// HERO entrance timeline (image + texts)
const heroTL = gsap.timeline({paused:true});

// image animation (pop + subtle rotate)
heroTL.from(".profile", {
  duration: 1.0,
  scale: 0.85,
  rotation: -2,
  opacity: 0,
  ease: "power3.out"
}, 0);

// text animations: name from left, role from right, tagline fade
heroTL.from(".name", {
  duration: 0.9,
  x: -80,
  opacity: 0,
  ease: "power3.out"
}, 0.15);

heroTL.from(".role", {
  duration: 0.9,
  x: 80,
  opacity: 0,
  ease: "power3.out"
}, 0.25);

heroTL.from(".tagline", {
  duration: 0.8,
  y: 20,
  opacity: 0,
  ease: "power2.out"
}, 0.45);

heroTL.from(".cta-row .btn", {
  duration: 0.7,
  y: 10,
  opacity: 0,
  stagger: 0.12,
  ease: "power2.out"
}, 0.6);

// play on load
heroTL.play();

// smooth page transition when scrolling from hero -> about
// We'll create a timeline that runs as you scroll to the about section (pin the hero briefly)
ScrollTrigger.create({
  trigger: "#about",
  start: "top 60%", // when about top reaches 60% of viewport
  end: "top 20%",
  scrub: 0.6,
  onEnter: () => {
    // animate hero elements out softly (slide up & fade)
    gsap.to(".hero-inner", {y: -30, opacity: 0.12, scale: 0.98, duration: 0.6, ease: "power1.out"});
  },
  onLeaveBack: () => {
    // Re-show hero inner and re-run hero entrance
    gsap.to(".hero-inner", {y:0, opacity:1, scale:1, duration:0.6, ease:"power1.out"});
    // restart hero timeline for smooth re-entry
    heroTL.restart();
  }
});

// About section reveal (when entering bottom area)
gsap.utils.toArray(".about-inner, .about-title, .lead, .about-block, .social").forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: "#about",
      start: () => "top 80%",
      toggleActions: "play reverse play reverse"
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: i * 0.08,
    ease: "power2.out"
  });
});

// "Learn More" button smooth scroll (also triggers animations)
document.querySelectorAll('#toAbout').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#about').scrollIntoView({behavior: 'smooth'});
  });
});

// Re-run hero animation when user scrolls back up above the hero (handled in onLeaveBack above)
// Also, ensure accessible focus when scrolled to about
ScrollTrigger.create({
  trigger: "#about",
  start: "top 90%",
  onEnter: () => {
    // focus the about container for keyboard users
    const about = document.querySelector('.about-inner');
    if (about) about.setAttribute('tabindex','-1'), about.focus();
  }
});
