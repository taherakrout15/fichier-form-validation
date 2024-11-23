document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".login-form form");
    const signupForm = document.querySelector(".signup-form form");

    // Function to validate email
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to validate password
    function validatePassword(password) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    // Function to show error message
    function showError(input, message) {
        const parent = input.parentElement;
        const error = parent.querySelector(".error-message");

        if (error) {
            error.textContent = message;
        } else {
            const errorMessage = document.createElement("span");
            errorMessage.className = "error-message";
            errorMessage.style.color = "red";
            errorMessage.style.fontSize = "12px";
            errorMessage.textContent = message;
            parent.appendChild(errorMessage);
        }
    }

    // Function to clear error message
    function clearError(input) {
        const parent = input.parentElement;
        const error = parent.querySelector(".error-message");

        if (error) {
            error.textContent = "";
        }
    }

    // Real-time validation for Signup Form
    signupForm.addEventListener("input", (event) => {
        const input = event.target;
        const name = signupForm.querySelector("input[name='name']");
        const email = signupForm.querySelector("input[name='email']");
        const password = signupForm.querySelector("input[name='password']");

        if (input === name && name.value.trim().length === 0) {
            showError(name, "Name is required.");
        } else if (input === email && !validateEmail(email.value.trim())) {
            showError(email, "Invalid email format.");
        } else if (
            input === password &&
            !validatePassword(password.value.trim())
        ) {
            showError(
                password,
                "Password must be at least 8 characters, include one uppercase, one number, and one special character."
            );
        } else {
            clearError(input);
        }
    });

    // Real-time validation for Login Form
    loginForm.addEventListener("input", (event) => {
        const input = event.target;
        const email = loginForm.querySelector("input[name='email']");
        const password = loginForm.querySelector("input[name='password']");

        if (input === email && !validateEmail(email.value.trim())) {
            showError(email, "Invalid email format.");
        } else if (input === password && password.value.trim().length === 0) {
            showError(password, "Password is required.");
        } else {
            clearError(input);
        }
    });

    // Prevent submission if errors exist and redirect if valid for Signup Form
    signupForm.addEventListener("submit", (event) => {
        const name = signupForm.querySelector("input[name='name']");
        const email = signupForm.querySelector("input[name='email']");
        const password = signupForm.querySelector("input[name='password']");
        let isValid = true;

        if (name.value.trim().length === 0) {
            showError(name, "Name is required.");
            isValid = false;
        }
        if (!validateEmail(email.value.trim())) {
            showError(email, "Invalid email format.");
            isValid = false;
        }
        if (!validatePassword(password.value.trim())) {
            showError(
                password,
                "Password must be at least 8 characters, include one uppercase, one number, and one special character."
            );
            isValid = false;
        }

        if (isValid) {
            // Redirect to quizz.html if valid
            window.location.href = "quizz.html";
        } else {
            event.preventDefault(); // Prevent form submission
        }
    });

    // Prevent submission if errors exist and redirect if valid for Login Form
    loginForm.addEventListener("submit", (event) => {
        const email = loginForm.querySelector("input[name='email']");
        const password = loginForm.querySelector("input[name='password']");
        let isValid = true;

        if (!validateEmail(email.value.trim())) {
            showError(email, "Invalid email format.");
            isValid = false;
        }
        if (password.value.trim().length === 0) {
            showError(password, "Password is required.");
            isValid = false;
        }

        if (isValid) {
            // Redirect to quizz.html if valid
            window.location.href = "quizz.html";
        } else {
            event.preventDefault(); // Prevent form submission
        }
    });
});