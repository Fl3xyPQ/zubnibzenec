// ================================
// PATIENT LOGIN & DASHBOARD SYSTEM
// ================================

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const loginTrigger = document.querySelector('.login-trigger');
    const authModal = document.getElementById('authModal');
    const authModalClose = document.querySelector('.auth-modal-close');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterBtn = document.getElementById('showRegister');
    const showLoginBtn = document.getElementById('showLogin');
    const loginFormSubmit = document.getElementById('loginFormSubmit');
    const registerFormSubmit = document.getElementById('registerFormSubmit');
    const patientDashboard = document.getElementById('patientDashboard');
    const dashboardClose = document.querySelector('.dashboard-close');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginMessage = document.getElementById('loginMessage');
    const registerMessage = document.getElementById('registerMessage');

    // Helper function to show messages
    function showMessage(element, message, type) {
        element.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
        element.className = `auth-message show ${type}`;
        setTimeout(() => {
            element.classList.remove('show');
        }, 5000);
    }

    // Check if user is logged in
    function checkLogin() {
        const user = JSON.parse(localStorage.getItem('dentalPatient'));
        if (user) {
            if (loginTrigger) {
                loginTrigger.innerHTML = '<i class="fas fa-user-circle"></i> ' + user.name.split(' ')[0];
            }
            return true;
        }
        return false;
    }

    // Show/Hide Modal
    if (loginTrigger) {
        loginTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            if (checkLogin()) {
                showDashboard();
            } else {
                authModal.classList.add('active');
            }
        });
    }

    if (authModalClose) {
        authModalClose.addEventListener('click', () => {
            authModal.classList.remove('active');
        });
    }

    // Click outside modal to close
    authModal?.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.classList.remove('active');
        }
    });

    // Switch between login and register
    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            loginMessage.classList.remove('show');
            registerMessage.classList.remove('show');
        });
    }

    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
            loginMessage.classList.remove('show');
            registerMessage.classList.remove('show');
        });
    }

    // Handle Registration
    if (registerFormSubmit) {
        registerFormSubmit.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const phone = document.getElementById('regPhone').value;
            const password = document.getElementById('regPassword').value;

            // Create user object
            const user = {
                name: name,
                email: email,
                phone: phone,
                password: password, // In real app, this should be hashed!
                registered: new Date().toLocaleDateString('cs-CZ')
            };

            // Save to localStorage
            localStorage.setItem('dentalPatient', JSON.stringify(user));

            // Show success message
            showMessage(registerMessage, 'Registrace úspěšná! Nyní se můžete přihlásit.', 'success');

            // Reset form and switch to login after 2 seconds
            registerFormSubmit.reset();
            setTimeout(() => {
                registerForm.style.display = 'none';
                loginForm.style.display = 'block';
                registerMessage.classList.remove('show');
            }, 2000);
        });
    }

    // Handle Login
    if (loginFormSubmit) {
        loginFormSubmit.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            const storedUser = JSON.parse(localStorage.getItem('dentalPatient'));

            if (storedUser && storedUser.email === email && storedUser.password === password) {
                showMessage(loginMessage, 'Přihlášení úspěšné! Otevírám váš účet...', 'success');
                setTimeout(() => {
                    authModal.classList.remove('active');
                    loginFormSubmit.reset();
                    loginMessage.classList.remove('show');
                    checkLogin();
                    showDashboard();
                }, 1500);
            } else {
                showMessage(loginMessage, 'Nesprávný email nebo heslo. Zkuste to prosím znovu.', 'error');
            }
        });
    }

    // Show Dashboard
    function showDashboard() {
        const user = JSON.parse(localStorage.getItem('dentalPatient'));
        if (!user) return;

        // Populate dashboard data
        document.getElementById('patientName').textContent = user.name;
        document.getElementById('patientEmail').textContent = user.email;
        document.getElementById('dashName').textContent = user.name;
        document.getElementById('dashEmail').textContent = user.email;
        document.getElementById('dashPhone').textContent = user.phone;
        document.getElementById('dashRegistered').textContent = user.registered;

        // Show dashboard
        patientDashboard.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Close Dashboard
    if (dashboardClose) {
        dashboardClose.addEventListener('click', () => {
            patientDashboard.style.display = 'none';
            document.body.style.overflow = '';
        });
    }

    // Click outside dashboard to close
    patientDashboard?.addEventListener('click', (e) => {
        if (e.target === patientDashboard) {
            patientDashboard.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Opravdu se chcete odhlásit?')) {
                localStorage.removeItem('dentalPatient');
                patientDashboard.style.display = 'none';
                document.body.style.overflow = '';
                if (loginTrigger) {
                    loginTrigger.innerHTML = '<i class="fas fa-user-circle"></i> Můj účet';
                }
                // Show success in modal next time
                setTimeout(() => {
                    if (loginMessage) {
                        showMessage(loginMessage, 'Byli jste úspěšně odhlášeni', 'success');
                    }
                }, 300);
            }
        });
    }

    // Quick Actions - close dashboard when clicked
    const quickActionLinks = document.querySelectorAll('.quick-actions .action-btn');
    quickActionLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Close dashboard only for internal links (not WhatsApp)
            if (!link.hasAttribute('target')) {
                patientDashboard.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    });

    // Payment buttons - demo functionality
    const payButtons = document.querySelectorAll('.btn-pay');
    payButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const paymentItem = this.closest('.payment-item');
            
            // Simulate payment
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Zpracovávám platbu...';
            btn.disabled = true;
            
            setTimeout(() => {
                // Mark as paid
                paymentItem.classList.remove('unpaid');
                paymentItem.classList.add('paid');
                
                // Update status
                const statusEl = paymentItem.querySelector('.payment-status');
                statusEl.className = 'payment-status status-paid';
                statusEl.innerHTML = '<i class="fas fa-check"></i> Zaplaceno';
                
                // Update date
                const dateEl = paymentItem.querySelector('.payment-date');
                const today = new Date().toLocaleDateString('cs-CZ');
                dateEl.innerHTML = `<i class="fas fa-calendar"></i> Uhrazeno: ${today}`;
                
                // Remove button
                this.remove();
                
                // Update total
                updatePaymentsTotal();
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'payment-success';
                successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Platba úspěšně provedena!';
                paymentItem.appendChild(successMsg);
                
                setTimeout(() => {
                    successMsg.remove();
                }, 3000);
            }, 1500);
        });
    });

    // Update payments total
    function updatePaymentsTotal() {
        const unpaidItems = document.querySelectorAll('.payment-item.unpaid');
        let total = 0;
        unpaidItems.forEach(item => {
            const amountText = item.querySelector('.payment-amount').textContent;
            const amount = parseInt(amountText.replace(/\D/g, ''));
            total += amount;
        });
        
        const summaryItem = document.querySelector('.payments-summary .summary-item strong');
        if (summaryItem) {
            summaryItem.textContent = total.toLocaleString('cs-CZ') + ' Kč';
        }
    }

    // Initialize - check if logged in
    checkLogin();
});
