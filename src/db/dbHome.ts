//import { animate } from './animation';
import { handleVideoUpdate, videoTab } from './videoTabs';
window.Webflow ||= [];
window.Webflow.push(() => {
  console.log('Db script loaded');

  // const AudioContext = window.AudioContext || window.webkitAudioContext;
  //animate();
  const dbAudioEl = document.querySelectorAll('[db-audio]');
  const audioHtml = document.getElementById('newAudio') as HTMLAudioElement;
  const audioLinks = document.querySelectorAll('audio');
  const canvasEl = document.querySelector('#audWave') as HTMLCanvasElement;
  // console.log(canvasEl);
  console.log(dbAudioEl);
  const HEIGHT = 200;
  const WIDTH = 500;
  const ctx = canvasEl.getContext('2d');
  canvasEl.width = WIDTH;
  canvasEl.height = HEIGHT;

  videoTab();
  handleVideoUpdate();

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
    // analyzer = audCtx.createAnalyser();
    // audioSource.connect(analyzer);
    // analyzer.connect(audCtx.destination);
    // analyzer.fftSize = 64;
    // bufferLenth = analyzer.frequencyBinCount;
    // //const dataArray = new Uint8Array(bufferLenth);

    // console.log(bufferLenth);

    //Pusing and creating array for tha audio context and audio souces
    audioSources.push(audioSource);
    audioContexts.push(audCtx);
  });

  console.log(audioSources);
  console.log(audioContexts);

  dbAudioEl.forEach((el, i) => {
    el.addEventListener('click', function (e) {
      const audio = el.querySelector('audio') as HTMLAudioElement;
      console.log(audio);

      ////remove playing class from other elements
      dbAudioEl.forEach((el) => {
        el.classList.remove('playing');
      });
      ////add playing class to the clicked  elements
      el.classList.add('playing');

      //check if other audios are playing and pause it
      audioLinks.forEach((audio: HTMLAudioElement) => {
        if (!audio.pause) return;
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 0.5;
      });

      // audio.addEventListener('playing', (e) => {
      //   console.log('playing');
      // });

      audio.muted = false;
      audio.play();
      if (audioContexts[i].state === 'suspended') audioContexts[i].resume(); /////   //console.log(audioContexts[i].state);

      audio.setAttribute(`audioel`, `${i + 1}`);
      audio.classList.add('audiokoko');
      analyzer = audioContexts[i].createAnalyser();
      // analyzer.maxDecibels = -5;
      //analyzer.minDecibels = -10;

      //console.log(audioSources[i]);
      audioSources[i].connect(analyzer);
      const gainNode = audioContexts[i].createGain();
      console.log(gainNode);

      analyzer.connect(audioContexts[i].destination);
      analyzer.fftSize = 1024; ////how much data we want to process
      bufferLenth = analyzer.frequencyBinCount;

      const dataArray = new Uint8Array(bufferLenth);
      const timeData = new Uint8Array(bufferLenth);
      const freqData = new Uint8Array(bufferLenth);

      drawTimeData(timeData);
      //drawFrequency(freqData);
      // drawFrequency(freqData);

      audio.addEventListener('ended', (e) => {
        el.classList.remove('playing');
        console.log('end');
      });
    });
  });

  function drawTimeData(timeData) {
    if (!ctx) return;
    // console.log(timeData);
    analyzer.getByteTimeDomainData(timeData);
    // analyzer.getFloatTimeDomainData(timeData);
    // analyzer.getByteFrequencyData(timeData);

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

  ///Working with the audio array
  // audioLinks.forEach((audio, i) => {
  //   const audContenxt = new AudioContext();
  //   const audioSource = audContenxt.createMediaElementSource(audio);
  //   audio.setAttribute(`audio`, `${i + 1}`);
  //   console.log(audio);
  //   //console.log(audioSource);
  //   audioCOntexts.push(audioSource);

  // audio.play();
  // dbAudioEl.forEach((el, i) => {
  //   el.addEventListener('click', function (e) {
  //     // console.log(audio);
  //     // if(audio.hasAttribute(`audio`))
  //     const clickedAud = el.querySelector('audio');
  //     console.log(clickedAud);
  //   });
  // });
  //});

  // console.log(audioCOntexts);

  // dbAudioEl.forEach((el, h) => {
  //   el.addEventListener('click', function (e) {
  //     // console.log(audio);
  //     // if(audio.hasAttribute(`audio`))

  //     const clickedAud = el.querySelector('[audio="1"]');
  //     console.log(clickedAud, h);
  //   });
  // });

  ///handle class toggleing
  // dbAudioEl.forEach((el) => {
  //   el.addEventListener('click', function (e) {
  //     const audioLink = el.querySelector('audio') as HTMLAudioElement;
  //     console.log(audioLink, e);

  //     const audioCtx = new AudioContext();
  //     // const newAudio = new Audio(audioLink.src);
  //     // newAudio.setAttribute('cross-origin', 'anonymous');
  //     // console.log(newAudio);
  //     const audioSource = audioCtx.createMediaElementSource(audioLink);
  //     console.log(audioSource, audioLink);
  //     // audioLink.play();

  //     //const audioLink = el.querySelector('audio') as HTMLAudioElement;
  //     ////remove the class Playing from other elements
  //     dbAudioEl.forEach((el) => {
  //       el.classList.remove('playing');
  //     });

  //     ///check if any other audio is playing and pause it
  //     audioLinks.forEach((audio: HTMLAudioElement) => {
  //       if (!audioLink.paused) return;

  //       audio.pause();
  //       audio.currentTime = 0;
  //     });
  //     /// adding playing class to the current Clicked Elements and getting the audio elements
  //     this.classList.add('playing');
  //     //audioLink.play();

  //     // const audioSource = audioCtx.createMediaElementSource(audioLink);
  //     // analyzer = audioCtx.createAnalyser();
  //     // audioSource.connect(analyzer);
  //     // analyzer.connect(audioCtx.destination);
  //     // analyzer.fftSize = 1024;
  //     // bufferLenth = analyzer.frequencyBinCount;
  //     // console.log(bufferLenth);
  //     // console.log('je;');
  //     //getAudio(audioLink);

  //     // if (audioCtx.state === 'suspended') {
  //     //   audioCtx.resume();
  //     //   //audioLink.play();
  //     // }

  //     // const audioSource = audioCtx.createMediaElementSource(audioLink);
  //     //analyzer = audioCtx.createAnalyser();
  //     //  audioSource.connect(analyzer);
  //     //analyzer.connect(audioCtx.destination);
  //     // analyzer.fftSize = 1024; ///////How much data we want to collect
  //

  //     //   timeData.forEach((data: number, i: number) => {
  //     //     const v = data / 128;
  //     //     const y = (v * HEIGHT) / 2;
  //     //     // Draw the lines
  //     //     if (i === 0) {
  //     //       ctx?.moveTo(x, y);
  //     //     } else {
  //     //       ctx?.lineTo(x, y);
  //     //     }
  //     //     x += sliceWidth;
  //     //   });
  //     //   ctx?.stroke();
  //     //   // console.log(sliceWidth);
  //     //   requestAnimationFrame(drawTimeData);
  //     //   //requestAnimationFrame(() => drawTimeData()); //call itself as soon as possible
  //     // }
  //     // drawTimeData();

  //     // drawTimeData(timeData);
  //     //drawTimeData();
  //     // console.log(src)
  //     // getAudio(audioLink);
  //     //audioLink?.play();
  //   });
  // });

  //function getAudio(src: HTMLAudioElement) {
  //const linkAud = src.src;
  //const audsource = await fetch(linkAud);
  //const audData = await audsource.arrayBuffer();
  // const decodedAudio = await audioCtx.decodeAudioData(audData);
  //decodedAudio.connect(analyzer);
  //const playSound = audioCtx.createBufferSource(); ////this method create media source like createMediaSouce method
  //playSound.buffer = decodedAudio;
  //playSound.connect(analyzer); //////connect the sound source to an analyser
  //console.log(analyzer);
  //src.play();
  // playSound.connect(audioCtx.destination);
  // playSound.start();
  // playSound.start(audioCtx.currentTime);
  //console.log(timeData);
  //console.log(playSound.connect(analyzer));
  //console.log(decodedAudio);
  // audioCtx.createMediaStreamSource(playSound.buffer);
  //audioCtx.createMediaElementSource();
  //console.log(decodedAudio); //audiobuffer
  //const source = audioCtx.createMediaStreamSource(decodedAudio);
  //source.connect(analyzer);
  // src.play();
  // }

  //let barHeight;
  // let x: number;
  // function drawTimeData(timeData) {
  //   console.log(timeData);
  //   analyzer.getByteTimeDomainData(timeData); //inject the time data into our timeData array
  //   //1 clear the canvas

  //   //set up some canvas drawing

  //   ctx.lineWidth = 3;
  //   ctx.strokeStyle = 'round';
  //   ctx.strokeStyle = '#796EAD80';
  //   ctx?.beginPath();
  //   const sliceWidth = WIDTH / bufferLenth;
  //   x = 0;
  //   ctx?.clearRect(0, 0, WIDTH, HEIGHT);
  //   // timeData.forEach((data, i) => {
  //   //   barHeight = data[i] * 2;
  //   //   ctx.fillStyle = '#796EAD80';
  //   //   ctx?.fillRect(x, canvasEl.height - barHeight, sliceWidth, barHeight);
  //   //   x += sliceWidth;
  //   // });

  //   timeData.forEach((data: number, i: number) => {
  //     const v = data / 128;
  //     const y = (v * HEIGHT) / 2;
  //     // Draw the lines
  //     if (i === 0) {
  //       ctx?.moveTo(x, y);
  //     } else {
  //       ctx?.lineTo(x, y);
  //     }
  //     x += sliceWidth;
  //   });
  //   ctx?.stroke();
  //   // console.log(sliceWidth);
  //   //requestAnimationFrame(drawTimeData);
  //   requestAnimationFrame(() => drawTimeData(timeData)); //call itself as soon as possible
  // }
});

// audio.paused ? Audio.play() : Audio.pause();
// const draw = normalizedData => {
//   // Set up the canvas
//   const canvas = document.querySelector("canvas");
//   const dpr = window.devicePixelRatio || 1;
//   const padding = 20;
//   canvas.width = canvas.offsetWidth * dpr;
//   canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
//   const ctx = canvas.getContext("2d");
//   ctx.scale(dpr, dpr);
//   ctx.translate(0, canvas.offsetHeight / 2 + padding); // Set Y = 0 to be in the middle of the canvas

//   // draw the line segments
//   const width = canvas.offsetWidth / normalizedData.length;
//   for (let i = 0; i < normalizedData.length; i++) {
//     const x = width * i;
//     let height = normalizedData[i] * canvas.offsetHeight - padding;
//     if (height < 0) {
//         height = 0;
//     } else if (height > canvas.offsetHeight / 2) {
//         height = height > canvas.offsetHeight / 2;
//     }
//     drawLineSegment(ctx, x, height, width, (i + 1) % 2);
//   }
// };
