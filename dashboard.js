// Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.querySelector('.content');
    const toggleBtn = document.getElementById('toggle-btn');

    if (sidebar.style.width === "0px" || sidebar.style.width === "") {
        sidebar.style.width = "250px";
        content.style.marginLeft = "250px";
        toggleBtn.innerText = "✖"; // Close icon when expanded
    } else {
        sidebar.style.width = "0";
        content.style.marginLeft = "0";
        toggleBtn.innerText = "☰"; // Menu icon when collapsed
    }
}

// Monthly limits per service
const monthlyLimits = {
    'Airtel Money': 350000,
    'MTN Money': 160000,
    'Zamtel Money': 70000,
    'Zanaco': 80000,
    'FNB': 80000
};

// Load and process transaction data from Local Storage
function fetchAndProcessTransactions() {
    const transactions = JSON.parse(localStorage.getItem("transactionHistory")) || [];
    const revenueTotals = {};
    const remainingLimits = { ...monthlyLimits };

    transactions.forEach(transaction => {
        revenueTotals[transaction.service] = (revenueTotals[transaction.service] || 0) + parseFloat(transaction.revenue);
        remainingLimits[transaction.service] -= parseFloat(transaction.amount);
    });

    return { revenueTotals, remainingLimits };
}

// Initialize and Update Dashboard Charts
function updateDashboard() {
    const { revenueTotals, remainingLimits } = fetchAndProcessTransactions();
    const services = Object.keys(monthlyLimits);

    // Populate Summary List
    const summaryList = document.getElementById("dashboard-summary-list");
    summaryList.innerHTML = "";
    services.forEach(service => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${service}</strong> - Total Revenue: ${revenueTotals[service] || 0}, Remaining Limit: ${remainingLimits[service]}`;
        summaryList.appendChild(listItem);
    });

    // Update Pie Chart (Revenue Distribution by Service)
    const pieCtx = document.getElementById("activityPieChart").getContext("2d");
    const pieChartData = services.map(service => revenueTotals[service] || 0);
    new Chart(pieCtx, {
        type: "pie",
        data: {
            labels: services,
            datasets: [{
                data: pieChartData,
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"]
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'top' } }
        }
    });

    // Update Bar Chart (Remaining Monthly Limit per Service)
    const barCtx = document.getElementById("activityBarChart").getContext("2d");
    const barChartData = services.map(service => remainingLimits[service]);
    new Chart(barCtx, {
        type: "bar",
        data: {
            labels: services,
            datasets: [{
                label: "Remaining Monthly Limit",
                data: barChartData,
                backgroundColor: "#36A2EB"
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } }
        }
    });
}

// Run update on page load
document.addEventListener("DOMContentLoaded", updateDashboard);

// Authentication (Display username and manage account actions)
const currentUserEmail = localStorage.getItem("currentUser");
const usernameDisplay = document.getElementById("username");
if (currentUserEmail) {
    const currentUser = JSON.parse(localStorage.getItem(currentUserEmail));
    usernameDisplay.innerText = currentUser.username || "User";
} else {
    window.location.href = "signin.html";
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "signin.html";
}

function deleteAccount() {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        localStorage.removeItem(currentUserEmail);
        logout();
    }
}
