// Portfolio Items Data
const portfolioItems = [
    {
        id: 1,
        category: 'video',
        title: 'बटौली',
        type: 'youtube',
        videoId: 'FFwUWDQamD0',
        youtubeUrl: 'https://www.youtube.com/watch?v=FFwUWDQamD0&ab_channel=knownstranger01',
        description: 'बटौली'
    },
    {
        id: 2,
        category: 'graphic',
        title: 'नाइके जुत्ता विज्ञापन',
        type: 'image',
        image: 'images/nike shoe ad.png',
        description: 'नाइके जुत्ताको क्रियेटिभ विज्ञापन डिजाइन'
    },
    {
        id: 3,
        category: 'video',
        title: 'के माया लाग्छ र ?',
        type: 'youtube',
        videoId: '3Miwh9gQgvE',
        youtubeUrl: 'https://www.youtube.com/watch?v=3Miwh9gQgvE&ab_channel=knownstranger01',
        description: 'के माया लाग्छ र ?'
    },
    {
        id: 4,
        category: 'graphic',
        title: 'हेडफोन विज्ञापन',
        type: 'image',
        image: 'images/Headphone Advertisement.png',
        description: 'हेडफोनको आकर्षक विज्ञापन डिजाइन'
    },
    {
        id: 5,
        category: 'video',
        title: 'रफ्तार रफ्तार',
        type: 'youtube',
        videoId: 'OxF8LbGwFJg',
        youtubeUrl: 'https://www.youtube.com/watch?v=OxF8LbGwFJg&ab_channel=knownstranger01',
        description: 'रफ्तार रफ्तार'
    }
];

// DOM Elements
const portfolioGrid = document.querySelector('.portfolio-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const emailForm = document.getElementById('emailForm');

// Initialize Portfolio Grid
function initializePortfolio() {
    const videoGrid = document.querySelector('.video-grid');
    const designGrid = document.querySelector('.design-grid');
    
    // Clear existing items
    videoGrid.innerHTML = '';
    designGrid.innerHTML = '';
    
    portfolioItems.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        
        let contentHTML = '';
        if (item.type === 'youtube') {
            contentHTML = `
                <div class="portfolio-item-inner">
                    <div class="video-container">
                        <iframe 
                            width="100%" 
                            height="300" 
                            src="https://www.youtube.com/embed/${item.videoId}"
                            title="${item.title}"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                    </div>
                    <div class="portfolio-info">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                        <a href="${item.youtubeUrl}" class="watch-on-youtube" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-youtube"></i> Watch on YouTube
                        </a>
                    </div>
                </div>
            `;
            videoGrid.appendChild(portfolioItem);
        } else if (item.type === 'image') {
            contentHTML = `
                <div class="portfolio-item-inner">
                    <a href="${item.image}" class="portfolio-image-link" target="_blank">
                        <img src="${item.image}" alt="${item.title}">
                    </a>
                    <div class="portfolio-info">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                        <a href="${item.image}" class="view-full-image" target="_blank">
                            <i class="fas fa-external-link-alt"></i> View Full Image
                        </a>
                    </div>
                </div>
            `;
            designGrid.appendChild(portfolioItem);
        }
        
        portfolioItem.innerHTML = contentHTML;
    });
}

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Form Submission
if (emailForm) {
    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('Message sent successfully!');
        emailForm.reset();
    });
}

// Initialize Portfolio on Load
document.addEventListener('DOMContentLoaded', initializePortfolio);

// Add scroll event for navbar
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 0);
});

// Theme Switch
const themeSwitch = document.querySelector('.theme-switch');
const body = document.body;

themeSwitch.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
}

// Add CSS for portfolio items
const style = document.createElement('style');
style.textContent = `
    .portfolio-item {
        position: relative;
        overflow: hidden;
        border-radius: 10px;
        transition: all 0.3s ease;
        background: #fff;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .portfolio-item-inner {
        position: relative;
    }

    .portfolio-item img,
    .video-container {
        width: 100%;
        height: 300px;
        transition: transform 0.3s ease;
    }

    .portfolio-item img {
        object-fit: contain;
        background: #f5f5f5;
        padding: 1rem;
    }

    .portfolio-image-link {
        display: block;
        width: 100%;
        height: 100%;
        background: #fff;
    }

    .video-container {
        position: relative;
        overflow: hidden;
        background: #000;
    }

    .video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .portfolio-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    .portfolio-info {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 1rem;
        transform: translateY(100%);
        transition: transform 0.3s ease;
    }

    .portfolio-item:hover .portfolio-info {
        transform: translateY(0);
    }

    .portfolio-item:hover img {
        transform: scale(1.05);
    }

    .portfolio-info h3 {
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
    }

    .portfolio-info p {
        margin-bottom: 1rem;
        font-size: 0.9rem;
        opacity: 0.8;
    }

    .watch-on-youtube,
    .view-full-image {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: #fff;
        text-decoration: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        font-size: 0.9rem;
        transition: background 0.3s ease;
    }

    .watch-on-youtube {
        background: #ff0000;
    }

    .watch-on-youtube:hover {
        background: #cc0000;
    }

    .view-full-image {
        background: #2c3e50;
    }

    .view-full-image:hover {
        background: #34495e;
    }

    .watch-on-youtube i,
    .view-full-image i {
        font-size: 1.2rem;
    }

    @media (max-width: 1024px) {
        .portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
            padding: 1.5rem;
        }
    }

    @media (max-width: 768px) {
        .portfolio-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 1rem;
        }
        
        .portfolio-info {
            position: relative;
            transform: none;
            background: #2c3e50;
        }
        
        .portfolio-item:hover img {
            transform: none;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style); 