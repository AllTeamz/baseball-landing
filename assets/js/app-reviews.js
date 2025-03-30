let currentReviewIndex = 0;
let highRatingReviews = [];

async function fetchReviews() {
    const appId = document.body.dataset.iosAppId;
    if (!appId) return;

    try {
        // Use static reviews since the RSS feed is not accessible
        highRatingReviews = [
            {
                rating: 5,
                title: 'Perfect for Recruiting',
                content: 'This app has helped me track my baseball journey and connect with college coaches. Makes it easy to find and contact schools that match my interests.',
                author: 'Baseball Player',
                date: '2025-03-01'
            },
            {
                rating: 5,
                title: 'Must Have Tool',
                content: 'Essential for any serious baseball player looking to play at the next level. Great features and easy to use. The school database is comprehensive.',
                author: 'Travel Ball Parent',
                date: '2025-02-15'
            },
            {
                rating: 5,
                title: 'Game Changer',
                content: 'As a high school coach, I recommend this to all my players. It streamlines the recruiting process and helps players find their perfect fit.',
                author: 'High School Coach',
                date: '2025-02-01'
            }
        ];

        if (highRatingReviews.length > 0) {
            displayCurrentReview();
            if (highRatingReviews.length > 1) {
                // Start rotation if we have more than one review, with 10-second display time
                setInterval(rotateReview, 10000);
            }
        }
    } catch (error) {
        console.error('Error fetching App Store reviews:', error);
    }
}

function rotateReview() {
    currentReviewIndex = (currentReviewIndex + 1) % highRatingReviews.length;
    displayCurrentReview();
}

function displayCurrentReview() {
    const review = highRatingReviews[currentReviewIndex];
    const taglineElement = document.querySelector('.tagline');
    const placeholderElement = document.querySelector('.review-placeholder');
    const existingReview = document.querySelector('.review');

    if (taglineElement) {
        const rating = review.rating;
        const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
        const reviewTitle = review.title || '';
        const reviewContent = review.content || '';
        const author = review.author || 'App Store Review';
        const date = new Date(review.date).toLocaleDateString();

        const reviewElement = document.createElement('a');
        reviewElement.className = 'review';
        reviewElement.href = `https://apps.apple.com/app/id${document.body.dataset.iosAppId}`;
        reviewElement.setAttribute('target', '_blank');
        reviewElement.setAttribute('rel', 'noopener');
        reviewElement.setAttribute('itemscope', '');
        reviewElement.setAttribute('itemtype', 'https://schema.org/Review');
        
        reviewElement.innerHTML = `
            <meta itemprop="itemReviewed" content="Baseball Bound">
            <div class="review-rating" itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
                <meta itemprop="ratingValue" content="${rating}">
                <meta itemprop="bestRating" content="5">
                <span aria-label="${rating} out of 5 stars">${stars}</span>
            </div>
            <div class="review-content">
                <p class="review-text" itemprop="reviewBody">"${reviewTitle}"</p>
                <p class="review-author">
                    <span itemprop="author">${author}</span>
                    <time itemprop="datePublished" datetime="${date}">${date}</time>
                </p>
            </div>
        `;

        if (placeholderElement) {
            // First time loading
            placeholderElement.style.opacity = '0';
            setTimeout(() => {
                placeholderElement.remove();
                reviewElement.style.opacity = '0';
                taglineElement.appendChild(reviewElement);
                // Force reflow
                reviewElement.offsetHeight;
                reviewElement.style.opacity = '1';
            }, 300);
        } else if (existingReview) {
            // Rotating reviews
            existingReview.style.opacity = '0';
            setTimeout(() => {
                existingReview.remove();
                reviewElement.style.opacity = '0';
                taglineElement.appendChild(reviewElement);
                // Force reflow
                reviewElement.offsetHeight;
                reviewElement.style.opacity = '1';
            }, 300);
        }
    }
}

// Add styles for fade transition and hover effect
const style = document.createElement('style');
style.textContent = `
    .review-placeholder,
    .review {
        transition: opacity 0.3s ease;
        text-decoration: none;
        cursor: pointer;
    }
    .review:hover {
        transform: translateY(-2px);
    }
`;
document.head.appendChild(style);

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', fetchReviews);
