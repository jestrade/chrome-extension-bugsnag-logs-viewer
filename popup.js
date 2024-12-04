
const logsContainer = document.getElementById('logs');
const clearLogsButton = document.getElementById('clearLogs');

// Render a log entry
function renderLog(log) {
  const logEntry = document.createElement('div');
  logEntry.className = 'log-entry';
  let html = `
    <div class="timestamp">${log.timestamp}</div>
    <div class="error">${log.error}</div>
  `;
  if (log.customParams) {
    html += `<div class="message">${JSON.stringify(log.customParams)}</div>`;
  }
  logEntry.innerHTML = html;
  logsContainer.appendChild(logEntry);
}

// Fetch logs from the background script
chrome.runtime.sendMessage({ type: 'get_logs' }, (response) => {
    const logs = response.logs;
    if (logs?.length > 0) {
      logs.forEach(renderLog);
    } else {
      logsContainer.innerHTML = 'No logs to display';
    }
});

// Clear logs
clearLogsButton.addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: 'clear_logs' }, () => {
    logsContainer.innerHTML = 'No logs to display';
  });
});

