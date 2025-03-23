import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))

// 深色模式切换
const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('darkMode', isDark ? 'dark' : 'light');
    updateDarkModeIcon(isDark);
  });
  
  // 检查用户之前的偏好
  const darkModePreference = localStorage.getItem('darkMode');
  if (darkModePreference === 'dark') {
    document.documentElement.classList.add('dark');
    updateDarkModeIcon(true);
  }
}

function updateDarkModeIcon(isDark) {
  const icon = darkModeToggle.querySelector('svg');
  if (isDark) {
    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />';
  } else {
    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />';
  }
}

// 游戏预加载功能
const gameCards = document.querySelectorAll('.game-card');
gameCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    const gameUrl = card.getAttribute('onclick').match(/'(.*?)'/)[1];
    if (gameUrl) {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'document';
      preloadLink.href = gameUrl;
      document.head.appendChild(preloadLink);
    }
  });
});

// 页面加载优化
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.classList.add('opacity-0');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }
});
