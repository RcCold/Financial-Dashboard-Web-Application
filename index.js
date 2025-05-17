// Sidebar Toggle Function
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.querySelector('.content');
    const toggleBtn = document.getElementById('toggle-btn');

    if (sidebar.style.width === "0px" || sidebar.style.width === "") {
        sidebar.style.width = "250px";
        content.style.marginLeft = "250px";
        toggleBtn.innerText = "✖"; // Change to 'Close' icon when expanded
    } else {
        sidebar.style.width = "0";
        content.style.marginLeft = "0";
        toggleBtn.innerText = "☰"; // Reset to 'Menu' icon when collapsed
    }
}

// Display the Username in Sidebar
const currentUserEmail = localStorage.getItem('currentUser');
const usernameDisplay = document.getElementById('username');

if (currentUserEmail) {
    const currentUser = JSON.parse(localStorage.getItem(currentUserEmail));
    usernameDisplay.innerText = currentUser.username ? currentUser.username : "User";
}

// Logout Function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'signin.html'; // Redirect to the sign-in page
}

// Delete Account Function
function deleteAccount() {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        localStorage.removeItem(currentUserEmail);
        window.location.href = 'register.html'; // Redirect to the registration page
    }
}
