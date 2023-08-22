// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

//console.log('dub');

export const animate = function () {
  console.log('dub');
  const scrollE1 = document.getElementById('redScroll');
  const scrollE2 = document.getElementById('blueScroll');
  const scrollE3 = document.getElementById('yelloScroll');
  const tabWrap = document.querySelector('[db-element="tab-wrapper"]');
  const tabEl1 = document.querySelector<HTMLElement>('[db-element="tab-el1"]');
  const tabEl2 = document.querySelector<HTMLElement>('[db-element="tab-el2"]');
  const tabEl3 = document.querySelector<HTMLElement>('[db-element="tab-el3"]');
  const allScroll = document.querySelectorAll('.div-block-12') as NodeListOf<HTMLElement>;
  const allTabs = document.querySelectorAll('.hdw-tab-link') as NodeListOf<HTMLElement>;
  const titleSec = document.querySelector('[db-element="workText"]');
  const optionBtn = document.querySelectorAll('.optionbtn') as NodeListOf<HTMLElement>;
  const mboptionBtn = document.querySelectorAll('.mb-optionbtn') as NodeListOf<HTMLElement>;
  const allSLideImg = [...document.querySelectorAll('[db-slideimg]')];
  const btnNormal = [...optionBtn];
  const mbBtnnormal = [...mboptionBtn];

  let tabTimeout;
  //let clearTimeout;
  let tabLoop;
  /////handle image showing on button click
  optionBtn.forEach((button, i) => {
    button.addEventListener('click', (e) => {
      // console.log(e.target, i);
      optionBtn.forEach((el) => {
        el.classList.remove('active');
      });
      allSLideImg.forEach((slide) => {
        slide.classList.remove('slide-active');
      });
      ///adding the active class
      // clearTimeout(tabSelectT);
      button.classList.add('active');
      allSLideImg[i].classList.add('slide-active');
    });
  });

  function selectBtn() {
    //optionBtn.
    const activeEl: HTMLElement = btnNormal.find((el) =>
      el.classList.contains('active')
    )?.nextElementSibling;
    if (activeEl) {
      activeEl.click();
      clearTimeout(tabLoop);
      tabLoop();
    } else {
      btnNormal[0].click();
      clearTimeout(tabLoop);
      tabLoop();
    }
  }

  tabLoop = function () {
    setTimeout(selectBtn, 2000);
  };

  clearTimeout(tabLoop);
  tabLoop();

  if (!tabEl1 || !tabEl2 || !tabEl3) return;

  //console.log('db');
  gsap.from('.footer-dub-logo-embed', {
    scrollTrigger: {
      trigger: '.footer-section',
      // markers: true,
      start: 'top 70%',
      toggleActions: 'restart',
    },
    y: 400,
    duration: 1.5,
    ease: 'power4.out',
  });

  //Hero background logo dub-bg-logo
  gsap.to('.dub-bg-logo', {
    scrollTrigger: {
      trigger: '.more-efficient--section',
      start: 'top center',
      scrub: true,
      //toggleActions:''
      //markers: true,
    },
    y: -900,
    duration: 3,
    ease: 'slow(0.7, 0.7, false)',
  });

  // gsap.from('.efficient-card', {
  //   scrollTrigger: {
  //     trigger: '#blueAnchor',
  //     start: 'center, center',
  //     //markers: true,
  //     scrub: true,
  //   },
  //   y: '100rem',
  //   //stagger: -0.5,
  //   opacity: 0,
  //   scrub: true,
  //   duration: 0.5,
  //   ease: 'power2.out',
  // });

  ////starting the animation based on screensize

  const screenSize = window.innerWidth;

  if (screenSize > 767) {
    console.log('start');

    const tl = gsap.timeline({ defaults: { ease: 'back.out(1.7)', duration: 2 } });

    tl.from('.hdw_content-col-1, .btn-anim', {
      opacity: 0,
      y: 300,
    });

    tl.from('.screenshot-bg-icon', { y: -100, opacity: 0 }, '.5')
      .from('.screenshot-wrap', { x: 100, opacity: 0 }, '.9')
      .from(
        '.float-text, .float-text-2',
        {
          x: -70,
          opacity: 0,
          y: 20,
        },
        '.5'
      );

    ScrollTrigger.create({
      trigger: scrollE1,
      onEnter: () => {
        tabEl1.click();
      },
      animation: tl,
      //scrub: 1,
      toggleActions: 'restart none restart none',
      //markers: true,
      start: '20 55%',
      onEnterBack: () => {
        tabEl1.click();
      },
    });
    /////
    ScrollTrigger.create({
      trigger: scrollE2,
      //markers: true,
      start: 'top 0%',
      onEnter: () => {
        console.log('blueEnter');
        tabEl2.click();
      },
      animation: tl,
      toggleActions: 'restart none restart none',
      onEnterBack: () => {
        tabEl2.click();
      },
    });

    ScrollTrigger.create({
      trigger: scrollE3,
      //markers: true,
      start: 'top 0%',
      animation: tl,
      toggleActions: 'restart',

      onEnter: () => {
        console.log('yellow enter first');
        tabEl3.click();
      },
      onEnterBack: () => {
        //console.log('yellow second enter');
      },
    });
  } else {
    console.log('this here');
  }
};

//more-efficeint--content
//effi-cta-wrap

// https://dl.dropboxusercontent.com/s/26hcrjvozxsxtv3/Girl_Child.mp3
// https://dl.dropboxusercontent.com/s/tgehwxh0f5x39oi/Child_Male%20%281%29.mp3
// https://dl.dropboxusercontent.com/s/jf89ilepvu955n6/Female.mp3
// https://dl.dropboxusercontent.com/s/6th80l667jtb4qc/Male.mp3
// https://dl.dropboxusercontent.com/s/01bdmnu5887wb8f/Old_Female.mp3
// https://dl.dropboxusercontent.com/s/xhi90el3qrukol4/Old_Man_Male.mp3
