# 🐾 Paws & Preferences — Find Your Favourite Kitty

> A Tinder-style cat swiping app to help you discover what kind of cats you love.

**[🌐 Live Demo](https://lzhong0119.github.io/Paws-And-Preferences_Find-Your-Favourite-Kitty/)** &nbsp;|&nbsp; **[📁 Repository](https://github.com/lzhong0119/Paws-And-Preferences_Find-Your-Favourite-Kitty)**

---

## ✨ Features

- 🐱 **Tinder-style swipe cards** — swipe right to like, swipe left to dislike
- 🖱️ **Mouse drag** support on desktop for the same swipe feel
- ⌨️ **Keyboard shortcuts** — press `→` to like, `←` to dislike
- 👆 **On-screen buttons** — Like ❤️ and Dislike ✕ buttons always visible
- 🏷️ **Live cat tags** — tags sourced directly from the CATAAS API per cat
- 📊 **Summary screen** — see how many kitties you liked and view them all
- 🔁 **Play Again** — reshuffle and go through a fresh batch of cats
- 🎵 **Background music** — ambient audio with a song progress ring indicator
- 📱 **Mobile-first** — smooth touch gestures, responsive in portrait & landscape
- 💎 **Glassmorphism UI** — frosted glass cards, custom font, soft pastel palette

---

## 🖼️ Preview

| Swiping | Summary |
|---------|---------|
| Stack of swipeable cat cards with LIKE / NOPE overlays | Grid of liked cats with total count and Play Again button |

---

## 🛠️ Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Styling | Vanilla CSS (CSS custom properties) |
| Cat Images | [CATAAS API](https://cataas.com/) |
| Hosting | GitHub Pages |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/lzhong0119/Paws-And-Preferences_Find-Your-Favourite-Kitty.git

# 2. Navigate into the project
cd Paws-And-Preferences_Find-Your-Favourite-Kitty

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server |
| `npm run build` | Build production bundle into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run deploy` | Build and deploy to GitHub Pages |

---

## 🌐 Deployment (GitHub Pages)

This project is pre-configured for GitHub Pages deployment using the `gh-pages` package.

```bash
npm run deploy
```

This will:
1. Run `npm run build` automatically (via the `predeploy` script)
2. Push the `dist/` folder to the `gh-pages` branch

Then in your GitHub repository:
- Go to **Settings → Pages**
- Set the source branch to **`gh-pages`**

> ⚠️ The `base` in `vite.config.js` is already set to `/Paws-And-Preferences_Find-Your-Favourite-Kitty/` to match the repository name. If you fork this repo under a different name, update the `base` accordingly.

---

## 📁 Project Structure

```
├── public/
│   ├── audio/
│   │   └── Song.mp3          # Background music
│   ├── fonts/
│   │   └── agirlsty.otf      # Custom brand font
│   └── .nojekyll             # Prevents Jekyll processing on GitHub Pages
├── src/
│   ├── App.jsx               # Main application logic & UI
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles & design tokens
├── docs/
│   └── PRD.md                # Product Requirements Document
├── index.html                # HTML entry point
├── vite.config.js            # Vite configuration
└── package.json
```

---

## 🎮 How to Use

1. **Swipe right** (or press `→` or click ❤️) to **like** a cat
2. **Swipe left** (or press `←` or click ✕) to **dislike** a cat
3. After going through all cats, a **summary screen** shows your liked cats
4. Press **Play Again** to reshuffle and start a new session
5. Toggle background **music** with the button in the top-right corner

---

## 🐾 Cat Images

All cat images are sourced from **[CATAAS (Cat as a Service)](https://cataas.com/)** — a free public API that serves random cat images. Each session fetches a randomised batch of 15 cats from the API.

---

## 📄 Documentation

See [`docs/PRD.md`](docs/PRD.md) for the full Product Requirements Document.

---
