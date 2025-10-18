document.addEventListener("DOMContentLoaded", () => {
  // ---------- Navbar active links ----------
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) link.classList.add("active");
  });

  // ---------- Sign up / Login / Logout ----------
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

  // ---------- Curriculum numbering ----------
  const allCurriculums = document.querySelectorAll(".course-Curriculum");
  allCurriculums.forEach((curriculum) => {
    const details = curriculum.querySelectorAll(".details");
    details.forEach((element, index) => {
      const number = document.createElement("span");
      number.classList.add("number");
      number.textContent = (index + 1).toString().padStart(2, "0");
      element.insertBefore(number, element.firstChild);
    });
  });

  // ---------- Courses Section ----------
  const section = document.getElementById("courses-section");
  if (!section) return;
  const originalSectionHTML = section.innerHTML;
  const coursesPageURL = location.pathname + location.search; // store original courses page

  // Merge courses from admin Local Storage store
  let mergedCourses = { ...(window.courses || {}) };
  try {
    const storeRaw = localStorage.getItem("courses_admin_store_v1");
    if (storeRaw) {
      const store = JSON.parse(storeRaw);
      if (store && Array.isArray(store.courses)) {
        store.courses.forEach((c) => {
          const key = c.key || `c-${c.id}`;
          mergedCourses[key] = {
            title: c.title || c.key || key,
            description: c.description || "",
            image:
              (c.images && c.images[0]) ||
              c.image ||
              "./cover-details-course/default.jpg",
            curriculum: c.curriculum || [],
            duration: c.duration || "",
            level: c.level || "",
            instructor: c.instructor || "",
          };
        });
      }
    }
  } catch (e) {
    console.error("Failed to load courses from admin store", e);
  }

  // ---------- Render Courses List ----------
  function renderCoursesList() {
    const containerRow = section.querySelector(".courses .row");
    if (!containerRow) return;
    containerRow.innerHTML = "";
    Object.keys(mergedCourses).forEach((k) => {
      const course = mergedCourses[k];
      const col = document.createElement("div");
      col.className = "col-12";
      col.setAttribute("data-aos", "zoom-in");

      const imagesHTML = course.images
        .map(
          (img) => `
          <div class= "col-4">
            <div class= "image-course ovwerflow-hidden rounded-3">
              <img src="${img}" alt="image course">
            <div/>
          </div>
        `
        )
        .join("");
      col.innerHTML = `
        <div class="course-header p-5 rounded-3">
          <div class="info flex-column flex-md-row d-flex justify-content-between mb-4">
            <div class="title w-75 m-0">
              <h3 class="fw-bold">${course.title}</h3>
              <p>${course.description || ""}</p>
            </div>
            <div class="view d-flex align-items-center">
              <button class="btn btn-secondary btn-secondary-custom p-3" data-course="${k}">view course</button>
            </div>
          </div>
          <div class="images d-flex">
            <div class="row gy-3">
              <div class="col-4">
                <div class="image-course overflow-hidden rounded-3">
                  <img src="${course.image}" alt="image course">
                </div>
              </div>
              <div class="col-4">
                <div class="image-course overflow-hidden rounded-3">
                  <img src="${course.image}" alt="image course">
                </div>
              </div>
              <div class="col-4">
                <div class="image-course overflow-hidden rounded-3">
                  <img src="${course.image}" alt="image course">
                </div>
              </div>
              <div class="course-details d-flex flex-column flex-md-row gap-3 justify-content-between align-items-start align-items-md-center p-3">
                <div class="info d-flex  justify-content-between gap-2">
                  <div class="course-duration"><span class="p-2 border border-1 rounded-3">${
                    course.duration || ""
                  }</span></div>
                  <div class="course-level "><span class="p-2 border border-1 rounded-3">${
                    course.level || ""
                  }</span></div>
                </div>
                <div class="instructor"><span class="fw-medium fs-5">By ${
                  course.instructor || ""
                }</span></div>
              </div>
            </div>
          </div>
        </div>
      `;
      containerRow.appendChild(col);
    });
    bindCourseButtons();
    reNumberCards();
  }

  window.renderPublicCourses = renderCoursesList;
  window.renderPublicCourses();

  history.replaceState(
    { view: "list" },
    "",
    location.pathname + location.search
  );

  // ---------- Helpers ----------
  function setCoursesNavActive() {
    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      link.classList.toggle("active", href.includes("courses"));
    });
  }

  function setActiveByCurrentPage() {
    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === currentPage
      );
    });
  }

  function refreshAOS() {
    if (window.AOS && typeof window.AOS.refresh === "function")
      window.AOS.refresh();
  }

  function reNumberCards() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
      let number = card.querySelector(".number");
      if (!number) {
        number = document.createElement("span");
        number.classList.add("number");
        card.appendChild(number);
      }
      number.textContent = (index + 1).toString().padStart(2, "0");
    });
  }

  // ---------- Course Detail Builder ----------
  function buildCourseHTML(course) {
    let html = `
      <div class="container">
        <div class="start-message">
          <h1 class="fw-semibold">${course.title}</h1>
          <h5>${course.description}</h5>
        </div>
        <div class="col-12 image mb-5">
          <img src="${course.image}" alt="image course" class="w-100" style="max-height:450px; object-fit:fill; overflow: hidden; border-radius: 20px;">
        </div>
    `;
    course.curriculum.forEach((block, sectionIndex) => {
      html += `<div class="card mb-3 p-3"><h3>${block.section}</h3>`;
      block.lessons.forEach((lesson, i) => {
        html += `<p>${i + 1}. ${lesson.title} (${lesson.duration})</p>`;
      });
      html += `</div>`;
    });
    html += `<button class="btn btn-outline-secondary btn-back-courses">← Back to courses</button></div>`;
    return html;
  }

  function showCourse(courseKey, pushHistory = true) {
    const course = mergedCourses[courseKey];
    if (!course) return;
    section.innerHTML = buildCourseHTML(course);
    setCoursesNavActive();

    const backBtn = section.querySelector(".btn-back-courses");
    if (backBtn) {
      backBtn.addEventListener("click", (ev) => {
        ev.preventDefault();
        location.href = coursesPageURL; // always go back to courses page
      });
    }

    refreshAOS();

    if (pushHistory)
      history.pushState(
        { view: "course", key: courseKey },
        "",
        "#course-" + courseKey
      );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function bindCourseButtons() {
    document.querySelectorAll("[data-course]").forEach((el) => {
      if (el.dataset.bound === "1") return;
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const courseKey = el.getAttribute("data-course");
        if (!courseKey) return;
        showCourse(courseKey, true);
      });
      el.dataset.bound = "1";
    });
  }

  // ---------- Popstate ----------
  window.addEventListener("popstate", (event) => {
    const state = event.state;
    if (!state || state.view === "list") {
      location.href = coursesPageURL; // always return to courses page
    } else if (state.view === "course" && state.key) {
      showCourse(state.key, false);
    }
  });

  // ---------- Direct hash navigation ----------
  if (location.hash.startsWith("#course-")) {
    const courseKey = location.hash.replace("#course-", "");
    showCourse(courseKey, false);
  }

  bindCourseButtons();
  reNumberCards();
  setActiveByCurrentPage();
});
