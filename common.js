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

// Logout Function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'signin.html'; // Redirect to the sign-in page
}

// Delete Account Function
function deleteAccount() {
    const currentUserEmail = localStorage.getItem('currentUser');
    if (currentUserEmail) {
        if (confirm('Are you sure you want to delete your account? This action is irreversible.')) {
            localStorage.removeItem(currentUserEmail); // Remove user data
            localStorage.removeItem('currentUser'); // Clear current user session
            window.location.href = 'register.html'; // Redirect to the registration page
        }
    } else {
        alert("No user is currently logged in.");
    }
}

// Display Username in Sidebar
document.addEventListener('DOMContentLoaded', function() {
    const currentUserEmail = localStorage.getItem('currentUser');
    const usernameDisplay = document.getElementById('username');
    if (currentUserEmail && usernameDisplay) {
        const currentUser = JSON.parse(localStorage.getItem(currentUserEmail));
        usernameDisplay.innerText = currentUser?.username || "User";
    }
});
