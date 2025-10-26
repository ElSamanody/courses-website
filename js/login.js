window.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const loginError = document.getElementById("loginError");

  const notyf = new Notyf();

  // ======================================================
  // 🧩 Seed default admin if not exists in localStorage
  // ======================================================
  (function seedAdmin() {
    const STORE_KEY = "courses_admin_store_v1";

    const seed = {
      courses: [],
      students: [],
      enrollments: [],
      admins: [
        {
          id: 1,
          name: "Elsayed (Admin)",
          email: "elsayed@gmail.com",
          password: "1234567890",
          perms: { add: true, edit: true },
        },
      ],
      notifications: {
        courses: [],
        students: [],
        enrollments: [],
        admins: [],
        overview: [],
      },
    };

    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) {
        localStorage.setItem(STORE_KEY, JSON.stringify(seed));
        console.log("✅ Default admin created in localStorage.");
        return;
      }

      const existing = JSON.parse(raw);
      existing.admins = Array.isArray(existing.admins) ? existing.admins : [];

      const hasAdmin = existing.admins.some(
        (a) => a.email === seed.admins[0].email
      );
      if (!hasAdmin) {
        existing.admins.push(seed.admins[0]);
        localStorage.setItem(STORE_KEY, JSON.stringify(existing));
        console.log("✅ Seed admin added to existing store.");
      }
    } catch (e) {
      console.error("❌ Error seeding admin:", e);
    }
  })();
  // ======================================================

  // ===== Validation =====
  function validateEmail() {
    if (email.value.trim() === "") {
      emailError.textContent = "Email is required.";
      emailError.style.display = "block";
      return false;
    } else if (!email.value.includes("@") || !email.value.includes(".")) {
      emailError.textContent = "Please enter a valid email address.";
      emailError.style.display = "block";
      return false;
    }
    emailError.style.display = "none";
    return true;
  }

  function validatePassword() {
    if (password.value.trim() === "") {
      passwordError.textContent = "Password is required.";
      passwordError.style.display = "block";
      return false;
    } else if (password.value.trim().length < 6) {
      passwordError.textContent =
        "Password must be at least 6 characters long.";
      passwordError.style.display = "block";
      return false;
    }
    passwordError.style.display = "none";
    return true;
  }

  // delete errors by write
  email.addEventListener("input", () => {
    emailError.style.display = "none";
    loginError.style.display = "none";
  });

  password.addEventListener("input", () => {
    passwordError.style.display = "none";
    loginError.style.display = "none";
  });

  // ===== Submit Login =====
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) return;

    // first try admin authentication from the admin store
    const store = JSON.parse(
      localStorage.getItem("courses_admin_store_v1")
    ) || {
      admins: [],
    };
    const foundAdmin = (store.admins || []).find(
      (a) =>
        a.email === email.value.trim() && a.password === password.value.trim()
    );
    if (foundAdmin) {
      loginError.style.display = "none";
      notyf.success("Admin login successful!");
      localStorage.setItem(
        "loggedInAdmin",
        JSON.stringify({
          id: foundAdmin.id,
          email: foundAdmin.email,
          name: foundAdmin.name,
        })
      );
      loginForm.reset();
      setTimeout(() => {
        window.location.href = "./index.html";
      }, 800);
      return;
    }

    // fallback to regular accounts if any
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const foundUser = accounts.find(
      (acc) =>
        acc.email === email.value.trim() &&
        acc.password === password.value.trim()
    );
    if (foundUser) {
      loginError.style.display = "none";
      notyf.success("Login successful!");
      const userToSave = {
        ...foundUser,
        email: foundUser.email || email.value.trim(),
        joined: foundUser.joined || new Date().toISOString().split("T")[0],
      };
      localStorage.setItem("loggedInUser", JSON.stringify(userToSave));
      loginForm.reset();
      setTimeout(() => {
        window.location.href = "./index.html";
      }, 800);
    } else {
      loginError.textContent = "Email or Password is incorrect.";
      loginError.style.display = "block";
      notyf.error("Email or Password is incorrect.");
    }
  });
});
