import './scripts/scroll-timeline.js';
import './scripts/GSAP_data.js';
// import initScrollReveal from './scripts/scrollReveal.js';
import initTiltEffect from './scripts/tiltAnimation.js';
// import { targetElements, defaultProps } from './data/scrollRevealConfig';

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

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
