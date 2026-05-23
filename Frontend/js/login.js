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

  document.querySelectorAll(".role-btn")
    .forEach(b => {
      b.classList.remove("active");
    });

  btn.classList.add("active");

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
function showToast(msg, type = "error"){

  const t = document.getElementById("toast");

  if(!t) return;

  t.textContent =
    (type === "success" ? "✅ " : "❌ ") + msg;

  t.className =
    "toast show " +
    (type === "success" ? "success" : "");

  setTimeout(() => {
    t.classList.remove("show");
  }, 3000);
}


/* =========================
   STEP 1 LOGIN
========================= */
async function submitStep1(){

  const uid =
    document.getElementById("userId")
    .value
    .trim();

  const pass =
    document.getElementById("password")
    .value;

  if(!uid || !pass){

    showToast(
      "Enter User ID and Password"
    );

    return;
  }

  const btn =
    document.getElementById("btnStep1");

  btn.classList.add("loading");

  btn.disabled = true;

  try{

    const res = await fetch(
      `${API_BASE}/auth/login`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          email: uid,
          password: pass
        })
      }
    );

    const data = await res.json();

    /* LOGIN FAILED */
    if(!res.ok){

      showToast(
        data.message ||
        "Invalid credentials"
      );

      return;
    }

    /* ROLE MISMATCH */
    if(data.role !== selectedRole){

      showToast(
        `This account belongs to ${data.role}`
      );

      return;
    }

    /* STORE USER */
    tempUser = data;

    sessionStorage.setItem(
      "token",
      data.token
    );

    sessionStorage.setItem(
      "role",
      data.role
    );

    sessionStorage.setItem(
      "name",
      data.name
    );

    sessionStorage.setItem(
      "email",
      uid
    );

    showToast(
      "Step 1 success! Enter role code",
      "success"
    );

    goToStep2();

  }
  catch(err){

    console.error(err);

    showToast(
      "Server not responding"
    );
  }
  finally{

    btn.classList.remove("loading");

    btn.disabled = false;
  }
}


/* =========================
   STEP 2 VERIFY ROLE
========================= */
async function submitStep2(){

  if(!tempUser){

    showToast(
      "Please login first"
    );

    goBack();

    return;
  }

  const roleCode =
    document.getElementById("roleCode")
    .value
    .trim()
    .toUpperCase();

  if(!roleCode){

    showToast(
      "Enter Role Code"
    );

    return;
  }

  const btn =
    document.getElementById("btnStep2");

  btn.classList.add("loading");

  btn.disabled = true;

  try{

    const token =
      sessionStorage.getItem("token");

    const res = await fetch(
      `${API_BASE}/auth/verify-role`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          token: token,
          roleCode: roleCode
        })
      }
    );

    const data = await res.json();

    if(!res.ok){

      showToast(
        data.message ||
        "Wrong role code"
      );

      return;
    }

    showToast(
      "Login Complete!",
      "success"
    );

    showSuccessPopup();

  }
  catch(err){

    console.error(err);

    showToast(
      "Role verification failed"
    );
  }
  finally{

    btn.classList.remove("loading");

    btn.disabled = false;
  }
}


/* =========================
   SUCCESS POPUP
========================= */
function showSuccessPopup(){

  document.getElementById(
    "popName"
  ).textContent =
    tempUser.name;

  document.getElementById(
    "popRole"
  ).textContent =
    tempUser.role.toUpperCase();

  document.getElementById(
    "popId"
  ).textContent =
    sessionStorage.getItem("email");

  document.getElementById(
    "popupBd"
  ).classList.add("show");
}


/* =========================
   GO DASHBOARD
========================= */
function goDashboard(){

  const role = tempUser.role;

  switch(role){

    case "student":

      window.location.href =
        "../student/dashboard.html";

      break;


    case "teacher":

      window.location.href =
        "../teacher/dashboard.html";

      break;


    case "admin":

      window.location.href =
        "../admin/dashboard.html";

      break;


    case "parent":

      window.location.href =
        "../parent/dashboard.html";

      break;


    default:

      window.location.href =
        "../index.html";
  }
}


/* =========================
   GO HOME
========================= */
function goHome(){

  window.location.href =
    "../index.html";
}


/* =========================
   STEP UI
========================= */
function goToStep2(){

  document
    .getElementById("panel1")
    .classList.remove("active");

  document
    .getElementById("panel2")
    .classList.add("active");

  document
    .getElementById("step1")
    .classList.add("done");

  document
    .getElementById("step2")
    .classList.add("active");
}


/* =========================
   BACK BUTTON
========================= */
function goBack(){

  document
    .getElementById("panel2")
    .classList.remove("active");

  document
    .getElementById("panel1")
    .classList.add("active");

  document
    .getElementById("step2")
    .classList.remove("active");

  document
    .getElementById("step1")
    .classList.remove("done");

  document
    .getElementById("step1")
    .classList.add("active");

  document
    .getElementById("roleCode")
    .value = "";

  tempUser = null;

  showToast(
    "Back to login",
    "success"
  );
}


/* =========================
   ENTER KEY SUPPORT
========================= */
document.addEventListener(
  "keydown",
  (e) => {

    if(e.key === "Enter"){

      if(
        document
        .getElementById("panel1")
        .classList.contains("active")
      ){

        submitStep1();

      }
      else if(
        document
        .getElementById("panel2")
        .classList.contains("active")
      ){

        submitStep2();
      }
    }
  }
);