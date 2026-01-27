class LottoBall extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const number = this.getAttribute('number');
        const color = this.getColor(number);
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-weight: bold;
                    color: white;
                    background-color: ${color};
                }
            </style>
            <div>${number}</div>
        `;
    }

    getColor(number) {
        if (number <= 10) return '#FBC400'; // Yellow
        if (number <= 20) return '#69C9EA'; // Blue
        if (number <= 30) return '#ff6b6b'; // Red
        if (number <= 40) return '#AAAAAA'; // Gray
        return '#66CC33'; // Green
    }
}

customElements.define('lotto-ball', LottoBall);


document.getElementById('generate-button').addEventListener('click', () => {
    const lottoNumbersContainer = document.getElementById('lotto-numbers');
    const bonusNumberDisplay = document.getElementById('bonus-number-display');
    const bonusNumberSection = document.querySelector('.bonus-number-section'); // Get reference to the section

    lottoNumbersContainer.innerHTML = '';
    bonusNumberDisplay.innerHTML = ''; // Clear bonus number display
    bonusNumberSection.style.display = 'flex'; // Show the bonus section

    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    const mainNumbers = [...numbers].sort((a, b) => a - b);
    let bonusNumber;
    do {
        bonusNumber = Math.floor(Math.random() * 45) + 1;
    } while (mainNumbers.includes(bonusNumber));


    for (const number of mainNumbers) {
        const lottoBall = document.createElement('lotto-ball');
        lottoBall.setAttribute('number', number);
        lottoNumbersContainer.appendChild(lottoBall);
    }

    const bonusLottoBall = document.createElement('lotto-ball');
    bonusLottoBall.setAttribute('number', bonusNumber);
    bonusNumberDisplay.appendChild(bonusLottoBall);
});

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(theme) {
    body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
        themeToggle.textContent = '화이트모드'; // White Mode
    } else {
        themeToggle.textContent = '다크모드'; // Dark Mode
    }
}

themeToggle.addEventListener('click', () => {
    const isDarkMode = body.dataset.theme === 'dark';
    if (isDarkMode) {
        setTheme('light');
    } else {
        setTheme('dark');
    }
});

// Apply saved theme on load
(function () {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
})();
