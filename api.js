// API Integration Module
// Handles fetching Fear & Greed Index data from multiple sources

class FearGreedAPI {
  constructor() {
    this.currentMode = 'crypto'; // 'crypto' or 'stock'
    this.cache = {
      crypto: null,
      stock: null,
      cryptoTimestamp: null,
      stockTimestamp: null
    };
    this.listeners = [];
  }

  // Subscribe to data updates
  subscribe(callback) {
    this.listeners.push(callback);
  }

  // Notify all listeners of data updates
  notify(data) {
    this.listeners.forEach(callback => callback(data));
  }

  // Fetch Crypto Fear & Greed Index from Alternative.me
  async fetchCryptoIndex() {
    try {
      const config = window.CONFIG || {};
      const apiUrl = config.CRYPTO_API_URL || 'https://api.alternative.me/fng/';
      const limit = config.CRYPTO_API_LIMIT || 30;
      
      const response = await fetch(`${apiUrl}?limit=${limit}`);
      if (!response.ok) throw new Error('Failed to fetch crypto index');
      
      const data = await response.json();
      const latestData = data.data[0];
      
      const result = {
        value: parseInt(latestData.value),
        classification: latestData.value_classification,
        timestamp: parseInt(latestData.timestamp) * 1000,
        historical: data.data.map(item => ({
          value: parseInt(item.value),
          timestamp: parseInt(item.timestamp) * 1000
        }))
      };
      
      // Cache the result
      this.cache.crypto = result;
      this.cache.cryptoTimestamp = Date.now();
      
      return result;
    } catch (error) {
      console.error('Error fetching crypto index:', error);
      throw error;
    }
  }

  // Fetch Stock Market Fear & Greed Index (mock for now - requires RapidAPI)
  async fetchStockIndex() {
    try {
      // Check if RapidAPI key is configured
      const config = window.CONFIG || {};
      
      if (!config.RAPID_API_KEY || config.RAPID_API_KEY === 'your_rapidapi_key_here') {
        // Return mock data if API key not configured
        console.warn('RapidAPI key not configured, using mock data');
        return this.getMockStockData();
      }

      // Actual API call would go here
      const response = await fetch('https://fear-and-greed-index.p.rapidapi.com/v1/fgi', {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': config.RAPID_API_KEY,
          'X-RapidAPI-Host': 'fear-and-greed-index.p.rapidapi.com'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch stock index');
      
      const data = await response.json();
      
      // Process and return data
      const result = {
        value: data.fgi.now.value,
        classification: data.fgi.now.valueText,
        timestamp: Date.now(),
        historical: data.fgi.oneWeek || []
      };
      
      this.cache.stock = result;
      this.cache.stockTimestamp = Date.now();
      
      return result;
    } catch (error) {
      console.error('Error fetching stock index:', error);
      // Fallback to mock data
      return this.getMockStockData();
    }
  }

  // Generate mock stock market data
  getMockStockData() {
    const value = Math.floor(Math.random() * 100);
    let classification;
    
    if (value <= 20) classification = 'Extreme Fear';
    else if (value <= 40) classification = 'Fear';
    else if (value <= 60) classification = 'Neutral';
    else if (value <= 80) classification = 'Greed';
    else classification = 'Extreme Greed';
    
    const result = {
      value,
      classification,
      timestamp: Date.now(),
      historical: this.generateMockHistorical(),
      isMock: true
    };
    
    this.cache.stock = result;
    this.cache.stockTimestamp = Date.now();
    
    return result;
  }

  // Generate mock historical data
  generateMockHistorical() {
    const historical = [];
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    
    for (let i = 29; i >= 0; i--) {
      historical.push({
        value: Math.floor(Math.random() * 100),
        timestamp: now - (i * dayMs)
      });
    }
    
    return historical;
  }

  // Get current index based on mode
  async getCurrentIndex(forceRefresh = false) {
    const mode = this.currentMode;
    const cached = this.cache[mode];
    const cacheTimestamp = this.cache[`${mode}Timestamp`];
    
    // Check if we need to refresh (5 minutes old)
    const config = window.CONFIG || { API_REFRESH_INTERVAL: 5 * 60 * 1000 };
    const isStale = !cached || !cacheTimestamp || 
                    (Date.now() - cacheTimestamp) > config.API_REFRESH_INTERVAL;
    
    if (forceRefresh || isStale) {
      try {
        const data = mode === 'crypto' 
          ? await this.fetchCryptoIndex()
          : await this.fetchStockIndex();
        
        this.notify(data);
        return data;
      } catch (error) {
        // If fetch fails and we have cache, return it
        if (cached) return cached;
        throw error;
      }
    }
    
    return cached;
  }

  // Switch between crypto and stock mode
  setMode(mode) {
    if (mode !== 'crypto' && mode !== 'stock') {
      throw new Error('Invalid mode. Use "crypto" or "stock"');
    }
    this.currentMode = mode;
  }

  // Get cached data without fetching
  getCachedData(mode = this.currentMode) {
    return this.cache[mode];
  }

  // Clear cache
  clearCache() {
    this.cache = {
      crypto: null,
      stock: null,
      cryptoTimestamp: null,
      stockTimestamp: null
    };
  }
}

// Create global instance
const fearGreedAPI = new FearGreedAPI();

// Make it available globally
if (typeof window !== 'undefined') {
  window.fearGreedAPI = fearGreedAPI;
}
