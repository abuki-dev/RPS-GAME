# 🎮 BK GAME - Rock Paper Scissors Logic Lab

A high-end, visually stunning Rock Paper Scissors game built with **Tailwind CSS v4** and vanilla JavaScript. Features glassmorphism UI, animated backgrounds, particle effects, and full mobile responsiveness.

![Game Preview](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4.2.2-38bdf8?style=for-the-badge&logo=tailwindcss)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-f7df1e?style=for-the-badge&logo=javascript)

---

## ✨ Features

- **🎨 High-End Visual Effects**
  - Animated gradient backgrounds with floating orbs
  - Glassmorphism cards with backdrop blur
  - Particle burst effects on weapon selection
  - Score pop animations with gradient text
  - Smooth modal transitions with spring animations
  - Progress bar with glow effects

- **📱 Fully Responsive**
  - Mobile-first design
  - Fluid typography using `clamp()`
  - Touch-optimized buttons
  - Adaptive layouts for all screen sizes (360px+)

- **⚡ Interactive Gameplay**
  - Real-time score tracking
  - Round progress indicator
  - Visual weapon selection feedback
  - Modal alerts for round results
  - Early game finish when score gap is insurmountable

---

## 🎯 How to Play

1. **Select Your Weapon**: Click on Rock 🪨, Paper 📄, or Scissors ✂️
2. **Set Rounds**: Choose how many rounds you want to play (default: 5)
3. **Start Game**: Click the "⚡ Start Game" button
4. **View Results**: A modal will show the round result
5. **Continue**: Click "Continue →" to play the next round
6. **Final Score**: After all rounds, see who won the match!

### Game Rules

- **Rock** 🪨 beats Scissors ✂️
- **Paper** 📄 beats Rock 🪨
- **Scissors** ✂️ beats Paper 📄
- If both choose the same, it's a **draw** 🤝

---

## 🚀 Getting Started

### Prerequisites

- Node.js (for Tailwind CLI)
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abuki-dev/RPS-GAME.git
   cd RPS-GAME
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build Tailwind CSS** (if you make changes to HTML classes)
   ```bash
   npx @tailwindcss/cli -i ./docs/input.css -o ./docs/output.css --minify
   ```

4. **Open the game**
   ```bash
   # Simply open docs/index.html in your browser
   # Or use a local server:
   npx serve docs
   ```

---

## 🛠️ Technical Stack

- **Tailwind CSS v4.2.2** - Utility-first CSS framework
- **Vanilla JavaScript** - No frameworks, pure ES6+
- **CSS Animations** - Keyframe animations for effects
- **MutationObserver API** - For reactive UI updates

---

## 🐛 Challenges & Solutions

### Challenge 1: Modal Not Appearing
**Problem**: The modal alert wasn't showing when rounds completed.

**Root Cause**: 
- `main.js` was calling `modal.classList.remove("hidden")` 
- But the modal used Tailwind classes `opacity-0 pointer-events-none` instead of `hidden`
- The `setTimeout` override in HTML ran too late

**Solution**:
- Updated `main.js` to directly toggle the correct Tailwind classes:
  ```javascript
  modal.classList.remove("opacity-0", "pointer-events-none");
  modal.classList.add("opacity-100");
  modalBox.classList.remove("scale-90", "translate-y-5");
  modalBox.classList.add("scale-100", "translate-y-0");
  ```
- Removed the conflicting override script from HTML

---

### Challenge 2: Score Gap Logic Bug
**Problem**: Game crashed with `ReferenceError: scoregap is not defined`

**Root Cause**:
- Variable declared as `scoreGap` (camelCase)
- Referenced as `scoregap` (lowercase) in condition
- Also referenced undefined `remainning` variable

**Solution**:
```javascript
const remaining = tot - cur;
const scoreGap = Math.abs(humanscore - computerscore);
if (scoreGap > remaining && cur < tot) {
  finalresult();
  reset();
}
```

---

### Challenge 3: Font Awesome Icons Not Loading
**Problem**: Gamepad icon wasn't visible in header.

**Root Cause**:
- Used `fa-graphite fa-thin` which requires Font Awesome Pro (paid)
- Free CDN doesn't support these styles

**Solution**:
- Removed Font Awesome dependency entirely
- Used emoji icon 🎮 instead (works everywhere, no external library)
- Applied same gradient effect as title text for consistency

---

### Challenge 4: CSS vs Tailwind Conflict
**Problem**: Initial implementation used custom CSS instead of Tailwind.

**Solution**:
- Rewrote entire UI using Tailwind v4 utility classes
- Kept only essential CSS that Tailwind can't handle:
  - Keyframe animations (`@keyframes`)
  - Decorative background effects (orbs, stars, grid)
  - Gradient text clips with `-webkit-background-clip`
  - Pseudo-element accent lines
- Rebuilt `output.css` to include all new classes

---

### Challenge 5: Progress Bar Not Syncing
**Problem**: Progress bar didn't update with round count.

**Solution**:
- Used `MutationObserver` to watch round counter changes
- Automatically calculate and update progress width:
  ```javascript
  new MutationObserver(() => {
    const cur = parseInt(roundEl.textContent) || 0;
    const tot = parseInt(totalEl.value) || 5;
    progressFill.style.width = Math.min((cur / tot) * 100, 100) + '%';
  }).observe(roundEl, { childList: true });
  ```

---

## 📂 Project Structure

```
RPS-GAME/
├── docs/
│   ├── index.html      # Main game page (Tailwind classes)
│   ├── main.js         # Game logic
│   ├── input.css       # Tailwind source (@import "tailwindcss")
│   └── output.css      # Compiled Tailwind CSS
├── package.json        # Dependencies
└── README.md          # This file
```

---

## 🎨 Design Highlights

- **Color Palette**: Blue (#3b82f6), Purple (#8b5cf6), Cyan (#06b6d4)
- **Typography**: System fonts with fluid sizing
- **Animations**: Smooth 300ms transitions, cubic-bezier easing
- **Glassmorphism**: `backdrop-blur-xl` with semi-transparent backgrounds
- **Shadows**: Layered box-shadows for depth

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

---

## 📄 License

ISC License - see [LICENSE](LICENSE) for details

---

## 👨‍💻 Author

**Triple A Tech**

- GitHub: [@abuki-dev](https://github.com/abuki-dev)
- Repository: [RPS-GAME](https://github.com/abuki-dev/RPS-GAME)

---

## 🙏 Acknowledgments

- Tailwind CSS team for the amazing v4 release
- Emoji designers for universal icons
- The web development community

---

**Made with 💙 by Triple A Tech**
