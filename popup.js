document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggle');

  chrome.runtime.sendMessage({ action: "getState" }, (response) => {
    toggleButton.innerText = response.isEnabled ? "Disable" : "Enable";
  });

  toggleButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "toggle" }, (response) => {
      toggleButton.innerText = response.isEnabled ? "Disable" : "Enable";
    });
  });
});
