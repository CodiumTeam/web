import{G as m,c as p,b as f}from"./vendor.999961a4.js";import{l as g,i as y,v as r,t as l}from"./site.1b616cd5.js";g();y();h();w();document.querySelectorAll('input[type=radio][name="myRadio"]').forEach(function(e){e.addEventListener("change",E)});document.getElementById("contactForm").addEventListener("submit",function(e){if(e.preventDefault(),!!B(e)&&!grecaptcha.getResponse()){grecaptcha.execute();return}});function h(){new m("#opinion",{type:"carousel",autoplay:2500,startAt:0,perView:2,focusAt:"center",breakpoints:{600:{perView:1}},gap:20}).mount({Controls:p,Breakpoints:f})}function w(){!document.querySelector("#clients")||new m("#clients",{type:"carousel",autoplay:!1,startAt:0,gap:10,perView:6,breakpoints:{700:{perView:3},450:{perView:2},350:{perView:1},800:{perView:4}}}).mount({Controls:p,Breakpoints:f})}function E(e){e.target,document.getElementById("js-locality").classList.toggle("hidden"),document.getElementById("js-numProgrammers").classList.toggle("hidden")}function d(e){return e==="business"}function B(e){const n=document.getElementById("name"),a=document.getElementById("email"),t=document.querySelector('input[name="myRadio"]:checked'),o=document.getElementById("locality"),s=document.getElementById("numProgrammers"),i=r(n),c=r(a),u=d(t.value)?r(s):r(o);if(!i||!c||!u){if(e.preventDefault(),!i)return n.focus(),!1;if(!c)return a.focus(),!1;if(!u)return d(t.value)?s.focus():o.focus(),!1}return!0}window.captchaCompleted=()=>{const e=document.getElementById("contactForm"),n=new FormData(e),a=e.getAttribute("action"),t=e.getAttribute("data-training-type");n.append("trainingType",t),document.getElementById("js-submit").disabled=!0,fetch(a,{method:"POST",body:n}).then(function(o){if(o.ok){l("contact_us","sent",t),e.remove();const s=document.getElementById("js-show-success");s.classList.remove("hidden");const i=document.getElementById("js-header").offsetHeight,c=s.getBoundingClientRect().top+window.pageYOffset-i;window.scrollTo({top:c,behavior:"smooth"})}else l("contact_us","failed",t),document.getElementById("js-submit").disabled=!1}).catch(o=>{l("contact_us","failed",t),document.getElementById("js-submit").disabled=!1})};