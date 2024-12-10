# Handshake Bugsnag Logs Viewer

A Chrome extension that lets you easily view Bugsnag logs captured in your Handshake development app. This tool simplifies debugging by providing a user-friendly interface for inspecting error logs in real-time.

---

## Features

- **Bugsnag Logs Integration**: Displays error logs captured in your Handshake development environment.
- **Interactive UI**: A popup interface for convenient access to logs.
- **Customizable Styling**: Includes integrated styles for a clean, user-friendly view.
- **Support for Local Development**: Works seamlessly with apps running on `http://localhost/*`.

---

## Installation

1. Clone or download this repository to your local machine.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top-right corner.
4. Click **Load unpacked** and select the folder containing this project.
5. The extension should now appear in your Chrome toolbar.

---

## How to Use

1. Ensure your Handshake development app is running on `http://localhost`.
2. Click on the **Handshake Bugsnag Logs Viewer** icon in your Chrome toolbar.
3. View and interact with Bugsnag logs directly in the popup interface.

---

## File Structure

```
/assets
  /icons
    icon16.png
    icon48.png
    icon128.png
/css
  style.css
/js
  background.js
  content.js
popup.html
manifest.json
README.md
```

- **`manifest.json`**: Defines the extension's metadata and permissions.
- **`background.js`**: Handles background scripts and service worker logic.
- **`content.js`**: Injects and executes scripts within matching pages.
- **`style.css`**: Custom styles for the popup and injected content.
- **`popup.html`**: The user interface displayed when clicking the extension icon.
