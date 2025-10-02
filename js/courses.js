document.addEventListener("DOMContentLoaded", () => {
  // nav-link active
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) link.classList.add("active");
  });

  // 2️⃣ التحكم في أزرار Sign up / Login / Logout
  const loginBtn = document.querySelector('a[href="./login.html"]');
  const signupBtn = document.querySelector('a[href="./sign-up.html"]');
  const logoutBtn = document.getElementById("logoutBtn");

  function checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
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
      window.location.replace("./login.html");
    });
  }

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

  const section = document.getElementById("courses-section");
  if (!section) {
    return;
  }
  const originalSectionHTML = section.innerHTML;

  history.replaceState(
    { view: "list" },
    "",
    location.pathname + location.search + location.hash
  );

  // Helpers
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
        <div class="col-12 image mb-5">
          <img src="${course.image}" alt="image course" class="w-100" style="max-height:450px; object-fit:fill; overflow: hidden; border-radius: 20px;">
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
    const course = courses[courseKey];
    if (!course) return;
    section.innerHTML = buildCourseHTML(course);
    setCoursesNavActive();

    // button back
    const backBtn = section.querySelector(".btn-back-courses");
    if (backBtn) {
      backBtn.addEventListener("click", (ev) => {
        ev.preventDefault();
        section.innerHTML = originalSectionHTML;
        bindCourseButtons();
        reNumberCards();
        setActiveByCurrentPage();
        history.pushState(
          { view: "list" },
          "",
          location.pathname + location.search
        );
        refreshAOS();
        window.scrollTo({ top: 0, behavior: "smooth" });
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

  // عند الضغط على Back (history)
  window.addEventListener("popstate", (event) => {
    const state = event.state;
    if (!state || state.view === "list") {
      section.innerHTML = originalSectionHTML;
      bindCourseButtons();
      reNumberCards();
      setActiveByCurrentPage();
      refreshAOS();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (state.view === "course" && state.key) {
      showCourse(state.key, false);
    }
  });

  document.querySelectorAll("[data-course-list]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      section.innerHTML = originalSectionHTML;
      bindCourseButtons();
      reNumberCards();
      setActiveByCurrentPage();
      history.pushState(
        { view: "list" },
        "",
        location.pathname + location.search
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // valdation
  if (location.hash.startsWith("#course-")) {
    const courseKey = location.hash.replace("#course-", "");
    showCourse(courseKey, false);
  }

  bindCourseButtons();
  reNumberCards();
  setActiveByCurrentPage();
});
