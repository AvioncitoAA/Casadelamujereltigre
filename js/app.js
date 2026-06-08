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
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chatbot-messages');

    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('hidden');
    });

    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.add('hidden');
    });

    const sendMessage = () => {
        const text = chatInput.value.trim();
        if (text) {
            const userMsg = document.createElement('div');
            userMsg.className = 'message user-message';
            userMsg.textContent = text;
            chatMessages.appendChild(userMsg);
            
            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;

            setTimeout(() => {
                const botMsg = document.createElement('div');
                botMsg.className = 'message bot-message';
                botMsg.textContent = 'Gracias por comunicarte con la Casa de la Mujer de El Tigre. Pronto te atenderemos.';
                chatMessages.appendChild(botMsg);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    };

    chatSend.addEventListener('click', sendMessage);

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

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
