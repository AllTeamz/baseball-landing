document.addEventListener('DOMContentLoaded', function() {
    const appId = '1502937685';
    const country = 'us';
    const priceElement = document.querySelector('.appPrice');

    if (!priceElement) return;

    // Set loading state
    priceElement.style.opacity = '0.5';
    priceElement.textContent = '';

    // Create a script element for JSONP
    const script = document.createElement('script');
    const callbackName = 'itunes_' + Math.random().toString(36).substring(7);

    // Define the callback function
    window[callbackName] = function(data) {
        if (data.results && data.results[0]) {
            const formattedPrice = data.results[0].formattedPrice || 'Free';
            priceElement.textContent = formattedPrice;
        } else {
            priceElement.textContent = 'View in App Store';
        }
        priceElement.style.opacity = '1';
        
        // Clean up
        document.body.removeChild(script);
        delete window[callbackName];
    };

    // Handle errors
    script.onerror = function() {
        priceElement.textContent = 'View in App Store';
        priceElement.style.opacity = '1';
        document.body.removeChild(script);
        delete window[callbackName];
    };

    // Set up the script URL
    script.src = `https://itunes.apple.com/lookup?id=${appId}&country=${country}&callback=${callbackName}`;
    document.body.appendChild(script);

    // Set a timeout
    setTimeout(function() {
        if (priceElement.textContent === '') {
            priceElement.textContent = 'View in App Store';
            priceElement.style.opacity = '1';
        }
    }, 3000);
});
