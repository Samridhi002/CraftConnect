// login.js
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');

    function showRegister() {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        registerForm.style.animation = 'none';
        registerForm.offsetHeight; // Trigger reflow
        registerForm.style.animation = null;
    }

    function showLogin() {
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
        loginForm.style.animation = 'none';
        loginForm.offsetHeight; // Trigger reflow
        loginForm.style.animation = null;
    }

    showRegisterLink.addEventListener('click', function(e) {
        e.preventDefault();
        showRegister();
    });

    showLoginLink.addEventListener('click', function(e) {
        e.preventDefault();
        showLogin();
    });

    // Add floating animation to background items
    const backgroundContainer = document.querySelector('.background-container');
    for (let i = 0; i < 20; i++) {
        const craftItem = document.createElement('div');
        craftItem.classList.add('craft-item');
        craftItem.style.setProperty('--i', Math.random() * 10);
        craftItem.style.left = `${Math.random() * 100}%`;
        craftItem.style.top = `${Math.random() * 100}%`;
        craftItem.innerHTML = '<i class="fas fa-paint-brush"></i>';
        backgroundContainer.appendChild(craftItem);
    }

    // Add form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const inputs = form.querySelectorAll('input');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });

            if (isValid) {
                alert('Form submitted successfully!');
                form.reset();
            }
        });
    });

    // Add input animation
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});