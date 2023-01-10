## Run / Dev

`npm run start`

## Build

`npm run build` or `parcel build`

### Rundown

#### Styles

Bootstrap grid system is used for layout: https://getbootstrap.com/docs/5.3/layout/grid/

Icons provided by FontAwesome: https://fontawesome.com/

This webiste is animated using GSAP: https://greensock.com/docs/

Wavy SVG animation in "development" section is done with Kute.js: https://thednp.github.io/kute.js/

The objects that 'tilt' according to mouse position use VanillaTilt: https://micku7zu.github.io/vanilla-tilt.js/

The CSS for responsive design is heavily reliant on media queries. All CSS is contained in styles.css

#### Script

    Most GSAP animation tweens are in animation.js, while some are thrown into index.js.
    tiltAnimation.js handles the VanillaTilt initalization only.

## Demo

A demo of the site is temporarily available at: https://profitalwebdev.com/
