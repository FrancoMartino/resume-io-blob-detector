let tabId = null;

function updateDownloadBlob(blobUrl) {
  chrome.tabs.sendMessage(tabId, { url: blobUrl });
}

function startMonitoring(tab) {
  tabId = tab.id;

  if (tab.url && tab.url.includes("resume.io")) {
    chrome.debugger.attach({ tabId }, "1.3", () => {
      console.log("Debugger attached to tab:", tabId);

      chrome.debugger.sendCommand({ tabId }, "Network.enable");

      chrome.debugger.onEvent.addListener((source, method, params) => {
        if (source.tabId === tabId && method === "Network.responseReceived") {
          const { response } = params;

          if (response.url.startsWith("blob:https://resume.io/")) {
            console.log("Blob detectado:", response.url);
            updateDownloadBlob(response.url);
          }
        }
      });
    });
  } else {
    console.log("Debugger no se adjunta. URL no válida:", tab.url);
  }
}

function stopMonitoring() {
  if (tabId) {
    chrome.debugger.detach({ tabId }, () => {
      console.log("Debugger detached from tab:", tabId);
      tabId = null;
    });
  }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url &&
    tab.url.includes("resume.io")
  ) {
    startMonitoring(tab);
  } else if (changeInfo.status === "complete" && tabId === tabId) {
    stopMonitoring();
  }
});

chrome.tabs.onRemoved.addListener((closedTabId) => {
  if (closedTabId === tabId) {
    stopMonitoring();
  }
});

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: "popup.html" });
});
