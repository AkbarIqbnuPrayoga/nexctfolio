// ============ INTRO ANIMATION (Typing + Zoom Effect) ============
let skipAnimation = false;

async function startIntroAnimation() {
    const container = document.getElementById('match-cut-container');
    const outputElement = document.getElementById('match-output');
    const cursor = document.querySelector('.cursor');
    const finalText = document.getElementById('final-match-text');
    const skipContainer = document.getElementById('skip-intro-container');
    const skipBtn = document.getElementById('skip-intro-btn');
    const mainSite = document.getElementById('main-site');
    const bubbleContainer = document.getElementById('bubble-container');
    
    if (skipContainer && skipBtn) {
        skipContainer.style.display = 'flex';
        gsap.fromTo(skipContainer, 
            { opacity: 0 }, 
            { opacity: 1, duration: 1 }
        );
        
        skipBtn.addEventListener('click', () => {
            skipAnimation = true;
            if (container) container.style.display = 'none';
            if (skipContainer) skipContainer.style.display = 'none';
            if (mainSite) {
                mainSite.style.display = 'block';
                gsap.fromTo(mainSite, 
                    { opacity: 0 },
                    { opacity: 1, duration: 0.5 }
                );
            }
            initScrollReveal();
            initHeroAnimation();
            initTimelineScroll();
        });
    }
    
    if (bubbleContainer) {
        for (let i = 0; i < 20; i++) {
            createBubble(bubbleContainer);
        }
        setInterval(() => {
            if (!skipAnimation && container && container.style.display !== 'none') {
                createBubble(bubbleContainer);
            }
        }, 800);
    }
    
    const texts = ["Great idea.", "Smart design.", "Clean code.", "Fast launch.", "We build it."];
    
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    const typeText = async (element, text, speed = 40) => {
        element.textContent = "";
        for (let i = 0; i < text.length; i++) {
            if (skipAnimation) return;
            element.textContent += text.charAt(i);
            await delay(speed);
        }
    };
    
    for (let i = 0; i < texts.length && !skipAnimation; i++) {
        const text = texts[i];
        
        if (text === "We build it.") {
            if (cursor) cursor.style.display = 'none';
            if (outputElement) outputElement.style.display = 'none';
            
            if (finalText) {
                finalText.textContent = text;
                finalText.style.display = 'block';
                
                gsap.fromTo(finalText, 
                    { opacity: 0, scale: 0.3 },
                    { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }
                );
                
                await delay(700);
                
                if (!skipAnimation) {
                    gsap.to(finalText, {
                        scale: 6,
                        opacity: 0,
                        duration: 0.8,
                        ease: "expo.in",
                        onComplete: () => {
                            if (container) container.style.display = 'none';
                            if (skipContainer) skipContainer.style.display = 'none';
                            if (mainSite) {
                                mainSite.style.display = 'block';
                                gsap.fromTo(mainSite, 
                                    { opacity: 0 },
                                    { opacity: 1, duration: 0.8 }
                                );
                            }
                            initScrollReveal();
                            initHeroAnimation();
                            initTimelineScroll();
                        }
                    });
                }
            }
            break;
        }
        
        if (outputElement) {
            await typeText(outputElement, text, 40);
        }
        
        if (!skipAnimation) {
            await delay(600);
        }
    }
    
    if (skipAnimation) {
        if (container) container.style.display = 'none';
        if (skipContainer) skipContainer.style.display = 'none';
        if (mainSite) {
            mainSite.style.display = 'block';
            gsap.fromTo(mainSite, 
                { opacity: 0 },
                { opacity: 1, duration: 0.5 }
            );
        }
        initScrollReveal();
        initHeroAnimation();
        initTimelineScroll();
    }
}

function createBubble(container) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    const size = Math.random() * 30 + 10;
    const leftPos = Math.random() * 100;
    const duration = Math.random() * 8 + 5;
    
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = leftPos + '%';
    bubble.style.bottom = '-10%';
    bubble.style.opacity = Math.random() * 0.3 + 0.1;
    
    container.appendChild(bubble);
    
    gsap.to(bubble, {
        y: '-120vh',
        x: (Math.random() - 0.5) * 200,
        duration: duration,
        ease: 'none',
        onComplete: () => bubble.remove()
    });
}

// ============ HERO ANIMATION ============
function initHeroAnimation() {
    const heroBadge = document.querySelector('.hero-badge');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    const marquee = document.querySelector('.marquee');
    
    const tl = gsap.timeline();
    
    if (heroBadge) tl.to(heroBadge, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0);
    if (heroTitle) tl.to(heroTitle, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.1);
    if (heroSubtitle) tl.to(heroSubtitle, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.2);
    if (heroButtons) tl.to(heroButtons, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.3);
    if (marquee) tl.to(marquee, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.4);
}

// ============ SCROLL REVEAL ============
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        reveals.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    window.addEventListener('load', checkReveal);
    checkReveal();
}

// ============ TIMELINE SCROLL ANIMATION ============
function initTimelineScroll() {
    const steps = document.querySelectorAll('.timeline-step');
    const progressBar = document.querySelector('.timeline-progress');
    const timelineContainer = document.querySelector('.timeline-container');
    
    if (!steps.length) return;
    
    function checkTimelineSteps() {
        let maxProgress = 0;
        
        steps.forEach((step, index) => {
            const rect = step.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight - 80) {
                gsap.to(step, {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "power2.out"
                });
                
                const stepProgress = (index + 1) / steps.length;
                if (stepProgress > maxProgress) {
                    maxProgress = stepProgress;
                }
            }
        });
        
        if (progressBar && timelineContainer) {
            const containerRect = timelineContainer.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (containerRect.top < windowHeight - 100) {
                const scrollPercent = Math.min(1, Math.max(0, (window.scrollY + windowHeight - containerRect.top) / (containerRect.height + windowHeight)));
                progressBar.style.height = (scrollPercent * 100) + '%';
            }
        }
    }
    
    steps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-20px)';
    });
    
    window.addEventListener('scroll', checkTimelineSteps);
    window.addEventListener('load', checkTimelineSteps);
    checkTimelineSteps();
}

// ============ FAQ ACCORDION ============
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            item.classList.toggle('active');
        });
    });
}

// ============ VIDEO PORTFOLIO ============
function initVideoPortfolio() {
    const videoWrappers = document.querySelectorAll('.portfolio-video-wrapper');
    
    videoWrappers.forEach(wrapper => {
        const video = wrapper.querySelector('.portfolio-video');
        const playBtn = wrapper.querySelector('.portfolio-play-btn');
        
        if (video && playBtn) {
            playBtn.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                    playBtn.style.opacity = '0';
                } else {
                    video.pause();
                    playBtn.style.opacity = '1';
                }
            });
            
            video.addEventListener('ended', () => {
                playBtn.style.opacity = '1';
            });
            
            video.addEventListener('mouseenter', () => {
                if (video.paused) {
                    playBtn.style.opacity = '1';
                } else {
                    playBtn.style.opacity = '0';
                }
            });
            
            video.addEventListener('mouseleave', () => {
                if (video.paused) {
                    playBtn.style.opacity = '1';
                } else {
                    playBtn.style.opacity = '0';
                }
            });
        }
    });
}

// ============ THEME TOGGLE ============
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }
    
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.contains('dark');
            setTheme(isDark ? 'light' : 'dark');
        });
    }
}

// ============ LANGUAGE TOGGLE ============
const translations = {
    id: {
        nav_home: "Beranda",
        nav_services: "Layanan",
        nav_portfolio: "Project",
        nav_team: "Sertifikat",
        nav_pricing: "Harga",
        nav_faq: "FAQ",
        contact_btn: "Hubungi Kami",
        hero_badge: "SELAMAT DATANG",
        hero_title1: "Solusi Website",
        hero_title2: "Profesional & Terpercaya",
        hero_subtitle: "Kami bikin prosesnya cepat, hasilnya rapi, dan tampilannya berkelas. Siap membantu bisnis Anda go digital dengan website yang meyakinkan.",
        hero_btn1: "Mulai Konsultasi",
        hero_btn2: "Lihat Portfolio",
        marquee_label: "Pernah dipercaya oleh:",
        why_badge: "Kenapa Kami",
        why_title: "Kami bikin prosesnya cepat, hasilnya rapi, dan tampilannya berkelas.",
        feature1_badge: "Fast Development",
        feature1_text: "Pengerjaan dibuat gesit untuk bisnis yang ingin segera online dan mulai bergerak.",
        feature2_badge: "Komunikasi Jelas",
        feature2_text: "Alur kerja dibuat sederhana supaya kamu tidak capek mengikuti proses project.",
        feature3_badge: "Tampilan Meyakinkan",
        feature3_text: "Desain disusun agar bisnis kamu terasa lebih profesional di mata calon pelanggan.",
        services_badge: "Layanan",
        services_title: "Semua yang dibutuhkan bisnis untuk tampil lebih proper di digital.",
        service1_title: "Web Development",
        service1_text: "Company profile, landing page, dan website profesional dengan teknologi modern.",
        service2_title: "E-Commerce",
        service2_text: "Toko online yang aman, cepat, dan mudah dikelola untuk bisnis Anda.",
        service3_title: "Mobile Friendly",
        service3_text: "Website responsif yang tampil sempurna di semua perangkat.",
        service4_title: "SEO Optimization",
        service4_text: "Optimasi mesin pencari agar website Anda mudah ditemukan.",
        service5_title: "UI/UX Design",
        service5_text: "Desain antarmuka yang modern dan pengalaman pengguna yang optimal.",
        service6_title: "Maintenance",
        service6_text: "Dukungan pemeliharaan rutin untuk website yang selalu aman dan up-to-date.",
        portfolio_badge: "Karya Pilihan",
        portfolio_title: "Hasil yang membuktikan kualitas.",
        team_badge: "Sertifikat & Penghargaan",
        team_title: "Bukti kompetensi dan kredibilitas kami.",
        team_subtitle: "Berbagai sertifikat dan penghargaan yang membuktikan kualitas layanan kami.",
        pricing_badge: "Harga",
        pricing_title: "Pilih paket yang paling cocok untuk tahap bisnismu sekarang.",
        pricing_basic_badge: "Basic",
        pricing_basic_price: "Mulai 1,5jt",
        pricing_basic_text: "Untuk landing page sederhana atau company profile basic dengan struktur yang clean dan mobile friendly.",
        pricing_business_badge: "Business",
        pricing_business_price: "Mulai 3,5jt",
        pricing_business_text: "Untuk bisnis yang butuh website lebih lengkap, tampilan lebih solid, dan section yang lebih custom.",
        pricing_custom_badge: "Custom",
        pricing_custom_price: "By Request",
        pricing_custom_text: "Untuk dashboard, web app, sistem internal, atau kebutuhan digital lain dengan scope yang lebih spesifik.",
        workflow_badge: "Alur Kerja",
        workflow_title: "Singkat, jelas, dan tidak muter-muter.",
        workflow1_title: "1. Konsultasi & Konsep",
        workflow1_text: "Diskusikan kebutuhan dan visi website Anda dengan tim kami.",
        workflow2_title: "2. Proposal & MOU",
        workflow2_text: "Penerbitan dokumen kesepakatan dan tagihan awal.",
        workflow3_title: "3. Desain & Prototype",
        workflow3_text: "Pembuatan desain UI/UX dan prototype interaktif.",
        workflow4_title: "4. Development",
        workflow4_text: "Proses coding dan implementasi fitur website.",
        workflow5_title: "5. Launch & Maintenance",
        workflow5_text: "Go live dan dukungan pemeliharaan rutin.",
        faq_badge: "FAQ",
        faq_title: "Pertanyaan yang biasanya muncul sebelum mulai.",
        faq1_q: "Apakah bisa mulai dari project kecil dulu?",
        faq1_a: "Bisa. Landing page, company profile sederhana, atau revisi website lama juga bisa jadi langkah awal.",
        faq2_q: "Apakah harga masih bisa menyesuaikan?",
        faq2_a: "Bisa. Harga di atas adalah acuan awal, dan scope final tetap menyesuaikan kebutuhan project.",
        faq3_q: "Kalau belum punya materi lengkap bagaimana?",
        faq3_a: "Tidak masalah. Kami bisa bantu arahkan susunan konten dasarnya supaya project tetap bisa jalan cepat.",
        faq4_q: "Berapa lama waktu pengerjaan?",
        faq4_a: "Rata-rata 1-4 minggu tergantung kompleksitas project yang dikerjakan.",
        contact_badge: "Mari Mulai",
        contact_title: "Pusingnya di kami, beresnya di kamu.",
        contact_text: "Kalau kamu butuh website atau solusi digital yang cepat jadi, tampil bagus, dan terasa lebih meyakinkan untuk pelanggan, kami siap bantu.",
        footer_text: "© 2026 NEXCT Digital / Website & Solusi Digital"
    },
    en: {
        nav_home: "Home",
        nav_services: "Services",
        nav_portfolio: "Projects",
        nav_team: "Certificates",
        nav_pricing: "Pricing",
        nav_faq: "FAQ",
        contact_btn: "Contact Us",
        hero_badge: "WELCOME",
        hero_title1: "Website Solutions",
        hero_title2: "Professional & Trusted",
        hero_subtitle: "We make the process fast, the output clean, and the presentation polished. Ready to help your business go digital with a convincing website.",
        hero_btn1: "Start Consultation",
        hero_btn2: "View Portfolio",
        marquee_label: "Trusted by:",
        why_badge: "Why Us",
        why_title: "We make the process fast, the output clean, and the presentation polished.",
        feature1_badge: "Fast Development",
        feature1_text: "Execution is kept agile for businesses that want to go online quickly and start moving sooner.",
        feature2_badge: "Clear Communication",
        feature2_text: "The workflow is kept simple so you can follow the project without feeling overwhelmed.",
        feature3_badge: "Polished Presentation",
        feature3_text: "The design is built to make your business look more professional in the eyes of potential customers.",
        services_badge: "Services",
        services_title: "Everything a business needs to show up more professionally in the digital space.",
        service1_title: "Web Development",
        service1_text: "Company profiles, landing pages, and professional websites with modern technology.",
        service2_title: "E-Commerce",
        service2_text: "Secure, fast, and easy-to-manage online stores for your business.",
        service3_title: "Mobile Friendly",
        service3_text: "Responsive websites that look perfect on all devices.",
        service4_title: "SEO Optimization",
        service4_text: "Search engine optimization so your website is easy to find.",
        service5_title: "UI/UX Design",
        service5_text: "Modern interface design and optimal user experience.",
        service6_title: "Maintenance",
        service6_text: "Regular maintenance support for websites that are always secure and up-to-date.",
        portfolio_badge: "Selected Works",
        portfolio_title: "Results that prove quality.",
        team_badge: "Certificates & Awards",
        team_title: "Proof of our competence and credibility.",
        team_subtitle: "Various certificates and awards that prove the quality of our services.",
        pricing_badge: "Pricing",
        pricing_title: "Choose the package that best fits the stage your business is in right now.",
        pricing_basic_badge: "Basic",
        pricing_basic_price: "From $100",
        pricing_basic_text: "For a simple landing page or basic company profile with a clean, mobile-friendly structure.",
        pricing_business_badge: "Business",
        pricing_business_price: "From $250",
        pricing_business_text: "For businesses that need a more complete website, a more solid look, and more custom sections.",
        pricing_custom_badge: "Custom",
        pricing_custom_price: "By Request",
        pricing_custom_text: "For dashboards, web apps, internal systems, or other digital needs with a more specific scope.",
        workflow_badge: "Workflow",
        workflow_title: "Short, clear, and without unnecessary back and forth.",
        workflow1_title: "1. Consultation & Concept",
        workflow1_text: "Discuss your website needs and vision with our team.",
        workflow2_title: "2. Proposal & MOU",
        workflow2_text: "Issuance of cooperation agreement and initial invoice.",
        workflow3_title: "3. Design & Prototype",
        workflow3_text: "UI/UX design creation and interactive prototype.",
        workflow4_title: "4. Development",
        workflow4_text: "Coding process and website feature implementation.",
        workflow5_title: "5. Launch & Maintenance",
        workflow5_text: "Go live and routine maintenance support.",
        faq_badge: "FAQ",
        faq_title: "Questions that usually come up before getting started.",
        faq1_q: "Can we start with a small project first?",
        faq1_a: "Absolutely. A landing page, simple company profile, or revision of an existing site can all be the first step.",
        faq2_q: "Is the pricing flexible?",
        faq2_a: "Yes. The prices listed here are starting references, and the final scope will always be adjusted to your project needs.",
        faq3_q: "What if I don't have all the content ready yet?",
        faq3_a: "No problem. We can help guide the basic content structure so the project can still move forward quickly.",
        faq4_q: "How long does the work take?",
        faq4_a: "Average 1-4 weeks depending on project complexity.",
        contact_badge: "Let's Start",
        contact_title: "Leave the hassle to us, enjoy the finished result.",
        contact_text: "If you need a website or digital solution that can be built quickly, looks polished, and feels more convincing to your customers, we're ready to help.",
        footer_text: "© 2026 NEXCT Digital / Websites & Digital Solutions"
    }
};

let currentLang = 'id';

function initLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    
    const savedLang = localStorage.getItem('language');
    if (savedLang === 'en') {
        currentLang = 'en';
        applyLanguage('en');
        document.body.classList.add('lang-en');
        document.body.classList.remove('lang-id');
    } else {
        applyLanguage('id');
        document.body.classList.add('lang-id');
        document.body.classList.remove('lang-en');
    }
    
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const newLang = currentLang === 'id' ? 'en' : 'id';
            currentLang = newLang;
            applyLanguage(newLang);
            localStorage.setItem('language', newLang);
            if (newLang === 'id') {
                document.body.classList.add('lang-id');
                document.body.classList.remove('lang-en');
            } else {
                document.body.classList.add('lang-en');
                document.body.classList.remove('lang-id');
            }
        });
    }
}

function applyLanguage(lang) {
    const elements = document.querySelectorAll('[data-key]');
    
    elements.forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });
}

// ============ MOBILE MENU ============
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

// ============ SMOOTH SCROLL ============
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ============ FLOATING WA ANIMATION ============
function initFloatingWA() {
    const floatingWA = document.querySelector('.floating-wa');
    if (floatingWA) {
        gsap.to(floatingWA, {
            scale: 1.1,
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
}

// ============ MARQUEE DUPLICATION ============
function initMarquee() {
    const track = document.getElementById('marqueeTrack');
    if (track) {
        const items = track.innerHTML;
        track.innerHTML = items + items;
    }
}

// ============ INITIALIZE ============
window.addEventListener('DOMContentLoaded', () => {
    startIntroAnimation();
    initThemeToggle();
    initLanguageToggle();
    initMobileMenu();
    initSmoothScroll();
    initFloatingWA();
    initFaqAccordion();
    initVideoPortfolio();
    initMarquee();
});