import videoLinks from './videoDataStructure';

//https://cdn.jsdelivr.net/gh/dubdubai/dubdub-website/master/dist/db/dbHome.js dubdub-website/blob/master/dist/index.js

const vidTabbtn = [...document.querySelectorAll('.tab-btn')];
const firstBtn = document.querySelector('[db-tab="1"]') as HTMLAnchorElement;
//const langBtnWrap = document.querySelector('.language-wrap') as HTMLElement;
const langBtnWrap = document.querySelector('[video-lang]');
const btnchild = [...langBtnWrap.children];
const playBtn = document.querySelector('[db-element="play"]') as HTMLElement;
const videoUrlWrap = document.querySelector('[db-element="video"]') as HTMLVideoElement;
const videoSourceUrl = videoUrlWrap.querySelector('source') as HTMLSourceElement;
const videoEl = document.querySelector('[db-element="video"]') as HTMLVideoElement;

const activeVidbtn = vidTabbtn.filter((el) => {
  return el.hasAttribute('db-tab');
});

const renderVideo = function (url) {
  videoUrlWrap.poster = `https://uploads-ssl.webflow.com/64a1953c1a72bd5a81a24f3d/64b2dd8d4c059eab34058ca3_videocover-min.webp`;
  videoSourceUrl.src = `${url}`;
  videoUrlWrap.load();
  videoUrlWrap.play();
  videoUrlWrap.muted = false;
};

export const handleVideoUpdate = function () {
  //  console.log(langBtnWrap.children);

  langBtnWrap.addEventListener('click', (e) => {
    const clickedTarget = e.target as HTMLAnchorElement;

    btnchild.forEach((btn) => {
      btn.classList.remove('is-active');
    });

    ///adding active class to the clicked element
    clickedTarget.classList.add('is-active');

    ///getting the tab Btn with active class
    const activeTabBtn = activeVidbtn.find((btnLang) => btnLang.classList.contains('active'));
    // console.log(activeTabBtn);
    // console.log(clickedTarget);

    const attNum = clickedTarget?.getAttribute('db-tab');
    if (!attNum || !activeTabBtn) return;
    const idNum: number = +attNum;
    //console.log(idNum);
    const urlDetails = videoLinks.find((links) => {
      return links.id === idNum;
    });

    const getVideoName = activeTabBtn?.getAttribute('db-vidname');
    // console.log(getVideoName);
    if (!getVideoName) return;

    const videoUrl = urlDetails[getVideoName];
    renderVideo(videoUrl);
    //console.log(videoUrl);
  });
};

export const videoTab = function () {
  // console.log(langBtnWrap);
  activeVidbtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      ////remove active class from other btn
      activeVidbtn.forEach((btn) => {
        btn.classList.remove('active');
      });
      ////add the active class to the clicked element
      btn.classList.add('active');

      ////////Get the button with active class
      const activeBtn = btnchild.find((btnLang) => btnLang.classList.contains('is-active'));
      //console.log(activeBtn);
      const clickedName = btn.getAttribute('db-vidname') as string;

      const attNum = activeBtn?.getAttribute('db-tab');
      if (!attNum || !clickedName) return;
      const idNum: number = +attNum;
      //console.log(idNum);
      const urlDetails = videoLinks.find((links) => {
        return links.id === idNum;
      });

      const videoUrl = urlDetails[clickedName];

      renderVideo(videoUrl);
      //console.log(videoUrl);
    });
  });

  //select the fist element when scrolled into view
  const vidTabSection = document.querySelector('[db-section="videotab"]') as HTMLElement;
  const vidContainer = document.querySelector('[db-element="video-container"]') as HTMLElement;

  if (!vidTabSection || !vidContainer) return;
  const [firstTabBtn] = activeVidbtn;
  const [firstLangBtn] = btnchild;

  const videoActive = function (entries: Array<object>, et) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        firstLangBtn.classList.add('is-active');
        firstTabBtn.click();

        //tabObserve.unobserve(vidTabSection);
      } else {
        videoEl.pause();
      }
    });
  };
  const options = {
    threshold: 0.2,
  };
  const tabObserve = new IntersectionObserver(videoActive, options) as IntersectionObserver;

  tabObserve.observe(vidContainer);
};
