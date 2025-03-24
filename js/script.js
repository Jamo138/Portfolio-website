// Typing Effect
const textArray = ["Hi, My Name Is Michael", "Welcome To My Portfolio"];
let textIndex = 0;
let charIndex = 0;

const typeEffect = () => {
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
};

document.getElementById("typing-effect").classList.add("typing-font");
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

// Blog Comment System
const addComment = () => {
    const commentInput = document.getElementById("comment-input");
    const commentList = document.getElementById("comment-list");
    if (commentInput.value.trim() !== "") {
        const li = document.createElement("li");
        li.textContent = commentInput.value;
        commentList.appendChild(li);
        commentInput.value = "";
    }
};

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

        // Bar Chart (Blog Post Views Comparison)
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
            labels: data.blogPosts.map(post => post.title),
            datasets: [{
                label: 'Number of Comments',
                data: data.blogPosts.map(post => commentsCount[post.id] || 0),
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
                            boxWidth: 20, // Adjust box width to ensure text is not cut off
                            padding: 20 // Add padding to ensure text is fully visible
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
            dataTableBody.innerHTML = ''; // Clear existing table data

            filteredData.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.title || `Comment on Post ID: ${item.postId}`}</td>
                    <td>${item.progress ? `Progress: ${item.progress}%` : item.views ? `Views: ${item.views}` : item.content}</td>
                `;
                dataTableBody.appendChild(row);
            });
        };

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

            // Update charts to update without refreshing the page
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
                pieChart.data.labels = data.blogPosts.map(post => post.title);
                pieChart.data.datasets[0].data = data.blogPosts.map(post => commentsCount[post.id] || 0);
                pieChart.update();
            }
        };

        filterBtn.addEventListener('click', filterData);

        // Initial population of the table
        filterData();

        // Make the table interactive
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
    } catch (error) {
        console.error('Error loading the data:', error);
        alert('Failed to load data. Please try again later.');
    }
};

fetchData();

