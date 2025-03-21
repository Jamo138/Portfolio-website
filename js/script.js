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

// Add typing effect class and start the effect
document.getElementById("typing-effect").classList.add("typing-font");
typeEffect();

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
