import { gsap } from 'gsap/dist/gsap';

const church = document.querySelector('.church img');
const isWebkit = navigator && navigator.userAgent.match(/webkit/i);
let root = isWebkit ? 'body' : 'html';
const elements = document.querySelectorAll('.img');
const elcount = elements.length;
const inspiredImages = document.querySelectorAll('.inspired-by');
var scrolling = false;

/** ================
 ** - Get Images-
 ** ================== */
function bindBgs(els) {
    els.forEach(element => {
        element.style.backgroundImage = " url('" + element.getAttribute("data-img") + "')"
    });
}
bindBgs(elements);
bindBgs(inspiredImages);



/** ================================
 ** - Navbar changes color when scrolling-
 ** ================================ */
const nav = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const starImg = document.querySelector('.star-sky img');
const neonWrapper = document.querySelector('.neon-wrapper');
const heroTitle = document.querySelector('.hero-title');
const heroText = document.querySelector('.hero-title h1');
const thumbnails = document.querySelectorAll('.inspired-by');
const cardContent = document.querySelector('.card-content');
const cardText = document.querySelector('.card-text');
const stairs = document.querySelectorAll('.stair');
const halfBg1 = document.querySelector('.intro-bg1');
const halfBg2 = document.querySelector('.intro-bg2');
const introText = document.querySelector('.intro-text');
const upImages = document.querySelectorAll('.one-screen .up-image');
const downImages = document.querySelectorAll('.one-screen .down-image');
const imageWraps = document.querySelectorAll('.one-screen');
const screenBg = document.getElementById('#screen');
let init = 0;//when page loading init runs 
let flipped = false;




function autoFlip(images, flipped) {
    if (flipped === false) {
        window.requestAnimationFrame(() => { sideFlip(images, 90) });
    } else {
        window.requestAnimationFrame(() => { sideFlip(images, 0) });
    }
    async function sideFlip(images, deg) {
        for (let i = 0; i < images.length; i++) {
            await new Promise(r => setTimeout(r, 300));
            images[i].style.transform = "rotateX(" + deg + "deg)";
        }
        window.requestAnimationFrame(sideFlip);
    }
}






async function stairsMove(ms) {
    for (let i = 0; i < stairs.length; i++) {
        stairs[i].style.transform = "translate3d(" + (stairs.length - i) * 80 + "px,0px,0px)";
        stairs[i].style.transitionDuration = (stairs.length - i) * 0.3 + 's';
        await new Promise(r => setTimeout(r, ms - 100 * i * 2));
    }
}

function skyRotate() {
    starImg.style.animationName = "sky-rotate";
    requestAnimationFrame(skyRotate);
}

function churchAppear() {
    setTimeout(() => {
        church.classList.add('church-in');
    }, 800)
}

function titleSlide() {
    setTimeout(() => {
        heroText.classList.add('title-move');
    }, 500)
}

function textAppear() {
    setTimeout(() => {
        introText.style.opacity = "1";
    }, 800)

}

function heroBg() {
    titleSlide();
    setTimeout(() => {
        textAppear();
        highlightBg();
    }, 1000)
    heroTitle.classList.add('title-width');
}

function thumbnailAppear(n, ms) {
    setTimeout(() => {
        thumbnails[n].classList.add('appear');
    }, ms)
}

function stairTitleSpin() {
    setTimeout(() => {
        cardText.classList.add('clear-up');
    }, 500)
    cardContent.classList.add('content-spin');
}

function highlightBg() {
    halfBg1.style.animationName = "intro-bg";
    halfBg2.style.animationName = "intro-bg";
    requestAnimationFrame(highlightBg);
}

function neonCupSpin() {
    neonWrapper.style.animationName = "neon-spin";
    requestAnimationFrame(neonCupSpin);
}

const sectionOptions = {
    threshold: 0.4,
    rootMargin: "100px"
};
const sectionObserver = new IntersectionObserver(function (entries, sectionObserver) {
    entries.forEach(async entry => {
        if (entry.isIntersecting) {
            switch (entry.target.id) {
                case 'rotating-sky':
                    if (nav.classList.contains('nav-bg')) nav.classList.remove('nav-bg');
                    churchAppear();
                    heroBg();
                    cancelAnimationFrame(highlightBg);
                    requestAnimationFrame(skyRotate);
                    thumbnailAppear(0, 2000);
                    break;

                case 'staircase':
                    nav.classList.add('nav-bg');
                    stairTitleSpin();
                    await new Promise(r => setTimeout(r, 1500));
                    stairsMove(1000);
                    thumbnailAppear(1, 2000);
                    break;

                case 'spinner':
                    if (nav.classList.contains('nav-bg')) nav.classList.remove('nav-bg');
                    //btnPlay inactivated when spinner working
                    btnPlay.style.pointerEvents = 'none';
                    attachProducts();
                    thumbnailAppear(2, 2000);
                    break;

                case 'testimonial':
                    nav.classList.add('nav-bg');
                    autoMove();
                    textAutoRoll();
                    break;

                case 'contacts':
                    if (nav.classList.contains('nav-bg')) nav.classList.remove('nav-bg');
                    requestAnimationFrame(neonCupSpin);
                    cancelAnimationFrame(neonCupSpin);
                    thumbnailAppear(3, 2000);
                    break;

                case 'screen':
                    window.requestAnimationFrame(flipCube);
                    break;
                default:
                    break;
            }
        }
    })
}, sectionOptions);
sections.forEach(section => {
    sectionObserver.observe(section)
})

function flipCube() {
    const rots = {
        x: 0,
        y: 0,
        z: 0
    };
    // const endless;
    let flip = gsap.timeline({
        repeat: -1,
        yoyo: true,
        pause: false,
        repeatDelay: 2,
        defaults: {
            delay: 3,
            duration: 1,
        },
        onUpdate: () => {
            gsap.set(cubes, {
                stagger: {
                    each: 0.3,
                    // ease: "Power1.easeInOut"
                    ease: "sine.inOut",
                    // ease: "power2.in"
                },
                transform: `rotateX(${rots.x}deg)`,
            });
        }
    })
        // .to(rots, { x: 90 }) //bottom
        .to(rots, { x: -90 })//bottom to top
    return flip;
}
/** =======================
 ** - Slot Spinners Products-
 ** =========================
 **
 */
const products = [{
    name: "earnings",
    id: 1,
    price: 5.99,
    intro: 'Lorem ipsum, dolor sit amet',
    img: "./css/img/earings-300x300.png"
}, {
    name: "earnings2",
    id: 2,
    price: 11.99,
    intro: 'Lorem ipsum, dolor sit amet',
    img: "./css/img/earing2-300x300.png"
}, {
    name: "earnings3",
    id: 3,
    price: 6.99,
    intro: 'Lorem ipsum, dolor sit amet',
    img: "./css/img/earings3-300x300.jpg"
}, {
    name: "bracelet1",
    id: 4,
    price: 10.99,
    intro: 'Lorem ipsum, dolor sit amet',
    img: "./css/img/bracelet2-300x300.png"
}, {
    name: "bracelet2",
    id: 5,
    price: 8.99,
    intro: 'Lorem ipsum, dolor sit amet',
    img: "./css/img/Bracelets3-300x300.jpg"
}, {
    name: "bracelet3",
    id: 6,
    price: 7.99,
    intro: 'Lorem ipsum, dolor sit amet',
    img: "./css/img/bracelet-300x300.jpg"
}, {
    name: "lipstick1",
    id: 7,
    price: 7.99,
    intro: 'Lorem ipsum, dolor sit amet',
    img: "./css/img/lipstick1-300x300.png"
}, {
    name: "lipstick2",
    id: 8,
    price: 11.99,
    intro: 'Lorem ipsum, dolor sit amet',
    img: "./css/img/lipstick2-300x300.png"
}, {
    name: "lipstick3",
    id: 9,
    price: 12.99,
    intro: 'Lorem ipsum, dolor sit amet',
    img: "./css/img/Lipstick3-300x300.png"
}]

const btnPlay = document.querySelector('.spinner-footer button');
var scrolling = false;
const spinnerBgs = document.querySelectorAll('.body-wrapper');
bindBgs(spinnerBgs);
//define each column in the spinner
const columns = document.querySelectorAll('.product-card');
let onlyProducts = [];

//1 shuffle the product list
function shuffleProducts(arr) {
    let length = arr.length;
    while (length) {
        const i = Math.floor(Math.random() * length--);
        [arr[length], arr[i]] = [arr[i], arr[length]];
    }
    return arr;
}

//2 create each product div and details
products.forEach(item => {
    const {
        id,
        img,
        price,
        name,
        intro
    } = item;
    //0 create an element div with product img
    const productDiv = document.createElement('div');
    productDiv.innerHTML =
        `<h4>${name.toUpperCase()}</h4><img src=${img} alt = ${name}><h5>$${price}</h5><div class='product-description'><p>${intro}</p></div>`;
    onlyProducts.push(productDiv);
});


// Create delay between each column's tranforms
const sleep = (n) => {
    return new Promise((resolve) => setTimeout(resolve, (n + 1) * 200));
}

// shuffle and attach products when page loaded and when play button clicked
function attachProducts() {
    //3 each column (totally 3) has the same numbers of shuffled items
    columns.forEach(async (column, index) => {
        //2  shuffle 3 times, different order of products in one column
        onlyProducts = shuffleProducts(onlyProducts);
        const productList = column.querySelector('.product-details');
        if (productList.childNodes.length >= 1) {
            productList.innerHTML = '';
            for (let i = 0; i < onlyProducts.length; i++) {
                let node = document.createElement('div');
                node.classList.add('single-product');
                node.setAttribute('id', i + 1);
                node.innerHTML = onlyProducts[i].innerHTML;
                const clnItem = node.cloneNode(true);
                //append array products into parent div
                productList.appendChild(clnItem);
            }
        }
        //introduce a bit delay to each column's transform;
        await sleep(index);
        productList.style.transform = `translateY(-${column.clientHeight * (onlyProducts.length - 1)}px)`;
        let transitionEndEventName = getTransitionEndEventName();
        //Add the end of transform,do spinning
        productList.addEventListener(transitionEndEventName, function () {
            justSpin(2);
        })
    })
}

//click and play
btnPlay.addEventListener('click', (e) => {
    btnPlay.style.pointerEvents = 'none';
    attachProducts();
});


function getTransitionEndEventName() {
    var transitions = {
        "transition": "transitionend",
        "OTransition": "oTransitionEnd",
        "MozTransition": "transitionend",
        "WebkitTransition": "webkitTransitionEnd"
    }
    let bodyStyle = document.body.style;
    for (let transition in transitions) {
        if (bodyStyle[transition] != undefined) {
            return transitions[transition];
        }
    }
}

async function justSpin(duration) {
    for (let i = 0; i < columns.length; i++) {
        // await sleep(i * duration);
        // console.log(columns);
        const productList = columns[i].querySelector(".product-details");
        productList.style.transitionDuration = duration + 's';
        productList.style.transform = "translateY(0)";
        productList.addEventListener('transitionend', (e) => {
            btnPlay.style.pointerEvents = 'initial'; /*removeProducts(productList)*/
        }, {
            once: true
        })
    }
}



/** ===============================
 ** - Assign Random Colors To Stairs-
 ** ================================
 **
 */
let colors = ['#F2EBBF', '#7F827B', '#8CBEB2', '#F06060', '#f3b562'];
document.addEventListener('DOMContentLoaded', assignStairColor());

function assignStairColor() {
    const divs = document.querySelectorAll('.stair');
    for (let i = 0; i < divs.length; i++) {
        let randomIndex = Math.floor(Math.random() * (colors.length));
        const newStyle = colors[randomIndex];
        divs[i].style.background = newStyle;
        colors = colors.filter((color,
            index) =>
            index !== randomIndex);
    }
}
/* -----End of Random Content Background----- */


/** ===============================
 ** - Stairs Moves When in Viewport-
 ** ==================================
 **
 */


/* -----End of Random Content Background----- */




/** ================
 ** - Slides Scroll -
 ** ================ */
// Carousel Images Horizontal Scrolling
function moveToSlide(track, targetSlide, currentSlide) {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}


// Carousel Text Vertical Scrolling
function moveToTesti(track, targetSlide, currentSlide) {
    track.style.transform = 'translateY(-' + targetSlide.style.top + ')';
    currentSlide.classList.remove('current-testi');
    targetSlide.classList.add('current-testi');
}

const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
let cardSlides = document.querySelectorAll('.carousel-track img');
let track = document.querySelector('.carousel-track');
const length = cardSlides.length;
let slideWidth = cardSlides[0].offsetWidth;
track.style.width = cardSlides.length * slideWidth;
cardSlides.forEach((slide, index) => slide.style.left = index * slideWidth + 'px');

leftArrow.addEventListener('click', () => {
    clearInterval(timer);
    nextScrolling()
});
rightArrow.addEventListener('click', () => {
    clearInterval(timer);
    prevScrolling()
});

function nextScrolling() {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling ? currentSlide.previousElementSibling :
        currentSlide;
    moveToSlide(track, prevSlide, currentSlide);
}

function prevScrolling() {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling ? currentSlide.nextElementSibling : currentSlide;
    moveToSlide(track, nextSlide, currentSlide);
}

function autoMove() {
    let prevIndex = 0;
    let timer = setInterval(function () {
        const currentSlide = track.querySelector('.current-slide');
        let currentIndex = [...cardSlides].findIndex(slide => slide === currentSlide);
        if (currentIndex >= prevIndex && currentIndex < cardSlides.length - 1) {
            prevScrolling();
            prevIndex = currentIndex;
        } else {
            nextScrolling();
            prevIndex = currentIndex;
        }
    }, 4000)
}

const testiTexts = document.querySelectorAll('.testi-text');
const testiHeight = testiTexts[0].offsetHeight;
const testiTrack = document.querySelector('.text-track');
testiTrack.style.height = testiHeight * testiTexts.length + 'px';
testiTexts.forEach((testiText, index) => testiText.style.top = index * testiHeight + 'px');
const nextTesti = () => {
    const currentTesti = testiTrack.querySelector('.current-testi');
    const nextTesti = currentTesti.nextElementSibling ? currentTesti.nextElementSibling : currentTesti;
    moveToTesti(testiTrack, nextTesti, currentTesti);
}
const lastTesti = () => {
    const currentTesti = testiTrack.querySelector('.current-testi');
    const prevTesti = currentTesti.previousElementSibling ? currentTesti.previousElementSibling :
        currentTesti;
    moveToTesti(testiTrack, prevTesti, currentTesti);
}

function textAutoRoll() {
    let prevIndex = 0;
    let testiTimer = setInterval(() => {
        const currentTesti = document.querySelector('.current-testi');
        let currentIndex = [...testiTexts].findIndex(text => text === currentTesti);
        if (currentIndex >= prevIndex && currentIndex < testiTexts.length - 1) {
            nextTesti();
            prevIndex = currentIndex;
        } else {
            lastTesti();
            prevIndex = currentIndex;
        }
    }, 4000)
}

/*End of scrolling slides */


/** =====================
 ** -Get Smooth Scrolling -
 ** ======================= */

const scroll = new SmoothScroll('.navbar a[href*="#"]', {
    speed: 800
});


/** ================================
 ** -Elements appear when scrolling -
 ** ================================ */
function scrollAppear() {
    const indexLadder = document.querySelector('.index-ladder');
    const scrollY = window.scrollY;
    const ladderPost = indexLadder.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;
    const blockTitle = document.querySelector('.block-title');
    const cardContent = document.querySelector('.card-content');
    const cardText = document.querySelector('.card-text');
    if (ladderPost < screenHeight) {
        setTimeout(() => {
            indexLadder.classList.add('ladder-slideup')
        }, 1000);
    }
}

window.addEventListener('scroll', () => {
    scrollAppear();
    // titleStretch();
})





/** ================
 ** - Screen Carousel -
 ** ================ */
function loadImages(images, string) {
    images.forEach((image, index) => {
        image.style.backgroundImage = "url(./css/img/" + string + (index + 1) + ".jpg)";
        image.style.backgroundSize = "contain";
    })
}
loadImages(upImages, 'Skyscraper');
loadImages(downImages, 'sakura');
