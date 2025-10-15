document.addEventListener('DOMContentLoaded', function() {
    // Toggle mobile menu
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('show');
        });
    }

    // Form validation
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (!validateEmail(email)) {
                e.preventDefault();
                showError('Please enter a valid email address.');
            }
            
            if (password.length < 6) {
                e.preventDefault();
                showError('Password must be at least 6 characters long.');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (firstName.trim() === '' || lastName.trim() === '') {
                e.preventDefault();
                showError('Please enter your first and last name.');
            }
            
            if (!validateEmail(email)) {
                e.preventDefault();
                showError('Please enter a valid email address.');
            }
            
            if (password.length < 6) {
                e.preventDefault();
                showError('Password must be at least 6 characters long.');
            }
        });
    }

    // Dashboard functionality
    initDashboardElements();

    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Helper functions
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showError(message) {
    let errorDiv = document.querySelector('.error-message');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        
        const form = document.querySelector('form');
        const submitButton = form.querySelector('button[type="submit"]');
        form.insertBefore(errorDiv, submitButton);
    }
    
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function initDashboardElements() {
    // Load dashboard data if on dashboard pages
    if (window.location.pathname.includes('Dashboard')) {
        loadAnnouncementsData();
        
        // Initialize charts if specific dashboard sections exist
        if (document.getElementById('student-performance-chart')) {
            initStudentPerformanceChart();
        }
        
        if (document.getElementById('course-enrollment-chart')) {
            initCourseEnrollmentChart();
        }
        
        // Add event listeners for dashboard actions
        const actionButtons = document.querySelectorAll('.table-actions button');
        if (actionButtons.length > 0) {
            actionButtons.forEach(button => {
                button.addEventListener('click', handleTableAction);
            });
        }
    }
}

function loadAnnouncementsData() {
    const announcementsSection = document.getElementById('announcements-section');
    
    if (announcementsSection) {
        // Fetch announcements data from API
        fetch('/api/announcements')
            .then(response => response.json())
            .then(data => {
                const announcementsList = announcementsSection.querySelector('.announcements-list');
                if (announcementsList && data.announcements) {
                    displayAnnouncements(announcementsList, data.announcements);
                }
            })
            .catch(error => {
                console.error('Error loading announcements:', error);
            });
    }
}

function displayAnnouncements(container, announcements) {
    // Clear existing content
    container.innerHTML = '';
    
    if (announcements.length === 0) {
        container.innerHTML = '<p>No announcements at this time.</p>';
        return;
    }
    
    announcements.forEach(announcement => {
        const announcementItem = document.createElement('div');
        announcementItem.className = 'announcement-item';
        
        const formattedDate = new Date(announcement.date).toLocaleDateString();
        
        announcementItem.innerHTML = `
            <div class="announcement-header">
                <h3 class="announcement-title">${announcement.title}</h3>
                <span class="announcement-date">${formattedDate}</span>
            </div>
            <div class="announcement-content">
                <p>${announcement.content}</p>
            </div>
        `;
        
        container.appendChild(announcementItem);
    });
}

function handleTableAction(e) {
    const action = e.currentTarget.dataset.action;
    const itemId = e.currentTarget.dataset.id;
    
    if (action === 'view') {
        // Handle view action
        console.log(`View item ${itemId}`);
        // Implement view functionality
    } else if (action === 'edit') {
        // Handle edit action
        console.log(`Edit item ${itemId}`);
        // Implement edit functionality
    } else if (action === 'delete') {
        // Handle delete action with confirmation
        if (confirm('Are you sure you want to delete this item?')) {
            console.log(`Delete item ${itemId}`);
            // Implement delete functionality
        }
    }
}