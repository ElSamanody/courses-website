const currentPage = window.location.pathname.split("/").pop() || "index.html";
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  const linkPage = link.getAttribute("href");
  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});

const cards = document.querySelectorAll(".card");

cards.forEach((card, index) => {
  const number = document.createElement("span");

  number.classList.add("number");
  number.textContent = (index + 1).toString().padStart(2, "0");
  card.appendChild(number);
});
