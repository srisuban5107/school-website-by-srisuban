/* ══════════════════════════════════════════════════════
   TEMP USER DATABASE
   ─────────────────────────────────────────────────────
   HOW TO ADD USERS:
   Copy one object, change id, password, roleCode, name.

   roleCodes:
     admin   → ADM-2026
     teacher → TCH-2026
     student → STU-2026

   PHASE 3: Replace this entire array with a real API call.
   fetch('/api/login', {method:'POST', body: JSON.stringify({id,pass,code})})
══════════════════════════════════════════════════════ */
const USERS = [
  {id:'ADMIN001', password:'admin@123',  role:'admin',   roleCode:'ADM-2026', name:'Headmaster'},
  {id:'TCH001',   password:'teacher@123',role:'teacher', roleCode:'TCH-2026', name:'Mr. [Teacher Name]'},
  {id:'TCH002',   password:'teacher@123',role:'teacher', roleCode:'TCH-2026', name:'Mrs. [Teacher Name]'},
  {id:'STU001',   password:'student@123',role:'student', roleCode:'STU-2026', name:'[Student Name]'},
  {id:'STU002',   password:'student@123',role:'student', roleCode:'STU-2026', name:'[Student Name]'},
  /* ADD MORE USERS HERE */
];

/* Role display info */
const ROLE_INFO = {
  admin:   {label:'Administrator', emoji:'🔑', badge:'role-admin',   code:'ADM-2026', hint:'Use code: ADM-2026'},
  teacher: {label:'Teacher',       emoji:'👨‍🏫', badge:'role-teacher', code:'TCH-2026', hint:'Use code: TCH-2026'},
  student: {label:'Student',       emoji:'🎒', badge:'role-student', code:'STU-2026', hint:'Use code: STU-2026'},
};

/* State */
let selectedRole = 'student';
let verifiedUser = null;

/* ── Role selector ── */
function selectRole(btn){
  document.querySelectorAll('.role-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  selectedRole = btn.dataset.role;
}

/* ── Password toggle ── */
function togglePass(inputId, btn){
  const inp = document.getElementById(inputId);
  if(inp.type==='password'){inp.type='text';btn.textContent='🙈'}
  else{inp.type='password';btn.textContent='👁️'}
}

/* ── Toast ── */
function showToast(msg, type='error'){
  const t = document.getElementById('toast');
  t.textContent = (type==='error'?'❌ ':'✅ ') + msg;
  t.className = 'toast ' + (type==='success'?'success':'');
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 3500);
}

/* ── Step 1: validate credentials ── */
function submitStep1(){
  const uid  = document.getElementById('userId').value.trim();
  const pass = document.getElementById('password').value;
  let valid  = true;

  /* Clear errors */
  document.getElementById('errId').classList.remove('show');
  document.getElementById('errPass').classList.remove('show');
  document.getElementById('userId').classList.remove('err');
  document.getElementById('password').classList.remove('err');

  if(!uid){
    document.getElementById('errId').classList.add('show');
    document.getElementById('userId').classList.add('err');
    valid=false;
  }
  if(!pass){
    document.getElementById('errPass').classList.add('show');
    document.getElementById('password').classList.add('err');
    valid=false;
  }
  if(!valid)return;

  /* Loading state */
  const btn = document.getElementById('btnStep1');
  btn.classList.add('loading');

  /* Simulate network delay (remove in real backend) */
  setTimeout(()=>{
    btn.classList.remove('loading');

    /* Check credentials */
    const user = USERS.find(u => u.id === uid && u.password === pass && u.role === selectedRole);

    if(!user){
      showToast('Invalid User ID or Password');
      document.getElementById('userId').classList.add('err');
      document.getElementById('password').classList.add('err');
      return;
    }

    verifiedUser = user;
    goToStep2();
  }, 900);
}

/* ── Move to step 2 ── */
function goToStep2(){
  /* Update step bar */
  document.getElementById('step1').classList.remove('active');
  document.getElementById('step1').classList.add('done');
  document.getElementById('step1').querySelector('.step-dot').textContent='✓';
  document.getElementById('step2').classList.add('active');

  /* Update role code hint */
  const ri = ROLE_INFO[selectedRole];
  document.getElementById('codeHint').innerHTML =
    `🔐 You are logging in as <strong>${ri.label}</strong>.<br>
     <span style="color:var(--muted);font-size:12px;">Enter your role security code to continue. ${ri.hint}.</span>`;

  /* Switch panels */
  document.getElementById('panel1').classList.remove('active');
  document.getElementById('panel2').classList.add('active');
  document.getElementById('roleCode').focus();
}

/* ── Go back ── */
function goBack(){
  document.getElementById('step1').classList.add('active');
  document.getElementById('step1').classList.remove('done');
  document.getElementById('step1').querySelector('.step-dot').textContent='1';
  document.getElementById('step2').classList.remove('active');
  document.getElementById('panel2').classList.remove('active');
  document.getElementById('panel1').classList.add('active');
  document.getElementById('errCode').classList.remove('show');
  document.getElementById('roleCode').value='';
}

/* ── Step 2: role code ── */
function submitStep2(){
  const code = document.getElementById('roleCode').value.trim().toUpperCase();
  document.getElementById('errCode').classList.remove('show');
  document.getElementById('roleCode').classList.remove('err');

  if(!code){
    document.getElementById('errCode').classList.add('show');
    document.getElementById('errCode').textContent='⚠️ Please enter the role security code.';
    document.getElementById('roleCode').classList.add('err');
    return;
  }

  const btn = document.getElementById('btnStep2');
  btn.classList.add('loading');

  setTimeout(()=>{
    btn.classList.remove('loading');

    /* Verify role code matches user's role */
    const expected = ROLE_INFO[verifiedUser.role].code;
    if(code !== expected){
      document.getElementById('errCode').classList.add('show');
      document.getElementById('errCode').textContent='⚠️ Invalid Role Code. Try: '+expected;
      document.getElementById('roleCode').classList.add('err');
      showToast('Wrong Role Security Code');
      return;
    }

    /* SUCCESS */
    loginSuccess();
  }, 800);
}

/* ── Login success ── */
function loginSuccess(){
  /* Update step 3 */
  document.getElementById('step2').classList.remove('active');
  document.getElementById('step2').classList.add('done');
  document.getElementById('step2').querySelector('.step-dot').textContent='✓';
  document.getElementById('step3').classList.add('done');
  document.getElementById('step3').querySelector('.step-dot').textContent='✓';

  /* Fill popup */
  const ri = ROLE_INFO[verifiedUser.role];
  document.getElementById('popName').textContent = verifiedUser.name;
  document.getElementById('popId').textContent   = verifiedUser.id;
  document.getElementById('popRole').innerHTML   = `<span class="role-badge-pill ${ri.badge}">${ri.emoji} ${ri.label}</span>`;

  /* Open popup */
  document.getElementById('popupBd').classList.add('open');
  document.body.style.overflow='hidden';

  /* Store in session (for dashboard use) */
  sessionStorage.setItem('loggedInUser', JSON.stringify({
    id: verifiedUser.id,
    name: verifiedUser.name,
    role: verifiedUser.role,
  }));
}

/* ── Actions ── */
function goDashboard(){ window.location.href='dashboard.html' }
function goHome(){ window.location.href='index.html' }

/* ── Enter key support ── */
document.addEventListener('keydown', e=>{
  if(e.key==='Enter'){
    if(document.getElementById('panel1').classList.contains('active')) submitStep1();
    else if(document.getElementById('panel2').classList.contains('active')) submitStep2();
  }
});

/* ── Close popup on backdrop click ── */
document.getElementById('popupBd').addEventListener('click', e=>{
  if(e.target===document.getElementById('popupBd')){
    document.getElementById('popupBd').classList.remove('open');
    document.body.style.overflow='';
  }
});