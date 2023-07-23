"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/db/videoDataStructure.ts
  var videoLinks = [
    {
      language: "english",
      id: 1,
      posterImg: "",
      contentcreator1: "https://dl.dropboxusercontent.com/s/6ozrrrfnti2fmty/Input%20website%20videos.mp4",
      contentcreator2: "https://dl.dropboxusercontent.com/s/6ozrrrfnti2fmty/Input%20website%20videos.mp4",
      animation: "https://dl.dropboxusercontent.com/s/6ozrrrfnti2fmty/Input%20website%20videos.mp4",
      documentaries: "https://dl.dropboxusercontent.com/s/6ozrrrfnti2fmty/Input%20website%20videos.mp4",
      tutorials: "http://google.com",
      entertainment: "http://google.com",
      coorporateVideos: "http://google.com",
      news: "https://dl.dropboxusercontent.com/s/6ozrrrfnti2fmty/Input%20website%20videos.mp4"
    },
    {
      language: "Spanish(port)",
      id: 2,
      posterImg: "https://unsplash.com/s/photos/img",
      contentcreator1: "http://google.com",
      contentcreator2: "http://google.com",
      animation: "http://google.com",
      documentaries: "http://google.com",
      tutorials: "http://google.com",
      entertainment: "http://google.com",
      coorporateVideos: "http://google.com",
      news: "https://dl.dropboxusercontent.com/s/6ozrrrfnti2fmty/Input%20website%20videos.mp4"
    },
    {
      language: "spanish(latin)",
      id: 3,
      posterImg: "https://unsplash.com/s/photos/img",
      contentcreator1: "http://google.com",
      contentcreator2: "http://google.com",
      animation: "http://google.com",
      documentaries: "http://google.com",
      tutorials: "http://google.com",
      entertainment: "http://google.com",
      coorporateVideos: "http://google.com",
      news: "http://google.com"
    },
    {
      language: "marathi",
      id: 4,
      posterImg: "https://unsplash.com/s/photos/img",
      contentcreator1: "http://google.com",
      contentcreator2: "http://google.com",
      animation: "http://google.com",
      documentaries: "http://google.com",
      tutorials: "http://google.com",
      entertainment: "http://google.com",
      coorporateVideos: "http://google.com",
      news: "http://google.com"
    },
    {
      language: "german",
      id: 5,
      posterImg: "https://unsplash.com/s/photos/img",
      contentcreator1: "http://google.com",
      contentcreator2: "http://google.com",
      animation: "http://google.com",
      documentaries: "http://google.com",
      tutorials: "http://google.com",
      entertainment: "http://google.com",
      coorporateVideos: "http://google.com",
      news: "http://google.com"
    },
    {
      language: "hindi",
      id: 6,
      posterImg: "https://unsplash.com/s/photos/img",
      contentcreator1: "http://google.com",
      contentcreator2: "http://google.com",
      animation: "http://google.com",
      documentaries: "http://google.com",
      tutorials: "http://google.com",
      entertainment: "http://google.com",
      coorporateVideos: "http://google.com",
      news: "http://google.com"
    },
    {
      language: "cantonese",
      id: 7,
      posterImg: "https://unsplash.com/s/photos/img",
      contentcreator1: "http://google.com",
      contentcreator2: "http://google.com",
      animation: "http://google.com",
      documentaries: "http://google.com",
      tutorials: "http://google.com",
      entertainment: "http://google.com",
      coorporateVideos: "http://google.com",
      news: "http://google.com"
    }
  ];
  var videoDataStructure_default = videoLinks;

  // src/db/videoTabs.ts
  var vidTabbtn = [...document.querySelectorAll(".tab-btn")];
  var firstBtn = document.querySelector('[db-tab="1"]');
  var langBtnWrap = document.querySelector(".language-wrap");
  var btnchild = [...langBtnWrap.children];
  var playBtn = document.querySelector('[db-element="play"]');
  var videoUrlWrap = document.querySelector('[db-element="video"]');
  var videoSourceUrl = videoUrlWrap.querySelector("source");
  var activeVidbtn = vidTabbtn.filter((el) => {
    return el.hasAttribute("db-tab");
  });
  var renderVideo = function(url) {
    videoUrlWrap.poster = `https://uploads-ssl.webflow.com/64a1953c1a72bd5a81a24f3d/64b2dd8d4c059eab34058ca3_videocover-min.webp`;
    videoSourceUrl.src = `${url}`;
    videoUrlWrap.load();
    videoUrlWrap.play();
    videoUrlWrap.muted = false;
  };
  var handleVideoUpdate = function() {
    langBtnWrap.addEventListener("click", (e) => {
      const clickedTarget = e.target;
      btnchild.forEach((btn) => {
        btn.classList.remove("is-active");
      });
      clickedTarget.classList.add("is-active");
      const activeTabBtn = activeVidbtn.find((btnLang) => btnLang.classList.contains("active"));
      console.log(activeTabBtn);
      console.log(clickedTarget);
      const attNum = clickedTarget?.getAttribute("db-tab");
      if (!attNum || !activeTabBtn)
        return;
      const idNum = +attNum;
      const urlDetails = videoDataStructure_default.find((links) => {
        return links.id === idNum;
      });
      const getVideoName = activeTabBtn?.getAttribute("db-vidname");
      if (!getVideoName)
        return;
      const videoUrl = urlDetails[getVideoName];
      renderVideo(videoUrl);
    });
  };
  var videoTab = function() {
    activeVidbtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        activeVidbtn.forEach((btn2) => {
          btn2.classList.remove("active");
        });
        btn.classList.add("active");
        const activeBtn = btnchild.find((btnLang) => btnLang.classList.contains("is-active"));
        const clickedName = btn.getAttribute("db-vidname");
        const attNum = activeBtn?.getAttribute("db-tab");
        if (!attNum || !clickedName)
          return;
        const idNum = +attNum;
        const urlDetails = videoDataStructure_default.find((links) => {
          return links.id === idNum;
        });
        const videoUrl = urlDetails[clickedName];
        renderVideo(videoUrl);
      });
    });
    const vidTabSection = document.querySelector('[db-section="videotab"]');
    if (!vidTabSection)
      return;
    const videoActive = function(entries, et) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          firstLangBtn.classList.add("is-active");
          firstTabBtn.click();
          tabObserve.unobserve(vidTabSection);
        }
      });
    };
    const options = {
      threshold: 0.2
    };
    const tabObserve = new IntersectionObserver(videoActive, options);
    tabObserve.observe(vidTabSection);
    const [firstTabBtn] = activeVidbtn;
    const [firstLangBtn] = btnchild;
  };

  // src/db/dbHomeNew.ts
  window.Webflow ||= [];
  window.Webflow.push(() => {
    console.log("Db script loaded");
    const dbAudioEl = document.querySelectorAll("[db-audio]");
    const audioLinks = document.querySelectorAll("audio");
    const canvasEl = document.querySelector("#audWave");
    const HEIGHT = 150;
    const WIDTH = 500;
    const ctx = canvasEl.getContext("2d");
    canvasEl.width = WIDTH;
    canvasEl.height = HEIGHT;
    videoTab();
    handleVideoUpdate();
    let analyzer;
    let bufferLenth;
    console.log(audioLinks);
    if (!dbAudioEl || !ctx)
      return;
    dbAudioEl.forEach((el, i) => {
      el.addEventListener("click", function(e) {
        const audio = el.querySelector("audio");
        console.log(audio);
        audioLinks.forEach((audio2) => {
          if (!audio2.pause)
            return;
          audio2.pause();
          audio2.currentTime = 0;
        });
        audio.play();
      });
    });
  });
})();
//# sourceMappingURL=dbHomeNew.js.map
