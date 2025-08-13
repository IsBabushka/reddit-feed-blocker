# Reddit Feed Blocker Chrome Extension

A Chrome extension that blocks distracting elements on Reddit while preserving navigation:
- Main feed content (center area)
- Sidebar communities (left sidebar content)
- Recent posts (right sidebar content)
- Keeps navigation elements like Home, Popular, etc.

## Installation

1. Open Chrome and navigate to `chrome://extensions`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked" and select the folder containing this extension
4. Navigate to Reddit and see the clean, distraction-free interface

## What Gets Blocked

- **Main Feed Content**: Individual posts in the central feed (navigation remains)
- **Left Sidebar Content**: Community lists and subreddit recommendations
- **Right Sidebar Content**: Trending posts and recent activity
- **Preserves Navigation**: Top navigation bar and ability to view individual posts

## How It Works

The extension uses CSS selectors and JavaScript to hide specific elements on Reddit pages:
- Targets `shreddit-feed`, `shreddit-post`, and other Reddit-specific components
- Blocks content immediately and continuously monitors for dynamically loaded elements
- Works on both old and new Reddit designs
- Maintains site usability by keeping navigation intact

## Customization

You can modify:
- `styles.css` - To adjust which elements are hidden with CSS
- `content.js` - To change the JavaScript behavior for hiding elements

## Troubleshooting

If elements still appear:
1. Try refreshing the page
2. Check that the extension is enabled
3. Verify you're on a Reddit page (www.reddit.com)

## Support

For issues or suggestions, please open an issue on the project repository.