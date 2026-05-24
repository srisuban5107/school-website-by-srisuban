// =========================
// AUTH.JS - LOGIN SYSTEM
// =========================

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
 * Get Authorization header for API calls
 */
function authHeader() {
    return {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json"
    };
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

/**
 * Redirect helper (optional)
 */
function redirectTo(page) {
    window.location.href = page;
}