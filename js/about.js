document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });

  const loginBtn = document.querySelector('a[href="./login.html"]');
  const signupBtn = document.querySelector('a[href="./sign-up.html"]');
  const logoutBtn = document.getElementById("logoutBtn");

  function checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const admin = JSON.parse(localStorage.getItem("loggedInAdmin"));
    if (user || admin) {
      if (loginBtn) loginBtn.style.display = "none";
      if (signupBtn) signupBtn.style.display = "none";
      if (logoutBtn) logoutBtn.style.display = "inline-block";
    } else {
      if (loginBtn) loginBtn.style.display = "inline-block";
      if (signupBtn) signupBtn.style.display = "inline-block";
      if (logoutBtn) logoutBtn.style.display = "none";
    }
  }

  checkLoginStatus();

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("loggedInAdmin");
      window.location.replace("./login.html");
    });
  }
});
