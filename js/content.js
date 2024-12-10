window.addEventListener("message", (event) => {
  if (event.source !== window || event.data.type !== "new_log") {
    return;
  }

  chrome.runtime.sendMessage(event.data, (response) => {
    console.log("Response from background script:", response);
  });
});
