document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const originalUrlInput = document.getElementById('original-url');
    const shortenButton = document.getElementById('shorten-button');
    const resultContainer = document.getElementById('result-container');
    const shortenedUrlInput = document.getElementById('shortened-url');
    const originalUrlDisplay = document.getElementById('original-url-display');
    const copyButton = document.getElementById('copy-button');
    const loader = document.getElementById('loader');
    const errorContainer = document.getElementById('error-container');
    const errorMessage = document.getElementById('error-message');

   
    const API_ENDPOINT = '';

    async function shortenUrl(url) {
        try {
            showLoader();
            hideError();
            hideResult();

            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to shorten URL');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        } finally {
            hideLoader();
        }
    }


    shortenButton.addEventListener('click', async () => {
        const url = originalUrlInput.value.trim();

        if (!url) {
            showError('Please enter a valid URL');
            return;
        }

        try {
            const data = await shortenUrl(url);

            shortenedUrlInput.value = data.shortUrl;
            originalUrlDisplay.textContent = `Original: ${data.originalUrl}`;
            showResult();
        } catch (error) {
            showError(error.message || 'An error occurred while shortening the URL');
        }
    });

    copyButton.addEventListener('click', () => {
        shortenedUrlInput.select();
        document.execCommand('copy');

        const originalText = copyButton.textContent;
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = originalText;
        }, 2000);
    });

    // Helper functions
    function showLoader() {
        loader.style.display = 'flex';
    }

    function hideLoader() {
        loader.style.display = 'none';
    }

    function showResult() {
        resultContainer.style.display = 'block';
    }

    function hideResult() {
        resultContainer.style.display = 'none';
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorContainer.style.display = 'block';
    }

    function hideError() {
        errorContainer.style.display = 'none';
    }
});