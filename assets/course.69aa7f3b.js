import{l as m,i as f,v as r,t as d}from"./site.1b616cd5.js";m();f();g();document.querySelectorAll('input[type=radio][name="myRadio"]').forEach(function(e){e.addEventListener("change",p)});document.getElementById("contactForm").addEventListener("submit",function(e){if(e.preventDefault(),!!y(e)&&!grecaptcha.getResponse()){grecaptcha.execute();return}});function g(){new Glide(".glide",{type:"carousel",perView:2,focusAt:"center",breakpoints:{600:{perView:1}},gap:20}).mount()}function p(e){e.target,document.getElementById("js-locality").classList.toggle("hidden"),document.getElementById("js-numProgrammers").classList.toggle("hidden")}function l(e){return e==="business"}function y(e){const n=document.getElementById("name"),a=document.getElementById("email"),t=document.querySelector('input[name="myRadio"]:checked'),o=document.getElementById("locality"),s=document.getElementById("numProgrammers"),c=r(n),i=r(a),u=l(t.value)?r(s):r(o);if(!c||!i||!u){if(e.preventDefault(),!c)return n.focus(),!1;if(!i)return a.focus(),!1;if(!u)return l(t.value)?s.focus():o.focus(),!1}return!0}window.captchaCompleted=()=>{const e=document.getElementById("contactForm"),n=new FormData(e),a=e.getAttribute("action"),t=e.getAttribute("data-training-type");n.append("trainingType",t),document.getElementById("js-submit").disabled=!0,fetch(a,{method:"POST",body:n}).then(function(o){if(o.ok){d("contact_us","sent",t),e.remove();const s=document.getElementById("js-show-success");s.classList.remove("hidden");const c=document.getElementById("js-header").offsetHeight,i=s.getBoundingClientRect().top+window.pageYOffset-c;window.scrollTo({top:i,behavior:"smooth"})}else d("contact_us","failed",t),document.getElementById("js-submit").disabled=!1}).catch(o=>{d("contact_us","failed",t),document.getElementById("js-submit").disabled=!1})};