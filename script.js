// DOM Elements
const mobileMenuBtn = document.getElementById('mobile-menu');
const mobileNav = document.getElementById('mobile-nav');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
const sections = document.querySelectorAll('.section');
const recipeCards = document.querySelectorAll('.recipe-card');
const categoryBtns = document.querySelectorAll('.category-btn');
const recipeDetailBtns = document.querySelectorAll('.recipe-detail-btn');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
});

// Close mobile menu when clicking a link and scroll to section
// Also handle smooth scrolling for all nav links (desktop and mobile)
document.querySelectorAll('.mobile-nav a, .nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        // Get section id from href or data-section
        let sectionId = this.getAttribute('href');
        if (sectionId === '#' || !sectionId) {
            sectionId = '#' + this.getAttribute('data-section');
        }
        const targetElement = document.querySelector(sectionId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            updateActiveSection(sectionId);
        }
        // Close mobile menu
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
    });
});

// Update active section based on scroll position
window.addEventListener('scroll', () => {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 100) && pageYOffset < (sectionTop + sectionHeight - 100)) {
            currentSection = '#' + section.id;
        }
    });
    
    updateActiveSection(currentSection);
});

// Function to update active section and navigation
function updateActiveSection(sectionId) {
    // Update navigation links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === sectionId) {
            link.classList.add('active');
        }
    });
    
    // Update sections
    sections.forEach(section => {
        section.classList.remove('active-section');
        if ('#' + section.id === sectionId) {
            section.classList.add('active-section');
        }
    });
}

// Recipe category filtering
categoryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Update active category button
        categoryBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        
        // Filter recipes
        recipeCards.forEach(card => {
            if (category === 'all' || card.dataset.categories.includes(category)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Recipe detail view (simulated - in a real app this would fetch details)
recipeDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const recipeId = btn.dataset.recipe;
        alert(`In a complete application, this would show detailed view for recipe: ${recipeId}`);
        // In a real app, you might:
        // 1. Fetch recipe details from an API
        // 2. Show a modal with the details
        // 3. Or navigate to a dedicated recipe page
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // In a real app, you would send this data to a server
        console.log('Form submitted:', { name, email, subject, message });
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email) {
            console.log('Newsletter subscription:', email);
            alert('Thanks for subscribing to our newsletter!');
            emailInput.value = '';
        }
    });
}

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

// Initialize - set home as active if no hash in URL
if (!window.location.hash) {
    updateActiveSection('#home');
} else {
    updateActiveSection(window.location.hash);
}