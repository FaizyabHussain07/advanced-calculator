# 🧮 Pure Android / Google UI Calculator

A premium, fully responsive React application mimicking the sleek aesthetic and robust logic of the native **Google Android Default Calculator** layout, enhanced with powerful desktop functionalities.

## ✨ Key Features

- **📱 Pure Material Design Layout:** Deep dark colors (`#202124`), perfectly round pill buttons, tinted text layouts, and bold accent coloring directly resembling Google's standard layout.
- **📈 Hidden Scientific Drawer:** The calculator begins natively bare-bones. Tapping the side arrow smoothly expands the frame using `Framer Motion` to seamlessly reveal 10 advanced scientific buttons without refreshing the screen!
- **✏️ Editable Display Mode:** Clicking the `Pen` Edit icon seamlessly transforms the visual output into a functional editable canvas area, allowing precise cursor edits! Strict DOM-level key-blocking ensures that irrelevant alphabet keys (`h, k, m, hello`) are physically blocked so app-breaking inputs cannot occur. Safe mathematical tokens (`sin`, `log`, `pi`, `e`, numbers) map straight into the engine!
- **⌨️ Fast Hardware Keyboard Link:** No need to use the mouse! Type `s i n ( 4 )` directly with your physical laptop keyboard! Key listeners natively map keys.
- **🔁 Auto-Scaling & Word-Wrapping Display:** The calculator display shrinks font-sizes automatically as numbers get longer. If your calculation goes extremely long, the text breaks and wraps to a new line gracefully instead of hiding endlessly off-screen!
- **🔄 Smart Formula Continuation:** Once you finalize an equation (like `2+2 = 4`), typing another operator (like `+`) automatically saves the last calculation into your History tray and seamlessly initiates the next formula string `4+` allowing uninterrupted workflows!
- **📜 Sliding History Drawer:** Beautifully animated hidden History panel that slides out neatly from the right, containing previous logs that you can directly tap to recall or wipe permanently via the Clear action.

## 🛠️ Built With

- **React (Vite Framework)** - Blazing fast modern frontend library setup.
- **TailwindCSS (v3.4)** - Used for utility-first zero-CSS strict responsive styling. 
- **Framer Motion** - Drives the dynamic drawer expansions and button clicking bumps.
- **Math.js** - Solid, dependency-proven math evaluation engine executing logic strings safely.
- **Lucide-React** - High-quality standard SVG UI Icons.

## 🏃🏽 How to Run Locally

1. Open a terminal inside the project directory:
```bash
cd advanced-calculator
```

2. Make sure necessary node-modules are safely downloaded:
```bash
npm install
```

3. Boot up the Vite Development Server locally:
```bash
npm run dev
```

4. Visit the standard local host network shown in your terminal (typically **`http://localhost:5173/`**) from any browser. You can minimize your browser to mobile sizes to test out its robust responsiveness! 
