const logsContainer = document.getElementById("logs");
const clearLogsButton = document.getElementById("clearLogs");

function createCollapsible(parent, key, value) {
  const container = document.createElement("div");

  if (typeof value === "object" && value !== null) {
    // Create a collapsible header
    const header = document.createElement("div");
    header.className = "collapsible";
    header.textContent = `➤ ${key}`;

    // Create a collapsible content container
    const content = document.createElement("div");
    content.className = "content";

    for (const subKey in value) {
      createCollapsible(content, subKey, value[subKey]);
    }

    // Add toggle functionality
    header.addEventListener("click", () => {
      content.style.display =
        content.style.display === "none" ? "block" : "none";
    });

    container.appendChild(header);
    container.appendChild(content);
  } else {
    // Handle key-value pairs
    const keyValue = document.createElement("div");
    const keyValueText = `<span class="key">▪ ${key}: </span><span class="value">${JSON.stringify(value)}</span>`

    if (key === "status") {
      if (value === 500) {
        keyValue.innerHTML = `<span class="error">${keyValueText}</span>`;
      } else if (value === 200) {
        keyValue.innerHTML = `<span class="success">${keyValueText}</span>`;
      } else {
        keyValue.innerHTML = keyValueText;
      }
    } else {
      keyValue.innerHTML = keyValueText;
    }

    container.appendChild(keyValue);
  }

  parent.appendChild(container);
}

function createTitle(timestamp, error) {
  const logContainer = document.createElement("div");
  const errorText = document.createElement("div");
  errorText.textContent = `⚠️ ${error}`;
  errorText.className = "title";

  const timestampText = document.createElement("div");
  timestampText.textContent = timestamp;

  logContainer.appendChild(timestampText);
  logContainer.appendChild(errorText);

  logContainer.className = "log";

  return logContainer;
}

function getLogs(response) {
  const logs = response.logs;
  if (logs?.length > 0) {
    logs.forEach(({ timestamp, error, customParams }) => {
      const logContainer = createTitle(timestamp, error);
      const data = {
        payload: customParams,
      }
      for (const key in data) {
        createCollapsible(logContainer, key, data[key]);
      }
      logsContainer.appendChild(logContainer);
    });
  } else {
    logsContainer.innerHTML = "No logs to display";
  }
}

// Fetch logs from the background script
chrome.runtime.sendMessage({ type: "get_logs" }, getLogs);

// Clear logs
clearLogsButton.addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "clear_logs" }, () => {
    logsContainer.innerHTML = "No logs to display";
  });
});
