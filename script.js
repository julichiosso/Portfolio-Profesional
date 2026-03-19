document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const hoverElements = document.querySelectorAll('[data-hover]');

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    });

    function animateCursor() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            follower.classList.remove('active');
        });
    });

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    localStorage.setItem('theme', savedTheme); // Persist the default choice

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Scroll Reveal Animation (repeatable)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class when element enters viewport
                entry.target.classList.add('visible');
            } else {
                // Remove visible class when element leaves viewport
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(
        '.reveal-text, .fade-left, .fade-right, .fade-up, .scale-in, .rotate-in, .slide-fade, .bounce-in, .flip-in, .zoom-blur'
    );
    animatedElements.forEach(el => observer.observe(el));

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Three.js Background Animation
    const initThreeJS = () => {
        const container = document.getElementById('canvas-container');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // Particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 15; // Spread
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const material = new THREE.PointsMaterial({
            size: 0.005,
            color: 0x7000ff,
            transparent: true,
            opacity: 0.8,
        });

        const particlesMesh = new THREE.Points(particlesGeometry, material);
        scene.add(particlesMesh);

        // Secondary Particles (Cyan)
        const particlesGeometry2 = new THREE.BufferGeometry();
        const particlesCount2 = 1000;
        const posArray2 = new Float32Array(particlesCount2 * 3);

        for (let i = 0; i < particlesCount2 * 3; i++) {
            posArray2[i] = (Math.random() - 0.5) * 20;
        }

        particlesGeometry2.setAttribute('position', new THREE.BufferAttribute(posArray2, 3));
        const material2 = new THREE.PointsMaterial({
            size: 0.005,
            color: 0x00f0ff,
            transparent: true,
            opacity: 0.5,
        });
        const particlesMesh2 = new THREE.Points(particlesGeometry2, material2);
        scene.add(particlesMesh2);

        camera.position.z = 3;

        // Mouse Interaction
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (event) => {
            mouseX = event.clientX / window.innerWidth - 0.5;
            mouseY = event.clientY / window.innerHeight - 0.5;
        });

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);

            particlesMesh.rotation.y += 0.001;
            particlesMesh.rotation.x += 0.0005;

            particlesMesh2.rotation.y -= 0.0015;
            particlesMesh2.rotation.x -= 0.0005;

            // Parallax effect
            particlesMesh.rotation.y += mouseX * 0.05;
            particlesMesh.rotation.x += mouseY * 0.05;

            renderer.render(scene, camera);
        };

        animate();

        // Resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    };

    initThreeJS();

    /* 
    ANONYMIZATION SCRIPT (For Subagent Reference):
    document.querySelectorAll('span, p, div, td, h6, h1, h2, h3, a').forEach(el => {
       if (el.innerText.match(/Mauro|Chiosso|Julian|Mateo|Dominguez/i)) {
         el.innerText = el.innerText.replace(/Mauro|Chiosso|Julian|Mateo|Dominguez/gi, 'Demo User');
       }
    });
    */

    // i18n Dictionary
    const translations = {
        es: {
            nav_home: "Inicio", nav_about: "Sobre Mí", nav_skills: "Habilidades", nav_projects: "Proyectos", nav_edu: "Educación", nav_contact: "Contacto",
            hero_available: "Disponible para nuevas oportunidades",
            hero_bio: "Backend Developer con más de 3 años construyendo software real.",
            hero_projects: "Ver Proyectos", hero_cv: "Descargar CV", hero_contact: "Contactar",
            about_title: "Sobre Mí", about_lead: "Desarrollador Backend con más de 3 años de experiencia construyendo sistemas que ya funcionan en producción.",
            about_p1: "Mi especialidad es el backend con <strong>C#, .NET y NestJS</strong>, diseñando APIs REST y arquitecturas modulares que escalan. En el frontend trabajo con <strong>Vue.js y TypeScript</strong> cuando el proyecto lo requiere.",
            about_p2: "Construí un <strong>sistema de gestión para WEG Equipamientos Electrónicos</strong> y una plataforma completa de soporte técnico con chat en tiempo real, métricas y control de SLA. Dos proyectos reales, deployed, listos para producción.",
            about_card1_h: "Formación", about_card1_p: "Téc. en Programación · UTN",
            about_card2_h: "Especialidad", about_card2_p: "Backend & Full Stack",
            about_card3_h: "Interés", about_card3_p: "Inteligencia Artificial · Aq. Escalares",
            skills_title: "Habilidades", skills_cat1: "Backend Core", skills_cat2: "Datos & Cloud", skills_cat3: "Frontend & Tools", skills_ia: "Integración IA",
            projects_title: "Proyectos",
            edu_title: "Educación & Certificaciones",
            edu_desc1: "Formación técnica enfocada en desarrollo de software, arquitectura de sistemas y bases de datos.",
            prj2_cat: "Enterprise / Gestión Industrial", prj2_title: "Gestión de Devoluciones — WEG", prj2_desc: "Plataforma industrial para <strong>WEG S.A.</strong> que digitaliza y optimiza el ciclo de vida de las devoluciones. Integra flujos de aprobación complejos, trazabilidad en tiempo real y dashboards analíticos. <em>Software crítico en producción.</em>",
            prj3_cat: "SaaS / Soporte Técnico", prj3_title: "Sistema de Tickets — Soporte",
            prj3_desc: "Plataforma B2B de alto rendimiento construida bajo <strong>Clean Architecture</strong>. Implementa micro-interacciones en tiempo real con SignalR, seguridad JWT basada en roles y una capa de persistencia optimizada con EF Core. Resolución de SLAs y arquitectura modular escalable para el sector corporativo.",
            prj_see_demo: "Ver Demo", prj_see_case: "Ver Caso", prj_see_live: "Ver Demo", gallery_hint: "Deslizar",
            contact_subtitle: "¿Buscás un desarrollador?", contact_title: "Hablemos", contact_desc: "Estoy buscando mi próxima oportunidad profesional como desarrollador. Si tu equipo necesita a alguien que aprenda rápido y ya tiene proyectos reales encima, escribime.",
            contact_btn: "Escribime", contact_cv: "Descargar CV", contact_note: "Disponible inmediatamente · Remoto / Presencial · San Francisco, Córdoba, AR",
            footer_dev: "Desarrollador Web"
        },
        en: {
            nav_home: "Home", nav_about: "About", nav_skills: "Skills", nav_projects: "Projects", nav_edu: "Education", nav_contact: "Contact",
            hero_available: "Available for new opportunities",
            hero_bio: "Backend Developer with over 3 years building real software.",
            hero_projects: "View Projects", hero_cv: "Download CV", hero_contact: "Contact Me",
            about_title: "About Me", about_lead: "Backend Developer with over 3 years of experience building systems currently in production.",
            about_p1: "My specialty is backend development with <strong>C#, .NET, and NestJS</strong>, designing REST APIs and modular architectures that scale. On the frontend, I work with <strong>Vue.js and TypeScript</strong> when the project requires it.",
            about_p2: "I built a <strong>management system for WEG Equipamientos Electrónicos</strong> and a complete technical support platform with real-time chat, metrics, and SLA control. Two real projects, deployed, ready for production.",
            about_card1_h: "Education", about_card1_p: "Programming Technician · UTN",
            about_card2_h: "Specialty", about_card2_p: "Backend & Full Stack",
            about_card3_h: "Interests", about_card3_p: "Artificial Intelligence · Scalability",
            skills_title: "Technical Skills", skills_cat1: "Backend Core", skills_cat2: "Data & Cloud", skills_cat3: "Frontend & Tools", skills_ia: "AI Integration",
            projects_title: "Featured Projects",
            edu_title: "Education & Certifications",
            edu_desc1: "Technical training focused on software development, systems architecture, and databases.",
            prj2_cat: "Enterprise / Industrial Management", prj2_title: "Return Management — WEG", prj2_desc: "Industrial management platform for <strong>WEG S.A.</strong> that digitizes and optimizes the return lifecycle. It integrates complex approval workflows, real-time traceability, and analytical dashboards. <em>Critical production software.</em>",
            prj3_cat: "SaaS / Tech Support", prj3_title: "Ticket System — Support",
            prj3_desc: "High-performance B2B platform built following <strong>Clean Architecture</strong> principles. It features real-time micro-interactions via SignalR, role-based JWT security, and an optimized persistence layer with EF Core. Focused on SLA resolution and scalable modular architecture for the enterprise sector.",
            prj_see_demo: "View Demo", prj_see_case: "View Case", prj_see_live: "View Demo", gallery_hint: "Swipe",
            contact_subtitle: "Looking for a developer?", contact_title: "Let's Talk", contact_desc: "I am looking for my next professional opportunity as a developer. If your team needs someone who learns fast and already has real projects under their belt, write to me.",
            contact_btn: "Write to me", contact_cv: "Download CV", contact_note: "Available immediately · Remote / On-site · San Francisco, Cordoba, AR",
            footer_dev: "Web Developer"
        }
    };

    const langToggle = document.getElementById('lang-toggle');
    const langLabels = langToggle.querySelectorAll('.lang-label');
    let currentLang = localStorage.getItem('selectedLang') || 'es';

    const updateLanguage = (lang) => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                // If it contains HTML (like <strong>), use innerHTML, else textContent
                if (translations[lang][key].includes('<')) {
                    el.innerHTML = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });

        // Update active class on toggle labels
        langLabels.forEach(label => {
            if (label.textContent.toLowerCase() === lang) {
                label.classList.add('active');
            } else {
                label.classList.remove('active');
            }
        });

        document.documentElement.lang = lang;
        localStorage.setItem('selectedLang', lang);
    };

    // Initial load
    updateLanguage(currentLang);

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        updateLanguage(currentLang);
    });

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close menu when clicking links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    // Project Gallery Dots & Arrows Logic
    const galleries = document.querySelectorAll('.project-gallery');

    galleries.forEach(gallery => {
        const container = gallery.querySelector('.gallery-container');
        const dots = gallery.querySelectorAll('.gallery-dot');
        const prevBtn = gallery.querySelector('.gallery-arrow.prev');
        const nextBtn = gallery.querySelector('.gallery-arrow.next');

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                const width = container.offsetWidth;
                container.scrollBy({ left: -width, behavior: 'smooth' });
            });

            nextBtn.addEventListener('click', () => {
                const width = container.offsetWidth;
                container.scrollBy({ left: width, behavior: 'smooth' });
            });
        }

        container.addEventListener('scroll', () => {
            const width = container.offsetWidth;
            const scrollLeft = container.scrollLeft;
            const activeIndex = Math.round(scrollLeft / width);

            dots.forEach((dot, idx) => {
                if (idx === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        });
    });
});
