
        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                // Hide mobile menu on click
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
                const targetElement = document.querySelector(this.getAttribute('href'));
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Contact Form Submission Handler
        const contactForm = document.getElementById('contact-form');
        const formStatus = document.getElementById('form-status');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const form = e.target;
            const data = new FormData(form);
            const action = form.action;
            const submitButton = form.querySelector('button[type="submit"]');

            // --- IMPROVEMENT: Provide immediate feedback ---
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            formStatus.innerHTML = ''; // Clear previous status messages

            fetch(action, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    formStatus.innerHTML = '<p class="text-green-600 font-semibold">Thanks for your message! I will get back to you soon.</p>';
                    form.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            formStatus.innerHTML = '<p class="text-red-600 font-semibold">Oops! There was a problem submitting your form. Please try again.</p>';
                        }
                    })
                }
            }).catch(error => {
                formStatus.innerHTML = '<p class="text-red-600 font-semibold">Oops! There was a problem submitting your form. Please try again.</p>';
            }).finally(() => {
                // --- IMPROVEMENT: Re-enable the button after submission ---
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            });
        });
   