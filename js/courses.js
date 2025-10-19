document.addEventListener("DOMContentLoaded", () => {
  // ---------- Navbar active links ----------
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) link.classList.add("active");
  });

  // ---------- Curriculum numbering ----------
  const section = document.getElementById("courses-section");
  if (!section) return;
  const originalSectionHTML = section.innerHTML;
  const coursesPageURL = location.pathname;

  // Merge courses from admin Local Storage store
  let mergedCourses = { ...(window.courses || {}) };
  try {
    const storeRaw = localStorage.getItem("courses_admin_store_v1");
    if (storeRaw) {
      const store = JSON.parse(storeRaw);
      if (store && Array.isArray(store.courses)) {
        store.courses.forEach((c) => {
          const key = c.key || `c-${c.id}`; // Ensure a unique key
          mergedCourses[key] = { ...c, key: key };
        });
      }
    }
  } catch (e) {
    console.error("Failed to load courses from admin store", e);
  }

  // Helper to display price or "Free"
  function getPriceDisplay(course) {
    if (course.priceType === "free" || !course.price || course.price <= 0) {
      return `<span class="text-success fw-bold">Free</span>`;
    }
    // Format as currency
    return `$${Number(course.price).toFixed(2)}`;
  }

  // ---------- Render Courses List ----------
  function renderCoursesList() {
    const containerRow = section.querySelector(".courses .row");
    if (!containerRow) return;
    containerRow.innerHTML = ""; // Clear existing static content

    // Filter out invisible courses and then render
    const visibleCourses = Object.values(mergedCourses).filter(
      (c) => c.visible !== false
    );

    visibleCourses.forEach((course) => {
      const col = document.createElement("div");
      col.className = "col-12";
      col.setAttribute("data-aos", "zoom-in");

      col.innerHTML = `
        <div class="course-header p-5 rounded-3">
          <div class="info flex-column flex-md-row d-flex justify-content-between mb-4">
            <div class="title w-75 m-0">
              <h3 class="fw-bold">${course.title}</h3>
              <p>${course.description}</p>
            </div>
            <div class="view d-flex align-items-center">
              <button class="btn btn-secondary btn-secondary-custom p-3 btn-view-course" data-course="${
                course.key
              }">
                view course
              </button>
            </div>
          </div>
          <div class="images d-flex">
            <div class="row gy-3 w-100">
              ${(course.images || [course.image || ""])
                .slice(0, 3) // Ensure max 3 images
                .map(
                  (img) => `
                <div class="col-4">
                  <div class="image-course overflow-hidden rounded-3">
                    <img src="${
                      img ||
                      "https://via.placeholder.com/400x250.png?text=No+Image"
                    }" alt="image course" style="height: 150px; width: 100%; object-fit: cover;">
                  </div>
                </div>`
                )
                .join("")}
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
                <div class="price fw-bold fs-5">${getPriceDisplay(course)}</div>
              </div>
            </div>
          </div>
          <div class="row Curriculum mt-3 rounded-3 border border-1">
            <div class="col-12 px-0">
              <h3 class="fw-semibold p-3 border border-1 border-top-0 border-end-0 border-start-0">
                Curriculum
              </h3>
            </div>
            <div class="course-Curriculum d-flex flex-column flex-md-row justify-content-between px-4">
              ${(course.curriculum || [])
                .slice(0, 5) // Ensure max 5 lessons
                .map(
                  (item, index) => `
                  <div class="details position-relative">
                    <span class="number">${(index + 1)
                      .toString()
                      .padStart(2, "0")}</span>
                    <h5 class="fw-medium m-0">
                      ${item.section || item.title || "Lesson"}
                    </h5>
                  </div>
                `
                )
                .join("")}
            </div>
          </div>
        </div>
      `;
      containerRow.appendChild(col);
    });
    bindCourseButtons();
  }

  renderCoursesList();

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
          <div class="row g-4">
            <div class="col-sm-12 col-md-6 col-lg-6 d-flex align-items-center" data-aos="fade-down" data-aos-duration="1000">
              <h1 class="fw-semibold">${course.title}</h1>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6" data-aos="fade-up" data-aos-duration="1000">
              <h5>${course.description}</h5>
            </div>
          </div>
        </div>
        <div class="row g-3">
    `;
    course.curriculum.forEach((block, sectionIndex) => {
      const sectionNumber = (sectionIndex + 1).toString().padStart(2, "0");
      html += `
        <div class="col-sm-12 col-md-6 col-lg-6 d-flex">
          <div class="card border-0 rounded-3 gap-3 h-100 w-100 position-relative">
            <span class="number">${sectionNumber}</span>
            <div class="title">
              <h3 class="fw-semibold">${block.section}</h3>
            </div>
      `;
      html += block.lessons
        .map(
          (lesson, i) => `
        <div class="curriculum-item border border-1 p-3 rounded-3">
          <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 w-100">
            <div class="lesson-title d-flex flex-column gap-3">
              <p class="m-0 fw-medium">${lesson.title}</p>
              <span>Lesson ${(i + 1).toString().padStart(2, "0")}</span>
            </div>
            <div class="course-duration p-2 rounded-3 flex-shrink-0">
              <span class="d-flex gap-2 align-items-center">
                <i class="fa-regular fa-clock"></i>
                ${lesson.duration}
              </span>
            </div>
          </div>
        </div>
      `
        )
        .join("");
      html += `</div></div>`;
    });
    html += `
        </div>
        <div class="row mt-4">
          <div class="col-12 d-flex">
            <button class="btn btn-outline-secondary btn-back-courses">← Back to courses</button>
          </div>
        </div>
      </div>`;
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
      section.innerHTML = originalSectionHTML;
      renderCoursesList(); // Re-render the list
      setActiveByCurrentPage();
      refreshAOS();
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
