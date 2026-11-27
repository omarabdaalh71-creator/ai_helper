var b=document.createElement("button"),f=document.createElement("iframe"),on=0;b.textContent="♪";b.style.cssText="position:fixed;top:14px;left:14px;z-index:9;width:40px;height:40px;border-radius:50%;border:0;background:#ffffff25;color:#fff;font-size:20px";
f.allow="autoplay;encrypted-media";f.style.cssText="position:fixed;top:64px;left:14px;z-index:9;width:200px;height:113px;border:0;border-radius:12px;display:none";
b.onclick=function(){on=!on;f.style.display=on?"block":"none";if(on&&!f.src)f.src="https://www.youtube.com/embed/GNNr2ePjJ_k?autoplay=1&loop=1&playlist=GNNr2ePjJ_k&playsinline=1"};
document.body.appendChild(f);document.body.appendChild(b);
