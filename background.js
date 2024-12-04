const logs = [];

// Listen for messages from the React app
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'new_log') {
    logs.push({ ...message.payload, timestamp: new Date().toISOString() });
    chrome.storage.local.set({ logs });
    sendResponse({ status: 'Log received' });
  }

  if (message.type === 'get_logs') {
    sendResponse({ logs });
  }

  if (message.type === 'clear_logs') {
    logs.length = 0;
    chrome.storage.local.set({ logs: [] });
    sendResponse({ status: 'Logs cleared' });
  }

  return true;
});