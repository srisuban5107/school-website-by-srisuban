/* ── Hamburger ── */
const hb=document.getElementById('hamburger'),mm=document.getElementById('mobileMenu');
hb.addEventListener('click',()=>{hb.classList.toggle('open');mm.classList.toggle('open')});
document.querySelectorAll('.mobile-nav-links a').forEach(a=>a.addEventListener('click',()=>{hb.classList.remove('open');mm.classList.remove('open')}));

/* ── Scroll reveal ── */
const revObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:0.1});
document.querySelectorAll('.reveal').forEach(el=>revObs.observe(el));

/* ── Toast ── */
function showToast(msg,type='error'){
  const t=document.getElementById('toast');
  t.textContent=(type==='error'?'❌ ':'✅ ')+msg;
  t.className='toast '+type;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3500);
}

/* ── Form: role selector ── */
function selectFormRole(btn){
  document.querySelectorAll('.frole-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('fRole').value=btn.dataset.role;
}

/* ── Char counter ── */
function updateChar(){
  document.getElementById('charCount').textContent=document.getElementById('fMessage').value.length;
}

/* ── Send message ── */
function sendMessage(){
  const name    = document.getElementById('fName').value.trim();
  const contact = document.getElementById('fContact').value.trim();
  const subject = document.getElementById('fSubject').value;
  const message = document.getElementById('fMessage').value.trim();

  /* Validation */
  if(!name){showToast('Please enter your name');document.getElementById('fName').classList.add('err');return}
  if(!contact){showToast('Please enter phone or email');document.getElementById('fContact').classList.add('err');return}
  if(!subject){showToast('Please select a subject');document.getElementById('fSubject').classList.add('err');return}
  if(!message){showToast('Please write your message');document.getElementById('fMessage').classList.add('err');return}

  /* Clear err classes */
  ['fName','fContact','fSubject','fMessage'].forEach(id=>document.getElementById(id).classList.remove('err'));

  /* Loading */
  const btn=document.getElementById('sendBtn');
  btn.classList.add('loading');

  /* Simulate send (Phase 3: replace with real fetch('/api/contact', {...})) */
  setTimeout(()=>{
    btn.classList.remove('loading');
    document.getElementById('formArea').style.display='none';
    document.getElementById('formSuccess').classList.add('show');
    showToast('Message sent successfully!','success');
  },1200);
}

/* ── Reset form ── */
function resetForm(){
  document.getElementById('formArea').style.display='block';
  document.getElementById('formSuccess').classList.remove('show');
  ['fName','fContact','fClass','fMessage'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('fSubject').value='';
  document.getElementById('charCount').textContent='0';
  document.querySelectorAll('.frole-btn').forEach((b,i)=>{b.classList.toggle('active',i===0)});
  document.getElementById('fRole').value='Student';
}

/* ── FAQ accordion ── */
function toggleFaq(btn){
  const item=btn.closest('.faq-item');
  const isOpen=item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i=>i.classList.remove('open'));
  if(!isOpen)item.classList.add('open');
}

/* Remove err class on input */
document.querySelectorAll('.form-field input,.form-field select,.form-field textarea').forEach(el=>{
  el.addEventListener('input',()=>el.classList.remove('err'));
});