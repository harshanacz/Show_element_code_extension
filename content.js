document.addEventListener('click', function(event) {
  chrome.storage.local.get("isEnabled", (data) => {
    if (data.isEnabled) {
      event.preventDefault();
      event.stopPropagation();
      
      let element = event.target;
      let code = element.outerHTML;

      alert(code); 
    }
  });
});
