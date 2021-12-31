'use strict';
const openAccount = document.querySelectorAll('.btn--show-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const close = document.querySelector('.btn--close-modal');



const openModal = function(e){
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

const closeModal = function(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

for(let i=0 ; i < openAccount.length; i++)
openAccount[i].addEventListener('click', openModal);

close.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
   if(e.key === 'Escape' && !modal.classList.contains('hidden')){
       closeModal();
   };
});

// //nav scrolling the first way by each elemnt  by use loop to pass all the elemnt 
// document.querySelectorAll('.nav__link').forEach(
//     function(e1) {
//         e1.addEventListener('click', function(e){
//             e.preventDefault();
//             const id = this.getAttribute('href');
//             document.querySelector('id').scrollIntoView({
//                 behavior:'smooth'
//             });
//         });
//     }
// );

//another way by using delegation the parent class 
// determined where the elemt originated 

document.querySelector('.nav__links').addEventListener('click', function(e){
    e.preventDefault();

    //matching strategy 
    //check if every elemnt is contain class nav link
    // scroll by id by scrollIntoview method and smoothy
    // use e.target to specify the elemnt that on it the event happens
    if(e.target.classList.contains('nav__link')){
            const id = e.target.getAttribute('href');
            document.querySelector(id).scrollIntoView({
                behavior:'smooth'
            });
    }
})


//tabbed component 
// select the queres the container & content & tab
const tabs = document.querySelectorAll('.operations__tab');
const content = document.querySelectorAll('.operations__content');
const containerTabs = document.querySelector('.operations__tab-container');

//add eventlistener to the content 
// specify the tab by target 
containerTabs.addEventListener('click', function(e){ 
    const clicked = e.target.closest('.operations__tab');

    //if we press outside will be error & gaurd clause
    if(!clicked) return;

    //deactivate tabs and content
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    content.forEach(c => c.classList.remove('operations__content--active'));


    //activate tab 
    clicked.classList.add('operations__tab--active');

    //active conmtent by each content
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});


//menu fade animation
const nav = document.querySelector('.nav');

//function for calling it when mouseover and mouseout
const handleNavLinks = function(e, opacity){
    //condition for verify if our target contains nav-link
    if(e.target.classList.contains('nav__link')){
        const link = e.target;
        const sibling = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');
    
    // for each to loop all the four links 
         sibling.forEach(el => {
             //condition to make opacity to other 
             if(el !== link)
             el.style.opacity = opacity;
         });
         //make opacity to the logo image
         logo.style.opacity = opacity;
        }
};

//add eventlistener to mouseover when hover to the link
nav.addEventListener('mouseover', function(e1){
     handleNavLinks(e1, 0.5);
});

//add eventlistener to mouseout when out the mouse 
nav.addEventListener('mouseout', function(e1){
    handleNavLinks(e1, 1);
});


//sticky naviagation to be fixed position
//observeInersection 

//callback function 

// const section = document.querySelector('.section--1');

// const obCallBack = function(entries, observer){
//       entries.forEach(e1 => {
//           console.log(e1)
//       });
// };

// //options to intersection with observation
// const obOptions = {
//   threshold : 0.1,
//   root : null,
// };

// // create a new observation
// const observer = new IntersectionObserver(obCallBack, obOptions);
// observer.observe(section);

//another way to sticky nav by api observer 
const header =document.querySelector('.header');
const dynamicHeight = nav.getBoundingClientRect().height; // to put dynamic for the specific hight by this function 

const navObserveSticky =function(entery){
    //make like entery[0] take the threshold using destruct
    const [e] = entery; 

    //if not intersection with viewport so add sticky if not remove it
    if(!e.isIntersecting)
    nav.classList.add('sticky');
    else
    nav.classList.remove('sticky');
}

//create a new intersectionOserving with options object
const headerObserver = new IntersectionObserver(navObserveSticky, {
   root : null,
   threshold : 0,
   rootMargin : `-${dynamicHeight}px`,//to start before the section2 start but dynamic
});
headerObserver.observe(header); //call it on the header

// reveal sections  to show the sections smoothly 
const section = document.querySelectorAll('.section')

 const revealSections = function(entry, observer){
     const [e] = entry;

     if(!e.isIntersecting) return; // if the e not intersecting dont show

     e.target.classList.remove('section--hidden'); // remove hiddin and show it smoothly
     observer.unobserve(e.target); //to make it one time not every reload
 }

const revealObserver = new IntersectionObserver(revealSections, {
  root : null,
  threshold : 0.15,
})

//loop to show all the sections
section.forEach((section)=>{
    revealObserver.observe(section);
   // section.classList.add('section--hidden');
})


//lazy loading images 
const img = document.querySelectorAll('img[data-src]');

const imageObs = function (entry, observer){
    const [e] = entry;

    if(!e.isIntersecting) return;

    //replace the src in the original src 
    e.target.src = e.target.dataset.src ;

    //to remove blur we should addeventlistener to target
    e.target.addEventListener('load', function(){
      e.target.classList.remove('lazy-img');
    });

    observer.unobserve(e.target);
}

const imageObserver = new IntersectionObserver(imageObs , {
  root: null,
  threshold: 0,
});

img.forEach((img)=> {
    imageObserver.observe(img);
})

// slider tab
const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');

let currSlide = 0;
const maxLenght = slides.length;


const goToNext = function (index){ 
    slides.forEach((s, i)=>{
        s.style.transform = `translateX(${100 * (i-index)}%)`}
    );
}

goToNext(0);

const goRight = function(){
    if (currSlide === maxLenght - 1){
        currSlide = 0;
    }else {
         currSlide++;
    }
   goToNext(currSlide);
};

const goLeft = function(){
    if (currSlide === 0){
        currSlide = maxLenght - 1 ;
    }else {
         currSlide--;
    }
   goToNext(currSlide);
};

btnRight.addEventListener('click', goRight);
btnLeft.addEventListener('click', goLeft);

document.addEventListener('keydown', function(e){
    if(e.key === 'Arrowleft') goLeft();
     e.key === 'ArrowRight' &&  goRight();

})







// //selections elements 

// console.log(document.documentElement);
// console.log(document.body);
// console.log(document.head);

// const header = document.querySelector('.header');
// const sections = document.querySelectorAll('.section');//not change if we delete one of them


// const section = document.getElementById('section--1');
// const buttons = document.getElementsByTagName('button');// dynamically change if we delete anything from the dom 

// const message = document.createElement('div');
// message.classList.add('cookie-message');

// //message.textContent = 'We use cookie to improve functionality and analytics'

// message.innerHTML = 
// 'We use cookie to improve functionality and analytics. <button class="btn btn--close-cookie ">Got it </button>';
// //ask about btn--close-cookie

// //header.prepend(message);

// //if i want copy  so 
// //header.append(message.cloneNode(true))
// header.append(message); 

// // header.before(message);
// // header.after(message);
 

// document.querySelector('.btn--close-cookie').addEventListener('click', function(){
//     message.remove();
// })

// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// //increase the original height  by getComputedStyle and add the hight
// //parse the string into float or int  and add 40px 
// message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// //another way to select style 
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// //attributes 
// const logo  = document.querySelector('.nav__logo');

// console.log(logo.alt);
// console.log(logo.className);

// //chabge alt 
// logo.alt = 'beautiful logo';
// console.log(logo.alt);

// //non standard elemnt to the image so i should get it by getAttribute
// logo.getAttribute('designer');

// //get the src by getAttribute to show it like html

// //absolute link
// console.log(logo.src); 
// //html link so get the src by getAttribute to show it like html
// console.log(logo.getAttribute('src')); 


// //set attributes and get it
// logo.setAttribute('company', 'bankist');
// console.log(logo.getAttribute('company'));


// //data attribute 
// logo.setAttribute('data-version-number', '3.0');
// console.log(logo.dataset.versionNumber);


// //addeventsListener 
// const h1 = document.querySelector('h1');

// const mouseEnt = function(e){
//     alert('addEventListener : you are reading the heading h1');

//     //we should remove it after showing
//     h1.removeEventListener('mouseenter', mouseEnt);
// };

// //add it by mouseebter event
// h1.addEventListener('mouseenter', mouseEnt);

// //remove it by settimeout 
// //setTimeout = (()=> h1.removeEventListener('mouseenter', mouseEnt), 3000 );

// //another way by onmouseenter
// // h1.onmouseenter = function(e){
// //     alert('addEventListener : yoy are reading the heading h1');
// // };

// //bubbling events 
// //rgb(255,255,255)
// //create an integer
//   const randomInt = (min, max) => 
//    Math.floor(Math.random() * (max - min + 1) + min);
//    //create a random color
//   const randomColor = () => 
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

//   const link = document.querySelector('.nav__link');
//   const navLinks = document.querySelector('.nav__links');
//   const nav = document.querySelector('.nav');

//   link.addEventListener('click', function(e){
//       this.style.backgroundColor = randomColor();
//       console.log('link',e.target, e.currentTarget);

//       //stop proprogation shouldn't use it alot
//      // e.stopPropagation();
//   });

//   navLinks.addEventListener('click', function(e){
//     this.style.backgroundColor = randomColor();
//     console.log('navlink',e.target,e.currentTarget);
// })

// nav.addEventListener('click', function(e){
//     this.style.backgroundColor = randomColor();
//     console.log('nav',e.target,e.currentTarget);
// })

// const h1 = document.querySelector('h1');

// //going downWards what h1 consist of ?
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);

// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// //going upWards just the parent 
// console.log(h1.parentNode);
// //all elemnts
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--color-primary-opacity)';

// //going to sibling 
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// //another way and will always use elemnt 👇
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// //if we want all siblings
// console.log(h1.parentElement.children);




