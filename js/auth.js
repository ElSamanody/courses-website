// document.addEventListener("DOMContentLoaded", () => {
//   const loginBtnWrapper = document.getElementById("loginBtnWrapper");
//   const signupBtnWrapper = document.getElementById("signupBtnWrapper");
//   const userProfileWrapper = document.getElementById("userProfileWrapper");
//   const userAvatar = document.getElementById("userAvatar");
//   const userAvatarPlaceholder = document.getElementById(
//     "userAvatarPlaceholder"
//   );
//   const adminLinkWrapper = document.getElementById("adminLinkWrapper");
//   const logoutBtn = document.getElementById("logoutBtn");

//   function checkAuthStatus() {
//     const user = JSON.parse(localStorage.getItem("loggedInUser"));
//     const admin = JSON.parse(localStorage.getItem("loggedInAdmin"));
//     const loggedInEntity = user || admin;

//     if (loggedInEntity) {
//       // User or Admin is logged in
//       if (loginBtnWrapper) loginBtnWrapper.style.display = "none";
//       if (signupBtnWrapper) signupBtnWrapper.style.display = "none";
//       if (userProfileWrapper) userProfileWrapper.style.display = "block";

//       if (userAvatar) {
//         if (loggedInEntity.avatar) {
//           userAvatar.src = loggedInEntity.avatar;
//           userAvatar.style.display = "block";
//           if (userAvatarPlaceholder)
//             userAvatarPlaceholder.style.display = "none";
//         } else {
//           userAvatar.style.display = "none";
//           if (userAvatarPlaceholder) {
//             userAvatarPlaceholder.style.display = "flex";
//           }
//         }
//       }

//       if (admin && adminLinkWrapper) {
//         adminLinkWrapper.style.display = "block";
//       } else if (adminLinkWrapper) {
//         adminLinkWrapper.style.display = "none";
//       }
//     } else {
//       // No one is logged in
//       if (loginBtnWrapper) loginBtnWrapper.style.display = "block";
//       if (signupBtnWrapper) signupBtnWrapper.style.display = "block";
//       if (userProfileWrapper) userProfileWrapper.style.display = "none";
//       if (adminLinkWrapper) adminLinkWrapper.style.display = "none";
//     }
//   }

//   if (logoutBtn) {
//     logoutBtn.addEventListener("click", (e) => {
//       e.preventDefault();
//       localStorage.removeItem("loggedInUser");
//       localStorage.removeItem("loggedInAdmin");
//       window.location.replace("./login.html");
//     });
//   }

//   checkAuthStatus();

//   // Listen for custom event from profile page to update navbar
//   window.addEventListener("authChange", checkAuthStatus);
// });

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
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const admin = JSON.parse(localStorage.getItem("loggedInAdmin"));
    const loggedInEntity = user || admin;

    if (loggedInEntity) {
      // User or Admin is logged in
      if (loginBtnWrapper) loginBtnWrapper.style.display = "none";
      if (signupBtnWrapper) signupBtnWrapper.style.display = "none";
      if (userProfileWrapper) userProfileWrapper.style.display = "block";

      if (userAvatar) {
        if (loggedInEntity.avatar) {
          // ✅ عرض الصورة
          userAvatar.src = loggedInEntity.avatar;
          userAvatar.style.display = "block";
          userAvatar.style.width = "50px";
          userAvatar.style.height = "50px";
          userAvatar.style.borderRadius = "50%";
          userAvatar.style.objectFit = "cover";

          if (userAvatarPlaceholder) {
            userAvatarPlaceholder.style.display = "none";
          }
        } else {
          // ✅ لا توجد صورة → عرض الأيقونة فقط
          userAvatar.style.display = "none";
          if (userAvatarPlaceholder) {
            userAvatarPlaceholder.style.display = "flex";
          }
        }
      }

      if (admin && adminLinkWrapper) {
        adminLinkWrapper.style.display = "block";
      } else if (adminLinkWrapper) {
        adminLinkWrapper.style.display = "none";
      }
    } else {
      // No one is logged in
      if (loginBtnWrapper) loginBtnWrapper.style.display = "block";
      if (signupBtnWrapper) signupBtnWrapper.style.display = "block";
      if (userProfileWrapper) userProfileWrapper.style.display = "none";
      if (adminLinkWrapper) adminLinkWrapper.style.display = "none";
    }
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("loggedInAdmin");
      window.location.replace("./login.html");
    });
  }

  checkAuthStatus();

  // Listen for custom event from profile page to update navbar
  window.addEventListener("authChange", checkAuthStatus);
});
