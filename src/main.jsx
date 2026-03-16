import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Inject @font-face dynamically so the path resolves correctly
// both in local dev (base = '/') and on GitHub Pages (base = '/repo-name/')
const fontStyle = document.createElement('style');
fontStyle.textContent = `
  @font-face {
    font-family: 'Agirlsty';
    src: url('${import.meta.env.BASE_URL}fonts/agirlsty.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
`;
document.head.appendChild(fontStyle);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);