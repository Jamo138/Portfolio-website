// Typing Effect
const textArray = ["Hi, My Name Is Michael", "Welcome To My Portfolio"];
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
document.getElementById("typing-effect").classList.add("typing-font");
typeEffect();

// Slideshow
let slideIndex = 0;
let slideTimer;

const slides = document.querySelectorAll(".slide");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

// Show the current slide
function showSlide(index) {
    let slides = document.querySelectorAll(".slide");
    let dots = document.querySelectorAll(".dot");

    slides.forEach((slide, i) => {
        slide.style.display = i === index ? "block" : "none";
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
}

// Move to the next slide automatically
function autoSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
}

// Change slide manually and reset timer
function changeSlide(direction) {
    slideIndex += direction;
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    showSlide(slideIndex);
    resetAutoSlide();
}

function currentSlide(n) {
    clearInterval(slideTimer);
    slideIndex = n;
    showSlide(slideIndex);
    resetAutoSlide(); // Ensures the slideshow continues after manual selection
}

// Add event listeners to dots
document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.addEventListener("click", () => currentSlide(index));
});

// Reset the auto-slide timer
function resetAutoSlide() {
    clearInterval(slideTimer);
    slideTimer = setInterval(autoSlide, 3000);
}

// Auto-slide function
function autoSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
}

document.addEventListener("DOMContentLoaded", () => {
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => currentSlide(index));
    });
});

// Event listeners for navigation arrows
nextButton.addEventListener("click", () => changeSlide(1));
prevButton.addEventListener("click", () => changeSlide(-1));

// Initialize slideshow
showSlide(slideIndex);
slideTimer = setInterval(autoSlide, 3000);


// Project Search
const searchInput = document.getElementById("search");
searchInput.addEventListener("keyup", () => {
    let filter = searchInput.value.toLowerCase();
    let projects = document.querySelectorAll(".project");
    projects.forEach(project => {
        let projectName = project.getAttribute("data-name").toLowerCase();
        if (projectName.includes(filter)) {
            project.style.display = "flex"; // Keep flex alignment
            project.style.justifyContent = "center"; // Ensure text stays centered
            project.style.alignItems = "center";
        } else {
            project.style.display = "none";
        }
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

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
};

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
