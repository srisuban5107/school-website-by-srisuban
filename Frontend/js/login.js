const API_BASE = "http://127.0.0.1:5000";

/* =========================
   STATE
========================= */
let selectedRole = "student";
let tempUser = null;

/* =========================
   ROLE SELECT
========================= */
function selectRole(btn){
  document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedRole = btn.dataset.role;
}

/* =========================
   PASSWORD TOGGLE
========================= */
function togglePass(inputId, btn){
  const inp = document.getElementById(inputId);

  if(inp.type === "password"){
    inp.type = "text";
    btn.textContent = "🙈";
  } else {
    inp.type = "password";
    btn.textContent = "👁️";
  }
}

/* =========================
   TOAST
========================= */
function showToast(msg, type="error"){
  const t = document.getElementById("toast");
  if(!t) return;

  t.textContent = (type === "success" ? "✅ " : "❌ ") + msg;
  t.className = "toast show " + (type === "success" ? "success" : "");

  setTimeout(() => t.classList.remove("show"), 3000);
}

/* =========================
   STEP 1 LOGIN
========================= */
async function submitStep1(){

  const uid = document.getElementById("userId").value.trim();
  const pass = document.getElementById("password").value;

  if(!uid || !pass){
    showToast("Enter User ID and Password");
    return;
  }

  const btn = document.getElementById("btnStep1");
  btn.classList.add("loading");
  btn.disabled = true;

  try {

    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: uid,
        password: pass
      })
    });

    const data = await res.json();

    if(data.status !== "success"){
      showToast(data.message || "Login failed");
      return;
    }

    /* SAVE TEMP USER */
    tempUser = data;

    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("role", data.role);

    showToast("Step 1 success! Enter role code", "success");

    goToStep2();

  } catch(err){
    console.error(err);
    showToast("Server not responding");
  } finally {
    btn.classList.remove("loading");
    btn.disabled = false;
  }
}

/* =========================
   STEP 2 ROLE CHECK
========================= */
function submitStep2(){

  if(!tempUser){
    showToast("Please login first");
    goBack();
    return;
  }

  const code = document.getElementById("roleCode").value.trim().toUpperCase();

  if(!code){
    showToast("Enter Role Code");
    return;
  }

  const btn = document.getElementById("btnStep2");
  btn.classList.add("loading");
  btn.disabled = true;

  setTimeout(() => {

    const expected = {
      student: "STU-2026",
      teacher: "TCH-2026",
      admin: "ADM-2026",
      parent: "PAR-2026"
    };

    const role = tempUser.role;

    if(code !== expected[role]){
      showToast("Invalid Role Code");

      btn.classList.remove("loading");
      btn.disabled = false;
      return;
    }

    showToast("Login Complete!", "success");

    /* FINAL REDIRECT */
    if(role === "student"){
      window.location.href = "../student/dashboard.html";
    }
    else if(role === "teacher"){
      window.location.href = "../teacher/dashboard.html";
    }
    else if(role === "admin"){
      window.location.href = "../admin/dashboard.html";
    }
    else if(role === "parent"){
      window.location.href = "../parent/dashboard.html";
    }
    else {
      window.location.href = "../index.html";
    }

  }, 500);
}

/* =========================
   STEP SWITCH
========================= */
function goToStep2(){

  document.getElementById("panel1").classList.remove("active");
  document.getElementById("panel2").classList.add("active");

  document.getElementById("step1").classList.add("done");
  document.getElementById("step2").classList.add("active");
}

/* =========================
   BACK BUTTON (FIXED)
========================= */
function goBack(){

  document.getElementById("panel2").classList.remove("active");
  document.getElementById("panel1").classList.add("active");

  document.getElementById("step2").classList.remove("active");
  document.getElementById("step1").classList.remove("done");
  document.getElementById("step1").classList.add("active");

  document.getElementById("roleCode").value = "";

  tempUser = null;

  showToast("Back to login", "success");
}

/* =========================
   ENTER KEY SUPPORT
========================= */
document.addEventListener("keydown", (e) => {
  if(e.key === "Enter"){
    if(document.getElementById("panel1").classList.contains("active")){
      submitStep1();
    } else {
      submitStep2();
    }
  }
});