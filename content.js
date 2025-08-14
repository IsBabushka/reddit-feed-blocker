// Reddit Feed Blocker Content Script

// Default settings
const defaultSettings = {
  blockMainFeed: true,
  blockSidebar: true,
  blockComments: true,
  blockVideos: true,
  blockImages: true,
  blockProfilePictures: true,
  blockCommunityPictures: true
};

// Current settings
let currentSettings = {...defaultSettings};

// Function to hide/show elements based on settings
function updateElements() {
  // Selectors for main feed
  const mainFeedSelectors = [
    'shreddit-feed',
    // More specific selector to avoid hiding the main post on comment pages
    'shreddit-post[view-context="AggregateFeed"]',
    'shreddit-post[view-context="SubredditFeed"]',
    'shreddit-post[view-context="HomeFeed"]',
    'shreddit-post[view-context="PopularFeed"]',
    'article[data-ks-item]',
    'div[data-testid="post-container"]'
  ];

  // Selectors for sidebar communities (using the specific elements you identified)
  const sidebarSelectors = [
    'faceplate-auto-height-animator',
    'div[id="RECENT"]',
    'div[faceplate-auto-height-animator-content][id="RECENT"]',
    'reddit-recent-pages'
  ];

  // Selectors for comments section
  const commentsSelectors = [
    'shreddit-comment-tree',
    'shreddit-comment',
    '#comment-tree',
    '[id^="comment"]',
    'comment-body-header',
    'shreddit-comments-sort-dropdown'
  ];

  // Selectors for videos
  const videoSelectors = [
    'video',
    'shreddit-player-2',
    '[data-post-click-location="video-player"]',
    '[data-test-id="post-video"]'
  ];

  // Selectors for images
  const imageSelectors = [
    'img:not([alt="User Avatar"]):not([alt*="icon"]):not([class*="profile"]):not([class*="avatar"])',
    '[data-test-id="post-image"]',
    '[data-click-id="image"]'
  ];

  // Selectors for profile pictures
  const profilePictureSelectors = [
    'faceplate-tracker[noun="comment_author_avatar"]'
  ];

  // Selectors for community pictures (derived from the provided span element)
  const communityPictureSelectors = [
    'img[class*="shreddit-subreddit-icon__icon"]',
    'img[alt*="icon"]'
  ];

  // Apply settings for main feed
  if (currentSettings.blockMainFeed) {
    mainFeedSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
      });
    });
    
    // Also hide by removing inner HTML content for more thorough blocking
    const feedContainer = document.querySelector('shreddit-feed');
    if (feedContainer) {
      feedContainer.innerHTML = '';
    }
  } else {
    mainFeedSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.style.display = '';
        element.style.visibility = '';
      });
    });
  }

  // Apply settings for sidebar communities
  if (currentSettings.blockSidebar) {
    sidebarSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
      });
    });
  } else {
    sidebarSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.style.display = '';
        element.style.visibility = '';
      });
    });
  }

  // Apply settings for comments
  if (currentSettings.blockComments) {
    commentsSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
      });
    });
  } else {
    commentsSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.style.display = '';
        element.style.visibility = '';
      });
    });
  }

  // Apply settings for videos
  if (currentSettings.blockVideos) {
    videoSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
      });
    });
  } else {
    videoSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.style.display = '';
        element.style.visibility = '';
      });
    });
  }

  // Apply settings for images
  if (currentSettings.blockImages) {
    imageSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
      });
    });
  } else {
    imageSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.style.display = '';
        element.style.visibility = '';
      });
    });
  }

  // Apply settings for profile pictures
  if (currentSettings.blockProfilePictures) {
    profilePictureSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
      });
    });
  } else {
    profilePictureSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.style.display = '';
        element.style.visibility = '';
      });
    });
  }

  // Apply settings for community pictures
  if (currentSettings.blockCommunityPictures) {
    communityPictureSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
      });
    });
  } else {
    communityPictureSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.style.display = '';
        element.style.visibility = '';
      });
    });
  }
}

// Load settings from storage
function loadSettings(callback) {
  if (chrome && chrome.storage) {
    chrome.storage.sync.get(defaultSettings, function(items) {
      currentSettings = items;
      if (callback) callback();
    });
  } else {
    // Fallback to default settings if chrome.storage is not available
    currentSettings = {...defaultSettings};
    if (callback) callback();
  }
}

// Message listener for popup
if (chrome && chrome.runtime) {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "updateBlocking") {
      currentSettings = request.settings;
      updateElements();
      sendResponse({status: "updated"});
    }
    if (request.action === "refreshPage") {
      location.reload();
      sendResponse({status: "refreshing"});
    }
  });
}

// Initialize the blocker
function initializeBlocker() {
  loadSettings(function() {
    updateElements();
  });
}

// Run immediately when script loads
initializeBlocker();

// Run periodically to catch dynamically loaded content
const interval = setInterval(() => {
  updateElements();
}, 300);

// Also run when DOM changes
const observer = new MutationObserver(() => {
  updateElements();
});

// Wait for document body to be available before observing
if (document.body) {
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
} else {
  // If body isn't available yet, wait for it
  const bodyObserver = new MutationObserver(() => {
    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
      bodyObserver.disconnect(); // Stop observing once we've set up the main observer
    }
  });
  
  // Start observing the document for changes to see when body is added
  bodyObserver.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
}

// Continue observing for a longer period to handle SPA navigation
setTimeout(() => {
  clearInterval(interval);
  // Set up a slower periodic check to handle navigation
  setInterval(() => {
    updateElements();
  }, 1000);
}, 30000);