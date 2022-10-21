// Import and register GSAP (UMD/CommonJS)
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// SCROLL TRIGGERS

// Thru line vertical down
gsap.to('.thru-line', {
    scale: 1,
    y: 900,
    ease: 'expo',
    scrollTrigger: {
        markers: true,
        start: 'bottom top',
        end: '1500px top',
        trigger: '.thru-line',
        scrub: 3,
    },
});
