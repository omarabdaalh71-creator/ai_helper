var F=document.getElementById("f"),Q=document.getElementById("q"),L=document.getElementById("l"),H=document.querySelector("header"),W=document.createElement("div"),s=16,i=0,A=["#1b2450","#451b50","#1b5036","#50451b"],D=["#0b1020","#1a0b20","#0b2016","#201a0b"];
function mk(t,fn){var d=document.createElement("button");d.type="button";d.textContent=t;d.style.cssText="width:36px;height:36px;border-radius:50%;border:0;background:#ffffff25;color:#fff;font-size:14px";d.onclick=fn;return d}
W.style.cssText="display:flex;gap:6px;margin-right:auto;margin-left:52px";
W.appendChild(mk("A+",function(){s=Math.min(26,s+2);document.body.style.fontSize=s+"px"}));
W.appendChild(mk("A-",function(){s=Math.max(12,s-2);document.body.style.fontSize=s+"px"}));
W.appendChild(mk("◐",function(){i=(i+1)%4;document.body.style.background="radial-gradient("+A[i]+","+D[i]+" 60%)"}));
H.appendChild(W);
var S=window.SpeechRecognition||window.webkitSpeechRecognition;
if(S){var r=new S();r.lang="ar-EG";r.onresult=function(e){Q.value=e.results[0][0].transcript;F.requestSubmit()};var m=mk("🎤",function(){r.start()});m.style.width="48px";m.style.height="48px";F.insertBefore(m,F.lastElementChild)}
L.onclick=function(e){var m=e.target.closest(".m");if(m&&!m.classList.contains("u")&&m.textContent.length>1){navigator.clipboard.writeText(m.textContent);m.style.outline="2px solid #06b6d4";setTimeout(function(){m.style.outline=""},600)}};
