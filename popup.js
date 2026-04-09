document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        const currentUrl = new URL(tab.url);

        // THE DOMAIN LOCK
        if (!currentUrl.hostname.includes("ballertv.com")) {
            document.getElementById('error-msg').style.display = 'block';
            return; 
        }

        // Show the buttons
        document.getElementById('menu-controls').style.display = 'block';

        function executeAction(actionType) {
            // Reset the "not found" message to hidden every time a button is clicked
            document.getElementById('not-found-msg').style.display = 'none';

            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: scrapeForVideo,
            }, (injectionResults) => {
                const videoUrl = injectionResults[0].result;

                if (videoUrl) {
                    if (actionType === 'download') {
                        const pathParts = currentUrl.pathname.split('/').filter(Boolean);
                        let videoName = pathParts[pathParts.length - 1] || "Scraped_Video";
                        
                        chrome.downloads.download({
                            url: videoUrl,
                            filename: videoName + ".mp4" 
                        });
                    } else if (actionType === 'preview') {
                        chrome.tabs.create({ url: videoUrl });
                    }
                } else {
                    // SHOW THE NEW HTML ERROR MESSAGE INSTEAD OF AN ALERT
                    document.getElementById('not-found-msg').style.display = 'block';
                }
            });
        }

        document.getElementById('downloadBtn').addEventListener('click', () => {
            executeAction('download');
        });

        document.getElementById('previewBtn').addEventListener('click', () => {
            executeAction('preview');
        });
    });
});

function scrapeForVideo() {
    const pageHTML = document.documentElement.innerHTML;
    const regex = /clipping_file_url.*?(https:\/\/[^\\&"<>]+?\.mp4)/i;
    const match = pageHTML.match(regex);
    
    if (match && match[1]) {
        return match[1];
    }
    return null;
}