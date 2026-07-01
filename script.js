// Custom Cursor
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with a slight delay
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 250, fill: "forwards" });
});

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.05
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section, .project-card, .skill-category, .timeline-item, .experience-card, .cert-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(15px)';
    el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    observer.observe(el);
});

// Typewriter Effect
const textElement = document.getElementById('typing-text');
const phrases = ["Backend APIs", "Spring Boot Apps", "Java Solutions", "Software Systems"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 80;

function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40; // Faster deletion
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80; // Normal typing speed
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 1500; // Pause at end of phrase
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400; // Pause before typing new phrase
    }

    setTimeout(type, typeSpeed);
}

// Start Typewriter
document.addEventListener('DOMContentLoaded', type);

// Initialize Vanilla Tilt on project cards
VanillaTilt.init(document.querySelectorAll(".project-card"), {
    max: 10,
    speed: 300,
    glare: false
});

// Initialize Vanilla Tilt on skill categories
const skillCategories = document.querySelectorAll(".skill-category");
if (skillCategories.length > 0) {
    VanillaTilt.init(skillCategories, {
        max: 6,
        speed: 300,
    });
}

// Magnetic Buttons Effect
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline, .btn-primary-menu, .social-links a');

buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// Parallax Background Effect
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const blobs = document.querySelectorAll('.hero-image-blob');

    blobs.forEach(blob => {
        blob.style.transform = `translateY(${scrollPosition * 0.3}px) rotate(${scrollPosition * 0.1}deg)`;
    });
});
