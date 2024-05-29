document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggle');
  const showStructureButton = document.getElementById('show-structure');
  const domStructure = document.getElementById('dom-structure');
  const elementCode = document.getElementById('element-code');

  chrome.runtime.sendMessage({ action: "getState" }, (response) => {
    toggleButton.innerText = response.isEnabled ? "Disable" : "Enable";
  });

  toggleButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "toggle" }, (response) => {
      toggleButton.innerText = response.isEnabled ? "Disable" : "Enable";
    });
  });

  showStructureButton.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "getDOMStructure" }, (response) => {
        domStructure.innerText = response.tree;
      });
    });
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "showElementCode") {
      elementCode.value = request.code;
    }
  });
});
