const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Close nav when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
    });
}

navSlide();

// --- Typing Effect ---
const roles = ["Software Engineer", "Data Analyst", "Python Developer"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 150;
const erasingSpeed = 100;
const delayBetweenRoles = 2000;
const typingTextElement = document.getElementById('typing-text');

function type() {
    if (!typingTextElement) return; // Exit if element not found
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(type, delayBetweenRoles);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, typingSpeed);
    } else {
        setTimeout(type, isDeleting ? erasingSpeed : typingSpeed);
    }
}

document.addEventListener('DOMContentLoaded', type);

// --- Scroll Animations ---
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stagger children animation if needed
            const children = entry.target.querySelectorAll('.job, .project-card, .certification');
            children.forEach((child, index) => {
                child.style.transitionDelay = `${index * 100}ms`;
            });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.animate').forEach(element => {
    observer.observe(element);
});

// --- Header Scroll ---
let lastScrollTop = 0;
const header = document.querySelector('header');
window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
        // Scroll Down
        header.style.top = `-${header.offsetHeight}px`;
    } else {
        // Scroll Up
        header.style.top = '0';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// --- Contact Form Submission (AJAX) ---
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    try {
        const response = await fetch(event.target.action, {
            method: contactForm.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formStatus.innerHTML = "Thanks for your message! I'll get back to you soon.";
            formStatus.className = 'success';
            formStatus.style.display = 'block';
            contactForm.reset();
        } else {
            // Handle server-side errors from Formspree
            formStatus.innerHTML = "Oops! There was a problem submitting your form.";
            formStatus.className = 'error';
            formStatus.style.display = 'block';
        }
    } catch (error) {
        // Handle network errors
        formStatus.innerHTML = "Oops! There was a network error.";
        formStatus.className = 'error';
        formStatus.style.display = 'block';
    }
}
if (contactForm) contactForm.addEventListener("submit", handleSubmit);