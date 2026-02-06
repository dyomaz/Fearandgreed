// News Integration Module
// Handles fetching and displaying relevant market sentiment news

class NewsManager {
  constructor() {
    this.cache = {
      fear: null,
      greed: null,
      fearTimestamp: null,
      greedTimestamp: null
    };
    this.currentSentiment = 'neutral';
  }

  // Get search queries based on sentiment
  getSearchQuery(sentiment) {
    if (sentiment === 'fear') {
      return 'market crash OR bitcoin crash OR stock market decline OR recession fears OR market downturn';
    } else if (sentiment === 'greed') {
      return 'market rally OR bitcoin surge OR bull market OR all-time high OR market boom';
    } else {
      return 'cryptocurrency OR stock market OR financial markets';
    }
  }

  // Fetch news from NewsAPI
  async fetchNews(value) {
    try {
      // Determine sentiment based on value
      let sentiment = 'neutral';
      if (value < 40) sentiment = 'fear';
      else if (value > 60) sentiment = 'greed';
      
      this.currentSentiment = sentiment;
      
      // Check cache
      const cached = this.cache[sentiment];
      const cacheTimestamp = this.cache[`${sentiment}Timestamp`];
      const config = window.CONFIG || { NEWS_REFRESH_INTERVAL: 15 * 60 * 1000 };
      
      if (cached && cacheTimestamp && 
          (Date.now() - cacheTimestamp) < config.NEWS_REFRESH_INTERVAL) {
        return cached;
      }

      // Get API key from config
      const apiKey = window.CONFIG?.NEWS_API_KEY;
      
      if (!apiKey || apiKey === 'your_newsapi_key_here') {
        console.warn('NewsAPI key not configured, using mock data');
        return this.getMockNews(sentiment);
      }

      const query = this.getSearchQuery(sentiment);
      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&pageSize=10&apiKey=${apiKey}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch news');
      
      const data = await response.json();
      
      // Process articles
      const articles = data.articles.map(article => ({
        title: article.title,
        description: article.description,
        source: article.source.name,
        url: article.url,
        image: article.urlToImage,
        publishedAt: article.publishedAt,
        sentiment: sentiment
      }));
      
      // Cache the results
      this.cache[sentiment] = articles;
      this.cache[`${sentiment}Timestamp`] = Date.now();
      
      return articles;
    } catch (error) {
      console.error('Error fetching news:', error);
      return this.getMockNews(this.currentSentiment);
    }
  }

  // Generate mock news data
  getMockNews(sentiment) {
    const fearHeadlines = [
      'Market Volatility Increases Amid Economic Concerns',
      'Crypto Markets Experience Significant Downturn',
      'Investors Grow Cautious as Uncertainty Rises',
      'Analysts Warn of Potential Market Correction',
      'Fear Grips Markets as Key Indicators Decline',
      'Bitcoin Drops Below Key Support Level',
      'Stock Market Faces Selling Pressure',
      'Economic Data Sparks Market Concerns'
    ];

    const greedHeadlines = [
      'Markets Rally on Positive Economic Data',
      'Bitcoin Reaches New Heights Amid Bullish Sentiment',
      'Investors Show Strong Confidence in Tech Stocks',
      'Cryptocurrency Market Surges to Record Levels',
      'Bull Market Continues as Indices Hit All-Time Highs',
      'Optimism Drives Strong Market Performance',
      'Risk Appetite Returns as Markets Soar',
      'Euphoria in Markets as Rally Extends'
    ];

    const neutralHeadlines = [
      'Markets Trade Sideways Amid Mixed Signals',
      'Cryptocurrency Prices Remain Stable',
      'Investors Await Key Economic Reports',
      'Market Sentiment Remains Balanced',
      'Trading Volumes Normalize After Recent Activity',
      'Financial Markets Show Steady Performance',
      'Analysts Divided on Market Direction',
      'Cautious Optimism Prevails in Trading Sessions'
    ];

    let headlines = neutralHeadlines;
    if (sentiment === 'fear') headlines = fearHeadlines;
    else if (sentiment === 'greed') headlines = greedHeadlines;

    const sources = ['Bloomberg', 'Reuters', 'CNBC', 'Financial Times', 'CoinDesk', 'The Wall Street Journal'];
    
    const articles = [];
    const now = Date.now();
    
    for (let i = 0; i < 8; i++) {
      articles.push({
        title: headlines[i] || headlines[0],
        description: 'Market analysis and financial news coverage.',
        source: sources[i % sources.length],
        url: '#',
        image: `https://picsum.photos/seed/${sentiment}${i}/400/200`,
        publishedAt: new Date(now - (i * 2 * 60 * 60 * 1000)).toISOString(),
        sentiment: sentiment,
        isMock: true
      });
    }
    
    // Cache mock data
    this.cache[sentiment] = articles;
    this.cache[`${sentiment}Timestamp`] = Date.now();
    
    return articles;
  }

  // Format relative time (e.g., "2 hours ago")
  getRelativeTime(dateString) {
    const now = Date.now();
    const published = new Date(dateString).getTime();
    const diffMs = now - published;
    
    const minutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMs / 3600000);
    const days = Math.floor(diffMs / 86400000);
    
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`;
    
    return new Date(dateString).toLocaleDateString();
  }

  // Render news articles to the DOM
  renderNews(articles, containerId = 'newsContainer') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (!articles || articles.length === 0) {
      container.innerHTML = '<p class="no-news">No news articles available at the moment.</p>';
      return;
    }
    
    container.innerHTML = articles.map(article => `
      <div class="news-card" data-sentiment="${article.sentiment}">
        <div class="news-image-container">
          ${article.image ? 
            `<img src="${article.image}" alt="${article.title}" class="news-image" loading="lazy" onerror="this.src='https://via.placeholder.com/400x200?text=News'">` :
            `<div class="news-image-placeholder">📰</div>`
          }
          ${article.sentiment !== 'neutral' ? 
            `<span class="sentiment-badge sentiment-${article.sentiment}">${article.sentiment}</span>` : 
            ''
          }
        </div>
        <div class="news-content">
          <h3 class="news-title">${article.title}</h3>
          <p class="news-description">${article.description || ''}</p>
          <div class="news-meta">
            <span class="news-source">${article.source}</span>
            <span class="news-time">${this.getRelativeTime(article.publishedAt)}</span>
          </div>
          ${article.url !== '#' ? 
            `<a href="${article.url}" target="_blank" rel="noopener noreferrer" class="news-link">Read more →</a>` :
            '<span class="news-mock-indicator">(Demo article)</span>'
          }
        </div>
      </div>
    `).join('');
  }

  // Clear cache
  clearCache() {
    this.cache = {
      fear: null,
      greed: null,
      fearTimestamp: null,
      greedTimestamp: null
    };
  }
}

// Create global instance
const newsManager = new NewsManager();

// Make it available globally
if (typeof window !== 'undefined') {
  window.newsManager = newsManager;
}
