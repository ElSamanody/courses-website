// Public-facing course renderer that reads from admin store in localStorage
(function () {
  function getStore() {
    try {
      return (
        JSON.parse(localStorage.getItem("courses_admin_store_v1")) || {
          courses: [],
        }
      );
    } catch (e) {
      return { courses: [] };
    }
  }

  function isSubscribed() {
    const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    if (!user || !user.subscription) return false;
    if (user.subscription.type === "free") return true;
    const expires = new Date(user.subscription.expires);
    return expires > new Date();
  }

  function renderPublicCourses() {
    const container =
      document.querySelector("#courses-section .cards-courses .row") ||
      document.querySelector("#courses-section .courses .row");
    if (!container) return;
    const store = getStore();
    container.innerHTML = "";
    store.courses.forEach((c) => {
      // default visibility true when undefined
      const visible = typeof c.visible === "boolean" ? c.visible : true;
      if (!visible) return;
      const col = document.createElement("div");
      col.className = "col-md-6 col-sm-12 d-flex";
      col.innerHTML = `
        <div class="card border-0 d-flex w-100">
          <div class="image-card overflow-hidden rounded">
            <img src="${
              c.image || "./image/courses/default.jpg"
            }" class="card-img-top" alt="image course">
          </div>
          <div class="course-details d-flex flex-column flex-md-row gap-3 justify-content-between align-items-start align-items-md-center p-3">
            <div class="info d-flex  justify-content-between gap-2">
              <div class="course-duration">
                <span class="p-2 border border-1 rounded-3">${
                  c.duration || ""
                }</span>
              </div>
              <div class="course-level ">
                <span class="p-2 border border-1 rounded-3">${
                  c.level || ""
                }</span>
              </div>
            </div>
            <div class="instructor">
              <span class="fw-medium fs-5">By ${c.instructor || "Staff"}</span>
            </div>
          </div>
          <div class="card-body d-flex flex-column ">
            <h5 class="card-title">${c.title}</h5>
            <p class="card-text">${c.description || ""}</p>
            <div class="d-flex gap-2 mt-auto">
              ${
                c.priceType === "paid"
                  ? `<button class="btn btn-primary buy-course" data-id="${c.id}">Buy Course ($${c.price})</button>`
                  : `<button class="btn btn-success join-free" data-id="${c.id}">Join Free Plan</button>`
              }
              <button class="btn btn-outline-secondary subscribe-monthly" data-id="${
                c.id
              }">Join Monthly Plan</button>
              <button class="btn btn-outline-secondary subscribe-annual" data-id="${
                c.id
              }">Join Annual Plan</button>
            </div>
          </div>
        </div>
      `;
      container.appendChild(col);
    });
    bindButtons();
  }

  function bindButtons() {
    document.querySelectorAll(".buy-course").forEach((b) =>
      b.addEventListener("click", (e) => {
        const id = Number(e.target.dataset.id);
        if (!isSubscribed()) {
          alerts.toast(
            "warning",
            "This is a paid course. Please subscribe to access it."
          );
          return;
        }
        // open course details — in this simple demo we'll just redirect to courses page anchor
        location.href = "./courses.html#course-" + id;
      })
    );

    document.querySelectorAll(".join-free").forEach((b) =>
      b.addEventListener("click", (e) => {
        const id = Number(e.target.dataset.id);
        const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");
        if (!user) {
          alerts.toast("warning", "Please login or sign up to enroll");
          return;
        }
        // enroll user in course
        user.enrolled = user.enrolled || [];
        if (!user.enrolled.includes(id)) user.enrolled.push(id);
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alerts.toast("success", "Enrolled in free course");
      })
    );

    document.querySelectorAll(".subscribe-monthly").forEach((b) =>
      b.addEventListener("click", (e) => {
        const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");
        if (!user) {
          alerts.toast("warning", "Please login to subscribe");
          return;
        }
        const expires = new Date();
        expires.setMonth(expires.getMonth() + 1);
        user.subscription = {
          type: "paid",
          plan: "monthly",
          expires: expires.toISOString(),
        };
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alerts.toast("success", "Subscribed to monthly plan");
      })
    );

    document.querySelectorAll(".subscribe-annual").forEach((b) =>
      b.addEventListener("click", (e) => {
        const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");
        if (!user) {
          alerts.toast("warning", "Please login to subscribe");
          return;
        }
        const expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1);
        user.subscription = {
          type: "paid",
          plan: "annual",
          expires: expires.toISOString(),
        };
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alerts.toast("success", "Subscribed to annual plan");
      })
    );
  }

  // init on DOM ready
  document.addEventListener("DOMContentLoaded", function () {
    renderPublicCourses();
  });
})();
