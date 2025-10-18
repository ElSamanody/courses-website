// Admin dashboard logic with Local Storage persistence
// Clean single-file implementation

const STORE_KEY = "courses_admin_store_v1";
const notyf =
  typeof Notyf !== "undefined"
    ? new Notyf()
    : { success: () => {}, error: () => {} };

const defaultData = {
  courses: [
    {
      id: 1,
      title: "Web Design Fundamentals",
      description:
        "Learn the fundamentals of web design, including HTML, CSS, and responsive design principles. Develop the skills to create visually appealing and user-friendly websites.",
      price: 0,
      priceType: "free",
      key: "web-design",
      images: [
        "./courses image/image 1.png",
        "./courses image/image 2.png",
        "./courses image/image 3.png",
      ],
      category: "Web Design",
      instructor: "John Smith",
      duration: "4 Weeks",
      level: "Beginner",
      visible: true,
      curriculum: [
        {
          section: "Introduction to HTML",
          lessons: [
            { title: "HTML Basics and Structure", duration: "45 Minutes" },
            {
              title: "Working with Text, Links, and Images",
              duration: "1 Hour",
            },
            { title: "Creating Lists and Tables", duration: "45 Minutes" },
          ],
        },
        {
          section: "Styling with CSS",
          lessons: [
            { title: "CSS Selectors and Properties", duration: "1 Hour" },
            { title: "Colors, Fonts, and Backgrounds", duration: "45 Minutes" },
            { title: "Box Model and Layout", duration: "1 Hour" },
          ],
        },
        {
          section: "Responsive Design",
          lessons: [
            {
              title: "Introduction to Responsive Design",
              duration: "45 Minutes",
            },
            { title: "Using Media Queries", duration: "1 Hour" },
            { title: "Flexible Grids and Images", duration: "45 Minutes" },
          ],
        },
        {
          section: "Design Principles",
          lessons: [
            { title: "Typography Basics", duration: "45 Minutes" },
            { title: "Color Theory for Web", duration: "1 Hour" },
            { title: "Visual Hierarchy", duration: "45 Minutes" },
          ],
        },
        {
          section: "Project",
          lessons: [{ title: "Build a Basic Website", duration: "2 Hours" }],
        },
      ],
      students: 120,
      created: "2025-09-05",
    },
    {
      id: 2,
      title: "UI/UX Design Course",
      description:
        "Master the art of creating intuitive user interfaces (UI) and enhancing user experiences (UX). Learn design principles, wireframing, prototyping, and usability testing techniques.",
      price: 0,
      priceType: "free",
      key: "uiux",
      images: [
        "./courses image/ui-ux.png",
        "./courses image/ui-ux 2.png",
        "./courses image/ui-ux 3.png",
      ],
      category: "Design",
      instructor: "David Brown",
      duration: "8 Weeks",
      level: "Intermediate",
      visible: true,
      curriculum: [
        {
          section: "Introduction to UI/UX Design",
          lessons: [
            { title: "Understanding UI/UX Principles", duration: "45 Minutes" },
            { title: "User-Centered Design", duration: "1 Hour" },
            {
              title: "Role of UI/UX in Product Development",
              duration: "45 Minutes",
            },
          ],
        },
        {
          section: "User Research and Personas",
          lessons: [
            { title: "Conducting Research & Interviews", duration: "1 Hour" },
            { title: "Analyzing User Needs", duration: "1 Hour" },
            { title: "Creating Personas & Scenarios", duration: "45 Minutes" },
          ],
        },
        {
          section: "Wireframing and Prototyping",
          lessons: [
            { title: "Wireframing Tools", duration: "45 Minutes" },
            { title: "Low-Fidelity Wireframes", duration: "1 Hour" },
            { title: "Interactive Prototypes", duration: "1 Hour" },
          ],
        },
        {
          section: "Visual Design and Branding",
          lessons: [
            { title: "Brand Identity Basics", duration: "45 Minutes" },
            { title: "Layouts and Hierarchy", duration: "1 Hour" },
            { title: "Colors and Typography", duration: "1 Hour" },
          ],
        },
        {
          section: "Usability Testing",
          lessons: [
            { title: "Testing Methods", duration: "45 Minutes" },
            { title: "Analyzing Test Results", duration: "1 Hour" },
            { title: "Iteration and Improvements", duration: "45 Minutes" },
          ],
        },
      ],
      students: 85,
      created: "2025-10-02",
    },
    {
      id: 3,
      title: "Mobile App Development",
      description:
        "Dive into mobile app development. Learn to build native iOS and Android applications using frameworks like Swift and Kotlin.",
      price: 0,
      priceType: "free",
      key: "mobile-dev",
      images: [
        "./courses image/mobile.png",
        "./courses image/mobile 2.png",
        "./courses image/mobile 3.png",
      ],
      category: "Mobile Development",
      instructor: "David Brown",
      duration: "8 Weeks",
      level: "Intermediate",
      visible: true,
      curriculum: [
        {
          section: "Getting Started",
          lessons: [
            { title: "Introduction to Mobile Apps", duration: "30 Minutes" },
            { title: "Setting up Development Environment", duration: "1 Hour" },
          ],
        },
        {
          section: "Swift Programming (iOS)",
          lessons: [
            { title: "Swift Basics", duration: "1 Hour" },
            { title: "UI with SwiftUI", duration: "1 Hour" },
          ],
        },
        {
          section: "Kotlin Programming (Android)",
          lessons: [
            { title: "Kotlin Fundamentals", duration: "1 Hour" },
            { title: "Building Android UI", duration: "1 Hour" },
          ],
        },
        {
          section: "UI/UX in Apps",
          lessons: [
            { title: "Designing User-Friendly Apps", duration: "1 Hour" },
            { title: "Handling User Inputs", duration: "45 Minutes" },
          ],
        },
        {
          section: "Deployment",
          lessons: [
            { title: "Testing Mobile Apps", duration: "1 Hour" },
            { title: "Publishing Apps", duration: "45 Minutes" },
          ],
        },
      ],
      students: 95,
      created: "2025-10-15",
    },
    {
      id: 4,
      title: "Graphic Design for Beginners",
      description:
        "Discover the basics of graphic design: typography, color theory, layout, and image manipulation techniques for digital and print.",
      price: 0,
      priceType: "free",
      key: "graphic-design",
      images: [
        "./courses image/graphic.png",
        "./courses image/graphic 1.png",
        "./courses image/graphic 2.png",
      ],
      category: "Design",
      instructor: "Sarah Thompson",
      duration: "10 Weeks",
      level: "Beginner",
      visible: true,
      curriculum: [
        {
          section: "Introduction to Design",
          lessons: [
            { title: "What is Graphic Design?", duration: "30 Minutes" },
            { title: "Design Tools Overview", duration: "1 Hour" },
          ],
        },
        {
          section: "Typography & Colors",
          lessons: [
            { title: "Typography Basics", duration: "1 Hour" },
            { title: "Color Theory", duration: "1 Hour" },
          ],
        },
        {
          section: "Layouts",
          lessons: [
            { title: "Principles of Layout", duration: "1 Hour" },
            { title: "Grid Systems", duration: "45 Minutes" },
          ],
        },
        {
          section: "Image Editing",
          lessons: [
            { title: "Basics of Photoshop", duration: "1 Hour" },
            { title: "Image Manipulation", duration: "45 Minutes" },
          ],
        },
        {
          section: "Project",
          lessons: [
            {
              title: "Designing for Digital & Print Media",
              duration: "2 Hours",
            },
          ],
        },
      ],
      students: 110,
      created: "2025-11-01",
    },
    {
      id: 5,
      title: "Front-End Web Development",
      description:
        "Learn HTML, CSS, JavaScript, and frameworks like Bootstrap & React to build modern, responsive, and interactive websites.",
      price: 0,
      priceType: "free",
      key: "frontend-dev",
      images: [
        "./courses image/front end 1.png",
        "./courses image/front end 2.png",
        "./courses image/front end 3.png",
      ],
      category: "Web Development",
      instructor: "Michael Adams",
      duration: "10 Weeks",
      level: "Intermediate",
      visible: true,
      curriculum: [
        {
          section: "HTML",
          lessons: [
            { title: "HTML Fundamentals", duration: "1 Hour" },
            { title: "Forms and Inputs", duration: "45 Minutes" },
          ],
        },
        {
          section: "CSS",
          lessons: [
            { title: "CSS Basics", duration: "1 Hour" },
            { title: "Flexbox and Grid", duration: "1 Hour" },
          ],
        },
        {
          section: "JavaScript",
          lessons: [
            { title: "JavaScript Basics", duration: "1 Hour" },
            { title: "DOM Manipulation", duration: "1 Hour" },
          ],
        },
        {
          section: "Responsive Websites",
          lessons: [
            { title: "Media Queries", duration: "45 Minutes" },
            { title: "Mobile First Design", duration: "45 Minutes" },
          ],
        },
        {
          section: "Frameworks",
          lessons: [
            { title: "Bootstrap Basics", duration: "1 Hour" },
            { title: "React Fundamentals", duration: "1 Hour" },
          ],
        },
      ],
      students: 150,
      created: "2025-11-10",
    },
  ],
  students: [
    { id: 1, name: "Ali Hassan", email: "ali@example.com", enrolled: [1] },
    {
      id: 2,
      name: "Sara Ibrahim",
      email: "sara@example.com",
      enrolled: [1, 2],
    },
  ],
  enrollments: [
    {
      id: 1,
      studentId: 1,
      courseId: 1,
      date: "2025-10-10",
      status: "completed",
    },
    { id: 2, studentId: 2, courseId: 2, date: "2025-10-12", status: "pending" },
  ],
  admins: [
    {
      id: 1,
      name: "Elsayed (seed)",
      // Seeded super-admin for local testing
      email: "elsayed@gmail.com",
      // Password stored as plaintext for local testing — DO NOT use in production.
      password: "1234567890",
      perms: { add: true, edit: true },
    },
  ],
  notifications: {
    courses: [],
    students: [],
    enrollments: [],
    admins: [],
    overview: [],
  },
};

function loadStore() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) {
      // no store yet — write defaultData (including seeded admins)
      localStorage.setItem(STORE_KEY, JSON.stringify(defaultData));
      return JSON.parse(JSON.stringify(defaultData));
    }
    // merge and ensure the seeded super-admin exists without overwriting other data
    const existing = JSON.parse(raw);
    // ensure arrays exist
    existing.courses = existing.courses || [];
    existing.students = existing.students || [];
    existing.enrollments = existing.enrollments || [];
    existing.admins = existing.admins || [];
    existing.notifications = existing.notifications || {};
    // Ensure all notification categories exist
    Object.keys(defaultData.notifications).forEach((cat) => {
      if (!Array.isArray(existing.notifications[cat])) {
        existing.notifications[cat] = [];
      }
    });

    // helper to upsert admin by email
    function upsertAdmin(admin) {
      const idx = existing.admins.findIndex((a) => a.email === admin.email);
      if (idx === -1) existing.admins.push(admin);
      else
        existing.admins[idx] = Object.assign({}, existing.admins[idx], admin);
    }

    // ensure every admin from defaultData is present (merge)
    (defaultData.admins || []).forEach((d) => upsertAdmin(d));

    // persist merged result back to localStorage (do not overwrite other keys)
    localStorage.setItem(STORE_KEY, JSON.stringify(existing));
    return existing;
  } catch (err) {
    console.error("loadStore error", err);
    notyf.error("Failed to load data from Local Storage");
    return JSON.parse(JSON.stringify(defaultData));
  }
}

function saveStore() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch (err) {
    console.error("saveStore error", err);
    notyf.error("Failed to save data");
  }
}

let store = loadStore();
let currentLessons = [];
let currentSections = [];
let currentImages = [];
let tempLessons = [];

// ---------- RBAC helpers ----------
// Get the currently logged-in admin object from the store (or null)
function getCurrentAdmin() {
  try {
    const raw = localStorage.getItem("loggedInAdmin");
    if (!raw) return null;
    const info = JSON.parse(raw);
    // try to find by id or email
    return (
      store.admins.find((a) => a.id == info.id || a.email === info.email) ||
      null
    );
  } catch (e) {
    return null;
  }
}

// Normalize permission checks: supports new `permissions` array or legacy `perms` object
function adminHasPerm(admin, perm) {
  if (!admin) return false;
  if (Array.isArray(admin.permissions)) return admin.permissions.includes(perm);
  if (admin.perms) {
    // map common permission names to legacy booleans
    if (
      perm === "addCourse" ||
      perm === "addStudent" ||
      perm === "addEnrollment"
    )
      return !!admin.perms.add;
    if (perm === "editCourse" || perm === "manageAdmins")
      return !!admin.perms.edit;
  }
  return false;
}

// Apply permissions to UI elements (hide/show Add buttons and admin creation)
function applyAdminPermissionsToUI() {
  const cur = getCurrentAdmin();
  // Add buttons
  const addCourseBtn = $("#addCourseBtn");
  const addStudentBtn = $("#addStudentBtn");
  const addEnrollmentBtn = $("#addEnrollmentBtn");
  if (addCourseBtn)
    addCourseBtn.style.display =
      cur && adminHasPerm(cur, "addCourse") ? "" : "none";
  if (addStudentBtn)
    addStudentBtn.style.display =
      cur && adminHasPerm(cur, "addStudent") ? "" : "none";
  if (addEnrollmentBtn)
    addEnrollmentBtn.style.display =
      cur && adminHasPerm(cur, "addEnrollment") ? "" : "none";
  // Admin creation button inside admins tab (data-bs-target="#adminModal")
  const addAdminBtn = document.querySelector(
    '#tab-admins button[data-bs-target="#adminModal"]'
  );
  if (addAdminBtn)
    addAdminBtn.style.display =
      cur && adminHasPerm(cur, "manageAdmins") ? "" : "none";
}

// Helpers
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));
const uid = () => Date.now() + Math.floor(Math.random() * 1000);
const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : "");

// Auto-generate slug from title unless user edits key
document.addEventListener("DOMContentLoaded", () => {
  const titleEl = $("#courseTitle");
  const keyEl = $("#courseKey");
  if (!titleEl || !keyEl) return;

  const generate = (v) =>
    v
      .trim()
      .toLowerCase()
      .replace(/[^ -\u007F]+/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

  titleEl.addEventListener("input", (e) => {
    if (!keyEl.dataset.userEdited) keyEl.value = generate(e.target.value);
  });
  keyEl.addEventListener("input", function () {
    this.dataset.userEdited = this.value.trim() !== "";
  });
});

// Tabs
function setActiveTab(tab) {
  $$("#sidebarTabs .nav-link").forEach((a) =>
    a.classList.toggle("active", a.dataset.tab === tab)
  );
  $$(".tab-content").forEach(
    (el) => (el.style.display = el.id === `tab-${tab}` ? "" : "none")
  );
  // Re-render notifications for the current tab
  renderNotifications(tab);
  const label = $("#currentTabLabel");
  if (label) label.textContent = tab.charAt(0).toUpperCase() + tab.slice(1);
}

$$("#sidebarTabs .nav-link").forEach((a) =>
  a.addEventListener("click", (e) => {
    e.preventDefault();
    setActiveTab(a.dataset.tab);
  })
);

// Responsive sidebar toggle for mobile
function ensureOverlay() {
  let ov = document.querySelector(".admin-overlay");
  if (!ov) {
    ov = document.createElement("div");
    ov.className = "admin-overlay";
    document.body.appendChild(ov);
    ov.addEventListener("click", () => closeSidebar());
  }
  return ov;
}

function openSidebar() {
  const sb = document.querySelector(".sidebar");
  if (!sb) return;
  sb.classList.add("show");
  ensureOverlay().classList.add("show");
}

function closeSidebar() {
  const sb = document.querySelector(".sidebar");
  if (!sb) return;
  sb.classList.remove("show");
  ensureOverlay().classList.remove("show");
}

// Wire sidebar toggle button
const sidebarToggle = document.getElementById("sidebarToggle");
if (sidebarToggle) {
  sidebarToggle.addEventListener("click", (e) => {
    const sb = document.querySelector(".sidebar");
    if (!sb) return;
    if (sb.classList.contains("show")) closeSidebar();
    else openSidebar();
  });
}

// Close sidebar on nav click (mobile) to reveal content
document.getElementById("sidebarTabs")?.addEventListener("click", (e) => {
  const target = e.target.closest(".nav-link");
  if (!target) return;
  // if small screen, auto-close
  if (window.innerWidth <= 768) closeSidebar();
});

// Close sidebar when resizing to large screens
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    const ov = document.querySelector(".admin-overlay");
    if (ov) ov.classList.remove("show");
    const sb = document.querySelector(".sidebar");
    if (sb) sb.classList.remove("show");
  }
});

// Renderers
function renderOverview() {
  const container = $("#overviewCards");
  if (!container) return;
  const totalCourses = store.courses.length;
  const totalStudents = store.students.length;
  const recentEnroll = store.enrollments.slice(-5).length;
  const newThisMonth = store.courses.filter(
    (c) => new Date(c.created).getMonth() === new Date().getMonth()
  ).length;
  const cards = [
    { title: "Total courses", value: totalCourses },
    { title: "Total students", value: totalStudents },
    { title: "Recent enrollments", value: recentEnroll },
    { title: "New courses this month", value: newThisMonth },
  ];
  container.innerHTML = "";
  cards.forEach((c) => {
    const col = document.createElement("div");
    col.className = "col-md-3";
    col.innerHTML = `<div class="card overview-card p-3"><div><h6>${c.title}</h6></div><div class="overview-value">${c.value}</div></div>`;
    container.appendChild(col);
  });
}

function renderCourses(q = "") {
  const tbody = $("#coursesTable tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  store.courses.forEach((c) => {
    if (
      q &&
      !`${c.title} ${c.category} ${c.description}`.toLowerCase().includes(q)
    )
      return;
    const tr = document.createElement("tr");
    const priceDisplay = c.priceType === "free" ? "Free" : `$${c.price}`;
    const sectionsCount = c.curriculum ? c.curriculum.length : 0;
    const lessonsCount = c.curriculum
      ? c.curriculum.reduce(
          (total, section) =>
            total + (section.lessons ? section.lessons.length : 0),
          0
        )
      : 0;
    const sectionsSummary = `${sectionsCount} / ${lessonsCount}`;
    const thumb = c.images && c.images[0] ? c.images[0] : c.image || "";

    tr.innerHTML = `<td>${c.title}</td><td>${c.instructor || ""}</td><td>${
      c.duration || ""
    }</td><td>${c.level || ""}</td><td>${
      c.category || ""
    }</td><td>${priceDisplay}</td><td>${sectionsSummary}</td><td>
        <button class="btn btn-sm edit-course" data-id="${c.id}">Edit</button>
        <button class="btn btn-sm btn-danger delete-course" data-id="${
          c.id
        }">Delete</button>
      </td>`;
    tbody.appendChild(tr);
  });
  populateCourseSelects();
}

function deleteCourse(courseId) {
  const courseIndex = store.courses.findIndex((c) => c.id === courseId);
  if (courseIndex > -1) {
    store.courses.splice(courseIndex, 1);
    // Also remove any enrollments associated with this course
    store.enrollments = store.enrollments.filter(
      (en) => en.courseId !== courseId
    );
  }
}

//

function openEditCourse(id) {
  const c = store.courses.find((x) => x.id === id);
  if (!c) return;

  // Clear previous data
  currentImages = [];
  currentSections = [];
  tempLessons = [];

  // Populate basic fields
  $("#courseId").value = c.id;
  $("#courseTitle").value = c.title;
  $("#courseDescription").value = c.description;
  $("#coursePrice").value = c.price || 0;
  $("#courseCategory").value = c.category || "";
  $("#courseInstructor").value = c.instructor || "";
  $("#courseDuration").value = c.duration || "";
  $("#courseLevel").value = c.level || "";
  $("#courseKey").value = c.key || "";
  $("#coursePriceType").value = c.priceType || "free";
  $("#courseVisible").checked = !!c.visible;

  // Handle price type toggle
  togglePriceField();

  // Populate images
  if (c.images && Array.isArray(c.images)) {
    currentImages = c.images.map((img) => ({ type: "url", value: img }));
  } else if (c.image) {
    currentImages = [{ type: "url", value: c.image }];
  }
  renderImagesList();

  // Populate sections/curriculum
  if (c.curriculum && Array.isArray(c.curriculum)) {
    currentSections = [...c.curriculum];
  }
  renderSectionsList();

  new bootstrap.Modal($("#courseModal")).show();
}

function renderStudents(q = "") {
  const tbody = $("#studentsTable tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  store.students.forEach((s) => {
    if (q && !`${s.name} ${s.email}`.toLowerCase().includes(q)) return;
    const tr = document.createElement("tr");
    // Render Edit/Delete buttons for each student row (handlers enforce permissions)
    tr.innerHTML = `<td>${s.name}</td><td>${s.email}</td><td>${
      s.enrolled?.length || 0
    }</td><td>
      <button class="btn btn-sm btn-light edit-student" data-id="${
        s.id
      }">Edit</button>
      <button class="btn btn-sm btn-danger delete-student" data-id="${
        s.id
      }">Delete</button>
    </td>`;
    tbody.appendChild(tr);
  });
  populateStudentSelects();
}

function openEditStudent(id) {
  const s = store.students.find((x) => x.id === id);
  if (!s) return;
  $("#studentId").value = s.id;
  $("#studentName").value = s.name;
  $("#studentEmail").value = s.email;
  const sel = $("#studentEnrolled");
  if (sel) {
    Array.from(sel.options).forEach(
      (opt) => (opt.selected = s.enrolled?.includes(Number(opt.value)))
    );
  }
  new bootstrap.Modal($("#studentModal")).show();
}

function renderEnrollments(filterCourse = null, filterDate = null, q = "") {
  const tbody = $("#enrollmentsTable tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  let list = store.enrollments.slice().reverse();
  if (filterCourse) list = list.filter((e) => e.courseId == filterCourse);
  if (filterDate) list = list.filter((e) => e.date === filterDate);
  list.forEach((en) => {
    const student = store.students.find((s) => s.id === en.studentId) || {};
    const course = store.courses.find((c) => c.id === en.courseId) || {};
    const summary = `${student.name || en.studentId} ${
      course.title || en.courseId
    } ${en.status}`.toLowerCase();
    if (q && !summary.includes(q)) return;
    const tr = document.createElement("tr");
    // Render Edit/Delete for each enrollment row
    tr.innerHTML = `<td>${student.name || en.studentId}</td><td>${
      course.title || en.courseId
    }</td><td>${formatDate(en.date)}</td><td><span class="badge-status ${
      en.status
    }">${en.status}</span></td><td>
      <button class="btn btn-sm btn-light edit-enrollment" data-id="${
        en.id
      }">Edit</button>
      <button class="btn btn-sm btn-danger delete-enrollment" data-id="${
        en.id
      }">Delete</button>
    </td>`;
    tbody.appendChild(tr);
  });
}

function openEditEnrollment(id) {
  const en = store.enrollments.find((x) => x.id === id);
  if (!en) return;
  $("#enrollmentId").value = en.id;
  $("#enrollmentStudent").value = en.studentId;
  $("#enrollmentCourse").value = en.courseId;
  $("#enrollmentDate").value = en.date;
  $("#enrollmentStatus").value = en.status;
  new bootstrap.Modal($("#enrollmentModal")).show();
}

function renderAdmins(q = "") {
  const tbody = $("#adminsTable tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  store.admins.forEach((a) => {
    if (q && !`${a.name} ${a.email}`.toLowerCase().includes(q)) return;
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${a.name}</td><td>${a.email}</td><td>${
      a.perms?.add ? "Add" : ""
    } ${a.perms?.edit ? " Edit/Delete" : ""}</td><td>
      <button class="btn btn-sm btn-light edit-admin" data-id="${
        a.id
      }">Edit</button>
      <button class="btn btn-sm btn-danger delete-admin" data-id="${
        a.id
      }">Delete</button>
    </td>`;
    tbody.appendChild(tr);
  });
}

function openEditAdmin(id) {
  const a = store.admins.find((x) => x.id === id);
  if (!a) return;
  $("#adminId").value = a.id;
  $("#adminName").value = a.name || "";
  $("#adminEmail").value = a.email || "";
  // do not pre-fill password for security
  $("#adminPassword").value = "";
  $("#permAdd").checked = !!a.perms?.add;
  $("#permEdit").checked = !!a.perms?.edit;
  // show modal
  new bootstrap.Modal($("#adminModal")).show();
}

function renderNotifications(page) {
  const list = $("#notificationsList");
  if (!list) return;
  list.innerHTML = "";
  const notifsForPage = store.notifications[page] || [];

  if (notifsForPage.length === 0) {
    list.innerHTML = `<div class="list-group-item text-muted">No notifications for this section.</div>`;
  } else {
    notifsForPage.slice(0, 20).forEach((n) => {
      const it = document.createElement("div");
      it.className = "list-group-item";
      it.textContent = `${n.text} — ${new Date(n.date).toLocaleString()}`;
      list.appendChild(it);
    });
  }
  const badge = $("#notifBadge");
  if (badge) badge.textContent = notifsForPage.length;
}

function populateCourseSelects() {
  const sels = ["#filterCourse", "#studentEnrolled", "#enrollmentCourse"];
  sels.forEach((sel) => {
    const el = $(sel);
    if (!el) return;
    el.innerHTML =
      sel === "#filterCourse" ? '<option value="">All courses</option>' : "";
    store.courses.forEach((c) => {
      const o = document.createElement("option");
      o.value = c.id;
      o.textContent = c.title;
      el.appendChild(o);
    });
  });
}
function populateStudentSelects() {
  const els = ["#enrollmentStudent"];
  els.forEach((sel) => {
    const el = $(sel);
    if (!el) return;
    el.innerHTML = "";
    store.students.forEach((s) => {
      const o = document.createElement("option");
      o.value = s.id;
      o.textContent = s.name;
      el.appendChild(o);
    });
  });
}

function pushNotif(text, category) {
  if (!store.notifications[category]) store.notifications[category] = [];
  store.notifications[category].unshift({
    id: uid(),
    text,
    date: new Date().toISOString(),
  });
  if (store.notifications[category].length > 50)
    store.notifications[category].pop();
  saveStore();
  // Re-render notifications for the category the notification was for
  renderNotifications(category);
}

// Forms
$("#courseForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const id = $("#courseId").value;
  const title = $("#courseTitle").value.trim();
  if (!title) {
    const el = $("#courseTitle");
    if (el && !el.nextElementSibling?.classList?.contains("field-error")) {
      const msg = document.createElement("div");
      msg.className = "field-error text-danger small mt-1";
      msg.textContent = "Title is required";
      el.parentNode.appendChild(msg);
      setTimeout(() => msg.remove(), 3500);
    }
    window.alerts && alerts.toast
      ? alerts.toast("error", "Title required")
      : notyf.error("Title required");
    return;
  }
  const desc = $("#courseDescription").value;
  const priceType = $("#coursePriceType").value || "free";
  const price = priceType === "free" ? 0 : Number($("#coursePrice").value || 0);
  const category = $("#courseCategory").value;
  const instructor = $("#courseInstructor").value.trim();
  const duration = $("#courseDuration").value.trim();
  const level = $("#courseLevel").value;
  const visible = !!$("#courseVisible").checked;
  const key = $("#courseKey").value.trim();

  if (!key) {
    const el = $("#courseKey");
    if (el && !el.nextElementSibling?.classList?.contains("field-error")) {
      const msg = document.createElement("div");
      msg.className = "field-error text-danger small mt-1";
      msg.textContent = "Course key (slug) is required";
      el.parentNode.appendChild(msg);
      setTimeout(() => msg.remove(), 3500);
    }
    window.alerts && alerts.toast
      ? alerts.toast("error", "Course key (slug) is required")
      : notyf.error("Course key (slug) is required");
    return;
  }

  if (currentImages.length === 0) {
    const el = $("#courseImagesList");
    if (el && !el.classList.contains("field-error")) {
      const msg = document.createElement("div");
      msg.className = "field-error text-danger small mt-1";
      msg.textContent = "At least one image is required";
      el.appendChild(msg);
      setTimeout(() => msg.remove(), 3500);
    }
    window.alerts && alerts.toast
      ? alerts.toast("error", "At least one course image is required")
      : notyf.error("At least one course image is required");
    return;
  }

  if (currentSections.length === 0) {
    const el = $("#sectionsList");
    if (el && !el.classList.contains("field-error")) {
      const msg = document.createElement("div");
      msg.className = "field-error text-danger small mt-1";
      msg.textContent = "At least one section is required";
      el.appendChild(msg);
      setTimeout(() => msg.remove(), 3500);
    }
    window.alerts && alerts.toast
      ? alerts.toast("error", "At least one course section is required")
      : notyf.error("At least one course section is required");
    return;
  }

  const courseData = {
    title,
    description: desc,
    price,
    priceType,
    category,
    instructor,
    duration,
    level,
    visible,
    key,
    images: currentImages.map((img) => img.value),
    curriculum: currentSections,
    students: 0,
    created: new Date().toISOString().split("T")[0],
  };
  // validation: if paid course, require a positive price
  if (priceType === "paid" && (!price || price <= 0)) {
    const el = $("#coursePrice");
    if (el && !el.nextElementSibling?.classList?.contains("field-error")) {
      const msg = document.createElement("div");
      msg.className = "field-error text-danger small mt-1";
      msg.textContent = "Price must be greater than zero for paid courses";
      el.parentNode.appendChild(msg);
      setTimeout(() => msg.remove(), 4000);
    }
    notyf.error("Price required for paid courses");
    return;
  }

  if (id) {
    const c = store.courses.find((x) => x.id == id);
    if (c) {
      Object.assign(c, courseData);
      c.id = id;
    }
    window.alerts && alerts.toast
      ? alerts.toast("success", "Course updated")
      : notyf.success("Course updated");
    pushNotif("Course updated", "courses");
  } else {
    const nid = uid();
    // append new course to existing array (do not overwrite store)
    store.courses.push({ id: nid, ...courseData, students: 0 });
    window.alerts && alerts.toast
      ? alerts.toast("success", "Course added")
      : notyf.success("Course added");
    pushNotif("Course added", "courses");
  }
  saveStore();
  bootstrap.Modal.getInstance($("#courseModal"))?.hide();
  // Reset full form to clear any inputs
  $("#courseForm")?.reset();
  // reset temporary editors and lists after save
  currentImages = [];
  currentSections = [];
  tempLessons = [];
  renderImagesList();
  renderSectionsList();
  renderTempLessonsList();
  renderCourses();
  renderOverview();
  renderEnrollments();
  renderCharts();
  // If a public renderer exists on the site, trigger it to refresh courses listing
  if (window.renderPublicCourses) window.renderPublicCourses();
});

$("#studentForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const id = $("#studentId").value;
  const name = $("#studentName").value.trim();
  const email = $("#studentEmail").value.trim();
  if (!name || !email) {
    notyf.error("Name and email required");
    return;
  }
  const enrolled = Array.from($("#studentEnrolled")?.selectedOptions || []).map(
    (o) => Number(o.value)
  );
  if (id) {
    const s = store.students.find((x) => x.id == id);
    if (s) Object.assign(s, { name, email, enrolled });
    notyf.success("Student updated");
    pushNotif("Student updated", "students");
  } else {
    const nid = uid();
    store.students.push({ id: nid, name, email, enrolled });
    notyf.success("Student added");
    pushNotif("Student added", "students");
  }
  saveStore();
  bootstrap.Modal.getInstance($("#studentModal"))?.hide();
  renderStudents();
  renderEnrollments();
  renderOverview();
  renderCharts();
});

$("#enrollmentForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const id = $("#enrollmentId").value;
  const studentId = Number($("#enrollmentStudent").value);
  const courseId = Number($("#enrollmentCourse").value);
  const date = $("#enrollmentDate").value;
  const status = $("#enrollmentStatus").value;
  if (!studentId || !courseId || !date) {
    notyf.error("All fields required");
    return;
  }
  if (id) {
    const en = store.enrollments.find((x) => x.id == id);
    if (en) Object.assign(en, { studentId, courseId, date, status });
    notyf.success("Enrollment updated");
    pushNotif("Enrollment updated", "enrollments");
  } else {
    const nid = uid();
    store.enrollments.push({ id: nid, studentId, courseId, date, status });
    notyf.success("Enrollment added");
    pushNotif("Enrollment added", "enrollments");
  }
  const student = store.students.find((s) => s.id == studentId);
  if (student) {
    if (!student.enrolled) student.enrolled = [];
    if (!student.enrolled.includes(courseId)) student.enrolled.push(courseId);
  }
  saveStore();
  bootstrap.Modal.getInstance($("#enrollmentModal"))?.hide();
  renderEnrollments();
  renderStudents();
  renderOverview();
  renderCharts();
});

$("#adminForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const id = $("#adminId").value;
  const name = $("#adminName").value.trim();
  const email = $("#adminEmail").value.trim();
  const password = $("#adminPassword").value; // optional on edit
  // collect permissions array for RBAC
  const perms = { add: $("#permAdd").checked, edit: $("#permEdit").checked };
  const permissionsArray = [];
  if ($("#permAdd").checked) permissionsArray.push("addCourse");
  if ($("#permEdit").checked) permissionsArray.push("editCourse");
  // optional additional permissions
  if ($("#permManageAdmins")?.checked) permissionsArray.push("manageAdmins");
  if ($("#permViewUsers")?.checked) permissionsArray.push("viewUsers");
  if (!name || !email) {
    notyf.error("Name and email required");
    return;
  }
  if (id) {
    // edit existing admin
    const a = store.admins.find((x) => x.id == id);
    if (a) {
      a.name = name;
      a.email = email;
      // keep legacy perms for backward compatibility
      a.perms = perms;
      // set canonical permissions array
      a.permissions = permissionsArray;
      // change password only if provided
      if (password && password.trim().length >= 6) a.password = password;
      notyf.success("Admin updated");
      pushNotif("Admin updated", "admins");
    }
  } else {
    // create new admin: password required
    if (!password || password.trim().length < 6) {
      notyf.error("Password required (min 6 chars)");
      return;
    }
    store.admins.push({
      id: uid(),
      name,
      email,
      password,
      perms,
      permissions: permissionsArray,
    });
    notyf.success("Admin added");
    pushNotif("Admin added", "admins");
  }
  saveStore();
  bootstrap.Modal.getInstance($("#adminModal"))?.hide();
  // clear form
  $("#adminForm")?.reset();
  $("#adminId").value = "";
  renderAdmins();
  // apply RBAC changes to UI after admin list changes
  applyAdminPermissionsToUI();
});

// Filters & search handlers
$("#applyFilters")?.addEventListener("click", () => {
  const course = $("#filterCourse").value;
  const date = $("#filterDate").value;
  renderEnrollments(
    course || null,
    date || null,
    $("#enrollmentSearch")?.value?.toLowerCase() || ""
  );
});
$("#courseSearch")?.addEventListener("input", (e) =>
  renderCourses(e.target.value.toLowerCase())
);
$("#studentSearch")?.addEventListener("input", (e) =>
  renderStudents(e.target.value.toLowerCase())
);
$("#enrollmentSearch")?.addEventListener("input", (e) =>
  renderEnrollments(
    $("#filterCourse")?.value || null,
    $("#filterDate")?.value || null,
    e.target.value.toLowerCase()
  )
);
$("#adminSearch")?.addEventListener("input", (e) =>
  renderAdmins(e.target.value.toLowerCase())
);

// Enter key submits modal forms
$$(".modal form").forEach((f) =>
  f.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
      f.requestSubmit();
    }
  })
);

// Charts
let enrollChart, coursesChart;
function renderCharts() {
  try {
    // Last 7 days labels
    const last7 = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d;
    });
    const labels = last7.map((d) => d.toLocaleDateString());

    const enrollData = labels.map(
      (lbl) =>
        store.enrollments.filter(
          (e) =>
            new Date(e.date).toLocaleDateString() ===
            new Date(lbl).toLocaleDateString()
        ).length
    );

    const ctx = $("#enrollChart")?.getContext("2d");
    if (ctx) {
      if (enrollChart) enrollChart.destroy();
      enrollChart = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Enrollments",
              data: enrollData,
              borderColor: "rgba(255,149,0,0.9)",
              backgroundColor: "rgba(255,149,0,0.2)",
            },
          ],
        },
      });
    }

    // Monthly new courses
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const courseCounts = months.map(
      (m, idx) =>
        store.courses.filter((c) => new Date(c.created).getMonth() === idx)
          .length
    );

    const ctx2 = $("#coursesChart")?.getContext("2d");
    if (ctx2) {
      if (coursesChart) coursesChart.destroy();
      coursesChart = new Chart(ctx2, {
        type: "bar",
        data: {
          labels: months,
          datasets: [
            {
              label: "New Courses",
              data: courseCounts,
              backgroundColor: "rgba(38,38,38,0.8)",
            },
          ],
        },
      });
    }
  } catch (e) {
    console.error(e);
  }
}

// Populate selects when modals open
$("#studentModal")?.addEventListener("show.bs.modal", () =>
  populateCourseSelects()
);
$("#enrollmentModal")?.addEventListener("show.bs.modal", () => {
  populateCourseSelects();
  populateStudentSelects();
});

// Ensure Add buttons open an empty form (do not reuse edit data)
$("#addCourseBtn")?.addEventListener("click", () => {
  // clear course form fields
  $("#courseForm")?.reset();
  $("#courseId").value = "";
  // ensure selects/inputs not leftover
  $("#courseInstructor").value = "";
  $("#courseDuration").value = "";
  $("#courseLevel").value = "";
  $("#courseVideos").value = "";
});

$("#addStudentBtn")?.addEventListener("click", () => {
  $("#studentForm")?.reset();
  $("#studentId").value = "";
  // clear multi-select
  const sel = $("#studentEnrolled");
  if (sel) Array.from(sel.options).forEach((o) => (o.selected = false));
});

$("#addEnrollmentBtn")?.addEventListener("click", () => {
  $("#enrollmentForm")?.reset();
  $("#enrollmentId").value = "";
});

$("#addAdminBtn")?.addEventListener("click", () => {
  $("#adminForm")?.reset();
  $("#adminId").value = "";
  $("#adminPassword").value = "";
  // clear permission checkboxes if present
  if ($("#permAdd")) $("#permAdd").checked = false;
  if ($("#permEdit")) $("#permEdit").checked = false;
  if ($("#permManageAdmins")) $("#permManageAdmins").checked = false;
  if ($("#permViewUsers")) $("#permViewUsers").checked = false;
});

// Init
function init() {
  // protect admin page: require loggedInAdmin in localStorage
  const logged = localStorage.getItem("loggedInAdmin");
  if (!logged) {
    // not logged in -> redirect to login
    window.location.href = "./login.html";
    return;
  }
  setActiveTab("courses");
  renderOverview();
  renderCourses();
  renderStudents();
  renderEnrollments();
  renderAdmins();
  renderNotifications("courses"); // Default to showing course notifications
  populateCourseSelects();
  populateStudentSelects();
  renderCharts();
  // apply RBAC to UI elements (hide/show add buttons etc.)
  applyAdminPermissionsToUI();

  // Use event delegation for dynamically added buttons in tables
  $("#coursesTable tbody")?.addEventListener("click", function (e) {
    const target = e.target;
    if (!target.dataset.id) return;
    const id = Number(target.dataset.id);
    const cur = getCurrentAdmin();

    if (target.classList.contains("edit-course")) {
      if (!cur || !adminHasPerm(cur, "editCourse")) {
        window.alerts && alerts.toast
          ? alerts.toast("error", "You do not have permission to edit courses")
          : notyf.error("You do not have permission to edit courses");
        return;
      }
      openEditCourse(id);
    }

    if (target.classList.contains("delete-course")) {
      if (!cur || !adminHasPerm(cur, "editCourse")) {
        window.alerts && alerts.toast
          ? alerts.toast(
              "error",
              "You do not have permission to delete courses"
            )
          : notyf.error("You do not have permission to delete courses");
        return;
      }
      alerts.confirm({
        title: "Delete course",
        message:
          "Are you sure you want to delete this course? This action cannot be undone.",
        confirmText: "Delete",
        cancelText: "Cancel",
        onConfirm: function () {
          deleteCourse(id);
          saveStore();
          renderCourses($("#courseSearch")?.value || "");
          renderOverview();
          // refresh public listing if present
          if (window.renderPublicCourses) window.renderPublicCourses();
          window.alerts && alerts.toast
            ? alerts.toast("success", "Course deleted")
            : notyf.success("Course deleted");
          pushNotif("Course deleted", "courses");
        },
      });
    }
  });

  $("#studentsTable tbody")?.addEventListener("click", function (e) {
    const target = e.target;
    if (!target.dataset.id) return;
    const id = Number(target.dataset.id);
    const cur = getCurrentAdmin();

    if (target.classList.contains("edit-student")) {
      if (!cur || !adminHasPerm(cur, "editCourse")) {
        notyf.error("You do not have permission to edit students");
        return;
      }
      openEditStudent(id);
    }

    if (target.classList.contains("delete-student")) {
      if (!cur || !adminHasPerm(cur, "editCourse")) {
        notyf.error("You do not have permission to delete students");
        return;
      }
      alerts.confirm({
        title: "Delete student",
        message: "Are you sure you want to delete this student?",
        onConfirm: function () {
          store.students = store.students.filter((x) => x.id !== id);
          store.enrollments = store.enrollments.filter(
            (en) => en.studentId !== id
          );
          saveStore();
          renderStudents($("#studentSearch")?.value || "");
          renderEnrollments();
          renderOverview();
          alerts.toast("success", "Student deleted");
          pushNotif("Student deleted", "students");
        },
      });
    }
  });

  $("#enrollmentsTable tbody")?.addEventListener("click", function (e) {
    const target = e.target;
    if (!target.dataset.id) return;
    const id = Number(target.dataset.id);
    const cur = getCurrentAdmin();

    if (target.classList.contains("edit-enrollment")) {
      if (!cur || !adminHasPerm(cur, "editCourse")) {
        notyf.error("You do not have permission to edit enrollments");
        return;
      }
      openEditEnrollment(id);
    }

    if (target.classList.contains("delete-enrollment")) {
      if (!cur || !adminHasPerm(cur, "editCourse")) {
        notyf.error("You do not have permission to delete enrollments");
        return;
      }
      alerts.confirm({
        title: "Delete enrollment",
        message: "Remove this enrollment record?",
        onConfirm: function () {
          store.enrollments = store.enrollments.filter((x) => x.id !== id);
          saveStore();
          renderEnrollments(
            $("#filterCourse")?.value || null,
            $("#filterDate")?.value || null,
            $("#enrollmentSearch")?.value || ""
          );
          renderOverview();
          alerts.toast("success", "Enrollment deleted");
          pushNotif("Enrollment deleted", "enrollments");
        },
      });
    }
  });

  $("#adminsTable tbody")?.addEventListener("click", function (e) {
    const target = e.target;
    if (!target.dataset.id) return;
    const id = Number(target.dataset.id);
    const cur = getCurrentAdmin();

    if (target.classList.contains("edit-admin")) {
      // Add permission check if you have one for editing admins
      openEditAdmin(id);
    }

    if (target.classList.contains("delete-admin")) {
      // Add permission check
      if (!cur || !adminHasPerm(cur, "manageAdmins")) {
        notyf.error("You do not have permission to delete admins");
        return;
      }
      alerts.confirm({
        title: "Remove admin",
        message: "Are you sure you want to remove this admin?",
        onConfirm: function () {
          store.admins = store.admins.filter((x) => x.id !== id);
          saveStore();
          renderAdmins($("#adminSearch")?.value || "");
          alerts.toast("success", "Admin removed");
          pushNotif("Admin removed", "admins");
        },
      });
    }
  });
}

// Image Management Functions
function addImageFromUrl() {
  const url = $("#courseImageUrlInput").value.trim();
  if (!url) {
    notyf.error("Please enter an image URL");
    return;
  }
  currentImages.push({ type: "url", value: url, name: url });
  renderImagesList();
  $("#courseImageUrlInput").value = "";
}

function addImageFromFile() {
  const fileInput = $("#courseImageFileInput");
  const file = fileInput.files[0];

  if (!file) {
    notyf.error("Please select a file");
    return;
  }

  // Convert file to data URL for preview
  const reader = new FileReader();
  reader.onload = function (e) {
    currentImages.push({
      type: "file",
      value: e.target.result,
      name: file.name,
    });
    renderImagesList();
    fileInput.value = "";
  };
  reader.readAsDataURL(file);
}

function removeImage(index) {
  currentImages.splice(index, 1);
  renderImagesList();
}

function renderImagesList() {
  const container = $("#courseImagesList");
  if (!container) return;

  if (currentImages.length === 0) {
    container.innerHTML =
      '<div class="text-muted small">No images added yet</div>';
    return;
  }
  // show a simple list of filenames / urls (no image preview)
  container.innerHTML = currentImages
    .map(
      (image, index) => `
      <div class="d-flex justify-content-between align-items-center p-2 border rounded mb-1">
        <div class="d-flex align-items-center">
          <i class="fa-regular fa-image me-2 text-muted"></i>
          <span class="small text-truncate" style="max-width:380px;">${
            image.name || image.value
          }</span>
        </div>
        <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeImage(${index})">Remove</button>
      </div>
    `
    )
    .join("");
}

// Section and Lesson Management Functions
function addTempLesson() {
  const title = $("#lessonTitleInput").value.trim();
  const duration = $("#lessonDurationInput").value.trim();

  if (!title || !duration) {
    notyf.error("Lesson title and duration are required");
    return;
  }

  tempLessons.push({ title, duration });
  renderTempLessonsList();

  // Clear inputs
  $("#lessonTitleInput").value = "";
  $("#lessonDurationInput").value = "";
}

function removeTempLesson(index) {
  tempLessons.splice(index, 1);
  renderTempLessonsList();
}

function renderTempLessonsList() {
  const container = $("#tempLessonsList");
  if (!container) return;

  if (tempLessons.length === 0) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = tempLessons
    .map(
      (lesson, index) => `
    <div class="d-flex justify-content-between align-items-center p-2 border rounded mb-1 bg-white">
      <div>
        <strong>${lesson.title}</strong>
        <span class="text-muted ms-2">(${lesson.duration})</span>
      </div>
      <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeTempLesson(${index})">Remove</button>
    </div>
  `
    )
    .join("");
}

function addSection() {
  const sectionTitle = $("#sectionTitleInput").value.trim();

  if (!sectionTitle) {
    notyf.error("Section title is required");
    return;
  }

  if (tempLessons.length === 0) {
    notyf.error("At least one lesson is required for a section");
    return;
  }

  currentSections.push({
    section: sectionTitle,
    lessons: [...tempLessons],
  });

  renderSectionsList();

  // Clear form
  $("#sectionTitleInput").value = "";
  tempLessons = [];
  renderTempLessonsList();
}

function removeSection(index) {
  currentSections.splice(index, 1);
  renderSectionsList();
}

function renderSectionsList() {
  const container = $("#sectionsList");
  if (!container) return;

  if (currentSections.length === 0) {
    container.innerHTML =
      '<div class="text-muted small">No sections added yet</div>';
    return;
  }

  container.innerHTML = currentSections
    .map(
      (section, sectionIndex) => `
    <div class="border rounded p-3 mb-2 bg-white">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h6 class="mb-0">${section.section}</h6>
        <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeSection(${sectionIndex})">Remove Section</button>
      </div>
      <div class="ms-3">
        ${section.lessons
          .map(
            (lesson, lessonIndex) => `
          <div class="d-flex justify-content-between align-items-center p-2 border rounded mb-1">
            <div>
              <strong>${lesson.title}</strong>
              <span class="text-muted ms-2">(${lesson.duration})</span>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `
    )
    .join("");
}

// Price type toggle function
function togglePriceField() {
  const priceType = $("#coursePriceType").value;
  const priceField = $("#coursePrice");

  if (priceType === "free") {
    priceField.disabled = true;
    priceField.value = 0;
  } else {
    priceField.disabled = false;
  }
}

// Event Listeners for new functionality
document.addEventListener("DOMContentLoaded", function () {
  // Price type toggle
  $("#coursePriceType")?.addEventListener("change", togglePriceField);

  // Image management
  $("#addImageUrlBtn")?.addEventListener("click", addImageFromUrl);
  $("#addImageFileBtn")?.addEventListener("click", addImageFromFile);

  // Section and lesson management
  $("#addLessonBtn")?.addEventListener("click", addTempLesson);
  $("#addSectionBtn")?.addEventListener("click", addSection);

  // Clear form when adding new course
  $("#addCourseBtn")?.addEventListener("click", function () {
    currentImages = [];
    currentSections = [];
    tempLessons = [];
    renderImagesList();
    renderSectionsList();
    renderTempLessonsList();
    togglePriceField();
  });
});

window.addEventListener("DOMContentLoaded", init);
