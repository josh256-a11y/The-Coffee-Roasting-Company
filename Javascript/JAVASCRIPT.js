// js/script.js

// Insert current year in all footers
document.addEventListener('DOMContentLoaded', () => {
  // const year = new Date().getFullYear();
  // document.getElementById('year')?.textContent = year;
  // document.getElementById('year2')?.textContent = year;
  // document.getElementById('year3')?.textContent = year;

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navList.style.display = expanded ? 'none' : 'flex';
    });
  }


  

  // Contact form
  // const contactForm = document.getElementById('contactForm');
  // if (contactForm) {
  //   contactForm.addEventListener('submit', (e) => {
  //     e.preventDefault();
  //     if (!contactForm.checkValidity()) {
  //       contactForm.reportValidity();
  //       document.getElementById('contactFeedback').textContent = 'Please complete the required fields.';
  //       return;
  //     }
  //     document.getElementById('contactFeedback').textContent = 'Thanks — message sent (demo).';
  //     contactForm.reset();
  //   });
  // }

    // Simple client-side validation and simulated submit
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.hidden = true;
    const fm = new FormData(form);
    const name = fm.get("name").trim();
    const email = fm.get("email").trim();
    const message = fm.get("message").trim();
    if (!name || !email || !message) {
      status.textContent = "Please complete all required fields.";
      status.hidden = false;
      status.style.color = "crimson";
      return;
    }
    // Basic email pattern check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      status.textContent = "Please enter a valid email address.";
      status.hidden = false;
      status.style.color = "crimson";
      return;
    }

    // Simulate network delay and success
    status.textContent = "Sending...";
    status.hidden = false;
    status.style.color = "inherit";
    setTimeout(() => {
      status.textContent = "Thank you — your message was sent (simulated).";
      status.style.color = "green";
      form.reset();
    }, 700);
  })
});
