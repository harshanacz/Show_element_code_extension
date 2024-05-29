chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ isEnabled: false });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggle") {
    chrome.storage.local.get("isEnabled", (data) => {
      const newState = !data.isEnabled;
      chrome.storage.local.set({ isEnabled: newState });
      sendResponse({ isEnabled: newState });
    });
    return true; // Keep the message channel open for sendResponse
  } else if (request.action === "getState") {
    chrome.storage.local.get("isEnabled", (data) => {
      sendResponse({ isEnabled: data.isEnabled });
    });
    return true; // Keep the message channel open for sendResponse
  }
});
