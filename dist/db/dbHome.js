"use strict";(()=>{var b=[{title:"content creator",id:1,posterImg:"",englishVideo:"https://dl.dropboxusercontent.com/s/6ozrrrfnti2fmty/Input%20website%20videos.mp4",spanish:"https://dl.dropboxusercontent.com/s/6ozrrrfnti2fmty/Input%20website%20videos.mp4",spanishLatin:"http://google.com",marathi:"http://google.com",german:"http://google.com",hindi:"http://google.com",cantonese:"http://google.com"},{title:"content creator",id:2,posterImg:"https://unsplash.com/s/photos/img",englishVideo:"http://google.com",spanish:"http://google.com",spanishLatin:"http://google.com",marathi:"http://google.com",german:"http://google.com",hindi:"http://google.com",cantonese:"http://google.com"},{title:"animation",id:3,posterImg:"https://unsplash.com/s/photos/img",englishVideo:"http://google.com",spanish:"https://www.youtube.com/watch?v=8Ch7dqMpNlI",spanishLatin:"http://google.com",marathi:"http://google.com",german:"http://google.com",hindi:"http://google.com",cantonese:"http://google.com"},{title:"Documentaries",id:4,posterImg:"https://unsplash.com/s/photos/img",englishVideo:"http://google.com",spanish:"http://google.com",spanishLatin:"http://google.com",marathi:"http://google.com",german:"http://google.com",hindi:"http://google.com",cantonese:"http://google.com"},{title:"tutorials",id:5,posterImg:"https://unsplash.com/s/photos/img",englishVideo:"http://google.com",spanish:"http://google.com",spanishLatin:"http://google.com",marathi:"http://google.com",german:"http://google.com",hindi:"http://google.com",cantonese:"http://google.com"},{title:"entertainment",id:6,posterImg:"https://unsplash.com/s/photos/img",englishVideo:"http://google.com",spanish:"http://google.com",spanishLatin:"http://google.com",marathi:"http://google.com",german:"http://google.com",hindi:"http://google.com",cantonese:"http://google.com"},{title:"coorporate videos",id:7,posterImg:"https://unsplash.com/s/photos/img",englishVideo:"http://google.com",spanish:"http://google.com",spanishLatin:"http://google.com",marathi:"http://google.com",german:"http://google.com",hindi:"http://google.com",cantonese:"http://google.com"},{title:"news",id:8,posterImg:"https://unsplash.com/s/photos/img",englishVideo:"http://google.com",spanish:"http://google.com",spanishLatin:"http://google.com",marathi:"http://google.com",german:"http://google.com",hindi:"http://google.com",cantonese:"http://google.com"}],a=b;var v=[...document.querySelectorAll(".tab-btn")],f=document.querySelector('[db-tab="1"]'),l=document.querySelector(".language-wrap"),L=document.querySelector('[db-element="play"]');console.log(L);var p=v.filter(o=>o.hasAttribute("db-tab")),d=function(){let o=document.querySelector('[db-element="video"]'),n=o.querySelector("source");l.addEventListener("click",t=>{let e=t.target;[...l.children].forEach(r=>{r.classList.remove("is-active")}),e.classList.add("is-active");let s=e.getAttribute("posterimg"),g=e.getAttribute("video-url");o.poster=`${s}`,n.src=`${g}`,o.load()})},u=function(){let o=function(n,t){n.innerHTML=`<a posterimg="${t.posterImg}" video-url="${t.englishVideo}" href="#" class="lng-btn w-button">US English</a><a posterimg="${t.posterImg}" video-url="${t.spanish}" href="#" class="lng-btn w-button">Spanish(Portugese)</a><a posterimg="${t.posterImg}" video-url="${t.spanishLatin}" href="#" class="lng-btn w-button">Spanish(Latin)</a><a posterimg="${t.posterImg}" video-url="${t.marathi}" href="#" class="lng-btn w-button">Marathi</a><a posterimg="${t.posterImg}" video-url="${t.german}" href="#" class="lng-btn w-button">German</a><a posterimg="${t.posterImg}" video-url="${t.hindi}" href="#" class="lng-btn w-button">Hindi</a><a posterimg="${t.posterImg}" video-url="${t.cantonese}" href="#" class="lng-btn w-button">Cantonese</a>`};p.forEach(n=>{n.addEventListener("click",()=>{p.forEach(s=>{s.classList.remove("active")}),n.classList.add("active");let t=n.getAttribute("db-tab");if(!t)return;let e=+t,i=a.find(s=>s.id===e);o(l,i)})}),f.click()};window.Webflow||(window.Webflow=[]);window.Webflow.push(()=>{console.log("Db script loaded");let o=document.querySelectorAll("[db-audio]"),n=document.getElementById("newAudio"),t=document.querySelectorAll("audio"),e=document.querySelector("#audWave"),i=150,s=500,g=e.getContext("2d");e.width=s,e.height=i,u(),d();let r,E;!o||!g||o.forEach((m,w)=>{m.addEventListener("click",function(I){let h=m.querySelector("audio");console.log(h),t.forEach(c=>{c.pause&&(c.pause(),c.currentTime=0)}),h.play()})})});})();
