import videoLinks from './videoDataStructure';

//https://cdn.jsdelivr.net/gh/dubdubai/dubdub-website/master/dist/db/dbHome.js dubdub-website/blob/master/dist/index.js

const vidTabbtn = [...document.querySelectorAll('.tab-btn')];
const firstBtn = document.querySelector('[db-tab="1"]') as HTMLAnchorElement;
const langBtnWrap = document.querySelector('.language-wrap') as HTMLElement;
const playBtn = document.querySelector('[db-element="play"]') as HTMLElement;

console.log(playBtn);

const activeVidbtn = vidTabbtn.filter((el) => {
  return el.hasAttribute('db-tab');
});

export const handleVideoUpdate = function () {
  const videoUrlWrap = document.querySelector('[db-element="video"]') as HTMLVideoElement;
  const videoSourceUrl = videoUrlWrap.querySelector('source') as HTMLSourceElement;

  //  console.log(langBtnWrap.children);

  langBtnWrap.addEventListener('click', (e) => {
    const clickedTarget = e.target as HTMLAnchorElement;
    const btnchild = [...langBtnWrap.children];
    btnchild.forEach((btn) => {
      btn.classList.remove('is-active');
    });

    ///adding active class to the clicked element
    clickedTarget.classList.add('is-active');
    //  btnchild.;
    //console.log(clickedTarget);
    ////remove active class from any child element
    const posterImgUrl = clickedTarget.getAttribute('posterimg');
    const videoUrl = clickedTarget.getAttribute('video-url');

    videoUrlWrap.poster = `${posterImgUrl}`;
    videoSourceUrl.src = `${videoUrl}`;
    videoUrlWrap.load();
    // playBtn.addEventListener('click', (e) => {
    //   videoUrlWrap.play();
    // });
    // videoUrlWrap.play();
  });

  // playBtn.addEventListener('click', (e) => {
  //   console.log(e.target);
  // });
};

export const videoTab = function () {
  const updateUrls = function (htmlWrapper: HTMLElement, data) {
    htmlWrapper.innerHTML = `<a posterimg="${data.posterImg}" video-url="${data.englishVideo}" href="#" class="lng-btn w-button">US English</a><a posterimg="${data.posterImg}" video-url="${data.spanish}" href="#" class="lng-btn w-button">Spanish(Portugese)</a><a posterimg="${data.posterImg}" video-url="${data.spanishLatin}" href="#" class="lng-btn w-button">Spanish(Latin)</a><a posterimg="${data.posterImg}" video-url="${data.marathi}" href="#" class="lng-btn w-button">Marathi</a><a posterimg="${data.posterImg}" video-url="${data.german}" href="#" class="lng-btn w-button">German</a><a posterimg="${data.posterImg}" video-url="${data.hindi}" href="#" class="lng-btn w-button">Hindi</a><a posterimg="${data.posterImg}" video-url="${data.cantonese}" href="#" class="lng-btn w-button">Cantonese</a>`;
  };

  //<div class="language-wrap"><a posterimg="" english-url="" href="#" class="lng-btn is-active w-button">US English</a><a posterimg="" spanish-port="" href="#" class="lng-btn w-button">Spanish(Portugese)</a><a posterimg="" spanish-latin="" href="#" class="lng-btn w-button">Spanish(Latin)</a><a posterimg="" marathi-url="" href="#" class="lng-btn w-button">Marathi</a><a posterimg="" german-url="" href="#" class="lng-btn w-button">German</a><a posterimg="" hindi-url="" href="#" class="lng-btn w-button">Hindi</a><a posterimg="" cantonese-url="" href="#" class="lng-btn w-button">Cantonese</a></div>

  // console.log(langBtnWrap);
  activeVidbtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      ////remove active class from other btn
      activeVidbtn.forEach((btn) => {
        btn.classList.remove('active');
      });
      ////add the active class to the clicked element
      btn.classList.add('active');

      const attNum = btn.getAttribute('db-tab');
      if (!attNum) return;
      const btnNum: number = +attNum;
      //console.log(btnNum);
      const urlDetails = videoLinks.find((links) => {
        return links.id === btnNum;
      });
      updateUrls(langBtnWrap, urlDetails);
    });
  });
  ////performing the click function on page load
  //   const [firstbtn] = activeVidbtn;
  firstBtn.click();
  //   firstbtn.click();
};

//<a posterimg="https://unsplash.com/s/photos/img" english-url="http://google.com" href="#" class="lng-btn w-button">US English</a>
//is-active
// <div class="language-wrap"><a href="#" class="lng-btn is-active w-button">US English</a><a href="#" class="lng-btn w-button">Spanish(Portugese)</a><a href="#" class="lng-btn w-button">Spanish(Latin)</a><a href="#" class="lng-btn w-button">Marathi</a><a href="#" class="lng-btn w-button">German</a><a href="#" class="lng-btn w-button">Hindi</a><a href="#" class="lng-btn w-button">Cantonese</a></div>

// <div class="language-wrap"><a href="#" class="lng-btn is-active w-button">US English</a><a href="#" class="lng-btn w-button">Spanish(Portugese)</a><a href="#" class="lng-btn w-button">Spanish(Latin)</a><a href="#" class="lng-btn w-button">Marathi</a><a href="#" class="lng-btn w-button">German</a><a href="#" class="lng-btn w-button">Hindi</a><a href="#" class="lng-btn w-button">Cantonese</a></div>

// <div class="language-wrap"><a english-url="" href="#" class="lng-btn is-active w-button">US English</a><a spanish-port="" href="#" class="lng-btn w-button">Spanish(Portugese)</a><a spanish-latin="" href="#" class="lng-btn w-button">Spanish(Latin)</a><a marathi-url="" href="#" class="lng-btn w-button">Marathi</a><a german-url="" href="#" class="lng-btn w-button">German</a><a hindi-url="" href="#" class="lng-btn w-button">Hindi</a><a cantonese-url="" href="#" class="lng-btn w-button">Cantonese</a></div>
