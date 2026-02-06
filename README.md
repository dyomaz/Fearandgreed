# 📊 Fear & Greed Index - Professional Market Sentiment Platform

A professional, real-time Fear & Greed Index website that tracks market sentiment for both cryptocurrency and stock markets. Features live data integration, historical charts, relevant news feeds, and a modern, responsive design.

![Fear & Greed Index](https://img.shields.io/badge/Status-Live-success)
![Version](https://img.shields.io/badge/Version-2.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🔄 Real-Time API Integration
- **Cryptocurrency Fear & Greed Index** from [Alternative.me](https://alternative.me)
- **Stock Market Sentiment** tracking with fallback to intelligent mock data
- Auto-refresh every 5 minutes
- Fallback to manual mode if APIs are unavailable
- Toggle between Crypto and Stock Market modes

### 📰 Market Sentiment News
- Curated news articles based on current market sentiment
- Integration with NewsAPI for relevant financial news
- Displays 8-10 recent articles with images and metadata
- Sentiment-based article filtering (Fear/Greed related)
- Auto-refresh based on index changes

### 📈 Data Visualization
- Interactive gauge showing real-time sentiment
- Historical trend charts (7-day and 30-day views)
- Color-coded zones from red (fear) to green (greed)
- Stats cards showing current value, 24h change, and 7-day trend

### 🎨 Professional UI/UX
- Modern glassmorphism design
- Dark/Light theme toggle
- Smooth animations and transitions
- Fully responsive for all devices
- Loading states and skeleton loaders
- Error handling with user-friendly messages

### 🔔 Additional Features
- Browser notifications for extreme sentiment levels
- Social sharing functionality
- Keyboard navigation support
- Screen reader friendly (ARIA labels)
- SEO optimized with Open Graph tags
- Manual mode for demonstrations

## 🚀 Quick Start

### Option 1: Use with Default Configuration (No API Keys Required)

The website works out of the box with demo data:

1. Clone the repository:
```bash
git clone https://github.com/dyomaz/Fearandgreed.git
cd Fearandgreed
```

2. Open `index.html` in your browser:
```bash
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

The site will work with:
- ✅ Real Crypto Fear & Greed data from Alternative.me (no API key needed)
- ✅ Mock Stock Market data
- ✅ Demo news articles

### Option 2: Setup with Full API Integration

For complete functionality with real news data:

1. **Get API Keys** (Free):
   - **NewsAPI**: Register at [newsapi.org](https://newsapi.org/register) (Free tier: 100 requests/day)
   - **RapidAPI** (Optional): Sign up at [rapidapi.com](https://rapidapi.com) for CNN Fear & Greed Index

2. **Configure API Keys**:
```bash
# Copy the example config
cp config.example.js config.js

# Edit config.js and add your API keys
nano config.js  # or use any text editor
```

3. **Update `config.js`**:
```javascript
const CONFIG = {
  NEWS_API_KEY: 'your_actual_newsapi_key_here',
  RAPID_API_KEY: 'your_rapidapi_key_here', // Optional
  API_REFRESH_INTERVAL: 5 * 60 * 1000,
  NEWS_REFRESH_INTERVAL: 15 * 60 * 1000
};
```

4. **Update HTML** (if using real config):

In `index.html`, change:
```html
<script src="config.example.js"></script>
```
to:
```html
<script src="config.js"></script>
```

5. Open `index.html` in your browser

## 🌐 Deploy to GitHub Pages

1. **Push to GitHub**:
```bash
git add .
git commit -m "Setup Fear & Greed Index website"
git push origin main
```

2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select source: `main` branch, `/ (root)` folder
   - Click "Save"

3. **Access Your Site**:
   - Your site will be live at: `https://yourusername.github.io/Fearandgreed/`
   - Wait 2-3 minutes for initial deployment

4. **Using API Keys with GitHub Pages**:
   - ⚠️ **Important**: Do NOT commit `config.js` with real API keys to public repos
   - The `.gitignore` file already excludes `config.js`
   - For production, consider using a backend proxy or serverless functions
   - Alternative: Keep using `config.example.js` (works with free Alternative.me API)

## 📁 Project Structure

```
Fearandgreed/
├── index.html              # Main HTML file with semantic structure
├── styles.css              # Complete styling with CSS variables
├── script.js               # Main application logic
├── api.js                  # API integration module
├── news.js                 # News fetching and rendering
├── config.example.js       # Example configuration file
├── config.js              # Your actual config (gitignored)
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## 🔧 Configuration Options

Edit `config.js` to customize:

```javascript
const CONFIG = {
  // NewsAPI key for real news articles
  NEWS_API_KEY: 'your_key',
  
  // Optional RapidAPI key for CNN index
  RAPID_API_KEY: 'your_key',
  
  // Refresh intervals (in milliseconds)
  API_REFRESH_INTERVAL: 5 * 60 * 1000,    // 5 minutes
  NEWS_REFRESH_INTERVAL: 15 * 60 * 1000   // 15 minutes
};
```

## 🎯 Usage Guide

### Viewing Different Markets
- Click "🪙 Crypto" or "📈 Stock Market" buttons to switch between markets
- Data automatically refreshes when switching modes

### Manual Mode
- Click "🎛️ Manual Mode" to demonstrate the gauge manually
- Use the slider or preset buttons to adjust values
- Click "📡 Auto Mode" to return to live data

### Historical Data
- View 7-day or 30-day trends using the chart buttons
- Hover over chart points for detailed values

### Dark/Light Theme
- Click the theme toggle button (🌙/☀️) in the top-right corner

### Sharing
- Click the "📤 Share" button to share current index value
- On mobile, uses native share functionality
- On desktop, copies link to clipboard

## 📊 Data Sources

- **Crypto Index**: [Alternative.me Fear & Greed Index](https://alternative.me/crypto/fear-and-greed-index/)
- **Stock Index**: Various market indicators (via RapidAPI)
- **News**: [NewsAPI](https://newsapi.org/) - Top financial news sources
- **Charts**: [Chart.js](https://www.chartjs.org/)

## 🔒 Privacy & Disclaimers

### Data Collection
- No user data is collected or stored
- API calls are made directly from your browser
- LocalStorage is used only for caching API responses

### Financial Disclaimer
⚠️ **Important**: This website is for informational and educational purposes only. It does not constitute financial advice. The Fear & Greed Index is a sentiment indicator and should not be used as the sole basis for investment decisions. Always do your own research and consult with a qualified financial advisor.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 🐛 Troubleshooting

### API Key Issues
- **Problem**: News not loading
- **Solution**: Verify your NewsAPI key in `config.js` is correct
- **Alternative**: Use default `config.example.js` for demo mode

### CORS Errors
- **Problem**: API calls blocked by browser
- **Solution**: Open `index.html` via a local web server:
  ```bash
  # Python 3
  python -m http.server 8000
  
  # Node.js (install http-server globally)
  npx http-server
  ```
  Then visit `http://localhost:8000`

### Chart Not Displaying
- **Problem**: Historical chart is blank
- **Solution**: Ensure Chart.js CDN is accessible. Check browser console for errors.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Credits

- **Original Concept**: Fear & Greed Index by CNNMoney
- **Crypto Data**: Alternative.me
- **Charts**: Chart.js
- **Fonts**: Google Fonts (Inter)
- **Icons**: Emoji icons for simplicity

## 📧 Contact & Support

- **GitHub**: [@dyomaz](https://github.com/dyomaz)
- **Repository**: [Fearandgreed](https://github.com/dyomaz/Fearandgreed)
- **Issues**: [Report a bug](https://github.com/dyomaz/Fearandgreed/issues)

## 🎨 Screenshots

*Coming soon - Will be added after deployment*

## 🔄 Version History

### Version 2.0 (Current)
- ✅ Real-time API integration
- ✅ News feed integration
- ✅ Historical charts
- ✅ Dark/light theme
- ✅ Responsive design
- ✅ Social sharing
- ✅ Accessibility improvements

### Version 1.0
- Basic gauge visualization
- Manual controls only

---

**Made with ❤️ for the crypto and trading community**