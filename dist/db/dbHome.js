"use strict";(()=>{var E=[{language:"english",id:1,posterImg:"",contentcreator1:"https://dl.dropboxusercontent.com/s/6ozrrrfnti2fmty/Input%20website%20videos.mp4",contentcreator2:"https://dl.dropboxusercontent.com/s/6ozrrrfnti2fmty/Input%20website%20videos.mp4",animation:"https://dl.dropboxusercontent.com/s/6ozrrrfnti2fmty/Input%20website%20videos.mp4",documentaries:"https://dl.dropboxusercontent.com/s/6ozrrrfnti2fmty/Input%20website%20videos.mp4",tutorials:"http://google.com",entertainment:"http://google.com",coorporateVideos:"http://google.com",news:"https://dl.dropboxusercontent.com/s/6ozrrrfnti2fmty/Input%20website%20videos.mp4"},{language:"Spanish(port)",id:2,posterImg:"https://unsplash.com/s/photos/img",contentcreator1:"http://google.com",contentcreator2:"http://google.com",animation:"http://google.com",documentaries:"http://google.com",tutorials:"http://google.com",entertainment:"http://google.com",coorporateVideos:"http://google.com",news:"https://dl.dropboxusercontent.com/s/6ozrrrfnti2fmty/Input%20website%20videos.mp4"},{language:"spanish(latin)",id:3,posterImg:"https://unsplash.com/s/photos/img",contentcreator1:"http://google.com",contentcreator2:"http://google.com",animation:"http://google.com",documentaries:"http://google.com",tutorials:"http://google.com",entertainment:"http://google.com",coorporateVideos:"http://google.com",news:"http://google.com"},{language:"marathi",id:4,posterImg:"https://unsplash.com/s/photos/img",contentcreator1:"http://google.com",contentcreator2:"http://google.com",animation:"http://google.com",documentaries:"http://google.com",tutorials:"http://google.com",entertainment:"http://google.com",coorporateVideos:"http://google.com",news:"http://google.com"},{language:"german",id:5,posterImg:"https://unsplash.com/s/photos/img",contentcreator1:"http://google.com",contentcreator2:"http://google.com",animation:"http://google.com",documentaries:"http://google.com",tutorials:"http://google.com",entertainment:"http://google.com",coorporateVideos:"http://google.com",news:"http://google.com"},{language:"hindi",id:6,posterImg:"https://unsplash.com/s/photos/img",contentcreator1:"http://google.com",contentcreator2:"http://google.com",animation:"http://google.com",documentaries:"http://google.com",tutorials:"http://google.com",entertainment:"http://google.com",coorporateVideos:"http://google.com",news:"http://google.com"},{language:"cantonese",id:7,posterImg:"https://unsplash.com/s/photos/img",contentcreator1:"http://google.com",contentcreator2:"http://google.com",animation:"http://google.com",documentaries:"http://google.com",tutorials:"http://google.com",entertainment:"http://google.com",coorporateVideos:"http://google.com",news:"http://google.com"}],u=E;var I=[...document.querySelectorAll(".tab-btn")],S=document.querySelector('[db-tab="1"]'),f=document.querySelector(".language-wrap"),h=[...f.children],V=document.querySelector('[db-element="play"]'),m=document.querySelector('[db-element="video"]'),A=m.querySelector("source"),p=I.filter(t=>t.hasAttribute("db-tab")),v=function(t){m.poster="https://uploads-ssl.webflow.com/64a1953c1a72bd5a81a24f3d/64b2dd8d4c059eab34058ca3_videocover-min.webp",A.src=`${t}`,m.load(),m.play(),m.muted=!1},w=function(){f.addEventListener("click",t=>{let i=t.target;h.forEach(o=>{o.classList.remove("is-active")}),i.classList.add("is-active");let s=p.find(o=>o.classList.contains("active"));console.log(s),console.log(i);let n=i==null?void 0:i.getAttribute("db-tab");if(!n||!s)return;let c=+n,g=u.find(o=>o.id===c),e=s==null?void 0:s.getAttribute("db-vidname");if(!e)return;let a=g[e];v(a)})},L=function(){p.forEach(e=>{e.addEventListener("click",()=>{p.forEach(r=>{r.classList.remove("active")}),e.classList.add("active");let a=h.find(r=>r.classList.contains("is-active")),o=e.getAttribute("db-vidname"),l=a==null?void 0:a.getAttribute("db-tab");if(!l||!o)return;let b=+l,d=u.find(r=>r.id===b)[o];v(d)})});let t=document.querySelector('[db-section="videotab"]');if(!t)return;let i=function(e,a){e.forEach(o=>{o.isIntersecting&&(g.classList.add("is-active"),c.click(),n.unobserve(t))})},s={threshold:.2},n=new IntersectionObserver(i,s);n.observe(t);let[c]=p,[g]=h};window.Webflow||(window.Webflow=[]);window.Webflow.push(()=>{console.log("Db script loaded");let t=document.querySelectorAll("[db-audio]"),i=document.getElementById("newAudio"),s=document.querySelectorAll("audio"),n=document.querySelector("#audWave"),c=150,g=500,e=n.getContext("2d");n.width=g,n.height=c,L(),w();let a,o;!t||!e||t.forEach((l,b)=>{l.addEventListener("click",function(y){let d=l.querySelector("audio");console.log(d),s.forEach(r=>{r.pause&&(r.pause(),r.currentTime=0)}),d.play()})})});})();
