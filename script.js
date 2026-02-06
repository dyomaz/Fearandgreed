const slider = document.getElementById('slider');
const indexValue = document.getElementById('indexValue');
const indexLabel = document.getElementById('indexLabel');
const needle = document.getElementById('needle');
const buttons = document.querySelectorAll('.btn[data-value]');
const randomBtn = document.getElementById('randomBtn');

function updateIndex(value) {
    value = Math.max(0, Math.min(100, value));
    
    // Update display value
    indexValue.textContent = value;
    
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
    
    indexLabel.textContent = label;
    indexValue.style.color = color;
    indexLabel.style.color = color;
    
    // Update needle rotation (0 = -90deg, 100 = 90deg)
    const rotation = (value / 100) * 180 - 90;
    needle.style.transform = `rotate(${rotation}deg)`;
    
    // Update slider value
    slider.value = value;
    
    // Update body background gradient
    document.body.style.background = `linear-gradient(135deg, #1a1a2e 0%, ${color}22 100%)`;
}

// Slider input
slider.addEventListener('input', (e) => {
    updateIndex(parseInt(e.target.value));
});

// Preset buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = parseInt(button.dataset.value);
        updateIndex(value);
    });
});

// Random button
randomBtn.addEventListener('click', () => {
    const randomValue = Math.floor(Math.random() * 101);
    updateIndex(randomValue);
});

// Initialize with default value
updateIndex(50);