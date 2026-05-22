(function () {

  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  // 1. Block if not logged in
  if (!token || !role) {
    window.location.href = "../index.html";
    return;
  }

  // 2. Get current page path
  const path = window.location.pathname.toLowerCase();

  // 3. Role protection
  const rules = [
    { path: "/admin/", role: "admin" },
    { path: "/teacher/", role: "teacher" },
    { path: "/student/", role: "student" },
    { path: "/parent/", role: "parent" }
  ];

  for (let rule of rules) {
    if (path.includes(rule.path) && role !== rule.role) {
      window.location.href = "../index.html";
      return;
    }
  }

})();