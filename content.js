async function waitForSelector(selector, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector);
      if (element) {
        observer.disconnect();
        resolve(element);
      } else if (Date.now() - startTime > timeout) {
        observer.disconnect();
        reject(new Error(`Timeout esperando el selector: ${selector}`));
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    const element = document.querySelector(selector);
    if (element) {
      observer.disconnect();
      resolve(element);
    }
  });
}

async function createDownloadButton(url) {
  const downloadButton = await waitForSelector(
    "#preview-panel-container button"
  );

  if (downloadButton) {
    const link = document.createElement("a");

    link.href = url;
    link.download = "resume.pdf";

    link.innerHTML =
      "<button id='download-button'><span>FREE PDF</span></button>";

    downloadButton.replaceWith(link);
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  createDownloadButton(request.url);
  sendResponse({ received: true });
});
