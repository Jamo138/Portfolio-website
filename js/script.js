// Typing Effect
const textArray = ["Hi, My Name Is Michael", "Welcome To My Portfolio"];
let textIndex = 0;
let charIndex = 0;

const typeEffect = () => {
    // Check if there are more characters to type
    if (charIndex < textArray[textIndex].length) {
        // Add the next character to the typing effect element
        document.getElementById("typing-effect").textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 100); // Type the next character after 100ms
    } else {
        // Wait for 2 seconds before clearing the text and starting the next string
        setTimeout(() => {
            document.getElementById("typing-effect").textContent = "";
            charIndex = 0;
            textIndex = (textIndex + 1) % textArray.length; // Loop back to the first string
            typeEffect();
        }, 2000);
    }
};

// Add typing effect class and start the effect
document.getElementById("typing-effect").classList.add("typing-font");
typeEffect();

// Project Search
const searchInput = document.getElementById("search");
searchInput.addEventListener("keyup", () => {
    const filter = searchInput.value.toLowerCase();
    const projects = document.querySelectorAll(".project");
    projects.forEach(project => {
        const projectName = project.getAttribute("data-name").toLowerCase();
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
    // Show or hide the scroll to top button based on scroll position
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
};

const scrollToTop = () => {
    // Scroll to the top of the page
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};

// Fetch Data Function
const fetchData = async (type) => {
    try {
        // Fetch data based on the selected type (projects or blog posts)
        const response = await fetch(type === 'projects' ? 'https://jsonplaceholder.typicode.com/posts' : 'https://jsonplaceholder.typicode.com/comments');
        // Check if the response is not ok (status code is not in the range 200-299)
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.json();

        data[0].title = "🚀 Manually Updated Post Title!";
        data[2].title = "🚀 Manually Updated Post Title!";

        console.log('Fetched data:', data); // Debug log
        return data.slice(0, 20); // Limit to 20 data points
    } catch (error) {
        // Log the error to the console and show an alert to the user
        console.error('Error fetching data:', error);
        alert('Failed to fetch data. Please try again later.');
        return [];
    }
};

// Filter Data by Date
const filterDataByDate = (data, startDate, endDate) => {
    return data.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
    });
};

// Render Data Table
const renderTable = (data) => {
    console.log('Rendering table with data:', data); // Debug log
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = '';
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.title || item.name}</td>
            <td>${item.body}</td>
        `;
        tableBody.appendChild(row);
    });
};

// Render Charts
const renderCharts = (data) => {
    console.log('Rendering charts with data:', data); // Debug log
    const ctxLine = document.getElementById('lineChart').getContext('2d');
    const ctxBar = document.getElementById('barChart').getContext('2d');
    const ctxPie = document.getElementById('pieChart').getContext('2d');

    const labels = data.map(item => item.id);
    const values = data.map(item => item.id % 100);

    // Line Chart
    const lineChart = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Project Progress',
                data: values,
                borderColor: '#8ab4f8',
                backgroundColor: 'rgba(138, 180, 248, 0.2)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Project ID'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Progress'
                    }
                }
            },
            plugins: {
                tooltip: {
                    enabled: true // Enable tooltips
                }
            },
            onClick: (event, elements) => {
                if (elements.length > 0) {
                    const elementIndex = elements[0].index;
                    const elementData = data[elementIndex];
                    alert(`Clicked on Project ID: ${elementData.id}\nTitle: ${elementData.title || elementData.name}`);
                }
            }
        }
    });

    // Bar Chart
    const barChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Blog Post Views',
                data: values,
                backgroundColor: 'rgba(138, 180, 248, 0.8)',
                borderColor: '#8ab4f8',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Blog Post ID'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Views'
                    }
                }
            },
            plugins: {
                tooltip: {
                    enabled: true // Enable tooltips
                }
            },
            onClick: (event, elements) => {
                if (elements.length > 0) {
                    const elementIndex = elements[0].index;
                    const elementData = data[elementIndex];
                    alert(`Clicked on Blog Post ID: ${elementData.id}\nTitle: ${elementData.title || elementData.name}`);
                }
            }
        }
    });

    // Pie Chart
    const pieChart = new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: labels.slice(0, 5),
            datasets: [{
                data: values.slice(0, 5),
                backgroundColor: ['#8ab4f8', '#a0c4ff', '#6c9ce8', '#4a8cf8', '#2a6cf8']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Top 5 Data Points'
                },
                tooltip: {
                    enabled: true // Enable tooltips
                }
            },
            onClick: (event, elements) => {
                if (elements.length > 0) {
                    const elementIndex = elements[0].index;
                    const elementData = data[elementIndex];
                    alert(`Clicked on Data Point ID: ${elementData.id}\nTitle: ${elementData.title || elementData.name}`);
                }
            }
        }
    });

    return { lineChart, barChart, pieChart };
};

// Initialize Dashboard
const initDashboard = async () => {
    const dataType = document.getElementById('data-type').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    let data = await fetchData(dataType);
    if (startDate && endDate) {
        data = filterDataByDate(data, startDate, endDate);
    }
    renderTable(data);
    const charts = renderCharts(data);
    return charts;
};

// Event Listener for Data Type Change
document.getElementById('data-type').addEventListener('change', async () => {
    const charts = await initDashboard();
    charts.lineChart.update();
    charts.barChart.update();
    charts.pieChart.update();
});

// Event Listener for Filter Button
document.getElementById('filter-btn').addEventListener('click', async () => {
    const charts = await initDashboard();
    charts.lineChart.update();
    charts.barChart.update();
    charts.pieChart.update();
});

// Initial Load
initDashboard(); // Load the dashboard data when the page loads
