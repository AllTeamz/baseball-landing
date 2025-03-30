document.addEventListener('DOMContentLoaded', function() {
    const reviews = document.querySelectorAll('.review');
    let currentIndex = 0;
    
    function cycleReviews() {
        reviews[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % reviews.length;
        reviews[currentIndex].style.display = 'block';
    }
    
    // Cycle every 15 seconds
    setInterval(cycleReviews, 15000);
    
    // Add fade transition
    const style = document.createElement('style');
    style.textContent = `
        .review {
            transition: opacity 0.5s ease-in-out;
        }
        .review.fade-out {
            opacity: 0;
        }
        .review.fade-in {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});
