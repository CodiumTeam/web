import{l as r,i as u,v as c,t as i}from"./site.1b616cd5.js";r();u();document.getElementById("contactForm").addEventListener("submit",function(t){if(t.preventDefault(),!!d()&&!grecaptcha.getResponse()){grecaptcha.execute();return}});function d(){const t=document.getElementById("name"),e=document.getElementById("email"),o=document.getElementById("message"),a=c(t),s=c(e),n=c(o);if(!a||!s||!n){if(!a)return t.focus(),!1;if(!s)return e.focus(),!1;if(!n)return o.focus(),!1}return!0}window.captchaCompleted=()=>{if(!d()){grecaptcha.reset();return}const e=document.getElementById("contactForm"),o=new FormData(e),a=e.getAttribute("action");document.getElementById("js-submit").disabled=!0,fetch(a,{method:"POST",body:o}).then(function(s){if(s.ok){i("contact_us","sent","home"),e.remove();const n=document.getElementById("js-show-success");n.classList.remove("hidden");const m=document.getElementById("js-header").offsetHeight,l=n.getBoundingClientRect().top+window.pageYOffset-m;window.scrollTo({top:l,behavior:"smooth"})}else i("contact_us","failed","home"),document.getElementById("js-submit").disabled=!1}).catch(s=>{i("contact_us","failed","home"),document.getElementById("js-submit").disabled=!1})};
