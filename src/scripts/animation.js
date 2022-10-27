// Import and register GSAP (UMD/CommonJS)
import { Expo, gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

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
        onLeave: showDesignLine,
        onEnterBack: hideDesignLine,
    },
});

/**
 * Sets elements starting positions to prep GSAP to anim. them in.
 * Doing it this way so CSS represents static-state site (no js, etc...)
 */
// ------------------------------------------------------
gsap.set('#design-line', {
    scaleX: 0,
    opacity: 1,
});
gsap.set('#design-dot', {
    scale: 2,
    rotateY: '180deg',
    opacity: 0,
});
// ------------------------------------------------------

function showDesignLine() {
    gsap.to('#design-line', {
        scaleX: 1,
        opacity: 1,
        transformOrigin: 'left',
        ease: Expo,
        duration: 1.2,
        delay: 0.5,
        onComplete: () => {
            // Dot-flip animation when done
            gsap.to('#design-dot', {
                rotateY: '0deg',
                opacity: 1,
                scale: 1,
                ease: 'expo',
                duration: 0.2,
            });
        },
    });
}

function hideDesignLine() {
    gsap.to('#design-line', {
        scaleX: 0,
        opacity: 1,
        onComplete: () => {
            // Dot-flip animation REVERSE
            gsap.to('#design-dot', {
                scale: 2,
                rotateY: '180deg',
                opacity: 0,
            });
        },
    });
}

// animate slide-in words for demo section wipe-up
let word_index = 0;
let word_count = document.getElementById('demo-section-title').children.length;
for (const word of document.getElementById('demo-section-title').children) {
    word_index++;
    gsap.from('#' + word.id, {
        opacity: 0,
        scale: 3,
        x: 1800,
        ease: 'expo',
        scrollTrigger: {
            // markers: true,
            start: 'top 80%',
            end: 'top 30%',
            trigger: '#' + word.id,
            scrub: 5,
            // onLeave: word_index == word_count ? showCards : null, //CALLBACK ON FINISH
        },
    });
}

gsap.from('.demo-cards .card', {
    opacity: 0,
    y: 400,
    ease: 'expo',
    duration: 2,
    stagger: 0.8,
    scrollTrigger: {
        // markers: true,
        start: '-200px center',
        end: '+=100px',
        trigger: '.demo-cards .card',
        scrub: 5,
    },
});

// LAUNCH section float up
gsap.to('#launch', {
    borderRadius: 0,
    translateY: 0,
    scale: 1,
    ease: 'SlowMo',
    duration: 1,
    scrollTrigger: {
        // markers: true,
        start: 'top 60%',
        end: '+=20px',
        trigger: '#launch',
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
            duration: '140%', // this works just fine with duration 0 as well
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
