const courses = {
  "web-design": {
    title: "Web Design Fundamentals",
    description:
      "Learn the fundamentals of web design, including HTML, CSS, and responsive design principles. Develop the skills to create visually appealing and user-friendly websites.",
    image: "./cover-details-course/web-design.jpg",
    curriculum: [
      {
        section: "Introduction to HTML",
        lessons: [
          { title: "HTML Basics and Structure", duration: "45 Minutes" },
          { title: "Working with Text, Links, and Images", duration: "1 Hour" },
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
  },

  uiux: {
    title: "UI/UX Design Course",
    description:
      "Master the art of creating intuitive user interfaces (UI) and enhancing user experiences (UX). Learn design principles, wireframing, prototyping, and usability testing techniques.",
    image: "./cover-details-course/UiUx.jpg",
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
  },

  "mobile-dev": {
    title: "Mobile App Development",
    description:
      "Dive into mobile app development. Learn to build native iOS and Android applications using frameworks like Swift and Kotlin.",
    image: "./cover-details-course/mobile.jpg",
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
  },

  "graphic-design": {
    title: "Graphic Design for Beginners",
    description:
      "Discover the basics of graphic design: typography, color theory, layout, and image manipulation techniques for digital and print.",
    image: "./cover-details-course/graphic-design.jpg",
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
          { title: "Designing for Digital & Print Media", duration: "2 Hours" },
        ],
      },
    ],
  },

  "frontend-dev": {
    title: "Front-End Web Development",
    description:
      "Learn HTML, CSS, JavaScript, and frameworks like Bootstrap & React to build modern, responsive, and interactive websites.",
    image: "./cover-details-course/front-end.jpg",
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
  },
};
