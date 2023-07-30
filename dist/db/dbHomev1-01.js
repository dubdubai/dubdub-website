"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/db/animation.ts
  var animate = function() {
    console.log("dub");
    const scrollE1 = document.getElementById("redScroll");
    const scrollE2 = document.getElementById("blueScroll");
    const scrollE3 = document.getElementById("yelloScroll");
    const tabWrap = document.querySelector('[db-element="tab-wrapper"]');
    const tabEl1 = document.querySelector('[db-element="tab-el1"]');
    const tabEl2 = document.querySelector('[db-element="tab-el2"]');
    const tabEl3 = document.querySelector('[db-element="tab-el3"]');
    const allScroll = document.querySelectorAll(".div-block-12");
    const allTabs = document.querySelectorAll(".hdw-tab-link");
    const titleSec = document.querySelector('[db-element="workText"]');
    const optionBtn = document.querySelectorAll(".optionbtn");
    const allSLideImg = [...document.querySelectorAll("[db-slideimg]")];
    console.log(allSLideImg);
    const btnNormal = [...optionBtn];
    let tabTimeout;
    let tabLoop;
    optionBtn.forEach((button, i) => {
      button.addEventListener("click", (e) => {
        optionBtn.forEach((el) => {
          el.classList.remove("active");
        });
        allSLideImg.forEach((slide) => {
          slide.classList.remove("slide-active");
        });
        button.classList.add("active");
        allSLideImg[i].classList.add("slide-active");
      });
    });
    function selectBtn() {
      const activeEl = btnNormal.find(
        (el) => el.classList.contains("active")
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
    tabLoop = function() {
      setTimeout(selectBtn, 2e3);
    };
    clearTimeout(tabLoop);
    tabLoop();
    if (!tabEl1 || !tabEl2 || !tabEl3)
      return;
    gsap.from(".footer-dub-logo-embed", {
      scrollTrigger: {
        trigger: ".footer-section",
        // markers: true,
        start: "top 70%",
        toggleActions: "restart"
      },
      y: 400,
      duration: 1.5,
      ease: "power4.out"
    });
    gsap.to(".dub-bg-logo", {
      scrollTrigger: {
        trigger: ".more-efficient--section",
        start: "top center",
        scrub: true
        //toggleActions:''
        //markers: true,
      },
      y: -900,
      duration: 3,
      ease: "slow(0.7, 0.7, false)"
    });
    gsap.from(".efficient-card", {
      scrollTrigger: {
        trigger: "#blueAnchor",
        start: "center, center",
        //markers: true,
        scrub: true
      },
      y: "100rem",
      //stagger: -0.5,
      opacity: 0,
      scrub: true,
      duration: 0.5,
      ease: "power2.out"
    });
    const tl = gsap.timeline({ defaults: { ease: "back.out(1.7)", duration: 2 } });
    tl.from(".hdw_content-col-1, .btn-anim", {
      opacity: 0,
      y: 300
    });
    tl.from(".screenshot-bg-icon", { y: -100, opacity: 0 }, ".5").from(".screenshot-wrap", { x: 100, opacity: 0 }, ".9").from(
      ".float-text, .float-text-2",
      {
        x: -70,
        opacity: 0,
        y: 20
      },
      ".5"
    );
    ScrollTrigger.create({
      trigger: scrollE1,
      onEnter: () => {
        tabEl1.click();
      },
      animation: tl,
      //scrub: 1,
      toggleActions: "restart none restart none",
      //markers: true,
      start: "20 55%",
      onEnterBack: () => {
        tabEl1.click();
      }
    });
    ScrollTrigger.create({
      trigger: scrollE2,
      //markers: true,
      start: "top 0%",
      onEnter: () => {
        console.log("blueEnter");
        tabEl2.click();
      },
      animation: tl,
      toggleActions: "restart none restart none",
      onEnterBack: () => {
        tabEl2.click();
      }
    });
    ScrollTrigger.create({
      trigger: scrollE3,
      //markers: true,
      start: "top 0%",
      animation: tl,
      toggleActions: "restart",
      onEnter: () => {
        console.log("yellow enter first");
        tabEl3.click();
      },
      onEnterBack: () => {
      }
    });
  };

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
  var videoEl = document.querySelector('[db-element="video"]');
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
    const vidContainer = document.querySelector('[db-element="video-container"]');
    if (!vidTabSection || !vidContainer)
      return;
    const videoActive = function(entries, et) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          firstLangBtn.classList.add("is-active");
          firstTabBtn.click();
        } else {
          videoEl.pause();
        }
      });
    };
    const options = {
      threshold: 0.2
    };
    const tabObserve = new IntersectionObserver(videoActive, options);
    tabObserve.observe(vidContainer);
    const [firstTabBtn] = activeVidbtn;
    const [firstLangBtn] = btnchild;
  };

  // src/db/dbHomev1-01.ts
  window.Webflow ||= [];
  window.Webflow.push(() => {
    console.log("errdd Db script loaded");
    const dbAudioEl = document.querySelectorAll("[db-audio]");
    const audioHtml = document.getElementById("newAudio");
    const audioLinks = document.querySelectorAll("audio");
    const canvasEl = document.querySelector("#audWave");
    const pauseBtns = [...document.querySelectorAll('[db-element="pausebtn"]')];
    const audListWrap = [...document.querySelectorAll('[db-element="audiolistwrap"]')];
    const screenSize = window.innerWidth;
    const HEIGHT = 200;
    const WIDTH = screenSize < 500 ? 320 : 500;
    const ctx = canvasEl.getContext("2d");
    canvasEl.width = WIDTH;
    canvasEl.height = HEIGHT;
    console.log(canvasEl.width);
    videoTab();
    handleVideoUpdate();
    animate();
    const clickNumber = 1;
    let analyzer;
    let bufferLenth;
    if (!dbAudioEl || !ctx)
      return;
    const audioSources = [];
    const audioContexts = [];
    audioLinks.forEach((audio, i) => {
      const audCtx = new AudioContext();
      const audioSource = audCtx.createMediaElementSource(audio);
      audio.setAttribute(`audioel`, `${i + 1}`);
      audio.classList.add("audiokoko");
      audioSources.push(audioSource);
      audioContexts.push(audCtx);
    });
    dbAudioEl.forEach((el, i) => {
      el.addEventListener("click", function(e) {
        const audio = el.querySelector("audio");
        audListWrap.forEach((el2) => {
          el2.classList.remove("playing");
        });
        el.closest(".audiocol-item")?.classList.add("playing");
        audioLinks.forEach((audio2, a) => {
          if (i !== a) {
            audio2.pause();
            audio2.currentTime = 0;
            audio2.volume = clickNumber > 1 ? clickNumber * 0.5 : 1;
            console.log(audio2.volume);
          }
        });
        audio.muted = false;
        audio.volume = clickNumber > 1 ? clickNumber * 0.5 : 0.5;
        audio.load();
        audio.play();
        console.log(clickNumber);
        if (audioContexts[i].state === "suspended")
          audioContexts[i].resume();
        audio.setAttribute(`audioel`, `${i + 1}`);
        audio.classList.add("audiokoko");
        analyzer = audioContexts[i].createAnalyser();
        audioSources[i].connect(analyzer);
        const gainNode = audioContexts[i].createGain();
        console.log(gainNode);
        console.log(gainNode.gain.value);
        analyzer.connect(audioContexts[i].destination);
        analyzer.fftSize = 1024;
        bufferLenth = analyzer.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLenth);
        const timeData = new Uint8Array(bufferLenth);
        const freqData = new Uint8Array(bufferLenth);
        drawTimeData(timeData);
        audio.addEventListener("pause", () => {
          el.closest(".audiocol-item")?.classList.remove("playing");
          audio.volume = 0.5;
        });
        audio.addEventListener("ended", (e2) => {
          el.closest(".audiocol-item")?.classList.remove("playing");
          audio.volume = 0.5;
        });
      });
    });
    pauseBtns.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        const activeAudio = audioLinks[i];
        activeAudio.pause();
        activeAudio.volume = 0.5;
      });
    });
    const heroSection = document.querySelector('[db-element="home-header"]');
    console.log(heroSection);
    const homeoptions = {
      threshold: 0.3
    };
    const homeFunction = function(entries, et) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          audioLinks.forEach((audio) => {
            audio.pause();
          });
        }
      });
    };
    const homeObserver = new IntersectionObserver(homeFunction, homeoptions);
    homeObserver.observe(heroSection);
    function drawTimeData(timeData) {
      if (!ctx)
        return;
      analyzer.getByteTimeDomainData(timeData);
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "#796EAD80";
      ctx.beginPath();
      const sliceWidth = WIDTH / bufferLenth;
      let x = 0;
      timeData.forEach((data, i) => {
        const v = data / 128;
        const y = v * HEIGHT / 2;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      });
      ctx.stroke();
      requestAnimationFrame(() => drawTimeData(timeData));
    }
    function drawFrequency(freqData) {
      if (!ctx)
        return;
      analyzer.getByteFrequencyData(freqData);
      console.log(freqData);
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "#796EAD80";
      ctx.beginPath();
      const barWidth = WIDTH / bufferLenth;
      let x = 0;
      freqData.forEach((amount) => {
        const percent = amount / 255;
        const berHeight = HEIGHT * percent;
        ctx.fillStyle = "#796EAD80";
        ctx.fillRect(x, HEIGHT - berHeight, barWidth, berHeight);
        x += barWidth + 2;
      });
      requestAnimationFrame(() => drawFrequency(freqData));
    }
  });
})();
//# sourceMappingURL=dbHomev1-01.js.map
