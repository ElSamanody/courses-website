document.addEventListener("DOMContentLoaded", () => {
  // active the link in navbar
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });

  // Pricing plan toggle logic
  const btnMonthly = document.querySelector(".buttons-price .Monthly");
  const btnYearly = document.querySelector(".buttons-price .Yearly");

  if (btnMonthly && btnYearly) {
    btnMonthly.addEventListener("click", () => {
      if (!btnMonthly.classList.contains("active")) {
        btnMonthly.classList.add("active");
        btnYearly.classList.remove("active");
      }
    });

    btnYearly.addEventListener("click", () => {
      if (!btnYearly.classList.contains("active")) {
        btnYearly.classList.add("active");
        btnMonthly.classList.remove("active");
      }
    });
  }
});
