// Main Application Script
// Handles UI interactions, API integration, and data visualization

// State Management
const AppState = {
  currentMode: 'crypto',
  manualMode: false,
  chart: null,
  refreshInterval: null,
  newsRefreshInterval: null,
  currentValue: 50
};

// DOM Elements
const elements = {
  slider: document.getElementById('slider'),
  indexValue: document.getElementById('indexValue'),
  indexLabel: document.getElementById('indexLabel'),
  needle: document.getElementById('needle'),
  buttons: document.querySelectorAll('.btn[data-value]'),
  randomBtn: document.getElementById('randomBtn'),
  modeBtns: document.querySelectorAll('.mode-btn'),
  refreshBtn: document.getElementById('refreshBtn'),
  manualModeBtn: document.getElementById('manualModeBtn'),
  manualControls: document.getElementById('manualControls'),
  loadingOverlay: document.getElementById('loadingOverlay'),
  lastUpdated: document.getElementById('lastUpdated'),
  statCurrent: document.getElementById('statCurrent'),
  statChange: document.getElementById('statChange'),
  statTrend: document.getElementById('statTrend'),
  statClass: document.getElementById('statClass'),
  chartBtns: document.querySelectorAll('.chart-btn'),
  themeToggle: document.getElementById('themeToggle'),
  shareBtn: document.getElementById('shareBtn'),
  errorToast: document.getElementById('errorToast'),
  toastMessage: document.getElementById('toastMessage'),
  toastClose: document.getElementById('toastClose')
};

// Update Index Display
function updateIndex(value, data = null) {
  value = Math.max(0, Math.min(100, value));
  AppState.currentValue = value;
  
  // Update display value
  elements.indexValue.textContent = value;
  elements.statCurrent.textContent = value;
  
  // Update label and colors
  let label, color;
  if (value <= 20) {
    label = 'Extreme Fear';
    color = '#d32f2f';
  } else if (value <= 40) {
    label = 'Fear';
    color = '#ff6f00';
  } else if (value <= 60) {
    label = 'Neutral';
    color = '#ffd600';
  } else if (value <= 80) {
    label = 'Greed';
    color = '#7cb342';
  } else {
    label = 'Extreme Greed';
    color = '#2e7d32';
  }
  
  elements.indexLabel.textContent = label;
  elements.statClass.textContent = label;
  elements.indexValue.style.color = color;
  elements.indexLabel.style.color = color;
  
  // Update needle rotation (0 = -90deg, 100 = 90deg)
  const rotation = (value / 100) * 180 - 90;
  elements.needle.style.transform = `rotate(${rotation}deg)`;
  
  // Update slider value
  elements.slider.value = value;
  
  // Update body background gradient
  document.body.style.background = `linear-gradient(135deg, var(--bg-primary) 0%, ${color}22 100%)`;
  
  // Update stats if data is provided
  if (data) {
    updateStats(data);
  }
  
  // Check for extreme values and show notification
  if (value <= 20 || value >= 80) {
    checkExtremeNotification(value, label);
  }
}

// Update Statistics
function updateStats(data) {
  if (!data) return;
  
  // Update last updated time
  const lastUpdate = new Date(data.timestamp);
  elements.lastUpdated.textContent = `Last updated: ${formatTime(lastUpdate)}`;
  
  // Calculate 24h change if historical data available
  if (data.historical && data.historical.length > 1) {
    const yesterday = data.historical[1].value;
    const change = data.value - yesterday;
    const changePercent = ((change / yesterday) * 100).toFixed(1);
    
    elements.statChange.textContent = change >= 0 ? `+${change}` : `${change}`;
    elements.statChange.style.color = change >= 0 ? '#7cb342' : '#d32f2f';
    
    // Calculate 7-day trend
    if (data.historical.length >= 7) {
      const weekAgo = data.historical[6].value;
      const weekChange = data.value - weekAgo;
      const trend = weekChange >= 0 ? '📈 Up' : '📉 Down';
      elements.statTrend.textContent = trend;
      elements.statTrend.style.color = weekChange >= 0 ? '#7cb342' : '#d32f2f';
    }
  }
}

// Format timestamp
function formatTime(date) {
  const now = Date.now();
  const diff = now - date.getTime();
  const minutes = Math.floor(diff / 60000);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} min ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  
  return date.toLocaleString();
}

// Show Loading
function showLoading(show = true) {
  if (elements.loadingOverlay) {
    elements.loadingOverlay.classList.toggle('hidden', !show);
  }
}

// Show Error Toast
function showError(message) {
  elements.toastMessage.textContent = message;
  elements.errorToast.style.display = 'flex';
  
  setTimeout(() => {
    elements.errorToast.style.display = 'none';
  }, 5000);
}

// Close Toast
elements.toastClose.addEventListener('click', () => {
  elements.errorToast.style.display = 'none';
});

// Load Data from API
async function loadData(forceRefresh = false) {
  if (AppState.manualMode) return;
  
  showLoading(true);
  
  try {
    const data = await window.fearGreedAPI.getCurrentIndex(forceRefresh);
    updateIndex(data.value, data);
    
    // Update chart
    if (data.historical) {
      updateChart(data.historical);
    }
    
    // Load news based on value
    loadNews(data.value);
    
  } catch (error) {
    console.error('Error loading data:', error);
    showError('Failed to load data. Using manual mode.');
    AppState.manualMode = true;
  } finally {
    showLoading(false);
  }
}

// Load News
async function loadNews(value) {
  try {
    const articles = await window.newsManager.fetchNews(value);
    window.newsManager.renderNews(articles);
  } catch (error) {
    console.error('Error loading news:', error);
  }
}

// Mode Toggle (Crypto vs Stock)
elements.modeBtns.forEach(btn => {
  btn.addEventListener('click', async () => {
    const mode = btn.dataset.mode;
    if (mode === AppState.currentMode) return;
    
    // Update UI
    elements.modeBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Update state and API
    AppState.currentMode = mode;
    window.fearGreedAPI.setMode(mode);
    
    // Load new data
    await loadData(true);
  });
});

// Refresh Button
elements.refreshBtn.addEventListener('click', async () => {
  await loadData(true);
});

// Manual Mode Toggle
elements.manualModeBtn.addEventListener('click', () => {
  AppState.manualMode = !AppState.manualMode;
  elements.manualControls.style.display = AppState.manualMode ? 'block' : 'none';
  elements.manualModeBtn.textContent = AppState.manualMode ? '📡 Auto Mode' : '🎛️ Manual Mode';
  
  if (!AppState.manualMode) {
    loadData(true);
  }
});

// Manual Slider
elements.slider.addEventListener('input', (e) => {
  if (AppState.manualMode) {
    updateIndex(parseInt(e.target.value));
  }
});

// Preset Buttons
elements.buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (AppState.manualMode) {
      const value = parseInt(button.dataset.value);
      updateIndex(value);
    }
  });
});

// Random Button
elements.randomBtn.addEventListener('click', () => {
  if (AppState.manualMode) {
    const randomValue = Math.floor(Math.random() * 101);
    updateIndex(randomValue);
  }
});

// Chart Initialization
function initChart() {
  const ctx = document.getElementById('historyChart');
  if (!ctx) return;
  
  AppState.chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Fear & Greed Index',
        data: [],
        borderColor: '#ffd600',
        backgroundColor: 'rgba(255, 214, 0, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#ffd600',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#ffd600',
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return `Value: ${context.parsed.y}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#aaa'
          }
        },
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#aaa',
            maxRotation: 45,
            minRotation: 45
          }
        }
      }
    }
  });
}

// Update Chart
function updateChart(historicalData, days = 7) {
  if (!AppState.chart || !historicalData) return;
  
  // Filter data based on selected days
  const filtered = historicalData.slice(0, days);
  
  const labels = filtered.map(item => {
    const date = new Date(item.timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }).reverse();
  
  const values = filtered.map(item => item.value).reverse();
  
  // Update chart data
  AppState.chart.data.labels = labels;
  AppState.chart.data.datasets[0].data = values;
  
  // Update colors based on values
  const colors = values.map(v => {
    if (v <= 20) return '#d32f2f';
    if (v <= 40) return '#ff6f00';
    if (v <= 60) return '#ffd600';
    if (v <= 80) return '#7cb342';
    return '#2e7d32';
  });
  
  AppState.chart.data.datasets[0].pointBackgroundColor = colors;
  AppState.chart.update();
}

// Chart Period Buttons
elements.chartBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const days = parseInt(btn.dataset.days);
    
    // Update UI
    elements.chartBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Get current data and update chart
    const data = window.fearGreedAPI.getCachedData();
    if (data && data.historical) {
      updateChart(data.historical, days);
    }
  });
});

// Theme Toggle
let currentTheme = 'dark';
elements.themeToggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  elements.themeToggle.querySelector('.theme-icon').textContent = currentTheme === 'dark' ? '🌙' : '☀️';
  
  // Update chart colors if it exists
  if (AppState.chart) {
    const isDark = currentTheme === 'dark';
    AppState.chart.options.scales.y.grid.color = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    AppState.chart.options.scales.x.grid.color = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    AppState.chart.options.scales.y.ticks.color = isDark ? '#aaa' : '#666';
    AppState.chart.options.scales.x.ticks.color = isDark ? '#aaa' : '#666';
    AppState.chart.update();
  }
});

// Share Functionality
elements.shareBtn.addEventListener('click', async () => {
  const url = window.location.href;
  const text = `Fear & Greed Index: ${AppState.currentValue} (${elements.indexLabel.textContent})`;
  
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Fear & Greed Index', text, url });
    } catch (err) {
      console.log('Share cancelled');
    }
  } else {
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      showError('Link copied to clipboard!');
    } catch (err) {
      showError('Failed to share. Please copy the URL manually.');
    }
  }
});

// Extreme Value Notification
function checkExtremeNotification(value, label) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Extreme Market Sentiment Alert', {
      body: `Fear & Greed Index: ${value} (${label})`,
      icon: '/favicon.ico'
    });
  }
}

// Request notification permission on load
if ('Notification' in window && Notification.permission === 'default') {
  Notification.requestPermission();
}

// Auto-refresh Setup
function setupAutoRefresh() {
  const config = window.CONFIG || { API_REFRESH_INTERVAL: 5 * 60 * 1000 };
  
  // Clear existing intervals
  if (AppState.refreshInterval) clearInterval(AppState.refreshInterval);
  
  // Set up new interval
  AppState.refreshInterval = setInterval(() => {
    if (!AppState.manualMode) {
      loadData();
    }
  }, config.API_REFRESH_INTERVAL);
}

// Initialization
async function init() {
  // Initialize chart
  initChart();
  
  // Load initial data
  await loadData();
  
  // Setup auto-refresh
  setupAutoRefresh();
  
  // Initialize with default value if API fails
  updateIndex(50);
}

// Start the application
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (AppState.refreshInterval) clearInterval(AppState.refreshInterval);
  if (AppState.newsRefreshInterval) clearInterval(AppState.newsRefreshInterval);
});