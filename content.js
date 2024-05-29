document.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    
    let element = event.target;
    let code = element.outerHTML;
  
    alert(code); // Show the code in an alert for simplicity
  });
  