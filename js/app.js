document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            const icon = mobileMenu.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenu.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            navbar.classList.add('navbar-hidden');
        } else {
            navbar.classList.remove('navbar-hidden');
        }
        lastScrollY = window.scrollY;
    });

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all others
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Open clicked if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // FAQ Tabs Logic
    const faqTabs = document.querySelectorAll('.faq-tab');
    faqTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs
            faqTabs.forEach(t => t.classList.remove('active'));
            // Add active to clicked tab
            tab.classList.add('active');

            const targetCategory = tab.getAttribute('data-target');

            // Show/hide faq items based on category
            faqItems.forEach(item => {
                // Close open accordions when switching tabs
                item.classList.remove('active');

                if (item.getAttribute('data-category') === targetCategory) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatMessages = document.getElementById('chatbot-messages');
    const chatOptionsContainer = document.getElementById('chat-options-container');

    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('hidden');
        if (!chatbotWindow.classList.contains('hidden') && chatMessages.children.length <= 1) {
            showMainMenu();
        }
    });

    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.add('hidden');
    });

    const coursePrices = {
        'Maquillaje': 10,
        'Manualidades': 10,
        'Repostería Básica': 10,
        'Panadería': 10,
        'Ropa Íntima': 10,
        'Inglés Intermedio': 20,
        'Inglés Avanzado': 20,
        'Inglés Básico': 20,
        'Inglés Teen': 20,
        'Barbería Básica': 10,
        'Asistente de Farmacia': 20,
        'Costura Básica': 10,
        'Costura Avanzada': 20,
        'Barbería Avanzada': 20,
        'Peluquería': 10,
        'Cejas y Pestañas': 10,
        'Manicura': 20,
        'Asistente Contable': 20,
        'Marketing': 20,
        'Oratoria': 10,
        'Seguridad Industrial': 30,
        'Repostería Avanzado': 20,
        'Decoración de Torta': 10,
        'Diseño Gráfico': 20,
        'Masajes': 20
    };

    const addMessage = (text, isUser = false) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        msgDiv.innerHTML = text; // allow bolding
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const renderOptions = (options) => {
        if (!chatOptionsContainer) return;
        chatOptionsContainer.innerHTML = '';
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = `chat-option-btn ${opt.isBack ? 'pink' : ''}`;
            btn.textContent = opt.label;
            btn.addEventListener('click', () => {
                addMessage(opt.label, true);
                chatOptionsContainer.innerHTML = ''; // hide options while bot thinks
                setTimeout(() => opt.action(), 500); // slight delay for bot reply
            });
            chatOptionsContainer.appendChild(btn);
        });
    };

    const showMainMenu = () => {
        renderOptions([
            { label: '📚 Cursos Disponibles', action: showCourses },
            { label: '🕒 Horarios', action: showSchedules },
            { label: '💰 Precios', action: showPricingOptions }
        ]);
    };

    const showCourses = () => {
        addMessage('Ofrecemos cursos en varias áreas:<br><br>- <b>Belleza:</b> Peluquería, Barbería, Maquillaje, Cejas y Pestañas, Manicura.<br>- <b>Gastronomía:</b> Panadería, Repostería Básica/Avanzada, Decoración de Tortas.<br>- <b>Idiomas:</b> Inglés (Kids, Teen, Básico, Intermedio, Avanzado).<br>- <b>Desarrollo Integral:</b> Asistente Contable/Farmacia, Oratoria, Marketing, Diseño Gráfico, Masajes, Seguridad Industrial.<br>- <b>Indumentaria:</b> Costura Básica/Avanzada, Ropa Íntima, Manualidades.');
        setTimeout(showMainMenu, 300);
    };

    const showSchedules = () => {
        addMessage('Los horarios son a coordinar directamente en el momento de tu inscripción presencial. ¡Acércate a nuestra sede y elige el que más te convenga!');
        setTimeout(showMainMenu, 300);
    };

    const showPricingOptions = () => {
        addMessage('El costo general de <b>inscripción es de $5</b>. Para consultar la mensualidad, selecciona el curso que deseas:');
        
        const sortedCourses = Object.keys(coursePrices).sort();
        const options = sortedCourses.map(course => ({
            label: course,
            action: () => {
                addMessage(`El curso de <b>${course}</b> tiene una mensualidad de <b>$${coursePrices[course]}</b> (además de los $5 de inscripción general).<br><br><i>*Todos los montos son calculados a la tasa oficial del BCV.</i>`);
                renderOptions([{ label: '🔙 Volver al inicio', isBack: true, action: showMainMenu }]);
            }
        }));
        
        options.push({ label: '🔙 Volver al menú', isBack: true, action: showMainMenu });
        renderOptions(options);
    };

    showMainMenu();

    // Scroll Animations Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Sugerencias Form Logic (Web3Forms)
    const sugerenciasForm = document.getElementById('sugerencias-form');
    const formResult = document.getElementById('form-result');

    if (sugerenciasForm) {
        sugerenciasForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = sugerenciasForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'Enviando...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            const formData = new FormData(sugerenciasForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    formResult.style.display = 'block';
                    formResult.style.color = '#28a745';
                    formResult.textContent = '¡Sugerencia enviada con éxito! Gracias por escribirnos.';
                    sugerenciasForm.reset();
                } else {
                    formResult.style.display = 'block';
                    formResult.style.color = '#dc3545';
                    formResult.textContent = 'Hubo un error al enviar. Intenta de nuevo.';
                }
            })
            .catch(error => {
                formResult.style.display = 'block';
                formResult.style.color = '#dc3545';
                formResult.textContent = 'Error de conexión. Intenta más tarde.';
            })
            .then(function() {
                btn.textContent = originalText;
                btn.style.opacity = '1';
                btn.disabled = false;
                setTimeout(() => {
                    formResult.style.display = 'none';
                }, 5000);
            });
        });
    }

    // Auto-add animate class to elements we want to animate
    const elementsToAnimate = document.querySelectorAll('.courses-header, .course-card, .split-content, .split-image, .faq-tabs, .faq-accordion, .gallery-item');
    elementsToAnimate.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
});
