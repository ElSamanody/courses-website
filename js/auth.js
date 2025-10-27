document.addEventListener("DOMContentLoaded", () => {
  const loginBtnWrapper = document.getElementById("loginBtnWrapper");
  const signupBtnWrapper = document.getElementById("signupBtnWrapper");
  const userProfileWrapper = document.getElementById("userProfileWrapper");
  const userAvatar = document.getElementById("userAvatar");
  const userAvatarPlaceholder = document.getElementById(
    "userAvatarPlaceholder"
  );
  const adminLinkWrapper = document.getElementById("adminLinkWrapper");
  const logoutBtn = document.getElementById("logoutBtn");

  function checkAuthStatus() {
    let user = null;
    let admin = null;

    try {
      user = JSON.parse(localStorage.getItem("loggedInUser"));
      admin = JSON.parse(localStorage.getItem("loggedInAdmin"));
    } catch (e) {}

    const loggedInEntity = user || admin;

    if (loggedInEntity) {
      // show user button and disable buttons login, sign up
      if (loginBtnWrapper) loginBtnWrapper.style.display = "none";
      if (signupBtnWrapper) signupBtnWrapper.style.display = "none";
      if (userProfileWrapper) userProfileWrapper.style.display = "block";

      // photo profile or icon default
      if (userAvatar && userAvatarPlaceholder) {
        const avatarSrc = loggedInEntity.avatar?.trim();

        if (avatarSrc) {
          const img = new Image();
          img.src = avatarSrc;

          img.onload = () => {
            userAvatar.src = avatarSrc;
            userAvatar.style.display = "block";
            userAvatarPlaceholder.style.display = "none";
          };

          img.onerror = () => {
            userAvatar.style.display = "none";
            userAvatarPlaceholder.style.display = "flex";
          };
        } else {
          userAvatar.style.display = "none";
          userAvatarPlaceholder.style.display = "flex";
        }
      }

      // if login admin show btn admin dashboard
      if (admin && adminLinkWrapper) {
        adminLinkWrapper.style.display = "block";
      } else if (adminLinkWrapper) {
        adminLinkWrapper.style.display = "none";
      }
    } else {
      if (loginBtnWrapper) loginBtnWrapper.style.display = "block";
      if (signupBtnWrapper) signupBtnWrapper.style.display = "block";
      if (userProfileWrapper) userProfileWrapper.style.display = "none";
      if (adminLinkWrapper) adminLinkWrapper.style.display = "none";
      if (userAvatarPlaceholder) userAvatarPlaceholder.style.display = "none";
    }
  }

  // logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("loggedInAdmin");
      window.dispatchEvent(new CustomEvent("authChange"));
      window.location.replace("./login.html");
    });
  }

  // render first load and update
  checkAuthStatus();
  window.addEventListener("authChange", checkAuthStatus);
});
