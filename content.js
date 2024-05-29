function buildTree(node, indent = "") {
  let tree = indent + node.nodeName.toLowerCase();
  if (node.id) tree += `#${node.id}`;
  if (node.className) tree += `.${node.className.replace(/\s+/g, '.')}`;
  tree += "\n";

  for (let child of node.children) {
    tree += buildTree(child, indent + "  ");
  }
  return tree;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getDOMStructure") {
    const tree = buildTree(document.body);
    sendResponse({ tree: tree });
  } else if (request.action === "getElementCode") {
    const element = document.querySelector(request.selector);
    if (element) {
      sendResponse({ code: element.outerHTML });
    } else {
      sendResponse({ code: "Element not found." });
    }
  }
});

document.addEventListener('click', function(event) {
  chrome.storage.local.get("isEnabled", (data) => {
    if (data.isEnabled) {
      event.preventDefault();
      event.stopPropagation();
      
      let element = event.target;
      let code = element.outerHTML;

      if (confirm("Do you want to copy this code?\n\n" + code)) {
        navigator.clipboard.writeText(code).then(() => {
          alert("Code copied to clipboard!");
        });
      }
    }
  });
});
