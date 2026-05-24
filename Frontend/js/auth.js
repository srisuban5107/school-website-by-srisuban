/**
 * Save login data after successful login
 */
function saveLogin(data) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("name", data.name);
    localStorage.setItem("user_id", data.user_id);
}

/**
 * Get current logged-in user
 */
function getUser() {
    return {
        token: localStorage.getItem("token"),
        role: localStorage.getItem("role"),
        name: localStorage.getItem("name"),
        user_id: localStorage.getItem("user_id")
    };
}

/**
 * Check if user is logged in
 */
function isLoggedIn() {
    return !!localStorage.getItem("token");
}

/**
 * Logout user
 */
function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("user_id");
}

/* =========================
   UPDATE UI ELEMENTS
========================= */
window.addEventListener("DOMContentLoaded", () => {
    // 1. Get references to buttons
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const mobileLoginBtn = document.getElementById("mobileLoginBtn");
    const mobileLogoutBtn = document.getElementById("mobileLogoutBtn");
    
    // 2. Get references to profile text
    const nameEl = document.getElementById("mobileUserName");
    const roleEl = document.getElementById("mobileUserRole");

    const performLogout = (e) => {
        e.preventDefault();
        logout();
        window.location.reload();
    };

    // 3. Logic: Update UI based on auth state
    if (isLoggedIn()) {
        const user = getUser();
        
        // Update Profile Info
        if (nameEl) nameEl.textContent = user.name || "User";
        if (roleEl) roleEl.textContent = user.role || "Member";

        // Toggle Buttons: Hide Login, Show Logout
        if (loginBtn) loginBtn.style.display = "inline-flex"; // Adjusted for layout consistency
        if (logoutBtn) {
            logoutBtn.style.display = "inline-flex";
            logoutBtn.onclick = performLogout;
        }
        if (loginBtn) loginBtn.style.display = "none";

        if (mobileLoginBtn) mobileLoginBtn.style.display = "none";
        if (mobileLogoutBtn) {
            mobileLogoutBtn.style.display = "inline-flex";
            mobileLogoutBtn.onclick = performLogout;
        }
    } else {
        // User NOT logged in: Show Login, Hide Logout
        if (nameEl) nameEl.textContent = "S.S. Hr. Sec. School";
        if (roleEl) roleEl.textContent = "Arani, Tiruvannamalai";

        if (loginBtn) loginBtn.style.display = "inline-flex";
        if (logoutBtn) logoutBtn.style.display = "none";

        if (mobileLoginBtn) mobileLoginBtn.style.display = "inline-flex";
        if (mobileLogoutBtn) mobileLogoutBtn.style.display = "none";
    }
});