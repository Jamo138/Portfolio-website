// Typing Effect
const typingEffectElement = document.getElementById("typing-effect");
const textArray = JSON.parse(typingEffectElement.getAttribute("data-text"));
let textIndex = 0;
let charIndex = 0;

const typeEffect = () => {
    if (charIndex < textArray[textIndex].length) {
        typingEffectElement.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 100);
    } else {
        setTimeout(() => {
            typingEffectElement.textContent = "";
            charIndex = 0;
            textIndex = (textIndex + 1) % textArray.length;
            typeEffect();
        }, 2000);
    }
};

typingEffectElement.classList.add("typing-font");
typeEffect();

// Project Search
const searchInput = document.getElementById("search");
searchInput.addEventListener("keyup", () => {
    const filter = searchInput.value.toLowerCase();
    const projects = document.querySelectorAll(".project");
    projects.forEach(project => {
        const projectName = project.getAttribute("data-name").toLowerCase();
        project.style.display = projectName.includes(filter) ? "flex" : "none";
    });
});

// Modal Functions
const openModal = (modalId) => {
    document.getElementById(modalId).style.display = 'block';
};

const closeModal = (modalId) => {
    document.getElementById(modalId).style.display = 'none';
};

// Blog Search
const blogSearchInput = document.getElementById("blog-search");
blogSearchInput.addEventListener("keyup", () => {
    const filter = blogSearchInput.value.toLowerCase();
    const blogPosts = document.querySelectorAll(".blog-post");
    blogPosts.forEach(post => {
        const postTitle = post.querySelector("h3").textContent.toLowerCase();
        post.style.display = postTitle.includes(filter) ? "block" : "none";
    });
});

// Toggle Blog Post Content
document.querySelectorAll('.toggle-content-btn').forEach(button => {
    button.addEventListener('click', () => {
        const blogPost = button.closest('.blog-post');
        const fullContent = blogPost.querySelector('.full-content');
        const isExpanded = fullContent.classList.toggle('expanded');
        button.textContent = isExpanded ? 'Read Less' : 'Read More';
    });
});

// Blog Comment System
const loadComments = () => {
    const comments = JSON.parse(localStorage.getItem('comments')) || {};
    document.querySelectorAll('.comments-list').forEach(list => {
        const postId = list.getAttribute('data-post-id');
        list.innerHTML = '';
        (comments[postId] || []).forEach(comment => {
            const li = document.createElement('li');
            li.textContent = comment;
            list.appendChild(li);
        });
    });
};

//Save Comments to Local Storage
const saveComment = (postId, comment) => {
    const comments = JSON.parse(localStorage.getItem('comments')) || {};
    if (!comments[postId]) {
        comments[postId] = [];
    }
    comments[postId].push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));
};

document.querySelectorAll('.add-comment-btn').forEach(button => {
    button.addEventListener('click', () => {
        const postId = button.getAttribute('data-post-id');
        const input = document.querySelector(`.comment-input[data-post-id="${postId}"]`);
        const comment = input.value.trim();
        if (comment) {
            saveComment(postId, comment);
            loadComments();
            input.value = '';
        }
    });
});

loadComments();

// Contact Form Validation
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", event => {
    event.preventDefault();
    document.getElementById("confirmation-message").style.display = "block";
    contactForm.reset();
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.onscroll = () => {
    scrollToTopBtn.classList.toggle('show', document.body.scrollTop > 20 || document.documentElement.scrollTop > 20);
};

const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};

// FadeIn Scroll Animation
const fadeInElements = document.querySelectorAll('.fade-in');

const handleScrollAnimation = () => {
    fadeInElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        } else {
            element.classList.remove('visible');
        }
    });
};

window.addEventListener('scroll', handleScrollAnimation);

// Trigger animation on page load
handleScrollAnimation();

// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme") || "dark";

document.body.classList.toggle("light-theme", currentTheme === "light");

themeToggle.addEventListener("click", () => {
    const isLightTheme = document.body.classList.toggle("light-theme");
    localStorage.setItem("theme", isLightTheme ? "light" : "dark");
    updateChartColors();
});

// Dashboard
const fetchData = async () => {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

        // Line Chart (Project Progress Over Time)
        const lineChartData = {
            labels: data.projects.map(project => project.title),
            datasets: [{
                label: 'Project Progress',
                data: data.projects.map(project => project.progress),
                fill: false,
                borderColor: '#8ab4f8',
                backgroundColor: '#8ab4f8',
                tension: 0.1
            }]
        };

        const lineChartConfig = {
            type: 'line',
            data: lineChartData,
            options: {
                responsive: true,
                scales: {
                    x: { 
                        title: { display: true, text: '', color: '#ddd' },
                        ticks: { color: '#ddd' }
                    },
                    y: { 
                        title: { display: true, text: 'Progress (%)', color: '#ddd' }, 
                        min: 0, 
                        max: 100,
                        ticks: { color: '#ddd' }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#ddd'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => `Progress: ${context.raw}%`
                        }
                    }
                },
                onClick: (e, elements) => {
                    if (elements.length > 0) {
                        const index = elements[0].index;
                        alert(`Project: ${lineChartData.labels[index]}\nProgress: ${lineChartData.datasets[0].data[index]}%`);
                    }
                }
            }
        };

        const lineChart = new Chart(document.getElementById('lineChart'), lineChartConfig);

        // Bar Chart (Blog Post Views)
        const barChartData = {
            labels: data.blogPosts.map(post => post.title),
            datasets: [{
                label: 'Blog Post Views',
                data: data.blogPosts.map(post => post.views),
                backgroundColor: 'rgba(138, 180, 248, 0.2)',
                borderColor: '#8ab4f8',
                borderWidth: 1
            }]
        };

        const barChartConfig = {
            type: 'bar',
            data: barChartData,
            options: {
                responsive: true,
                scales: {
                    x: {
                        ticks: { color: '#ddd' }
                    },
                    y: { 
                        beginAtZero: true, 
                        title: { display: true, text: 'Views', color: '#ddd' },
                        ticks: { color: '#ddd' }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#ddd'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => `Views: ${context.raw}`
                        }
                    }
                },
                onClick: (e, elements) => {
                    if (elements.length > 0) {
                        const index = elements[0].index;
                        alert(`Blog Post: ${barChartData.labels[index]}\nViews: ${barChartData.datasets[0].data[index]}`);
                    }
                }
            }
        };

        const barChart = new Chart(document.getElementById('barChart'), barChartConfig);

        // Pie Chart (Top Blog Posts by Number of Comments)
        const commentsCount = data.comments.reduce((acc, comment) => {
            acc[comment.postId] = (acc[comment.postId] || 0) + 1;
            return acc;
        }, {});

        const pieChartData = {
            labels: Object.keys(commentsCount),
            datasets: [{
                label: 'Number of Comments',
                data: Object.values(commentsCount),
                backgroundColor: ['#8ab4f8', '#6c9ce8', '#4e84d8', '#306cc8'],
            }]
        };

        const pieChartConfig = {
            type: 'pie',
            data: pieChartData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                        align: 'center',
                        labels: {
                            color: '#ddd',
                            boxWidth: 20, 
                            padding: 20 
                        }
                    },
                    title: {
                        display: true,
                        text: 'Blog Post Comments',
                        color: '#ddd',
                        font: {
                            weight: 'normal'
                        },
                        padding: {
                            top: 10,
                            bottom: 30
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => `Comments: ${context.raw}`
                        }
                    }
                },
                layout: {
                    padding: {
                        right: 20
                    }
                },
                onClick: (e, elements) => {
                    if (elements.length > 0) {
                        const index = elements[0].index;
                        alert(`Blog Post: ${pieChartData.labels[index]}\nComments: ${pieChartData.datasets[0].data[index]}`);
                    }
                }
            }
        };

        const pieChart = new Chart(document.getElementById('pieChart'), pieChartConfig);

        // Populate data table
        const dataTableBody = document.querySelector('#dataTable tbody');
        const filterBtn = document.getElementById('filter-btn');
        const dataTypeSelect = document.getElementById('data-type');
        const startDateInput = document.getElementById('start-date');
        const endDateInput = document.getElementById('end-date');

        const populateTable = (filteredData) => {
            dataTableBody.innerHTML = ''; //

            filteredData.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.title || `Comment on Post: ${item.postId}`}</td>
                    <td>${item.progress ? `Progress: ${item.progress}%` : item.views ? `Views: ${item.views}` : item.content}</td>
                `;
                dataTableBody.appendChild(row);
            });
        };

        // Filter data based on selected type and date range
        const filterData = () => {
            const dataType = dataTypeSelect.value;
            const startDate = new Date(startDateInput.value);
            const endDate = new Date(endDateInput.value);
            let filteredData = [];

            if (dataType === 'projects') {
                filteredData = data.projects.filter(project => {
                    const projectDate = new Date(project.date);
                    return (!startDateInput.value || projectDate >= startDate) && (!endDateInput.value || projectDate <= endDate);
                });
            } else if (dataType === 'blog') {
                filteredData = data.blogPosts.filter(post => {
                    const postDate = new Date(post.date);
                    return (!startDateInput.value || postDate >= startDate) && (!endDateInput.value || postDate <= endDate);
                });
            } else if (dataType === 'comments') {
                filteredData = data.comments.filter(comment => {
                    const commentDate = new Date(comment.date);
                    return (!startDateInput.value || commentDate >= startDate) && (!endDateInput.value || commentDate <= endDate);
                });
            }

            populateTable(filteredData);

            // Set charts to update without refreshing the page
            if (dataType === 'projects') {
                lineChart.data.labels = filteredData.map(project => project.title);
                lineChart.data.datasets[0].data = filteredData.map(project => project.progress);
                lineChart.update();
            } else if (dataType === 'blog') {
                barChart.data.labels = filteredData.map(post => post.title);
                barChart.data.datasets[0].data = filteredData.map(post => post.views);
                barChart.update();
            } else if (dataType === 'comments') {
                const commentsCount = filteredData.reduce((acc, comment) => {
                    acc[comment.postId] = (acc[comment.postId] || 0) + 1;
                    return acc;
                }, {});
                pieChart.data.labels = Object.keys(commentsCount);
                pieChart.data.datasets[0].data = Object.values(commentsCount);
                pieChart.update();
            }
        };

        filterBtn.addEventListener('click', filterData);

        filterData();

        // Ensures the table is interactive
        const dataTable = document.getElementById('dataTable');
        const headers = dataTable.querySelectorAll('th');
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const tableBody = dataTable.querySelector('tbody');
                const rows = Array.from(tableBody.querySelectorAll('tr'));
                const index = Array.from(headers).indexOf(header);
                const ascending = header.classList.contains('asc');
                header.classList.toggle('asc', !ascending);
                header.classList.toggle('desc', ascending);

                rows.sort((a, b) => {
                    const cellA = a.children[index].textContent.trim();
                    const cellB = b.children[index].textContent.trim();
                    return ascending ? cellB.localeCompare(cellA) : cellA.localeCompare(cellB);
                });

                rows.forEach(row => tableBody.appendChild(row));
            });
        });

        // Ensures chart text colors match the theme
        const updateChartColors = () => {
            const isLightTheme = document.body.classList.contains("light-theme");
            const textColor = isLightTheme ? "#000000" : "#ddd";

            // Update Line Chart
            lineChart.options.scales.x.ticks.color = textColor;
            lineChart.options.scales.y.ticks.color = textColor;
            lineChart.options.scales.y.title.color = textColor;
            lineChart.options.plugins.legend.labels.color = textColor;
            lineChart.options.plugins.tooltip.bodyColor = textColor;
            lineChart.update();

            // Update Bar Chart
            barChart.options.scales.x.ticks.color = textColor;
            barChart.options.scales.y.ticks.color = textColor;
            barChart.options.scales.y.title.color = textColor;
            barChart.options.plugins.legend.labels.color = textColor;
            barChart.options.plugins.tooltip.bodyColor = textColor;
            barChart.update();

            // Update Pie Chart
            pieChart.options.plugins.legend.labels.color = textColor;
            pieChart.options.plugins.title.color = textColor;
            pieChart.options.plugins.tooltip.bodyColor = textColor;
            pieChart.update();
        };

        // Call updateChartColors when theme changes
        themeToggle.addEventListener("click", updateChartColors);

        // Ensure chart text colors are updated on page load
        if (currentTheme === "light") {
            updateChartColors();
        }

        // Error handling for charts
    } catch (error) {
        console.error('Error loading the data:', error);
        alert('Failed to load data. Please try again later.');
    }
};

fetchData();

