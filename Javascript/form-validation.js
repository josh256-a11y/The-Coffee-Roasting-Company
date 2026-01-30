  document.addEventListener('DOMContentLoaded', () => {
    // Enquiry form validation
const enquiryForm = document.getElementById('enquiryForm');
const status = document.getElementById("formStatus");
enquiryForm.addEventListener("submit", function (e) {
e.preventDefault();
status.hidden = true;
const fm = new FormData(enquiryForm);
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
});
})