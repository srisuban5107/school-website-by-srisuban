const API_BASE = "http://127.0.0.1:5000";

/* =========================
   STATE
========================= */
let selectedRole = "student";
let tempUser = null;

/* =========================
   ROLE SELECT
========================= */
function selectRole(btn) {

  document.querySelectorAll(".role-btn").forEach(b => {
    b.classList.remove("active");
  });

  btn.classList.add("active");

  selectedRole = btn.dataset.role;
}

/* =========================
   PASSWORD TOGGLE
========================= */
function togglePass(inputId, btn) {

  const inp = document.getElementById(inputId);

  if (inp.type === "password") {

    inp.type = "text";
    btn.textContent = "🙈";

  } else {

    inp.type = "password";
    btn.textContent = "👁️";
  }
}

/* =========================
   TOAST MESSAGE
========================= */
function showToast(msg, type = "error") {

  const t = document.getElementById("toast");

  if (!t) return;

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
async function submitStep1() {

  const uid =
    document.getElementById("userId").value.trim();

  const pass =
    document.getElementById("password").value;

  // VALIDATION
  if (!uid || !pass) {

    showToast("Enter User ID and Password");

    return;
  }

  const btn = document.getElementById("btnStep1");

  btn.classList.add("loading");
  btn.disabled = true;

  try {

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

    // LOGIN FAILED
    if (!res.ok) {

      showToast(
        data.message || "Invalid credentials"
      );

      return;
    }

    // ROLE CHECK
    if (data.role !== selectedRole) {

      showToast(
        `This account belongs to ${data.role}`
      );

      return;
    }

    // SAVE TEMP USER
    tempUser = data;

    // SAVE LOGIN USING AUTH.JS
    saveLogin({
      token: data.token,
      role: data.role,
      name: data.name,
      user_id: data.user_id
    });

    showToast(
      "Step 1 success! Enter role code",
      "success"
    );

    goToStep2();

  } catch (err) {

    console.error(err);

    showToast("Server not responding");

  } finally {

    btn.classList.remove("loading");
    btn.disabled = false;
  }
}

/* =========================
   STEP 2 ROLE VERIFY
========================= */
async function submitStep2() {

  if (!tempUser) {

    showToast("Please login first");

    goBack();

    return;
  }

  const roleCode =
    document.getElementById("roleCode")
    .value
    .trim()
    .toUpperCase();

  if (!roleCode) {

    showToast("Enter Role Code");

    return;
  }

  const btn = document.getElementById("btnStep2");

  btn.classList.add("loading");
  btn.disabled = true;

  try {

    // GET TOKEN
    const token =
      localStorage.getItem("token");

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

    // FAILED
    if (!res.ok) {

      showToast(
        data.message || "Wrong role code"
      );

      return;
    }

    // SUCCESS
    showToast(
      "Login Complete!",
      "success"
    );

    goToStep3();

  } catch (err) {

    console.error(err);

    showToast("Role verification failed");

  } finally {

    btn.classList.remove("loading");
    btn.disabled = false;
  }
}

/* =========================
   STEP TRANSITIONS
========================= */
function goToStep2() {

  document
    .getElementById("panel1")
    .classList.remove("active");

  document
    .getElementById("panel2")
    .classList.add("active");

  document
    .getElementById("step1")
    .classList.remove("active");

  document
    .getElementById("step1")
    .classList.add("done");

  document
    .getElementById("step2")
    .classList.add("active");
}

function goToStep3() {

  document
    .getElementById("panel2")
    .classList.remove("active");

  document
    .getElementById("panel3")
    .classList.add("active");

  document
    .getElementById("step2")
    .classList.remove("active");

  document
    .getElementById("step2")
    .classList.add("done");

  document
    .getElementById("step3")
    .classList.add("done");

  // HIDE TITLE
  document
    .getElementById("cardTitle")
    .style.display = "none";

  document
    .getElementById("cardSub")
    .style.display = "none";

  // SHOW USER INFO
  document
    .getElementById("popName")
    .textContent = tempUser.name;

  document
    .getElementById("popRole")
    .textContent =
      tempUser.role.toUpperCase();

  document
    .getElementById("popId")
    .textContent =
      tempUser.user_id;
}

/* =========================
   GO BACK
========================= */
function goBack() {

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
   DASHBOARD ROUTING
========================= */
function goDashboard() {

  const role = tempUser.role;

  switch (role) {

    case "student":
      window.location.href =
        "../student/dashboard.html";
      break;

    case "parent":
      window.location.href =
        "../parent/dashboard.html";
      break;

    case "teacher":
      window.location.href =
        "../teacher/dashboard.html";
      break;

    case "admin":
      window.location.href =
        "../admin/dashboard.html";
      break;

    default:
      window.location.href =
        "../index.html";
  }
}

/* =========================
   HOME
========================= */
function goHome() {

  window.location.href =
    "../index.html";
}

/* =========================
   ENTER KEY SUPPORT
========================= */
document.addEventListener("keydown", (e) => {

  if (e.key === "Enter") {

    if (
      document
      .getElementById("panel1")
      .classList.contains("active")
    ) {

      submitStep1();

    } else if (
      document
      .getElementById("panel2")
      .classList.contains("active")
    ) {

      submitStep2();
    }
  }
});