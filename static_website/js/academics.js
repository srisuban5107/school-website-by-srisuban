/* Hamburger */
  const hb=document.getElementById('hamburger'),mm=document.getElementById('mobileMenu');
  hb.addEventListener('click',()=>{hb.classList.toggle('open');mm.classList.toggle('open')});
  document.querySelectorAll('.mobile-nav-links a').forEach(a=>a.addEventListener('click',()=>{hb.classList.remove('open');mm.classList.remove('open')}));

  /* Main Tabs */
  document.querySelectorAll('.main-tab').forEach(t=>t.addEventListener('click',()=>{
    document.querySelectorAll('.main-tab').forEach(x=>x.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    document.getElementById('tab-'+t.dataset.tab).classList.add('active');
  }));

  /* Class Picker */
  document.querySelectorAll('.class-pill').forEach(p=>p.addEventListener('click',()=>{
    document.querySelectorAll('.class-pill').forEach(x=>x.classList.remove('active'));
    document.querySelectorAll('.class-panel').forEach(x=>x.classList.remove('active'));
    p.classList.add('active');
    const panel=document.querySelector('.class-panel[data-class="'+p.dataset.class+'"]');
    if(panel) panel.classList.add('active');
  }));

  /* Medium Tabs */
  document.querySelectorAll('.medium-tab').forEach(t=>t.addEventListener('click',()=>{
    const bar=t.closest('.medium-tab-bar');
    bar.querySelectorAll('.medium-tab').forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    const cp=t.closest('.class-panel');
    cp.querySelectorAll('.medium-panel').forEach(x=>x.classList.remove('active'));
    const target=document.getElementById(t.dataset.medium);
    if(target) target.classList.add('active');
  }));

  /* Modal */
  const typeMap={
    'co-ed':{badge:'badge-coed',label:'👫 Co-Educational'},
    'boys':{badge:'badge-boys',label:'👦 Boys Only'},
    'girls':{badge:'badge-girls',label:'👧 Girls Only'},
    'combined':{badge:'badge-stream',label:'🔀 Combined (Boys + Girls)'}
  };

  function openModal(card){
    const d=card.dataset;
    const t=typeMap[d.type]||{badge:'badge-coed',label:d.type};
    document.getElementById('mTopClass').textContent='Class '+d.class+' · '+d.medium;
    document.getElementById('mTopTitle').textContent='Section '+d.section;
    document.getElementById('mTopBadges').innerHTML='<span class="program-type-badge '+t.badge+'">'+t.label+'</span>';
    document.getElementById('mInfoGrid').innerHTML=
      '<div class="modal-info-item"><div class="modal-info-key">Class Teacher</div><div class="modal-info-val">'+d.classTeacher+'</div></div>'+
      '<div class="modal-info-item"><div class="modal-info-key">Total Students</div><div class="modal-info-val">'+d.totalStudents+'</div></div>'+
      '<div class="modal-info-item"><div class="modal-info-key">Average Mark</div><div class="modal-info-val">'+d.avgMark+'</div></div>'+
      '<div class="modal-info-item"><div class="modal-info-key">Medium / Stream</div><div class="modal-info-val">'+d.medium+'</div></div>';
    const se=document.getElementById('mSubjects');
    se.innerHTML='';
    d.subjects.split(',').forEach(s=>{const c=document.createElement('span');c.className='subj-chip core';c.textContent=s.trim();se.appendChild(c)});
    const sf=document.getElementById('mStaff');
    sf.innerHTML='';
    d.subjectTeachers.split(',').forEach(s=>{const c=document.createElement('span');c.className='staff-tag';c.textContent=s.trim();sf.appendChild(c)});
    const ex=document.getElementById('mExtra');
    const bad=['Add extra info here.','Add extra info.',''];
    if(d.extra&&!bad.includes(d.extra.trim())){ex.style.display='block';document.getElementById('mExtraText').textContent=d.extra}
    else{ex.style.display='none'}
    document.getElementById('modalBackdrop').classList.add('open');
    document.body.style.overflow='hidden';
  }
  function closeModal(){document.getElementById('modalBackdrop').classList.remove('open');document.body.style.overflow=''}
  function closeModalOut(e){if(e.target===document.getElementById('modalBackdrop'))closeModal()}
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});