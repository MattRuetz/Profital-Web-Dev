// Import and register GSAP (UMD/CommonJS)
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// SCROLL TRIGGERS

// Thru line vertical down
// PROBABLY ONLY COVERS DESKTOP
gsap.to('.thru-line', {
    scale: 1,
    y: 935,
    ease: 'expo',
    scrollTrigger: {
        markers: true,
        start: 'bottom top',
        end: '1300px top',
        trigger: '.thru-line',
        scrub: 3,
    },
});

// Section Wipe script
$(function () {
    // wait for document ready
    // init
    var controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 'onLeave',
            duration: '100%', // this works just fine with duration 0 as well
            // However with large numbers (>20) of pinned sections display errors can occur so every section should be unpinned once it's covered by the next section.
            // Normally 100% would work for this, but here 200% is used, as Panel 3 is shown for more than 100% of scrollheight due to the pause.
        },
    });

    // get all slides
    var slides = document.querySelectorAll('section.panel');

    // create scene for every slide
    for (var i = 0; i < slides.length; i++) {
        new ScrollMagic.Scene({
            triggerElement: slides[i],
        })
            .setPin(slides[i], { pushFollowers: false })
            .addTo(controller);
    }
});
