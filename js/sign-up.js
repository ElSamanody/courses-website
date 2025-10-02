window.addEventListener("DOMContentLoaded", () => {
  const form = document.signUpForm;
  const username = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const agreeCheckBox = document.getElementById("agree");

  const usernameError = document.getElementById("usernameerror");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  const notyf = new Notyf();

  // ===== Validation Functions =====
  function validateUsername() {
    usernameError.textContent = "";
    usernameError.style.display = "none";
    const val = username.value.trim();
    if (!val) {
      usernameError.textContent = "Username is required";
      usernameError.style.display = "block";
      return false;
    } else if (val.length < 9 || val.length > 20) {
      usernameError.textContent =
        "Username must be between 9 and 20 characters";
      usernameError.style.display = "block";
      return false;
    }
    return true;
  }

  function validateEmail() {
    emailError.textContent = "";
    emailError.style.display = "none";
    const val = email.value.trim();
    if (!val) {
      emailError.textContent = "Email is required";
      emailError.style.display = "block";
      return false;
    } else if (!val.includes("@") || !val.includes(".")) {
      emailError.textContent = "Please enter a valid email address";
      emailError.style.display = "block";
      return false;
    }
    return true;
  }

  function validatePassword() {
    passwordError.textContent = "";
    passwordError.style.display = "none";
    const val = password.value.trim();
    if (!val) {
      passwordError.textContent = "Password is required";
      passwordError.style.display = "block";
      return false;
    } else if (val.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters";
      passwordError.style.display = "block";
      return false;
    }
    return true;
  }

  // remove errors on input
  username.addEventListener("input", () => {
    usernameError.style.display = "none";
  });
  email.addEventListener("input", () => {
    emailError.style.display = "none";
  });
  password.addEventListener("input", () => {
    passwordError.style.display = "none";
  });

  // ===== Submit Form =====
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!agreeCheckBox.checked) {
      notyf.error("You must agree with Terms of Use and Privacy Policy");
      return;
    }

    if (!isUsernameValid || !isEmailValid || !isPasswordValid) return;

    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    // Check if email already exists
    const emailExists = accounts.some(
      (acc) => acc.email === email.value.trim()
    );
    if (emailExists) {
      emailError.textContent = "This email is already registered";
      emailError.style.display = "block";
      notyf.error("Registration failed. Email already exists.");
      return;
    }

    // Save new user
    const userData = {
      username: username.value.trim(),
      email: email.value.trim(),
      password: password.value.trim(),
    };

    accounts.push(userData);
    localStorage.setItem("accounts", JSON.stringify(accounts));

    notyf.success("Registration successful!");
    form.reset();

    setTimeout(() => {
      window.location.href = "./login.html";
    }, 1500);
  });

  window.onload = () => {
    username.focus();
  };
});
