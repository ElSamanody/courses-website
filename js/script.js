document.addEventListener("DOMContentLoaded", () => {
  // active the link in navbar
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });

  //select button
  const loginBtn = document.querySelector('a[href="./login.html"]');
  const signupBtn = document.querySelector('a[href="./sign-up.html"]');
  const logoutBtn = document.getElementById("logoutBtn");

  // عشان اعمل تغير على على شكل الخطة لما اختار السعر
  const btnMonthly = document.querySelector(".Monthly");
  const btnYearly = document.querySelector(".Yearly");

  btnMonthly.addEventListener("click", () => {
    if (!btnMonthly.classList.contains("active")) {
      console.log("yes found class");
      btnMonthly.classList.add("active");
      btnYearly.classList.remove("active");
    } else {
      console.log("not found class");
    }
  });

  btnYearly.addEventListener("click", () => {
    if (!btnYearly.classList.contains("active")) {
      console.log("yes found class btn 2");

      btnYearly.classList.add("active");
      btnMonthly.classList.remove("active");
    } else {
      console.log("not found class btn 2");
    }
  });

  // consider both regular user and admin sessions
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const admin = JSON.parse(localStorage.getItem("loggedInAdmin"));
  // hide the standalone logout button (we'll use dropdown logout)
  if (logoutBtn) logoutBtn.style.display = "none";

  // hide sign-up/login if logged in
  if (user || admin) {
    if (loginBtn) loginBtn.style.display = "none";
    if (signupBtn) signupBtn.style.display = "none";
  } else {
    if (loginBtn) loginBtn.style.display = "inline-block";
    if (signupBtn) signupBtn.style.display = "inline-block";
  }

  // expose simple user helpers
  window.getCurrentUser = function () {
    try {
      return JSON.parse(localStorage.getItem("loggedInUser") || "null");
    } catch (e) {
      return null;
    }
  };
  window.saveCurrentUser = function (user) {
    if (!user) return;
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  };

  // inject avatar dropdown into navbar or near View Site button
  (function injectAvatarDropdown() {
    if (document.getElementById("navAvatarDropdown")) return; // avoid duplicate

    const userObj = window.getCurrentUser();

    // build dropdown markup using Bootstrap classes
    const dropdown = document.createElement("div");
    dropdown.className = "dropdown dropdown-custom ms-2";
    dropdown.innerHTML = `
      <a class="btn p-0 d-inline-flex align-items-center" href="#" id="navAvatarDropdown" data-bs-toggle="dropdown" aria-expanded="false" role="button">
        <img src="./image/logo/Icon Container.png" id="navAvatarImg" alt="avatar" style="width:38px;height:38px;border-radius:50%;object-fit:cover;border:2px solid rgba(0,0,0,0.05)  ">
      </a>
      <ul class="dropdown-menu dropdown-menu-custom dropdown-menu-end" aria-labelledby="navAvatarDropdown">
        <li><a class="dropdown-item" href="./profile.html" id="navMenuProfile">Profile</a></li>
        
        <li><a class="dropdown-item text-danger" href="#" id="navMenuLogout">Logout</a></li>
      </ul>
    `;

    // decide insertion point: before View Site button if present, else next to login/signup area
    const viewSiteBtn = document.getElementById("viewSiteBtn");
    if (viewSiteBtn && viewSiteBtn.parentElement) {
      viewSiteBtn.parentElement.insertBefore(dropdown, viewSiteBtn);
    } else if (logoutBtn && logoutBtn.parentElement) {
      logoutBtn.parentElement.appendChild(dropdown);
    } else {
      // fallback: append to navbar container end
      const navRight =
        document.querySelector("#main-navbar .d-flex.ms-auto") ||
        document.querySelector("#main-navbar .d-flex");
      if (navRight) navRight.appendChild(dropdown);
      else document.body.appendChild(dropdown);
    }

    function refreshAvatarImg() {
      const img = document.getElementById("navAvatarImg");
      const user = window.getCurrentUser();
      if (!img) return;
      if (user && user.avatar) img.src = user.avatar;
      else if (user && (user.username || user.name)) {
        const displayName = user.username || user.name;
        const initials = displayName
          .split(" ")
          .map((s) => s[0])
          .slice(0, 2)
          .join("")
          .toUpperCase();
        const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'><rect width='100%' height='100%' fill='%23f3f4f6'/><text x='50%' y='50%' dy='.35em' text-anchor='middle' font-family='Arial' font-size='52' fill='%23222'>${initials}</text></svg>`;
        img.src = "data:image/svg+xml;base64," + btoa(svg);
      } else {
        img.src = "./image/logo/Icon Container.png";
      }
    }

    refreshAvatarImg();
    window.addEventListener("storage", (e) => {
      if (e.key === "loggedInUser") refreshAvatarImg();
    });

    // Logout behavior inside dropdown
    setTimeout(() => {
      const logoutItem = document.getElementById("navMenuLogout");
      if (logoutItem) {
        logoutItem.addEventListener("click", (ev) => {
          ev.preventDefault();
          alerts.confirm({
            title: "Logout",
            message: "Are you sure you want to logout?",
            confirmText: "Logout",
            cancelText: "Cancel",
            onConfirm: function () {
              localStorage.removeItem("loggedInUser");
              localStorage.removeItem("loggedInAdmin");
              window.location.replace("./login.html");
            },
          });
        });
      }
    }, 50);
  })();
});
