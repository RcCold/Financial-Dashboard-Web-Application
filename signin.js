document.getElementById('showPassword').addEventListener('change', function() {
    const passwordField = document.getElementById('password');
    passwordField.type = this.checked ? 'text' : 'password';
});

document.getElementById('signinForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    const storedUser = JSON.parse(localStorage.getItem(email));

    if (storedUser && storedUser.password === password) {
        // Store the current user session
        localStorage.setItem('currentUser', email);

        // Handle "Remember Me" option
        if (rememberMe) {
            // Store user permanently
            localStorage.setItem('rememberUser', email);
        } else {
            // Remove any previous "Remember Me" setting
            localStorage.removeItem('rememberUser');
        }

        // Redirect to the main content page (e.g., index.html)
        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password. Please try again.');
    }
});

// Auto-fill email if "Remember Me" was previously selected
document.addEventListener('DOMContentLoaded', function() {
    const rememberedUser = localStorage.getItem('rememberUser');
    if (rememberedUser) {
        document.getElementById('email').value = rememberedUser;
        document.getElementById('rememberMe').checked = true;
    }
});
