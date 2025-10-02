window.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const loginError = document.getElementById("loginError");

  const notyf = new Notyf();

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

    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    const foundUser = accounts.find(
      (acc) =>
        acc.email === email.value.trim() &&
        acc.password === password.value.trim()
    );

    if (foundUser) {
      loginError.style.display = "none";
      notyf.success("Login successful!");

      // save data user
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
      loginForm.reset();

      // return the home page
      setTimeout(() => {
        window.location.href = "./index.html";
      }, 1500);
    } else {
      loginError.textContent = "Email or Password is incorrect.";
      loginError.style.display = "block";
      notyf.error("Email or Password is incorrect.");
    }
  });
});
