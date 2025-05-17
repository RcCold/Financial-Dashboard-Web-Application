// Show Password Toggle
document.getElementById('showPassword').addEventListener('change', function() {
    const passwordField = document.getElementById('password');
    passwordField.type = this.checked ? 'text' : 'password';
});

// Password Strength Checker
document.getElementById('password').addEventListener('input', function() {
    const password = this.value;
    const strengthText = document.getElementById('passwordStrength');
    
    // Password validation regex
    const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password);
    
    if (isValid) {
        strengthText.textContent = "Strong password!";
        strengthText.style.color = "green";
    } else {
        strengthText.textContent = "Password must include uppercase, lowercase, number, and special character.";
        strengthText.style.color = "red";
    }
});

// Registration Form Submission
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Check if password is strong
    const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password);
    if (!isValidPassword) {
        alert("Please enter a stronger password.");
        return;
    }

    // Save user details in localStorage
    const newUser = { username, email, password };
    localStorage.setItem(email, JSON.stringify(newUser));

    // Redirect to the sign-in page
    window.location.href = 'signin.html';
});
