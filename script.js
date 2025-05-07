// Constants
const WHITE_SMOKE_IMAGE = 'https://isthereawhitesmoke.com/white-smoke.webp';
const BLACK_SMOKE_IMAGE = 'https://isthereawhitesmoke.com/black.jpeg';

// DOM Elements
const statusElement = document.getElementById('status');
const smokeImageElement = document.getElementById('smoke-image');
const newsContainer = document.getElementById('news-container');

// Function to update the status and image
async function updateSmokeStatus() {
    try {
        // Get the status from the server-side environment variable
        const response = await fetch('/api/get-smoke-status');
        const data = await response.json();
        
        // Update status text
        if (data.smokeStatus === 'white') {
            statusElement.textContent = 'YES. A new pope has been elected!';
            smokeImageElement.innerHTML = `<img src="${WHITE_SMOKE_IMAGE}" alt="White smoke from Vatican chimney" class="smoke-image">`;
        } else if (data.smokeStatus === 'black') {
            statusElement.textContent = 'NO. The world waits.';
            smokeImageElement.innerHTML = `<img src="${BLACK_SMOKE_IMAGE}" alt="Black smoke from Vatican chimney" class="smoke-image">`;
        } else {
            statusElement.textContent = 'Status unavailable';
            smokeImageElement.innerHTML = '';
        }
    } catch (error) {
        console.error('Error fetching smoke status:', error);
        statusElement.textContent = 'Error loading status';
        smokeImageElement.innerHTML = '';
    }
}

// Function to update news feed
async function updateNewsFeed() {
    try {
        const response = await fetch('/api/get-vatican-news');
        const data = await response.json();
        
        if (data.news && data.news.length > 0) {
            const newsHTML = data.news.map(item => `
                <div class="news-item bg-white rounded-lg shadow-md p-6 mb-4 transform transition-all duration-300 hover:scale-105">
                    <h3 class="text-xl font-semibold mb-2 text-gray-800">
                        <a href="${item.link}" target="_blank" class="hover:text-blue-600 transition-colors">
                            ${item.title}
                        </a>
                    </h3>
                    <p class="text-gray-600 mb-3">${item.description}</p>
                    <div class="text-sm text-gray-500">${item.pubDate}</div>
                </div>
            `).join('');
            
            newsContainer.innerHTML = `
                <div class="news-feed">
                    <h2 class="text-3xl font-bold mb-6 text-gray-800">Latest from Vatican News</h2>
                    <div class="news-grid">
                        ${newsHTML}
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p class="text-red-500">Error loading news feed</p>';
    }
}

// Initialize AdSense ads
function initializeAds() {
    (adsbygoogle = window.adsbygoogle || []).push({});
}

// Update status and news every 30 seconds
function startPolling() {
    updateSmokeStatus();
    updateNewsFeed();
    setInterval(() => {
        updateSmokeStatus();
        updateNewsFeed();
    }, 30000);
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    startPolling();
    initializeAds();
}); 