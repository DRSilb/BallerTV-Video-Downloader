// Listen for when the user clicks the extension icon in the toolbar
chrome.action.onClicked.addListener((tab) => {
    
    // 1. Grab the URL of the current tab
    const currentUrl = new URL(tab.url);
    
    // 2. Split the URL path by slashes and remove any empty strings
    const pathParts = currentUrl.pathname.split('/').filter(Boolean);
    
    // 3. Grab the very last piece of the URL
    // If for some reason the URL is blank, default to "Scraped_Video"
    let videoName = pathParts[pathParts.length - 1] || "Scraped_Video";

    // It finds the LAST hyphen and removes it and everything after it (random id).
    videoName = videoName.substring(0, videoName.lastIndexOf('-'));

    // 4. Add the .mp4 extension
    const finalFilename = videoName + ".mp4";

    // Inject and run the scrape function
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: scrapeForVideo,
    }, (injectionResults) => {
        const videoUrl = injectionResults[0].result;

        if (videoUrl) {
            console.log("Found URL:", videoUrl);
            
            // Trigger the download with our new dynamic filename
            chrome.downloads.download({
                url: videoUrl,
                filename: finalFilename 
            });
        } else {
            console.log("Could not find the video URL on this page.");
        }
    });
});

// The scraping function remains exactly the same
function scrapeForVideo() {
    const pageHTML = document.documentElement.innerHTML;
    const regex = /clipping_file_url.*?(https:\/\/[^\\&"<>]+?\.mp4)/i;
    const match = pageHTML.match(regex);
    
    if (match && match[1]) {
        return match[1];
    }
    return null;
}