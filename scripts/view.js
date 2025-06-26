// view.js
a (async ()=>{
  const res = await fetch('https://<your-domain>.pythonanywhere.com/api/wishes/');
  const wishes = await res.json();
  let idx=0, autoId;
  const show=()=>{
    const w=wishes[idx];
    const g=document.getElementById('gallery'); g.innerHTML=`<h3>${w.first_name} ${w.surname||''}</h3><p>${w.message}</p>`;
    w.media_urls.forEach(u=>{
      const e=u.match(/\.(mp4|webm|ogg)$/)?document.createElement('video'):document.createElement('img');
      e.src=u; if(e.tagName==='VIDEO')e.controls=true; g.appendChild(e);
    });
  };
  document.getElementById('prevBtn').onclick=()=>{idx=(idx-1+wishes.length)%wishes.length;show();};
  document.getElementById('nextBtn').onclick=()=>{idx=(idx+1)%wishes.length;show();};
  document.getElementById('autoBtn').onclick=()=>{
    if(autoId)clearInterval(autoId),autoId=null;else autoId=setInterval(()=>{document.getElementById('nextBtn').click();}, document.getElementById('interval').value*1000);
  };
  show();
})();