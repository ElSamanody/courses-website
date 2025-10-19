(function () {
  // Helper: get/set current user in LocalStorage
  function getCurrentUser() {
    // Prefer admin session, then user session
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
    // Check if the user is an admin to save to the correct key
    const admin = JSON.parse(localStorage.getItem("loggedInAdmin") || "null");
    const key =
      admin && admin.email === user.email ? "loggedInAdmin" : "loggedInUser";
    localStorage.setItem(key, JSON.stringify(user));
  }

  function showToast(message) {
    if (typeof Notyf !== "undefined") {
      try {
        new Notyf().success(message);
        return;
      } catch (e) {
        /* ignore */
      }
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

  function populateProfilePage() {
    const user = getCurrentUser();
    const avatar = document.getElementById("profileAvatar");
    const displayName = document.getElementById("displayName");
    const displayEmail = document.getElementById("displayEmail");
    const displayJoined = document.getElementById("displayJoined");

    // Consistent avatar display logic
    if (avatar) {
      if (user && user.avatar) {
        avatar.src = user.avatar;
      } else {
        // In a real app, you might replace the img with an icon, but for simplicity, we use a placeholder image.
        // To show an icon, we would need a separate element.
        // For simplicity with the current structure, we use a placeholder.
        // A better approach is to have an icon element ready in HTML to toggle visibility.
        // For now, a placeholder URL is a simple fix.
        avatar.src = "https://via.placeholder.com/140x140.png?text=No+Image"; // Placeholder for profile page
        // As a fallback, you could show a generic placeholder image:
        // avatar.src = "https://via.placeholder.com/50x50.png?text=U";
        // If you add a placeholder icon element to profile.html like in the header,
        // you can toggle visibility here just like in auth.js
      }
    }
    // Use username field from signup, fallback to name field, then "Guest"
    if (displayName)
      displayName.textContent = user?.username || user?.name || "Guest";
    if (displayEmail) displayEmail.textContent = user?.email || "Not logged in";
    if (displayJoined)
      displayJoined.textContent = user?.joined ? "Joined: " + user.joined : "";

    // wire up form controls
    const avatarFile = document.getElementById("avatarFileInput");
    // avatarUrlInput may be commented out in the markup; query it and handle null gracefully
    const avatarUrl = document.getElementById("avatarUrlInput");
    const openEdit = document.getElementById("openEditBtn");
    const editSection = document.getElementById("editSection");
    const profileForm = document.getElementById("profileForm");
    const inputName = document.getElementById("inputName");
    const inputEmail = document.getElementById("inputEmail");
    // `inputAvatarUrl` was removed from the markup; use `avatarUrl` element instead as the
    // field that holds either an external URL or a dataURL created from file uploads.
    const inputPassword = document.getElementById("inputPassword");
    const inputPasswordConfirm = document.getElementById(
      "inputPasswordConfirm"
    );
    const cancelEdit = document.getElementById("cancelEditBtn");

    if (!profileForm) return; // nothing to wire (not on profile page)

    inputName.value = user?.username || user?.name || "";
    inputEmail.value = user?.email || "";
    inputEmail.readOnly = true; // enforce read-only
    inputEmail.tabIndex = -1; // make it non-focusable via tab
    inputEmail.style.cursor = "text"; // show text cursor for copying
    inputEmail.style.backgroundColor = "#f8f9fa"; // subtle background to indicate read-only
    inputEmail.title = "Email cannot be edited (click to copy)"; // tooltip

    // Prevent focus when clicking on email field
    inputEmail._preventFocus = (e) => e.preventDefault();
    inputEmail._blurOnFocus = (e) => e.target.blur();
    inputEmail.addEventListener("mousedown", inputEmail._preventFocus);
    inputEmail.addEventListener("focus", inputEmail._blurOnFocus);
    // populate the visible avatar URL input (may hold a dataURL from prior upload)
    if (avatarUrl) avatarUrl.value = user?.avatar || "";

    openEdit.addEventListener("click", () => {
      // refresh fields from the latest stored user when opening the edit form
      try {
        const curr = getCurrentUser() || {};
        if (inputEmail) {
          inputEmail.value = curr.email || "";
          inputEmail.readOnly = true; // enforce read-only in case attribute was changed elsewhere
          inputEmail.tabIndex = -1; // make it non-focusable via tab
          inputEmail.style.cursor = "text"; // show text cursor for copying
          inputEmail.style.backgroundColor = "#f8f9fa"; // subtle background to indicate read-only
          inputEmail.title = "Email cannot be edited (click to copy)"; // tooltip

          // Remove existing event listeners to avoid duplicates
          inputEmail.removeEventListener("mousedown", inputEmail._preventFocus);
          inputEmail.removeEventListener("focus", inputEmail._blurOnFocus);

          // Add event listeners to prevent focus
          inputEmail._preventFocus = (e) => e.preventDefault();
          inputEmail._blurOnFocus = (e) => e.target.blur();
          inputEmail.addEventListener("mousedown", inputEmail._preventFocus);
          inputEmail.addEventListener("focus", inputEmail._blurOnFocus);
        }
        if (inputName) inputName.value = curr.username || curr.name || "";
        if (avatarUrl) avatarUrl.value = curr.avatar || "";
      } catch (e) {}
      editSection.style.display = "";
      openEdit.style.display = "none"; // Hide edit button when form is open
    });
    cancelEdit.addEventListener("click", () => {
      editSection.style.display = "none";
      openEdit.style.display = ""; // Show edit button again
      // No need to manually reset fields, they will be repopulated if edit is clicked again
    });

    avatarFile.addEventListener("change", (e) => {
      const f = e.target.files && e.target.files[0];
      if (!f) return;
      const reader = new FileReader();
      reader.onload = function (ev) {
        if (avatar) avatar.src = ev.target.result;
        // store data URL in the avatarUrl input so the save handler picks it up
        if (avatarUrl) avatarUrl.value = ev.target.result;
      };
      reader.readAsDataURL(f);
    });

    if (avatarUrl) {
      avatarUrl.addEventListener("input", (e) => {
        const v = e.target.value.trim();
        if (avatar) avatar.src = v || "./image/logo/Icon Container.png";
      });
    }

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
        u.username = name; // Keep both fields in sync for compatibility
      }
      // only overwrite email if the input is enabled (editable). If the field is disabled
      // keep the existing stored email to prevent accidental changes.
      try {
        const emailInput = document.getElementById("inputEmail");
        // when the field is readonly we should not overwrite the stored email. Use the
        // readOnly property to check editability.
        if (emailInput && !emailInput.readOnly && email) u.email = email;
        else if (!u.email && email) u.email = email; // allow seed when no email exists
      } catch (e) {}
      // read avatar value from the visible avatarUrl input (may be dataURL or URL)
      if (avatarUrl && avatarUrl.value) {
        u.avatar = avatarUrl.value;
      } else if (avatar && avatar.src) {
        // fallback: if there's no avatarUrl input (or it's empty), persist the current
        // preview image src (this will be a dataURL after upload or an existing URL)
        u.avatar = avatar.src;
      }
      if (pwd) u.password = pwd; // NOTE: plain text in LocalStorage for demo
      if (!u.joined) u.joined = new Date().toISOString().split("T")[0];

      saveCurrentUser(u);
      // notify
      // prefer the custom alerts.toast, fallback to the small DOM toast used elsewhere
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
      // reflect updates in page
      populateProfilePage();
      // Dispatch a custom event that auth.js can listen to
      window.dispatchEvent(new CustomEvent("authChange"));
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    populateProfilePage();
  });
})();
