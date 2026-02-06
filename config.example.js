// Configuration file for API keys
// Copy this file to config.js and add your API keys
// Get free API keys from:
// - NewsAPI: https://newsapi.org/
// - RapidAPI (optional for CNN index): https://rapidapi.com/

const CONFIG = {
  // NewsAPI key (required for news feed)
  // Get your free API key at: https://newsapi.org/register
  NEWS_API_KEY: 'your_newsapi_key_here',
  
  // RapidAPI key (optional - for CNN Fear & Greed Index)
  // Get your API key at: https://rapidapi.com/
  RAPID_API_KEY: 'your_rapidapi_key_here',
  
  // API refresh interval in milliseconds (default: 5 minutes)
  API_REFRESH_INTERVAL: 5 * 60 * 1000,
  
  // News refresh interval in milliseconds (default: 15 minutes)
  NEWS_REFRESH_INTERVAL: 15 * 60 * 1000
};

// Make config available globally
if (typeof window !== 'undefined') {
  window.CONFIG = CONFIG;
}
