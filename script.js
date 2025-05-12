document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark-mode') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '🌞';
    }
    
    // Toggle theme
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        const currentTheme = body.classList.contains('dark-mode') ? 'dark-mode' : '';
        localStorage.setItem('theme', currentTheme);
        
        // Update button icon
        themeToggle.textContent = body.classList.contains('dark-mode') ? '🌞' : '🌓';
        
        // Add animation effect
        themeToggle.classList.add('animate');
        setTimeout(() => {
            themeToggle.classList.remove('animate');
        }, 300);
    });
    
    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletter-form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const isParent = document.getElementById('parent-check').checked;
        const isStudent = document.getElementById('student-check').checked;
        
        // Validate email
        if (!email.includes('@')) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Save subscription data
        const subscription = {
            email,
            isParent,
            isStudent,
            date: new Date().toISOString()
        };
        
        localStorage.setItem('newsletterSubscription', JSON.stringify(subscription));
        
        // Show success message
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
        
        // Add visual feedback
        const submitBtn = newsletterForm.querySelector('button');
        submitBtn.textContent = '✓ Subscribed!';
        submitBtn.style.backgroundColor = '#2ecc71';
        
        setTimeout(() => {
            submitBtn.textContent = 'Subscribe';
            submitBtn.style.backgroundColor = '';
        }, 2000);
    });
    
    // Check for existing subscription
    const savedSubscription = localStorage.getItem('newsletterSubscription');
    if (savedSubscription) {
        const subscription = JSON.parse(savedSubscription);
        document.getElementById('email').value = subscription.email || '';
        document.getElementById('parent-check').checked = subscription.isParent || false;
        document.getElementById('student-check').checked = subscription.isStudent || false;
    }
    
    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Set current year in footer
    const yearElement = document.createElement('span');
    yearElement.textContent = new Date().getFullYear();
    document.querySelector('footer p:first-child').innerHTML = 
        `Greenwood High School &copy; ${yearElement.textContent}`;
});
