// Typing Effect
const textArray = ["Full Stack Developer", "UI/UX Enthusiast", "Creative Coder"];
let textIndex = 0;
let charIndex = 0;
function typeEffect() {
    if (charIndex < textArray[textIndex].length) {
        document.getElementById("typing-effect").textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 100);
    } else {
        setTimeout(() => {
            document.getElementById("typing-effect").textContent = "";
            charIndex = 0;
            textIndex = (textIndex + 1) % textArray.length;
            typeEffect();
        }, 2000);
    }
}
typeEffect();

// Slideshow
let slideIndex = 0;
function showSlides() {
    let slides = document.querySelectorAll(".slide");
    slides.forEach(slide => slide.style.display = "none");
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000);
}
showSlides();

// Project Search
const searchInput = document.getElementById("search");
searchInput.addEventListener("keyup", () => {
    let filter = searchInput.value.toLowerCase();
    let projects = document.querySelectorAll(".project");
    projects.forEach(project => {
        let projectName = project.getAttribute("data-name").toLowerCase();
        project.style.display = projectName.includes(filter) ? "block" : "none";
    });
});

// Blog Comment System
function addComment() {
    let commentInput = document.getElementById("comment-input");
    let commentList = document.getElementById("comment-list");
    if (commentInput.value.trim() !== "") {
        let li = document.createElement("li");
        li.textContent = commentInput.value;
        commentList.appendChild(li);
        commentInput.value = "";
    }
}

// Contact Form Validation
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", function(event) {
    event.preventDefault();
    document.getElementById("confirmation-message").style.display = "block";
    contactForm.reset();
});
