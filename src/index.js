import './scripts/animation.js';
// import initScrollReveal from './scripts/scrollReveal.js';
import initTiltEffect from './scripts/tiltAnimation.js';
// import { targetElements, defaultProps } from './data/scrollRevealConfig';
import { Collapse } from 'bootstrap';
import { Expo, gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import AOS, { refresh } from 'aos';
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

const body = document.querySelector('body');
const logo = document.getElementById('logo');
const devSection = document.getElementById('development');
const customizeExpandBtn = document.getElementById('customize-dropdown-ctrl');

$(window).on('load', function () {
    if (window.innerWidth > 576) {
        document.getElementById('collapse_dev').classList.remove('collapse');
    } else {
        expandDevSection();
    }
});

$(window).on('resize', function () {
    // mobile ?
    if (window.innerWidth > 576) {
        document.getElementById('collapse_dev').classList.remove('collapse');
    } else {
        expandDevSection();
    }
});

$(customizeExpandBtn).click(() => {
    expandDevSection();
});

$('.goto-customize').click(function (event) {
    event.preventDefault();
    $('html, body').animate(
        { scrollTop: $($(this).attr('href')).offset().top },
        500
    );
});

function expandDevSection() {
    if (
        customizeExpandBtn.getAttribute('aria-expanded') === 'true' &&
        window.innerWidth <= 576
    ) {
        // item will expand, so expand dev. sec.
        devSection.classList.add('mobile-expanded');
    } else {
        devSection.classList.remove('mobile-expanded');
    }
}

// text fly-in for demo section
gsap.set('.design-card-col', {
    x: '-100vw',
    opacity: 1,
});
gsap.to('.design-card-col', {
    x: '0',
    opacity: 1,
    transformOrigin: 'left',
    ease: 'ease-in-out',
    stagger: 0.2,
    scrollTrigger: {
        // markers: true,
        start: 'top center',
        end: 'center center',
        trigger: '#design-col-1',
        toggleActions: 'play none resume reverse',
    },
});
// Set design cards to expand on hover w/ fake btn clicks
document.querySelectorAll('.design-card-col').forEach((item, i) => {
    item.addEventListener('mouseover', () => {
        // expand the box horizontally

        item.classList.replace('col-lg-10', 'col-lg-12');
        item.classList.add('open');

        let others = [2];

        // setTimeout(() => {
        if (
            document
                .getElementById('collapse-ctrl-' + (i + 1))
                .getAttribute('aria-expanded') === 'false'
        ) {
            $('#collapse-ctrl-' + (i + 1)).click();
            document
                .querySelectorAll(
                    '#design-col-' + (i + 1) + ' .title-wrap .fa-solid'
                )
                .forEach((design_card) => {
                    design_card.classList.add('open');
                });
            // setTimeout(() => {
            //     i + 1 == 1
            //         ? (others = [2, 3])
            //         : i + 1 == 2
            //         ? (others = [1, 3])
            //         : (others = [1, 2]);

            //     others.forEach((other_ind) => {
            //         const col = document.getElementById(
            //             'design-col-' + other_ind
            //         );
            //         const ctrl = document.getElementById(
            //             'collapse-ctrl-' + other_ind
            //         );
            //         if (
            //             col.classList.contains('col-lg-11') ||
            //             col.getAttribute('aria-expanded') == true
            //         ) {
            //             try {
            //                 col.classList.replace('col-lg-11', 'col-lg-9');
            //             } catch (e) {
            //                 console.log('already shrunk: ' + e);
            //             }

            //             col.classList.remove('open');
            //             ctrl.click();
            //         }
            //     });
            // }, 300);
        }
        // }, 200);
    });
});

// initScrollReveal(targetElements, defaultProps);
initTiltEffect((res) => {
    console.log(res);
});

// Flip logo to white after 500ms
function invertLogo() {
    setTimeout(() => {
        logo.classList.add('invert');
    }, 500);
}

// Fade in launch bg.. on scroll

// Radio buttons event listeners
var color_options = document.forms['color-form'].elements['radio_color'];
for (var i = 0, max = color_options.length; i < max; i++) {
    color_options[i].onclick = function () {
        // console.log('new color: ' + this.value);
        body.setAttribute('data-color', this.value);
    };
}
var font_options = document.forms['font-form'].elements['radio_font'];
for (var i = 0, max = font_options.length; i < max; i++) {
    font_options[i].onclick = function () {
        // console.log('new font: ' + this.value);
        body.setAttribute('data-font', this.value);
    };
}
var corner_options = document.forms['corners-form'].elements['radio_corners'];
for (var i = 0, max = corner_options.length; i < max; i++) {
    corner_options[i].onclick = function () {
        // console.log('new corners: ' + this.value);
        body.setAttribute('data-corners', this.value);
    };
}
var flatness_options =
    document.forms['flatness-form'].elements['radio_flatness'];
for (var i = 0, max = flatness_options.length; i < max; i++) {
    flatness_options[i].onclick = function () {
        body.setAttribute('data-flatness', this.value);
    };
}

invertLogo();
