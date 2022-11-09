// Import and register GSAP (UMD/CommonJS)
import { Expo, gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
// import { Collapse } from 'bootstrap';
import VanillaTilt from 'vanilla-tilt';

// Not sure if I want panels for any size yet..
const enable_panels = false;

/**
 * Sets elements starting positions to prep GSAP to anim. them in.
 * Doing it this way so CSS represents static-state site (no js, etc...)
 */
// ------------------------------------------------------
//
gsap.set('#design-info', {
    opacity: 0,
});
gsap.set('#design-line', {
    scaleX: 0,
    opacity: 1,
});
gsap.set('#design-dot', {
    scale: 2,
    rotateY: '180deg',
    opacity: 0,
});
gsap.set('#design-line h2', {
    opacity: 0,
});
gsap.set('#dev-line', {
    scaleX: 0,
    opacity: 1,
});
gsap.set('#dev-dot', {
    scale: 2,
    rotateY: '180deg',
    opacity: 0,
});
// Functions to run on window load (delayed)
$(window).on('load', function () {
    updateForScreen(window.innerWidth);
});
// ------------------------------------------------------

$(window).on('resize', function () {
    updateForScreen(window.innerWidth);
});

gsap.to('#launch-bg', {
    filter: 'opacity(1)',
    ease: 'none',
    scrollTrigger: {
        // markers: true,
        trigger: '#launch-bg',
        start: 'center bottom',
        end: 'bottom bottom',
        scrub: 4,
    },
});

function toggleCard(cardNum, action) {
    const ctrlEl = document.getElementById('collapse-ctrl-demo_' + cardNum);
    //want to open, and not open? OPEN
    if (
        (action === 'open' &&
            ctrlEl.getAttribute('aria-expanded') === 'false') ||
        (action === 'close' && ctrlEl.getAttribute('aria-expanded') === 'true')
    ) {
        document.getElementById('collapse-ctrl-demo_' + cardNum).click();
    }
}

function updateForScreen(width) {
    console.log(width);

    // DESKTOP + UHD
    if (width > 991) {
        document.querySelectorAll('.demo').forEach((demo_card) => {
            gsap.to('#' + demo_card.id, {
                scrollTrigger: {
                    // markers: true,
                    start: 'top 80%',
                    end: 'top top',
                    reversed: true,
                    trigger: '#' + demo_card.id,
                    onEnter: () => {
                        toggleCard(demo_card.id[5], 'open');
                    },
                    onEnterBack: () => {
                        toggleCard(demo_card.id[5], 'open');
                    },
                    onLeave: () => {
                        toggleCard(demo_card.id[5], 'close');
                    },
                    onLeaveBack: () => {
                        toggleCard(demo_card.id[5], 'close');
                    },
                },
            });
        });
    }
    // if (width > 400) {
    // PROBABLY ONLY COVERS DESKTOP
    gsap.to('.thru-line', {
        scale: 1,
        // y: '220vh',
        y: 2100,
        ease: 'expo',
        scrollTrigger: {
            // markers: true,
            start: 'bottom top',
            end: '+=2800px',
            trigger: '.thru-line',
            scrub: 2,
        },
    });
    // } else {
    //     gsap.to('.thru-line', {
    //         scale: 1,
    //         // y: '220vh',
    //         y: '130%',
    //         ease: 'expo',
    //         scrollTrigger: {
    //             // markers: true,
    //             start: 'bottom top',
    //             end: '290% top',
    //             trigger: '.thru-line',
    //             scrub: 2,
    //         },
    //     });
    // }
    gsap.to('.thru-line2', {
        scale: 1,
        y: '100px',
        ease: 'expo',
        scrollTrigger: {
            // markers: true,
            start: 'bottom center',
            end: '+=70px',
            trigger: '.thru-line2',
            scrub: 2,
        },
    });
}

gsap.to('#design-line', {
    scaleX: 1,
    opacity: 1,
    transformOrigin: 'left',
    ease: 'ease-in-out',
    scrollTrigger: {
        // markers: true,
        start: 'top center',
        end: '+=1px',
        trigger: '#design-line',
        toggleActions: 'play none play reverse',
        onLeaveBack: () => {
            gsap.to('#design-dot', {
                scale: 2,
                rotateY: '180deg',
                opacity: 0,
            });
            gsap.to('#design-line h2', {
                opacity: 0,
                ease: 'ease',
                duration: 0.3,
            });
            gsap.to('#design-info', {
                opacity: 0,
                ease: 'ease',
                duration: 0.3,
            });
        },
    },
    onComplete: () => {
        // Dot-flip animation when done
        gsap.to('#design-dot', {
            rotateY: '0deg',
            opacity: 1,
            scale: 1,
            ease: 'expo',
            duration: 0.2,
        });
        gsap.to('#design-line h2', {
            opacity: 1,
            ease: 'ease',
            duration: 0.6,
        });
        gsap.to('#design-info', {
            opacity: 1,
            ease: 'ease',
            delay: 0.8,
            duration: 0.6,
        });
    },
});

gsap.to('#dev-line', {
    scaleX: 1,
    opacity: 1,
    transformOrigin: 'left',
    ease: 'ease-in-out',
    scrollTrigger: {
        // markers: true,
        start: 'top center',
        end: '+=1px',
        trigger: '#dev-line',
        toggleActions: 'play none play reverse',
        onLeaveBack: () => {
            gsap.to('#dev-dot', {
                scale: 2,
                rotateY: '180deg',
                opacity: 0,
            });
            gsap.to('#dev-line h2', {
                opacity: 0,
                ease: 'ease',
                duration: 0.3,
            });
        },
    },
    onComplete: () => {
        // Dot-flip animation when done
        gsap.to('#dev-dot', {
            rotateY: '0deg',
            opacity: 1,
            scale: 1,
            ease: 'expo',
            duration: 0.2,
        });
        gsap.to('#dev-line h2', {
            opacity: 1,
            ease: 'ease',
            duration: 0.6,
        });
    },
});

// animate slide-in words for demo section wipe-up
let word_index = 0;
for (const word of document.getElementById('demo-section-title').children) {
    word_index++;
    gsap.from('#' + word.id, {
        opacity: 0,
        // scale: 2,
        x: 1800,
        ease: 'expo',
        scrollTrigger: {
            // markers: true,
            start: 'top 80%',
            end: 'top 50%',
            trigger: '#' + word.id,
            scrub: 5,
            // onLeave: word_index == word_count ? showCards : null, //CALLBACK ON FINISH
        },
    });
}

gsap.from('.demo-cards .demo.card', {
    opacity: 0,
    y: 400,
    ease: 'expo',
    duration: 2,
    stagger: 0.8,
    delay: 2,
    scrollTrigger: {
        // markers: true,
        start: 'top bottom',
        end: '+=100px',
        trigger: '.demo-cards .demo.card',
        scrub: 5,
    },
});

gsap.from('.demo-cards .info.card', {
    opacity: 0,
    y: '-100%',
    ease: 'back',
    duration: 2,
    stagger: 0.8,
    scrollTrigger: {
        // markers: true,
        start: 'bottom 80%',
        end: '+=100px',
        trigger: '.demo-cards .card',
        scrub: 5,
    },
});

// Section Wipe script
$(function () {
    // wait for document ready
    // init
    var controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 'onLeave',
            duration: '190%', // this works just fine with duration 0 as well
            // However with large numbers (>20) of pinned sections display errors can occur so every section should be unpinned once it's covered by the next section.
            // Normally 100% would work for this, but here 200% is used, as Panel 3 is shown for more than 100% of scrollheight due to the pause.
        },
    });

    // get all slides
    if (window.innerWidth > 1200 && enable_panels) {
        console.log('panels');
        var slides = document.querySelectorAll('.panel');
    }
    // create scene for every slide
    for (var i = 0; i < slides.length; i++) {
        new ScrollMagic.Scene({
            triggerElement: slides[i],
        })
            .setPin(slides[i], { pushFollowers: false })
            .addTo(controller);
    }
});

function destroyTilt() {
    var tiltElements = document.querySelectorAll(`[data-tilt]`);
    var mq = window.matchMedia('(max-width: 1025px)');
    if (mq.matches) {
        for (var i = 0, len = tiltElements.length; i < len; i++) {
            tiltElements[i].vanillaTilt.destroy();
        }
    } else {
        console.log('pedal');
    }
}

// destroyTilt();

// THIS WILL TRIGGER ON RESIZE...
// addEventListener('resize', (event) => {

// });
