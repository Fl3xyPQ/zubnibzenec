// Mobil menu
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Zavřít menu - odkaz - klik
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// scrollovani plynule
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// hlavicka scroll
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    }

    lastScroll = currentScroll;
});

// formular
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Data z formulare 
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
 
        // TBD
        console.log('Form data:', formData);

        // Sucess = musí se dodělat
        alert('Děkujeme za vaši zprávu! Budeme vás kontaktovat co nejdříve.');

        // Resetovat (multiple odeslání)
        contactForm.reset();
    });
}

// Animace při scrollu
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// inicializace.lib
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .contact-card, .about-text, .about-image');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// scrolling.lib - aktivni 674
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
});

/* ========================================
   NOVÉ UNIKÁTNÍ FUNKCE
   ======================================== */

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector('.scroll-progress').style.width = scrolled + '%';
});


const backToTop = document.querySelector('.back-to-top');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


const darkModeToggle = document.querySelector('.dark-mode-toggle');
let darkMode = localStorage.getItem('darkMode') === 'true';

function enableDarkMode() {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('darkMode', 'true');
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem('darkMode', 'false');
}

if (darkMode) {
    enableDarkMode();
}

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        darkMode = !darkMode;
        if (darkMode) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    });
}


const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};


document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        if ('IntersectionObserver' in window) {
            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const numbers = entry.target.querySelectorAll('.stat-number');
                        numbers.forEach(num => animateCounter(num));
                        statsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            statsObserver.observe(statsSection);
        } else {
            const numbers = statsSection.querySelectorAll('.stat-number');
            numbers.forEach(num => animateCounter(num));
        }
    }
});


const comparisonSlider = document.getElementById('comparisonSlider');
if (comparisonSlider) {
    const afterImage = document.querySelector('.after-image');
    const sliderButton = document.querySelector('.slider-button');
    const beforeLabel = document.querySelector('.before-image .image-label');
    const afterLabel = document.querySelector('.after-image .image-label');

    const updateSlider = (value) => {
        afterImage.style.clipPath = `polygon(${value}% 0, 100% 0, 100% 100%, ${value}% 100%)`;
        sliderButton.style.left = `${value}%`;
        
        // Hide/show labels based on slider position
        if (value < 10) {
            beforeLabel.style.opacity = '0';
            beforeLabel.style.visibility = 'hidden';
        } else {
            beforeLabel.style.opacity = '1';
            beforeLabel.style.visibility = 'visible';
        }
        
        if (value > 90) {
            afterLabel.style.opacity = '0';
            afterLabel.style.visibility = 'hidden';
        } else {
            afterLabel.style.opacity = '1';
            afterLabel.style.visibility = 'visible';
        }
    };

    comparisonSlider.addEventListener('input', (e) => {
        updateSlider(e.target.value);
    });

   
    let isDragging = false;
    const wrapper = document.querySelector('.before-after-wrapper');

    const handleMove = (clientX) => {
        if (!isDragging && !clientX) return;
        const rect = wrapper.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        comparisonSlider.value = percentage;
        updateSlider(percentage);
    };

    
    wrapper.addEventListener('mousedown', (e) => {
        isDragging = true;
        handleMove(e.clientX);
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            handleMove(e.clientX);
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    
    wrapper.addEventListener('touchstart', (e) => {
        isDragging = true;
        handleMove(e.touches[0].clientX);
    });

    wrapper.addEventListener('touchmove', (e) => {
        if (isDragging) {
            e.preventDefault();
            handleMove(e.touches[0].clientX);
        }
    });

    wrapper.addEventListener('touchend', () => {
        isDragging = false;
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const startQuestionnaire = document.getElementById('startQuestionnaire');
    const questionnaireForm = document.getElementById('questionnaireForm');
    const questionnaireIntro = document.querySelector('.questionnaire-intro');

    if (startQuestionnaire && questionnaireForm && questionnaireIntro) {
        startQuestionnaire.addEventListener('click', () => {
            questionnaireIntro.style.display = 'none';
            questionnaireForm.style.display = 'block';
        });
    }

    
    const downloadPDF = document.getElementById('downloadPDF');
    if (downloadPDF) {
        downloadPDF.addEventListener('click', () => {
            alert('Funkce stahování PDF bude brzy k dispozici!');
        });
    }

    // submit - dotaznik
    const healthForm = document.getElementById('healthForm');
    if (healthForm) {
        healthForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Děkujeme! Váš dotazník byl odeslán.');
            if (questionnaireForm && questionnaireIntro) {
                questionnaireForm.style.display = 'none';
                questionnaireIntro.style.display = 'block';
            }
            healthForm.reset();
        });
    }
});

// faq 
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');

            // zavrit faq
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // open pokud neotevreno
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // Oznámení banner - zavírací tlačítko
    const announcementBanner = document.getElementById('announcementBanner');
    const announcementClose = document.querySelector('.announcement-close');
    const editAnnouncementBtn = document.getElementById('editAnnouncement');
    const adminPanel = document.getElementById('adminPanel');
    const closeAdminPanel = document.getElementById('closeAdminPanel');
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const adminPassword = document.getElementById('adminPassword');
    const adminLoginForm = document.getElementById('adminLoginForm');
    const adminEditor = document.getElementById('adminEditor');
    const adminAnnouncementText = document.getElementById('adminAnnouncementText');
    const announcementActive = document.getElementById('announcementActive');
    const saveAnnouncement = document.getElementById('saveAnnouncement');
    const adminLogout = document.getElementById('adminLogout');
    const announcementText = document.getElementById('announcementText');
    
    // Admin heslo (v produkčním prostředí by mělo být na serveru!)
    const ADMIN_PASSWORD = 'admin123';
    
    // Načíst uložené oznámení
    function loadAnnouncement() {
        const saved = localStorage.getItem('customAnnouncement');
        const isActive = localStorage.getItem('announcementIsActive') !== 'false';
        
        if (saved) {
            announcementText.innerHTML = saved;
        }
        
        // Skrýt banner pouze pokud admin vypnul
        if (!isActive) {
            announcementBanner.classList.add('hidden');
        }
        // Banner zůstane viditelný po refresh (zavření je jen pro aktuální session)
    }
    
    // Zkontrolovat admin přihlášení
    function checkAdminLogin() {
        const isAdmin = sessionStorage.getItem('adminLoggedIn') === 'true';
        if (isAdmin) {
            document.body.classList.add('admin-logged-in');
        }
        return isAdmin;
    }
    
    // Zavření a znovuotevření banneru
    const announcementReopen = document.getElementById('announcementReopen');
    
    if (announcementClose && announcementBanner && announcementReopen) {
        announcementClose.addEventListener('click', () => {
            announcementBanner.classList.add('hidden');
            announcementReopen.style.display = 'block';
        });
        
        announcementReopen.addEventListener('click', () => {
            announcementBanner.classList.remove('hidden');
            announcementReopen.style.display = 'none';
        });
    }
    
    // Otevřít admin panel
    if (editAnnouncementBtn) {
        editAnnouncementBtn.addEventListener('click', () => {
            adminPanel.classList.add('active');
            
            if (checkAdminLogin()) {
                adminLoginForm.style.display = 'none';
                adminEditor.style.display = 'block';
                const saved = localStorage.getItem('customAnnouncement');
                if (saved) {
                    adminAnnouncementText.value = saved.replace(/<[^>]*>/g, '').replace('Důležité oznámení: ', '');
                }
                announcementActive.checked = localStorage.getItem('announcementIsActive') !== 'false';
            } else {
                adminLoginForm.style.display = 'block';
                adminEditor.style.display = 'none';
            }
        });
    }
    
    // Zavřít admin panel
    if (closeAdminPanel) {
        closeAdminPanel.addEventListener('click', () => {
            adminPanel.classList.remove('active');
            adminPassword.value = '';
        });
    }
    
    // Zavřít při kliknutí mimo
    if (adminPanel) {
        adminPanel.addEventListener('click', (e) => {
            if (e.target === adminPanel) {
                adminPanel.classList.remove('active');
            }
        });
    }
    
    // Admin přihlášení
    if (adminLoginBtn) {
        adminLoginBtn.addEventListener('click', () => {
            if (adminPassword.value === ADMIN_PASSWORD) {
                sessionStorage.setItem('adminLoggedIn', 'true');
                document.body.classList.add('admin-logged-in');
                adminLoginForm.style.display = 'none';
                adminEditor.style.display = 'block';
                
                const saved = localStorage.getItem('customAnnouncement');
                if (saved) {
                    adminAnnouncementText.value = saved.replace(/<[^>]*>/g, '').replace('Důležité oznámení: ', '');
                }
                announcementActive.checked = localStorage.getItem('announcementIsActive') !== 'false';
            } else {
                alert('Nesprávné heslo!');
                adminPassword.value = '';
            }
        });
        
        // Enter pro přihlášení
        adminPassword.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                adminLoginBtn.click();
            }
        });
    }
    
    // Uložit oznámení
    if (saveAnnouncement) {
        saveAnnouncement.addEventListener('click', () => {
            const newText = adminAnnouncementText.value.trim();
            const isActive = announcementActive.checked;
            
            if (newText) {
                const formattedText = `<strong>Důležité oznámení:</strong> ${newText}`;
                localStorage.setItem('customAnnouncement', formattedText);
                localStorage.setItem('announcementIsActive', isActive);
                
                announcementText.innerHTML = formattedText;
                
                if (isActive) {
                    announcementBanner.classList.remove('hidden');
                } else {
                    announcementBanner.classList.add('hidden');
                }
                
                alert('Oznámení bylo úspěšně uloženo!');
            } else {
                alert('Zadejte prosím text oznámení.');
            }
        });
    }
    
    // Admin záložky
    const adminTabs = document.querySelectorAll('.admin-tab');
    const adminTabContents = document.querySelectorAll('.admin-tab-content');
    
    adminTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            
            // Deaktivovat všechny záložky
            adminTabs.forEach(t => t.classList.remove('active'));
            adminTabContents.forEach(c => c.classList.remove('active'));
            
            // Aktivovat vybranou záložku
            tab.classList.add('active');
            const targetContent = document.getElementById(`tab${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Načíst uložené kontakty
    function loadContacts() {
        const phone = localStorage.getItem('adminContactPhone') || '+420 123 456 789';
        const email = localStorage.getItem('adminContactEmail') || 'ordinace@vyhnalova.cz';
        const address = localStorage.getItem('adminContactAddress') || 'Náměstí Svobody 123';
        const city = localStorage.getItem('adminContactCity') || '696 81 Bzenec';
        const whatsapp = localStorage.getItem('adminContactWhatsapp') || '420123456789';
        
        if (document.getElementById('adminPhone')) {
            document.getElementById('adminPhone').value = phone;
            document.getElementById('adminEmail').value = email;
            document.getElementById('adminAddress').value = address;
            document.getElementById('adminCity').value = city;
            document.getElementById('adminWhatsapp').value = whatsapp;
        }
        
        // Aktualizovat kontakty na webu
        updateContactsOnPage(phone, email, address, city, whatsapp);
    }
    
    function updateContactsOnPage(phone, email, address, city, whatsapp) {
        // Aktualizovat telefon
        const phoneElements = document.querySelectorAll('.contact-details p');
        if (phoneElements[0]) phoneElements[0].textContent = phone;
        
        // Aktualizovat email
        if (phoneElements[1]) phoneElements[1].textContent = email;
        
        // Aktualizovat adresu
        if (phoneElements[2]) {
            phoneElements[2].innerHTML = `${address}<br>${city}`;
        }
        
        // Aktualizovat WhatsApp link
        const whatsappLink = document.querySelector('.whatsapp-float');
        if (whatsappLink) {
            whatsappLink.href = `https://wa.me/${whatsapp}`;
        }
        
        // Footer kontakty
        const footerSections = document.querySelectorAll('.footer-section p');
        if (footerSections[2]) footerSections[2].textContent = `Tel: ${phone}`;
        if (footerSections[3]) footerSections[3].textContent = `Email: ${email}`;
        if (footerSections[4]) footerSections[4].textContent = address;
        if (footerSections[5]) footerSections[5].textContent = city;
    }
    
    // Uložit kontakty
    const saveContacts = document.getElementById('saveContacts');
    if (saveContacts) {
        saveContacts.addEventListener('click', () => {
            const phone = document.getElementById('adminPhone').value;
            const email = document.getElementById('adminEmail').value;
            const address = document.getElementById('adminAddress').value;
            const city = document.getElementById('adminCity').value;
            const whatsapp = document.getElementById('adminWhatsapp').value;
            
            localStorage.setItem('adminContactPhone', phone);
            localStorage.setItem('adminContactEmail', email);
            localStorage.setItem('adminContactAddress', address);
            localStorage.setItem('adminContactCity', city);
            localStorage.setItem('adminContactWhatsapp', whatsapp);
            
            updateContactsOnPage(phone, email, address, city, whatsapp);
            alert('Kontaktní údaje byly úspěšně uloženy!');
        });
    }
    
    // Načíst nastavení připomínek
    function loadReminders() {
        const enabled = localStorage.getItem('remindersEnabled') === 'true';
        const timing = localStorage.getItem('reminderTiming') || '24';
        const smsText = localStorage.getItem('reminderSmsText') || 'Dobrý den, připomínáme Vaši návštěvu zítra v 10:00. MUDr. Vyhnalová';
        const emailText = localStorage.getItem('reminderEmailText') || 'Vážený pane/paní,\npřipomínáme Vám objednanou návštěvu zubní ordinace...';
        
        if (document.getElementById('remindersEnabled')) {
            document.getElementById('remindersEnabled').checked = enabled;
            document.getElementById('reminderTiming').value = timing;
            document.getElementById('reminderSmsText').value = smsText;
            document.getElementById('reminderEmailText').value = emailText;
            document.getElementById('smsPreview').textContent = smsText;
        }
    }
    
    // Live preview SMS
    const reminderSmsText = document.getElementById('reminderSmsText');
    if (reminderSmsText) {
        reminderSmsText.addEventListener('input', (e) => {
            document.getElementById('smsPreview').textContent = e.target.value;
        });
    }
    
    // Uložit připomínky
    const saveReminders = document.getElementById('saveReminders');
    if (saveReminders) {
        saveReminders.addEventListener('click', () => {
            const enabled = document.getElementById('remindersEnabled').checked;
            const timing = document.getElementById('reminderTiming').value;
            const smsText = document.getElementById('reminderSmsText').value;
            const emailText = document.getElementById('reminderEmailText').value;
            
            localStorage.setItem('remindersEnabled', enabled);
            localStorage.setItem('reminderTiming', timing);
            localStorage.setItem('reminderSmsText', smsText);
            localStorage.setItem('reminderEmailText', emailText);
            
            alert('Nastavení připomínek bylo úspěšně uloženo!');
        });
    }
    
    // Odhlášení
    if (adminLogout) {
        adminLogout.addEventListener('click', () => {
            sessionStorage.removeItem('adminLoggedIn');
            document.body.classList.remove('admin-logged-in');
            adminPanel.classList.remove('active');
            adminPassword.value = '';
            adminAnnouncementText.value = '';
        });
    }
    
    // ====================================
    // SPRÁVA TERMÍNŮ A PŘIPOMÍNEK
    // ====================================
    
    // Načíst termíny
    function loadAppointments() {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        return appointments;
    }
    
    // Uložit termíny
    function saveAppointments(appointments) {
        localStorage.setItem('appointments', JSON.stringify(appointments));
        renderAdminAppointments();
        updatePatientDashboardAppointments();
    }
    
    // Zobrazit termíny v admin panelu
    function renderAdminAppointments() {
        const adminList = document.getElementById('adminAppointmentsList');
        if (!adminList) return;
        
        const appointments = loadAppointments();
        const upcoming = appointments.filter(apt => new Date(apt.datetime) > new Date());
        
        if (upcoming.length === 0) {
            adminList.innerHTML = '<p style="color: var(--text-light); font-style: italic;">Žádné nadcházející termíny</p>';
            return;
        }
        
        adminList.innerHTML = upcoming.map((apt, index) => {
            const date = new Date(apt.datetime);
            const dateStr = date.toLocaleDateString('cs-CZ');
            const timeStr = date.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' });
            
            return `
                <div class="appointment-item-admin">
                    <div class="appointment-info">
                        <div class="appointment-date">${dateStr} v ${timeStr}</div>
                        <div class="appointment-patient">${apt.type}</div>
                        <div class="appointment-contact">
                            <i class="fas fa-envelope"></i> ${apt.email} | 
                            <i class="fas fa-phone"></i> ${apt.phone}
                        </div>
                    </div>
                    <button class="btn-delete" onclick="deleteAppointment(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        }).join('');
    }
    
    // Smazat termín
    window.deleteAppointment = function(index) {
        if (confirm('Opravdu chcete smazat tento termín?')) {
            const appointments = loadAppointments();
            appointments.splice(index, 1);
            saveAppointments(appointments);
        }
    };
    
    // Přidat nový termín
    const addAppointment = document.getElementById('addAppointment');
    if (addAppointment) {
        addAppointment.addEventListener('click', () => {
            const email = document.getElementById('appointmentEmail').value;
            const phone = document.getElementById('appointmentPhone').value;
            const date = document.getElementById('appointmentDate').value;
            const time = document.getElementById('appointmentTime').value;
            const type = document.getElementById('appointmentType').value;
            
            if (!email || !phone || !date || !time || !type) {
                alert('Vyplňte prosím všechna pole!');
                return;
            }
            
            const datetime = `${date}T${time}:00`;
            const appointments = loadAppointments();
            
            appointments.push({
                email,
                phone,
                datetime,
                type,
                reminderSent: false
            });
            
            saveAppointments(appointments);
            
            // Vyčistit formulář
            document.getElementById('appointmentEmail').value = '';
            document.getElementById('appointmentPhone').value = '';
            document.getElementById('appointmentDate').value = '';
            document.getElementById('appointmentTime').value = '10:00';
            document.getElementById('appointmentType').value = '';
            
            alert('Termín byl úspěšně přidán!');
        });
    }
    
    // Aktualizovat termíny v patient dashboardu
    function updatePatientDashboardAppointments() {
        const currentUser = JSON.parse(localStorage.getItem('dentalPatient'));
        if (!currentUser) return;
        
        const appointments = loadAppointments();
        const userAppointments = appointments.filter(apt => 
            apt.email.toLowerCase() === currentUser.email.toLowerCase() &&
            new Date(apt.datetime) > new Date()
        );
        
        const appointmentsList = document.getElementById('appointmentsList');
        if (!appointmentsList) return;
        
        if (userAppointments.length === 0) {
            appointmentsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar-plus"></i>
                    <p>Zatím nemáte žádné objednané návštěvy</p>
                    <a href="#contact" class="btn btn-primary">Objednat se nyní</a>
                </div>
            `;
        } else {
            appointmentsList.innerHTML = userAppointments.map(apt => {
                const date = new Date(apt.datetime);
                const dateStr = date.toLocaleDateString('cs-CZ', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
                const timeStr = date.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' });
                
                return `
                    <div class="history-item">
                        <div class="history-date">${dateStr} v ${timeStr}</div>
                        <div class="history-desc">${apt.type}</div>
                        <div class="history-status" style="background: #cfe2ff; color: #084298;">
                            <i class="fas fa-clock"></i> Nadcházející
                        </div>
                    </div>
                `;
            }).join('');
        }
    }
    
    // Odeslat připomínky
    const sendRemindersNow = document.getElementById('sendRemindersNow');
    if (sendRemindersNow) {
        sendRemindersNow.addEventListener('click', () => {
            const appointments = loadAppointments();
            const remindersEnabled = localStorage.getItem('remindersEnabled') === 'true';
            const reminderTiming = parseInt(localStorage.getItem('reminderTiming') || '24');
            const smsText = localStorage.getItem('reminderSmsText') || 'Dobrý den, připomínáme Vaši návštěvu zítra v 10:00. MUDr. Vyhnalová';
            const emailText = localStorage.getItem('reminderEmailText') || 'Vážený pane/paní,\npřipomínáme Vám objednanou návštěvu zubní ordinace...';
            
            if (!remindersEnabled) {
                alert('Připomínky nejsou aktivované! Aktivujte je v záložce Připomínky.');
                return;
            }
            
            const now = new Date();
            const targetTime = now.getTime() + (reminderTiming * 60 * 60 * 1000);
            const threeDays = now.getTime() + (3 * 24 * 60 * 60 * 1000);
            
            let sentCount = 0;
            const sentDetails = [];
            
            appointments.forEach(apt => {
                const aptTime = new Date(apt.datetime).getTime();
                
                // Pokud je termín v rozmezí nastaveného času a 3 dnů dopředu
                if (aptTime > targetTime && aptTime < threeDays && !apt.reminderSent) {
                    const date = new Date(apt.datetime);
                    const dateStr = date.toLocaleDateString('cs-CZ');
                    const timeStr = date.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' });
                    
                    // Simulace odeslání SMS
                    const smsMessage = smsText.replace('zítra', dateStr).replace('10:00', timeStr);
                    
                    // Simulace odeslání emailu
                    const emailMessage = emailText + `\n\nDatum: ${dateStr}\nČas: ${timeStr}\nTyp: ${apt.type}`;
                    
                    sentDetails.push({
                        email: apt.email,
                        phone: apt.phone,
                        sms: smsMessage,
                        email: emailMessage
                    });
                    
                    apt.reminderSent = true;
                    sentCount++;
                }
            });
            
            if (sentCount > 0) {
                saveAppointments(appointments);
                
                let message = `✅ Odesláno ${sentCount} připomínek:\n\n`;
                sentDetails.forEach(detail => {
                    message += `📧 ${detail.email}\n📱 ${detail.phone}\n\n`;
                });
                message += 'Připomínky byly odeslány na:\n- Email pacienta\n- SMS na telefon\n- Do účtu pacienta na webu';
                
                alert(message);
            } else {
                alert('ℹ️ Žádné termíny k připomenutí.\n\nKritéria:\n- Termín za 24-72 hodin\n- Připomínka ještě nebyla odeslána');
            }
        });
    }
    
    // Načíst vše při startu
    loadAnnouncement();
    checkAdminLogin();
    loadContacts();
    loadReminders();
    renderAdminAppointments();
    updatePatientDashboardAppointments();
});
