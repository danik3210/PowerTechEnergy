// Ініціалізація іконок
        lucide.createIcons();

        // Мобільне меню
        function toggleMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('translate-x-full');
        }

        // Глобальний обзервер для анімацій (щоб викликати їх знову при зміні сторінок)
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
        window.pageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Навігація Single Page Application (перемикання "сторінок")
        function showPage(pageId, event) {
            if (event) event.preventDefault();

            // Приховуємо всі сторінки
            document.querySelectorAll('.page-section').forEach(page => {
                page.classList.add('hidden');
            });

            // Показуємо потрібну сторінку
            const target = document.getElementById(pageId);
            if (target) {
                target.classList.remove('hidden');
            }

            // Закриваємо мобільне меню, якщо воно відкрите
            const menu = document.getElementById('mobile-menu');
            if (!menu.classList.contains('translate-x-full')) {
                menu.classList.add('translate-x-full');
            }

            // Миттєво піднімаємося наверх
            window.scrollTo({top: 0, behavior: 'instant'});

            // Скидаємо і запускаємо анімації на новій сторінці
            document.querySelectorAll('.reveal').forEach(el => {
                el.classList.remove('active');
                window.pageObserver.observe(el);
            });

            // Оновлюємо посилання в браузері (щоб можна було ділитися посиланням)
            if (history.pushState) {
                history.pushState(null, null, `#${pageId}`);
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            // Запуск анімацій для першого завантаження
            document.querySelectorAll('.reveal').forEach(el => window.pageObserver.observe(el));

            // Перевірка URL (щоб при оновленні сторінки залишатися на тій самій вкладці)
            const hash = window.location.hash.substring(1);
            if (hash && document.getElementById(hash) && document.getElementById(hash).classList.contains('page-section')) {
                showPage(hash);
            } else {
                // Якщо хешу немає - показуємо головну
                showPage('home');
            }

            // Акордеони
            const accordions = document.querySelectorAll('.accordion-btn');
            accordions.forEach(btn => {
                btn.addEventListener('click', function() {
                    const icon = this.querySelector('.accordion-icon');
                    const content = this.nextElementSibling;
                    
                    if (content.classList.contains('grid-rows-[0fr]')) {
                        content.classList.remove('grid-rows-[0fr]');
                        content.classList.add('grid-rows-[1fr]');
                        icon.classList.add('rotate-180', 'text-amber-500');
                        icon.classList.remove('text-slate-400');
                    } else {
                        content.classList.add('grid-rows-[0fr]');
                        content.classList.remove('grid-rows-[1fr]');
                        icon.classList.remove('rotate-180', 'text-amber-500');
                        icon.classList.add('text-slate-400');
                    }
                });
            });

            // Кнопка "Вгору"
            const backToTopBtn = document.getElementById('backToTop');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 400) {
                    backToTopBtn.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
                    backToTopBtn.classList.add('translate-y-0', 'opacity-100');
                } else {
                    backToTopBtn.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
                    backToTopBtn.classList.remove('translate-y-0', 'opacity-100');
                }
            });

            // Банер Cookie
            const cookieBanner = document.getElementById('cookieBanner');
            if (!localStorage.getItem('cookieConsent')) {
                setTimeout(() => {
                    cookieBanner.classList.remove('translate-y-full');
                }, 1000);
            }
        });

        function acceptCookies() {
            localStorage.setItem('cookieConsent', 'accepted');
            document.getElementById('cookieBanner').classList.add('translate-y-full');
        }

        function declineCookies() {
            localStorage.setItem('cookieConsent', 'declined');
            document.getElementById('cookieBanner').classList.add('translate-y-full');
        }
