// Default settings
const defaultSettings = {
  blockMainFeed: true,
  blockSidebar: true,
  blockComments: true,
  blockVideos: true,
  blockImages: true,
  blockProfilePictures: true
};

// Show status message
function showStatus(message, isSuccess = true) {
  const statusElement = document.getElementById('statusMessage');
  statusElement.textContent = message;
  statusElement.style.color = isSuccess ? '#00cc00' : '#ff4500';
  
  // Clear message after 3 seconds
  setTimeout(() => {
    statusElement.textContent = '';
  }, 3000);
}

// Load settings from storage
function loadSettings() {
  chrome.storage.sync.get(defaultSettings, function(items) {
    document.getElementById('mainFeedToggle').checked = items.blockMainFeed;
    document.getElementById('sidebarToggle').checked = items.blockSidebar;
    document.getElementById('commentsToggle').checked = items.blockComments;
    document.getElementById('videosToggle').checked = items.blockVideos;
    document.getElementById('imagesToggle').checked = items.blockImages;
    document.getElementById('profilePicturesToggle').checked = items.blockProfilePictures;
  });
}

// Save settings to storage
function saveSettings() {
  const settings = {
    blockMainFeed: document.getElementById('mainFeedToggle').checked,
    blockSidebar: document.getElementById('sidebarToggle').checked,
    blockComments: document.getElementById('commentsToggle').checked,
    blockVideos: document.getElementById('videosToggle').checked,
    blockImages: document.getElementById('imagesToggle').checked,
    blockProfilePictures: document.getElementById('profilePicturesToggle').checked
  };
  
  chrome.storage.sync.set(settings, function() {
    // Notify content script of changes
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "updateBlocking", settings: settings}, function(response) {
        if (chrome.runtime.lastError) {
          showStatus('Error saving settings', false);
        } else {
          showStatus('Settings saved successfully!');
        }
      });
    });
  });
}

// Refresh the current page
function refreshPage() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "refreshPage"}, function(response) {
      if (chrome.runtime.lastError) {
        // Fallback to tab reload if message fails
        chrome.tabs.reload(tabs[0].id);
      }
    });
  });
}

// Initialize popup
document.addEventListener('DOMContentLoaded', function() {
  loadSettings();
  
  // Add event listener to save button
  document.getElementById('saveButton').addEventListener('click', saveSettings);
  
  // Add event listener to refresh button
  document.getElementById('refreshButton').addEventListener('click', refreshPage);
});