import React from 'react';

const Popup: React.FC = () => {
  const captureScreenshot = () => {
    chrome.tabs.captureVisibleTab({ format: 'png' }, (screenshotDataUrl) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        return;
      }

      const screenshotContainer = document.getElementById('screenshotContainer');
      if (screenshotContainer) {
        const screenshotImage = new Image();
        screenshotImage.src = screenshotDataUrl;
        screenshotContainer.innerHTML = ''; // Clear previous screenshot
        screenshotContainer.appendChild(screenshotImage);

        // Programmatically download the screenshot
        chrome.downloads.download({
          url: screenshotDataUrl,
          filename: 'screenshot.png'
        }, (downloadId) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
          } else {
            console.log('Screenshot saved with download ID:', downloadId);
          }
        });
      }
    });
  };

  return (
    <div>
      <button id="capture" onClick={captureScreenshot}>Capture Screenshot</button>
      <div id="screenshotContainer"></div>
    </div>
  );
};

export default Popup;
