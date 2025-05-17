// Retrieve and display the username in the sidebar
const currentUserEmail = localStorage.getItem('currentUser');
const usernameDisplay = document.getElementById('username');

if (currentUserEmail) {
    const currentUser = JSON.parse(localStorage.getItem(currentUserEmail));
    usernameDisplay.innerText = currentUser?.username || "User";
} else {
    window.location.href = "signin.html"; // Redirect if not logged in
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'signin.html';
}

// Delete Account function
function deleteAccount() {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        localStorage.removeItem(currentUserEmail);
        window.location.href = 'register.html';
    }
}

// Sidebar Toggle function
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.querySelector('.content');
    const toggleBtn = document.getElementById('toggle-btn');

    if (sidebar.style.width === "250px") {
        sidebar.style.width = "0";
        content.style.marginLeft = "0";
        toggleBtn.innerText = "☰";
    } else {
        sidebar.style.width = "250px";
        content.style.marginLeft = "250px";
        toggleBtn.innerText = "✖";
    }
}

// Load and display transaction history from local storage (most recent first)
function loadTransactionHistory() {
    const tableBody = document.getElementById('transaction-table-body');
    const history = JSON.parse(localStorage.getItem("transactionHistory")) || [];

    // Sort history by most recent date at the top
    const sortedHistory = history.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Populate table with transaction data
    tableBody.innerHTML = sortedHistory.map(transaction => `
        <tr>
            <td>${transaction.id}</td>
            <td>${transaction.date}</td>
            <td>${transaction.booth}</td>
            <td>${transaction.service}</td>
            <td>${transaction.amount}</td>
            <td>${transaction.revenue}</td>
        </tr>
    `).join('');
}

// Run on page load
document.addEventListener('DOMContentLoaded', loadTransactionHistory);
