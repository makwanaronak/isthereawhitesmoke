// Constants
const WHITE_SMOKE_IMAGE = 'https://isthereawhitesmoke.com/white-smoke.webp';
const BLACK_SMOKE_IMAGE = 'https://isthereawhitesmoke.com/black.jpeg';

// DOM Elements
const statusElement = document.getElementById('status');
const smokeImageElement = document.getElementById('smoke-image');

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

// Initialize AdSense ads
function initializeAds() {
    (adsbygoogle = window.adsbygoogle || []).push({});
}

// Update status every 30 seconds
function startPolling() {
    updateSmokeStatus();
    setInterval(updateSmokeStatus, 30000);
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    startPolling();
    initializeAds();
}); 