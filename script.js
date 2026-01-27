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

    const updateSlider = (value) => {
        afterImage.style.clipPath = `polygon(${value}% 0, 100% 0, 100% 100%, ${value}% 100%)`;
        sliderButton.style.left = `${value}%`;
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
});
