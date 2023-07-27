//import { animate } from './animation';
import { handleVideoUpdate, videoTab } from './videoTabs';

window.Webflow ||= [];
window.Webflow.push(() => {
  console.log('dd Db script loaded');

  //animate();
  const dbAudioEl = document.querySelectorAll('[db-audio]');
  const audioHtml = document.getElementById('newAudio') as HTMLAudioElement;
  const audioLinks = document.querySelectorAll('audio');
  const canvasEl = document.querySelector('#audWave') as HTMLCanvasElement;
  const pauseBtns = [...document.querySelectorAll('[db-element="pausebtn"]')];
  const audListWrap = [...document.querySelectorAll('[db-element="audiolistwrap"]')];

  const screenSize = window.innerWidth;
  // console.log(canvasEl);
  //console.log(dbAudioEl);
  const HEIGHT = 200;
  const WIDTH = screenSize < 500 ? 320 : 500;
  const ctx = canvasEl.getContext('2d');

  canvasEl.width = WIDTH;
  canvasEl.height = HEIGHT;
  console.log(canvasEl.width);

  videoTab();
  handleVideoUpdate();

  const clickNumber = 1;
  //let audioSource;
  let analyzer;
  let bufferLenth: number;
  //let audioSource;

  //console.log(audioLinks);

  if (!dbAudioEl || !ctx) return;

  const audioSources = [] as Array<MediaElementAudioSourceNode>;
  const audioContexts = [] as Array<AudioContext>;

  audioLinks.forEach((audio, i) => {
    const audCtx = new AudioContext();
    const audioSource = audCtx.createMediaElementSource(audio);
    audio.setAttribute(`audioel`, `${i + 1}`);
    audio.classList.add('audiokoko');
    //Pusing and creating array for tha audio context and audio souces
    audioSources.push(audioSource);
    audioContexts.push(audCtx);
  });

  //  const playing = true;
  // console.log(audioSources);
  // console.log(audioContexts);

  dbAudioEl.forEach((el, i) => {
    el.addEventListener('click', function (e) {
      const audio = el.querySelector('audio') as HTMLAudioElement;

      ////remove playing class from other elements
      audListWrap.forEach((el) => {
        el.classList.remove('playing');
      });
      ////add playing class to the clicked  elements

      el.closest('.audiocol-item')?.classList.add('playing');
      // el.classList.add('playing');

      //check if other audios are playing and pause it
      audioLinks.forEach((audio: HTMLAudioElement, a) => {
        if (i !== a) {
          audio.pause();
          audio.currentTime = 0;
          audio.volume = clickNumber > 1 ? clickNumber * 0.5 : 1;
          //audio.play();
          console.log(audio.volume);
          // audio.volume = 0.5;
        }
      });

      audio.muted = false;
      audio.volume = clickNumber > 1 ? clickNumber * 0.5 : 0.5;

      audio.load();
      audio.play();
      //clickNumber--;
      console.log(clickNumber);
      //  console.log(audio.controller);

      if (audioContexts[i].state === 'suspended') audioContexts[i].resume(); /////   //console.log(audioContexts[i].state);

      //
      // pauseBtn?.addEventListener('click', (e) => {
      //   console.log('clicked');
      //   if (!audio.pause) audio.pause();
      // });

      audio.setAttribute(`audioel`, `${i + 1}`);
      audio.classList.add('audiokoko');
      analyzer = audioContexts[i].createAnalyser();
      // analyzer.maxDecibels = -5;
      //analyzer.minDecibels = -10;

      //console.log(audioSources[i]);
      audioSources[i].connect(analyzer);
      const gainNode = audioContexts[i].createGain();
      console.log(gainNode);
      console.log(gainNode.gain.value);
      //gainNode.gain.value = clickNumber > 1 ? clickNumber / clickNumber : 1;

      analyzer.connect(audioContexts[i].destination);
      analyzer.fftSize = 1024; ////how much data we want to process
      bufferLenth = analyzer.frequencyBinCount;

      const dataArray = new Uint8Array(bufferLenth);
      const timeData = new Uint8Array(bufferLenth);
      const freqData = new Uint8Array(bufferLenth);

      drawTimeData(timeData);
      // drawFrequency(freqData);
      // drawFrequency(freqData);

      /////events to handle icon visibility
      audio.addEventListener('pause', () => {
        el.closest('.audiocol-item')?.classList.remove('playing');
        audio.volume = 0.5;
      });
      audio.addEventListener('ended', (e) => {
        el.closest('.audiocol-item')?.classList.remove('playing');
        audio.volume = 0.5;
      });
    });
  });
  ///end of the click event

  //pause functionality start
  pauseBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      const activeAudio = audioLinks[i] as HTMLAudioElement;
      activeAudio.pause();
      activeAudio.volume = 0.5;
    });
  });
  //pause functionality end
  //////////////////Intersection Observer
  ////pause audio when out of view
  const heroSection = document.querySelector('[db-element="home-header"]');
  console.log(heroSection);

  const homeoptions = {
    threshold: 0.3,
  };
  const homeFunction = function (entries, et) {
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

  /////audio Wave form drawing
  function drawTimeData(timeData) {
    if (!ctx) return;
    // console.log(timeData);
    analyzer.getByteTimeDomainData(timeData);
    // analyzer.getFloatTimeDomainData(timeData);
    //analyzer.getByteFrequencyData(timeData);

    /////Clear the canvas
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#796EAD80';
    ctx.beginPath();
    const sliceWidth = WIDTH / bufferLenth;
    let x = 0;
    timeData.forEach((data, i) => {
      const v = data / 128;
      const y = (v * HEIGHT) / 2;
      ////draw linws
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      x += sliceWidth;
    });
    ctx.stroke();

    ////calling itself as soon as possible
    requestAnimationFrame(() => drawTimeData(timeData));
  }

  function drawFrequency(freqData) {
    if (!ctx) return;
    analyzer.getByteFrequencyData(freqData);

    console.log(freqData);
    /////Clear the canvas
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#796EAD80';
    ctx.beginPath();
    const barWidth = WIDTH / bufferLenth;
    let x = 0;
    freqData.forEach((amount) => {
      //0 to 255
      const percent = amount / 255;
      const berHeight = HEIGHT * percent;
      //convert the color to hsl todo
      ctx.fillStyle = '#796EAD80';
      // const v = data / 128;
      // const y = (v * HEIGHT) / 2;
      // ////draw linws
      // if (i === 0) {
      //   ctx.moveTo(x, y);
      // } else {
      //   ctx.lineTo(x, y);
      // }
      // x += sliceWidth;
      ctx.fillRect(x, HEIGHT - berHeight, barWidth, berHeight);
      x += barWidth + 2;
    });

    requestAnimationFrame(() => drawFrequency(freqData));
  }
});
