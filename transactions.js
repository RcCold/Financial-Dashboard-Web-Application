// Sidebar Toggle Function
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.querySelector('.content');
    const toggleBtn = document.getElementById('toggle-btn');

    if (sidebar.style.width === "0px" || sidebar.style.width === "") {
        sidebar.style.width = "250px";
        content.style.marginLeft = "250px";
        toggleBtn.innerText = "✖";
    } else {
        sidebar.style.width = "0";
        content.style.marginLeft = "0";
        toggleBtn.innerText = "☰";
    }
}

// Booth locations and services with revenue per Kwacha
const boothLocations = {
    'Wina1': 'Lusaka CPD',
    'Wina2': 'Libala',
    'Wina3': 'Kabwata',
    'Wina4': 'Mandevu',
    'Wina5': 'Woodlands',
    'Wina6': 'Matero East'
};
const boothServices = {
    'Wina1': { 'Airtel Money': 0.05, 'MTN Money': 0.06, 'Zamtel Money': 0.045, 'Zanaco': 0.035, 'FNB': 0.04 },
    'Wina2': { 'Airtel Money': 0.05, 'MTN Money': 0.06, 'Zamtel Money': 0.045, 'FNB': 0.04 },
    'Wina3': { 'Airtel Money': 0.05, 'MTN Money': 0.06, 'Zamtel Money': 0.045, 'Zanaco': 0.035, 'FNB': 0.04 },
    'Wina4': { 'Airtel Money': 0.05, 'MTN Money': 0.06, 'Zamtel Money': 0.045 },
    'Wina5': { 'Airtel Money': 0.05, 'MTN Money': 0.06, 'Zanaco': 0.035, 'FNB': 0.04 },
    'Wina6': { 'Airtel Money': 0.05, 'MTN Money': 0.06, 'Zamtel Money': 0.045 }
};

// Elements
const boothSelect = document.getElementById('booth');
const locationDisplay = document.getElementById('location');
const serviceSelect = document.getElementById('service');
const revenueDisplay = document.getElementById('revenue');
const amountInput = document.getElementById('amount');
const transactionRevenueDisplay = document.getElementById('transaction-revenue');
const transactionHistory = document.getElementById('transaction-history');

// Populate Services and Location based on Booth Selection
boothSelect.addEventListener('change', () => {
    const selectedBooth = boothSelect.value;
    locationDisplay.value = boothLocations[selectedBooth] || '';

    serviceSelect.innerHTML = '<option value="">Select Service</option>';
    if (boothServices[selectedBooth]) {
        Object.keys(boothServices[selectedBooth]).forEach(service => {
            const option = document.createElement('option');
            option.value = service;
            option.textContent = service;
            serviceSelect.appendChild(option);
        });
    }
    revenueDisplay.value = ''; // Reset revenue display
});

// Update Revenue Display based on Service Selection
serviceSelect.addEventListener('change', () => {
    const selectedBooth = boothSelect.value;
    const selectedService = serviceSelect.value;
    revenueDisplay.value = boothServices[selectedBooth]?.[selectedService] || '';
});

// Generate a transaction ID
function generateTransactionId() {
    return `WB${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
}

// Save Transaction to Local Storage
function saveTransactionHistory(transaction) {
    const history = JSON.parse(localStorage.getItem("transactionHistory")) || [];
    history.unshift(transaction); // Add new transaction at the start
    localStorage.setItem("transactionHistory", JSON.stringify(history));
}

// Display Latest Transactions
function displayTransactionHistory() {
    const history = JSON.parse(localStorage.getItem("transactionHistory")) || [];
    transactionHistory.innerHTML = history.slice(0, 10).map(entry => `
        <li>${entry.date} - ${entry.booth} - ${entry.service} - Amount: ${entry.amount}, Revenue: ${entry.revenue}</li>
    `).join('');
}

// Handle Transaction Submission
document.getElementById('transactionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedBooth = boothSelect.value;
    const selectedService = serviceSelect.value;
    const transactionAmount = parseFloat(amountInput.value);

    if (!selectedBooth || !selectedService || transactionAmount <= 0) {
        alert("Please fill out all fields correctly.");
        return;
    }

    const revenuePerKwacha = boothServices[selectedBooth][selectedService];
    const transactionRevenue = transactionAmount * revenuePerKwacha;

    transactionRevenueDisplay.innerText = `Revenue: ${transactionRevenue.toFixed(2)}`;

    const transaction = {
        id: generateTransactionId(),
        booth: selectedBooth,
        service: selectedService,
        amount: transactionAmount,
        revenue: transactionRevenue.toFixed(2),
        date: new Date().toLocaleString()
    };
    saveTransactionHistory(transaction);
    displayTransactionHistory();
});

window.onload = displayTransactionHistory;

// Authentication and Sidebar
const currentUserEmail = localStorage.getItem('currentUser');
const usernameDisplay = document.getElementById('username');

if (currentUserEmail) {
    const currentUser = JSON.parse(localStorage.getItem(currentUserEmail));
    usernameDisplay.innerText = currentUser?.username || "User";
} else {
    window.location.href = "signin.html";
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'signin.html';
}

function deleteAccount() {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        localStorage.removeItem(currentUserEmail);
        window.location.href = 'register.html';
    }
}