# 🎬 How to Preview the Fear & Greed Index Website

This guide shows you **exactly how to preview** the Fear & Greed Index website on your computer.

![Preview Screenshot](https://github.com/user-attachments/assets/73dc25c3-ef2a-459b-863e-ecddbae19f1c)

---

## 🚀 Method 1: Double-Click to Open (Easiest!)

**This is the fastest way** - no setup required!

### Steps:
1. **Download/Clone the repository** to your computer
2. **Navigate to the folder** where you saved it
3. **Double-click `index.html`** file

That's it! The website will open in your default browser.

### Alternative (Command Line):
```bash
# macOS
open index.html

# Windows
start index.html

# Linux
xdg-open index.html
```

### What You'll See:
✅ Animated Fear & Greed gauge  
✅ Market sentiment stats (current value, 24h change, 7-day trend)  
✅ News feed with 8 demo articles  
✅ Dark/Light theme toggle  
✅ Manual mode controls  
✅ Demo mode notification (if external APIs are blocked)  

---

## 🌐 Method 2: Local Web Server (Recommended)

For the **best experience** with all features working properly, run a local web server.

### Option A: Python (Pre-installed on Mac/Linux)

```bash
# Navigate to the project folder
cd /path/to/Fearandgreed

# Start Python server
python3 -m http.server 8000

# Open in browser
# Visit: http://localhost:8000
```

**To stop:** Press `Ctrl+C` in the terminal

### Option B: Node.js (If you have Node installed)

```bash
# Install http-server globally (one-time setup)
npm install -g http-server

# Navigate to project folder
cd /path/to/Fearandgreed

# Start server
http-server

# Opens automatically, or visit: http://localhost:8080
```

### Option C: VS Code Live Server Extension

1. Install **"Live Server"** extension in VS Code
2. Right-click `index.html` in VS Code
3. Select **"Open with Live Server"**
4. Browser opens automatically

### Option D: PHP (If you have PHP installed)

```bash
cd /path/to/Fearandgreed
php -S localhost:8000
# Visit: http://localhost:8000
```

---

## 🌍 Method 3: GitHub Pages (Live Deployment)

Deploy the website to see it live on the internet!

### Steps:

1. **Push your repository to GitHub** (if not already done)

2. **Enable GitHub Pages:**
   - Go to repository **Settings**
   - Scroll to **"Pages"** section (left sidebar)
   - Under **"Source"**, select:
     - Branch: `main` (or `master`)
     - Folder: `/ (root)`
   - Click **"Save"**

3. **Wait 2-3 minutes** for deployment

4. **Access your site:**
   ```
   https://yourusername.github.io/Fearandgreed/
   ```
   (Replace `yourusername` with your GitHub username)

5. **Share the link** with anyone!

---

## 💡 Method 4: Online Services (No Installation)

Test the website instantly without downloading anything:

### CodeSandbox
1. Go to [codesandbox.io](https://codesandbox.io)
2. Import from GitHub URL
3. Preview instantly in browser

### JSFiddle / CodePen
1. Copy `index.html`, `styles.css`, `script.js` content
2. Paste into respective sections
3. Include `api.js` and `news.js` as external resources
4. Run preview

### Repl.it
1. Create new HTML/CSS/JS repl
2. Upload project files
3. Click "Run" to preview

---

## 🎨 What Features Work in Preview?

| Feature | File Opening | Local Server | GitHub Pages |
|---------|--------------|--------------|--------------|
| **Gauge Animation** | ✅ | ✅ | ✅ |
| **Dark/Light Theme** | ✅ | ✅ | ✅ |
| **Manual Mode** | ✅ | ✅ | ✅ |
| **Stats Cards** | ✅ | ✅ | ✅ |
| **News Feed (Demo)** | ✅ | ✅ | ✅ |
| **Alternative.me API** | ⚠️ May be blocked | ✅ | ✅ |
| **NewsAPI Integration** | ⚠️ May be blocked | ✅ | ✅ |
| **Historical Charts** | ⚠️ CDN may be blocked | ✅ | ✅ |

**Legend:**
- ✅ = Fully working
- ⚠️ = May have CORS/security restrictions

---

## 🔧 Troubleshooting

### Problem: "Failed to load live data" notification appears

**Why:** Browser security blocks external API calls when opening files directly.

**Solutions:**
1. **Ignore it** - Demo mode works perfectly for preview
2. **Use local server** (Method 2) for full functionality
3. **Deploy to GitHub Pages** (Method 3) for unrestricted access

---

### Problem: Chart.js not displaying

**Why:** External CDN resources may be blocked by browser/firewall.

**Solution:**
1. Use a local web server (Method 2)
2. Or download Chart.js locally and update the script tag in `index.html`

---

### Problem: Fonts look different

**Why:** Google Fonts CDN blocked.

**Solution:**
- Use local server or GitHub Pages
- Fonts will load properly from CDN

---

### Problem: Images not loading in news cards

**Why:** External image sources blocked.

**Solution:**
- This is expected in demo mode
- Use local server for better experience
- With real NewsAPI key, images load from news sources

---

## 🎯 Quick Preview Checklist

Before showing to others, make sure:

- [ ] Gauge animates smoothly
- [ ] Dark/Light theme toggle works
- [ ] Click "Manual Mode" - slider appears
- [ ] Move slider - gauge updates in real-time
- [ ] News cards display (even if demo)
- [ ] Page is responsive (resize browser window)
- [ ] No console errors (open DevTools with F12)

---

## 📱 Test on Different Devices

### Desktop
- Test in Chrome, Firefox, Safari, Edge
- Try different window sizes

### Mobile
- Use browser DevTools (F12) → Device Toolbar
- Or deploy to GitHub Pages and test on actual phone

### Tablet
- Test medium screen sizes (768px - 1024px)

---

## 🚀 Ready to Deploy?

Once you've previewed and everything looks good:

1. **Configure API Keys** (optional):
   - Copy `config.example.js` to `config.js`
   - Add NewsAPI key for real news

2. **Deploy to GitHub Pages** (Method 3 above)

3. **Share your live link!**

---

## 💬 Need Help?

- **Check README.md** for detailed setup instructions
- **Open an issue** on GitHub
- **Review browser console** (F12) for error messages

---

**Enjoy your Fear & Greed Index preview! 🎉**
