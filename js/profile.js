(function () {
  // ===== Helper: get/set current user in LocalStorage =====
  function getCurrentUser() {
    try {
      const admin = JSON.parse(localStorage.getItem("loggedInAdmin") || "null");
      if (admin) return admin;
      return JSON.parse(localStorage.getItem("loggedInUser") || "null");
    } catch (e) {
      return null;
    }
  }

  function saveCurrentUser(user) {
    if (!user || !user.email) return;

    // نحفظ في الاثنين لضمان التوافق بين profile و navbar
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    localStorage.setItem("loggedInAdmin", JSON.stringify(user));

    // 🔁 نرسل حدث لتحديث الصورة في الـ navbar
    window.dispatchEvent(new CustomEvent("authChange"));
  }

  // ===== Toast helper =====
  function showToast(message) {
    if (typeof Notyf !== "undefined") {
      try {
        new Notyf().success(message);
        return;
      } catch (e) {}
    }

    const toast = document.getElementById("saveToast");
    if (toast) {
      toast.textContent = message;
      toast.style.display = "";
      setTimeout(() => {
        toast.style.display = "none";
        toast.textContent = "Profile saved.";
      }, 2200);
    } else {
      alert(message);
    }
  }

  // ===== Populate Profile Page =====
  function populateProfilePage() {
    const user = getCurrentUser();
    const avatarPlaceholder = document.getElementById("avatarPlaceholder"); // ⬅️ الأيقونة فى صفحة البروفايل
    const avatar = document.getElementById("profileAvatar");
    const displayName = document.getElementById("displayName");
    const displayEmail = document.getElementById("displayEmail");
    const displayJoined = document.getElementById("displayJoined");

    // ✅ صورة الملف الشخصي (تحديث افتراضي وصورة بديلة)
    if (avatar) {
      if (user && user.avatar && user.avatar.trim() !== "") {
        avatar.src = user.avatar;
        avatar.style.setProperty("display", "block", "important");
        if (avatarPlaceholder)
          avatarPlaceholder.style.setProperty("display", "none", "important");
      } else {
        avatar.style.setProperty("display", "none", "important");
        if (avatarPlaceholder)
          avatarPlaceholder.style.setProperty("display", "flex", "important");
      }
    }

    if (displayName)
      displayName.textContent = user?.username || user?.name || "Guest";
    if (displayEmail) displayEmail.textContent = user?.email || "Not logged in";
    if (displayJoined)
      displayJoined.textContent = user?.joined ? "Joined: " + user.joined : "";

    // ===== عناصر التعديل =====
    const avatarFile = document.getElementById("avatarFileInput");
    const avatarUrl = document.getElementById("avatarUrlInput");
    const openEdit = document.getElementById("openEditBtn");
    const editSection = document.getElementById("editSection");
    const profileForm = document.getElementById("profileForm");
    const inputName = document.getElementById("inputName");
    const inputEmail = document.getElementById("inputEmail");
    const inputPassword = document.getElementById("inputPassword");
    const inputPasswordConfirm = document.getElementById(
      "inputPasswordConfirm"
    );
    const cancelEdit = document.getElementById("cancelEditBtn");

    if (!profileForm) return;

    inputName.value = user?.username || user?.name || "";
    inputEmail.value = user?.email || "";
    inputEmail.readOnly = true;
    inputEmail.tabIndex = -1;
    inputEmail.style.cursor = "text";
    inputEmail.style.backgroundColor = "#f8f9fa";
    inputEmail.title = "Email cannot be edited (click to copy)";

    inputEmail._preventFocus = (e) => e.preventDefault();
    inputEmail._blurOnFocus = (e) => e.target.blur();
    inputEmail.addEventListener("mousedown", inputEmail._preventFocus);
    inputEmail.addEventListener("focus", inputEmail._blurOnFocus);

    if (avatarUrl) avatarUrl.value = user?.avatar || "";

    // ===== عند فتح التعديل =====
    openEdit.addEventListener("click", () => {
      const curr = getCurrentUser() || {};
      if (inputName) inputName.value = curr.username || curr.name || "";
      if (avatarUrl) avatarUrl.value = curr.avatar || "";
      editSection.style.display = "";
      openEdit.style.display = "none";
    });

    cancelEdit.addEventListener("click", () => {
      editSection.style.display = "none";
      openEdit.style.display = "";
    });

    // ===== رفع صورة جديدة =====
    avatarFile.addEventListener("change", (e) => {
      const f = e.target.files && e.target.files[0];
      if (!f) return;
      const reader = new FileReader();
      reader.onload = function (ev) {
        if (avatar) {
          avatar.src = ev.target.result;
          avatar.style.display = "block";
        }
        if (avatarPlaceholder) avatarPlaceholder.style.display = "none";
        if (avatarUrl) avatarUrl.value = ev.target.result;
      };
      reader.readAsDataURL(f);
    });

    // ===== تحديث الصورة يدويًا =====
    if (avatarUrl) {
      avatarUrl.addEventListener("input", (e) => {
        const v = e.target.value.trim();
        if (v) {
          if (avatar) {
            avatar.src = v;
            avatar.style.display = "block";
          }
          if (avatarPlaceholder) avatarPlaceholder.style.display = "none";
        } else {
          if (avatar) avatar.style.display = "none";
          if (avatarPlaceholder) avatarPlaceholder.style.display = "flex";
        }
      });
    }

    // ===== حفظ الملف الشخصي =====
    profileForm.addEventListener("submit", (ev) => {
      ev.preventDefault();

      const name = inputName.value.trim();
      const email = inputEmail.value.trim();
      const pwd = inputPassword.value;
      const pwd2 = inputPasswordConfirm.value;

      if ((pwd || pwd2) && pwd !== pwd2) {
        alerts.toast("error", "Passwords do not match");
        return;
      }
      if (pwd && pwd.length > 0 && pwd.length < 6) {
        alerts.toast("warning", "Password must be at least 6 characters");
        return;
      }

      const u = getCurrentUser() || {};
      if (name) {
        u.name = name;
        u.username = name;
      }

      if (email && !inputEmail.readOnly) {
        u.email = email;
      }

      if (avatarUrl && avatarUrl.value) {
        u.avatar = avatarUrl.value;
      } else if (avatar && avatar.src) {
        u.avatar = avatar.src;
      }

      if (pwd) u.password = pwd;
      if (!u.joined) u.joined = new Date().toISOString().split("T")[0];

      saveCurrentUser(u);

      try {
        if (window.alerts && typeof window.alerts.toast === "function") {
          window.alerts.toast("success", "Profile updated");
        } else {
          showToast("Profile updated");
        }
      } catch (e) {
        showToast("Profile updated");
      }

      editSection.style.display = "none";
      openEdit.style.display = "";
      populateProfilePage();
    });
  }

  document.addEventListener("DOMContentLoaded", populateProfilePage);
})();
