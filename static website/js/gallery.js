/* ── Hamburger ── */
const hb=document.getElementById('hamburger'),mm=document.getElementById('mobileMenu');
hb.addEventListener('click',()=>{hb.classList.toggle('open');mm.classList.toggle('open')});
document.querySelectorAll('.mobile-nav-links a').forEach(a=>a.addEventListener('click',()=>{hb.classList.remove('open');mm.classList.remove('open')}));

/* ── Init: count photos ── */
const allCards=()=>Array.from(document.querySelectorAll('.g-card'));
function updateCount(){
  const vis=allCards().filter(c=>!c.classList.contains('hidden')).length;
  document.getElementById('visibleCount').textContent=vis;
  document.getElementById('totalCount').textContent=allCards().length;
  const es=document.getElementById('emptyState');
  es.style.display=vis===0?'block':'none';
}

/* ── Filter ── */
let currentFilter='all';
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter=btn.dataset.filter;
    applyFilters();
  });
});

/* ── Search ── */
document.getElementById('searchInput').addEventListener('input',applyFilters);

function applyFilters(){
  const q=document.getElementById('searchInput').value.toLowerCase().trim();
  allCards().forEach(card=>{
    const matchCat=currentFilter==='all'||card.dataset.cat===currentFilter;
    const searchTarget=(card.dataset.title+' '+card.dataset.date+' '+card.dataset.year+' '+card.dataset.cat+' '+card.dataset.caption).toLowerCase();
    const matchQ=!q||searchTarget.includes(q);
    card.classList.toggle('hidden',!(matchCat&&matchQ));
  });
  updateCount();
}

/* ── Scroll reveal animation ── */
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.animationPlayState='running';
    }
  });
},{threshold:0.08});
allCards().forEach((c,i)=>{
  c.style.animationDelay=(i%4)*0.07+'s';
  c.style.animationPlayState='paused';
  observer.observe(c);
});

/* ── Click card → lightbox ── */
let lbIndex=0;
function getVisibleCards(){return allCards().filter(c=>!c.classList.contains('hidden'))}

allCards().forEach(card=>{
  card.addEventListener('click',()=>{
    const vis=getVisibleCards();
    lbIndex=vis.indexOf(card);
    openLightbox(lbIndex);
  });
});

function openLightbox(idx){
  const vis=getVisibleCards();
  if(!vis[idx])return;
  const card=vis[idx];
  const wrap=document.getElementById('lbImgWrap');
  const img=card.querySelector('.g-photo img');
  const emoji=card.querySelector('.g-emoji');
  wrap.innerHTML='';
  if(img){
    const i=document.createElement('img');
    i.src=img.src;i.alt=card.dataset.title;
    wrap.appendChild(i);
  } else if(emoji){
    const e=document.createElement('div');
    e.className='lb-emoji';e.textContent=emoji.textContent;
    wrap.appendChild(e);
  }
  document.getElementById('lbTitle').textContent=card.dataset.title;
  document.getElementById('lbMeta').textContent=card.dataset.date+(card.dataset.by?' · Uploaded by '+card.dataset.by:'');
  document.getElementById('lbCounter').textContent=(idx+1)+' / '+vis.length;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow='hidden';
  lbIndex=idx;
}

function lbNav(dir){
  const vis=getVisibleCards();
  lbIndex=(lbIndex+dir+vis.length)%vis.length;
  openLightbox(lbIndex);
}

function closeLightbox(){
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow='';
}

document.getElementById('lightbox').addEventListener('click',e=>{
  if(e.target===document.getElementById('lightbox'))closeLightbox();
});

document.addEventListener('keydown',e=>{
  if(document.getElementById('lightbox').classList.contains('open')){
    if(e.key==='Escape')closeLightbox();
    if(e.key==='ArrowRight')lbNav(1);
    if(e.key==='ArrowLeft')lbNav(-1);
  }
});

/* ── Upload Modal ── */
function openUpload(){document.getElementById('uploadModal').classList.add('open');document.body.style.overflow='hidden'}
function closeUpload(){document.getElementById('uploadModal').classList.remove('open');document.body.style.overflow='';clearPreviews()}
function closeUploadOutside(e){if(e.target===document.getElementById('uploadModal'))closeUpload()}

/* Drag & drop */
const dz=document.getElementById('dropZone');
dz.addEventListener('dragover',e=>{e.preventDefault();dz.classList.add('drag-over')});
dz.addEventListener('dragleave',()=>dz.classList.remove('drag-over'));
dz.addEventListener('drop',e=>{e.preventDefault();dz.classList.remove('drag-over');handleFiles(e.dataTransfer.files)});

let selectedFiles=[];

function handleFiles(files){
  Array.from(files).forEach(file=>{
    if(!file.type.match(/image\/(png|jpeg|webp)/))return;
    if(file.size>5*1024*1024){alert('File "'+file.name+'" exceeds 5MB. Please choose a smaller file.');return}
    selectedFiles.push(file);
  });
  renderPreviews();
}

function renderPreviews(){
  const grid=document.getElementById('previewGrid');
  if(selectedFiles.length===0){grid.style.display='none';grid.innerHTML='';return}
  grid.style.display='grid';
  grid.innerHTML='';
  selectedFiles.forEach((file,i)=>{
    const thumb=document.createElement('div');
    thumb.className='preview-thumb';
    const img=document.createElement('img');
    img.src=URL.createObjectURL(file);
    const rm=document.createElement('button');
    rm.className='rm-btn';rm.textContent='✕';
    rm.onclick=()=>{selectedFiles.splice(i,1);renderPreviews()};
    thumb.appendChild(img);thumb.appendChild(rm);
    grid.appendChild(thumb);
  });
}

function clearPreviews(){selectedFiles=[];renderPreviews()}

function submitUpload(){
  if(selectedFiles.length===0){alert('Please select at least one photo.');return}
  if(!document.getElementById('upCat').value){alert('Please select a category.');return}
  if(!document.getElementById('upTitle').value.trim()){alert('Please enter an event title.');return}
  // Phase 3: connect to backend here
  alert('✅ Photos submitted for admin approval!\n\n(Backend connection coming in Phase 3)');
  closeUpload();
}

/* Init count */
updateCount();