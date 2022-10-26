import './scripts/scroll-timeline.js';
import './scripts/animation.js';
// import initScrollReveal from './scripts/scrollReveal.js';
import initTiltEffect from './scripts/tiltAnimation.js';
// import { targetElements, defaultProps } from './data/scrollRevealConfig';
import { Collapse } from 'bootstrap';

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 0, // offset (in px) from the original trigger point
    delay: 500, // values from 0 to 3000, with step 50ms
    duration: 300, // values from 0 to 3000, with step 50ms
    easing: 'expo', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

// text fly-in for demo section

// Set design cards to expand on hover w/ class replacement
document.querySelectorAll('.design-card-col').forEach((item, i) => {
    item.addEventListener('mouseover', () => {
        // expand the box horizontally
        item.classList.replace('col-lg-7', 'col-lg-11');
        setTimeout(() => {
            if (
                document
                    .getElementById('collapse-ctrl-' + (i + 1))
                    .getAttribute('aria-expanded') === 'false'
            ) {
                $('#collapse-ctrl-' + (i + 1)).click();
                i + 1 == 1
                    ? (others = [2, 3])
                    : i + 1 == 2
                    ? (others = [1, 3])
                    : (others = [1, 2]);

                others.forEach((other_ind) => {
                    if (
                        document
                            .getElementById('collapse-ctrl-' + other_ind)
                            .getAttribute('aria-expanded') === 'true'
                    ) {
                        document
                            .getElementById('collapse-ctrl-' + other_ind)
                            .click();

                        document
                            .getElementById('design-col-' + other_ind)
                            .classList.replace('col-lg-11', 'col-lg-7');
                    }
                });

                setDesignBG();
            }
        }, 500);
    });
});

// change bg of design section based on the lowest open card
const design_section = document.getElementById('design');

function setDesignBG() {
    if (
        document
            .getElementById('collapse-ctrl-3')
            .getAttribute('aria-expanded') === 'true'
    ) {
        design_section.classList.add('bg-3');
    } else if (
        document
            .getElementById('collapse-ctrl-2')
            .getAttribute('aria-expanded') === 'true'
    ) {
        design_section.classList.add('bg-2');
    } else if (
        document
            .getElementById('collapse-ctrl-1')
            .getAttribute('aria-expanded') === 'true'
    ) {
        design_section.classList.add('bg-1');
    }
}
// initScrollReveal(targetElements, defaultProps);
initTiltEffect((res) => {
    console.log(res);
});

let logo = document.getElementById('logo');

// Flip logo to white after 500ms
function invertLogo() {
    setTimeout(() => {
        logo.classList.add('invert');
    }, 500);
}

invertLogo();
