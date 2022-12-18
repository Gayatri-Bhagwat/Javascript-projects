'use strict';

//MODAL WINDOW 
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const modalWindow = document.querySelector('.modal ');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  //to show the modal window remove the hidden class
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  //to close the modal window add the hidden class
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(function (btn) {
  btn.addEventListener('click', openModal);
})
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModal();
    //it will close the model after pressing the escape key!!
  }
});
//EVENT DELEGATION -SMOOTH PAGE SCROLLING BEHAVIOUR 
//1st method - 
// document.querySelectorAll('.nav__link').forEach(function(e){
//   e.addEventListener('click',function(e){
//     e.preventDefault();
//     const id = this.getAttribute('href');//select the link href;
//     document.querySelector(id).scrollIntoView({
//       behavior:'smooth',
//     })
//   })
// })

 

document.querySelector('.nav__links').addEventListener('click',
function(e){
  //e.target gives the element on which event happend 
  e.preventDefault();
  //Matching Strategy - 
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');//select the link href;
    document.querySelector(id).scrollIntoView({
      behavior:'smooth',
    })
  }
})



btnScrollTo.addEventListener('click', function (e) {
  //calculating the coordinates - 
  // const s1Coordinates = section1.getBoundingClientRect();
  // console.log(s1Coordinates);
  // console.log(e.target.getBoundingClientRect());
  // console.log('current Scroll (X/Y)', window.pageXOffset,window.pageYOffset);

  // console.log('Height/Width of viewport' , document.documentElement.clientHeight,
  // document.documentElement.clientWidth);

  //SCROLLING 
  // window.scrollTo(s1Coordinates.left + window.pageXOffset,
  //   s1Coordinates.top + window.pageYOffset) 

  // //METHOD - 2 
  // window.scrollTo({
  //   left:s1Coordinates.left + window.pageXOffset,
  //   top:s1Coordinates.top + window.pageYOffset,
  //   behaviour:'smooth'
  // })

  //METHOD - 3 EASY METHOD 
  section1.scrollIntoView({
    behavior: 'smooth'
  })
});

//TABBED COMPONENT - 
const tabs = document.querySelectorAll('.operations__tab');//each button
const tabsContainer = document.querySelector('.operations__tab-container');//button stored in container 
const tabsContent = document.querySelectorAll('.operations__content');//content associated with each of the button 

//EVENT DELEGATION -

tabsContainer.addEventListener('click' , function(e){
 const clicked = e.target.closest('.operations__tab');
//  console.log(clicked);

 //Gaurd Clause - 
 if(!clicked) return;
 
 //Active Tab
 if(clicked) {
  tabs.forEach(t => t.classList.remove
    ('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
 }

 //Activating Content Area - 
 tabsContent.forEach(c => c.classList.remove
  ('operations__content--active'));

 document.querySelector
 (`.operations__content--${clicked.dataset.tab}`)
 .classList.add('operations__content--active');
})

//MENU FADE ANIMATION - 
const handleHover = function(e,opacity) {
  if(e.target.classList.contains('nav__link')){
    const link = e.target;//current link
    const siblings = link.closest('.nav')
    .querySelectorAll('.nav__link');
    const logo = link.closest('.nav')
    .querySelector('img');
    siblings.forEach(el => {
      if(el !== link){
        el.style.opacity = opacity;
      }
    })
    logo.style.opacity=opacity;
  }
}
nav.addEventListener('mouseover',function(e){
  handleHover(e,0.5)
});

nav.addEventListener('mouseout',function(e){
  handleHover(e,1);
});

//IMPLEMENTING STICKY NAVIGATION - WAY-1
// const initialCoordinates = section1.getBoundingClientRect();
// window.addEventListener('scroll' , function(e){
//   console.log(window.scrollY);
//   if(window.scrollY > initialCoordinates.top){
//     nav.classList.add('sticky');
//   }
//   else{
//     nav.classList.remove('sticky');
//   }

// })
//WAY-2 Intersection Observer API-
//NOTE:-the callback function will be called each time when the target element will intersect the root element at the threshold percentage
// const obsCallBack = function(entries,observer){
//   //entries - array of the threshold entries 
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// };

// const obsOptions = {
//   root:null,//element that the target insersecting (null means entire viewport)
//   threshold:[0,0.2],//percentage of intersection at which the callback function is called
// };
// const observer = new IntersectionObserver
// (obsCallBack,obsOptions);
// observer.observe(section1);//section1 is target element

const header1 = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function(entries){
  const [entry] = entries;
  if(!entry.isIntersecting){
    nav.classList.add('sticky');
  }
  else{
    nav.classList.remove('sticky');
  }
  // console.log(entry);
}
const headerObserver =  new IntersectionObserver(stickyNav , {
  root:null,
  threshold:0,
  rootMargin:`-${navHeight}px`,
});
headerObserver.observe(header1);

//REVEALING ELEMENTS ON SCROLL -
const allsections1 = document.querySelectorAll('.section');
const revealSection = function(entries,observer){
  const [entry] = entries;
  // console.log(entry);
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  // observer.unobserve(entry.target);
}
const sectionObserver = new IntersectionObserver
(revealSection ,{
  root:null,
  threshold:0.15
} ) 

allsections1.forEach(function(section){
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
})

//LAZY LOADING IMAGES - 
const imgTargets = document.querySelectorAll('img[data-src]');
// console.log(imgTargets);

const loading = function(entries,observer){
  const [entry]=entries;
  console.log(entry);
  if(!entry.isIntersecting) return;

  //replace the src with data-src 
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load',function(){
    entry.target.classList.remove('lazy-img');
  })
  observer.unobserve(entry.target);
}
const imgObserver = new IntersectionObserver(loading,{
  root:null,
  threshold:0,
  rootMargin:'200px',
});

imgTargets.forEach(img => {
  imgObserver.observe(img);
})

//SLIDER COMPONENT - 
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
//SELECTING , CREATING AND DELETING THE ELEMENTS - ADD COOKIE MESSAGE 
console.log(document.documentElement);//to select the HTML element
console.log(document.head);//to select the head
console.log(document.body);//to select the body


const header = document.querySelector('.header');
const allsections = document.querySelectorAll('.header');//returns node list having class header
console.log(allsections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');//it returns HTMLCollection instead of node list 
console.log(allButtons);
console.log(document.getElementsByClassName('btn'));//returns HTMLCollection

//CREATING AND INSERTING ELEMENT - 
// .insertAdjacentHTML

const message = document.createElement('div');//creating div element(DOM element)
// console.log(message);
message.classList.add('cookie-message');//adding the class to the message 
// message.textContent = `We use cookies for improved functionalities and analytics.`;
message.innerHTML =
  `We use cookies for improved functionalities 
and analytics.
<button class='btn btn--close-cookie'>Got it!</button>`;

//header.prepend(message);it will add the message as the first child of the header 
header.append(message);
//header.append(message.cloneNode(true));we will get cookie message at the top as well as at the top 

// header.before(message);
// header.after(message);

//After clicking on 'Got It' button the message will be removed
//DELETE MESSAGE- 
document.querySelector('.btn--close-cookie').addEventListener('click',
  function () {
    message.remove();

    //Method - 2 (To remove the element)
    // message.parentElement.removeChild(message);
  })

//STYLES , ATTRIBUTE & CLASSES - 
//STYLES -
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.backgroundColor);

//it returns the computed style of the particular element (In this case its message)
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height = Number.parseInt(getComputedStyle(message).
  height + 10) + 30 + 'px';
console.log(message.style.height);

// document.documentElement.style.setProperty('--color-primary' , 'orangered');

//ATTRBUTES - 
//src , class , id etc - standerd Attiibute
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);
console.log(logo.id);

//Setting the attribute - 
logo.alt = 'Beautiful Minimalist Logo';
//Non Standered Attribute - 

console.log(logo.designer)//designer is the non-standered attribute
console.log(logo.getAttribute('designer'));

logo.setAttribute('company', 'Bankist');

console.log(logo);

console.log(logo.src);//returns full link 
//o/p --> file:///C:/Users/91837/OneDrive/Documents/JAVASCRIPT%20UDEMY/ADVANCED-DOM-BANKIST/img/logo.png;
console.log(logo.getAttribute('src'));//only the main link
// o/p --> img/logo.png

//DATA ATTRIBUTE - 
console.log(logo.dataset.versionNumber);

//CLASSES - 
logo.classList.add('c', 'j');
logo.classList.remove('r');
logo.classList.toggle('t');
logo.classList.contains('c');

//Don't Use - it will override all the classes and it allows us to set 
//only one class not more than that
logo.className = 'Gayatri'


/*EVENT HANDLING AND REMOVING METHODS - 
const h1 = document.querySelector('h1');

const alertH1 = function(e){
  alert('addEventListner:Great!You are reading the Heading !');
  h1.removeEventListener('mouseenter',alertH1);//if you dont want to listen for the event anymore!
}
h1.addEventListener('mouseenter',alertH1);

setTimeout(()=>h1.removeEventListener('mouseenter',alertH1),3000);

//ANOTHER WAY TO LISTEN FOR THE EVENT - 
// h1.onmouseenter = function(e){
  // alert('addEventListner:Great!You are reading the Heading !');
// };
*/

//EVENT BUBBLING AND CAPTURING : EVENT PROPAGATION 

//Generating random color - color between 0 to 255 
/*IF WE CLICK ON THE CHILD ELEMENT THEN THE IT WILL COLOR BOTH THE CHILD AND ITS ALL PARENTS 
const randomInt = (min, max) => Math.floor
  (Math.random() * (max - min + 1) + min);
  const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)}
,${randomInt(0,255)})`;

document.querySelector('.nav__link')//each link 
  .addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor();
    //this means the link (a item on which an event handlar is attahced)
    console.log('LINK' , e.target,e.currentTarget);
    //Stop event propagation
    e.stopPropagation();//if we click on the nav-link then the color 
    //will be applied to the link itself and not to its parent links
  });
document.querySelector('.nav__links')//entire header 
  .addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor();
    console.log('CONTAINER' , e.target);
    // e.stopPropagation();
  });
document.querySelector('.nav')//navbar
  .addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV' , e.target);

},true); // event capturing

*/

/*DOM TRAVERSING - 
const h1 = document.querySelector('h1');

//Going downwards : child 
console.log(h1.querySelectorAll('.highlight'));

//Only for direct childern -
console.log(h1.childNodes);//direct child of h1 
console.log(h1.children);//returns HTMLcollection

//First and Last child - 
h1.firstElementChild.style.color = 'white';//changes the color of first child of the h1 
h1.lastElementChild.style.color = 'white';//changes the color of the last child of the h1

//Going Upwards : parents 
console.log(h1.parentNode);
console.log(h1.parentElement);//direct parent
// h1.closest('.header').style.background= 'var(--gradient-secondary)';
//selects the closest parent to the h1 element and applies the style to that element 

// h1.closest('h1').style.background= 'var(--gradient-primary)';
//selects the closest parent to the h1 element and applies the style to that element (in this case it's h1 only!)

//Going Sideways : siblings 
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

//selecting siblings from parent and then the childerens of the parent nodes - 
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function(el){
  if(el != h1){
   el.style.transform = 'scale(0.5)';
  }
})
*/