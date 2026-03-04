# Guru Wangchuk | Modern Digital Portfolio

A high-performance, visually immersive portfolio developed with **React 19**, **Vite 7**, and **GSAP**. This project prioritizes sophisticated motion design, premium typography, and seamless user experiences, drawing inspiration from Awwwards-winning aesthetics.

---

## 🚀 Technical Arsenal

### **Core Stack**
- **Framework:** [React 19](https://react.dev/) (Functional Components with Hooks)
- **Build Tool:** [Vite 7](https://vitejs.dev/) (ESM-driven development)
- **Styling:** Vanilla CSS (CSS3 Variables & Fluid Typography)
- **Icons:** [Lucide React](https://lucide.dev/)

### **Motion & Interaction**
- **GSAP (GreenSock Animation Platform):**
  - `ScrollTrigger` for scroll-driven reveals.
  - `CustomEase` for tailored transition curves.
  - Multi-layered clipping path animations for introductory sequences.
- **Lenis Smooth Scroll:** Provides a consistent, momentum-based scrolling experience across all browsers and devices.

---

## ✨ Key Features

- **Dynamic Opening Sequence:** A high-impact hero entry utilizing dark/light layer clipping and GSAP stagger effects.
- **Fluid Typography:** Implementation of `clamp()` functions to ensure readability from 4K displays down to mobile devices.
- **Adaptive Grid Layout:** A responsive architecture that transitions from desktop multi-column layouts to mobile-optimized stacks without compromising visual fidelity.
- **Technical Arsenal & Accolades:** Interactive sections showcasing skills and achievements with a "brutalist" yet refined aesthetic.

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── OpeningSequence/      # GSAP-driven hero & loading logic
│   ├── Skills/               # Interactive "Technical Arsenal" section
│   ├── Footer/               # Contact and social integration
│   └── ...                   # Additional UI modules
├── App.jsx                   # Root component & global state
├── App.css                   # Global styles & Lenis overrides
└── main.jsx                  # React entry point
```

---

## 🛠️ Installation & Development

### **Prerequisites**
- [Node.js](https://nodejs.org/) (v18.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### **Getting Started**
1. **Clone the repository:**
   ```bash
   git clone https://github.com/guruwangchuk7/guruwangchuk_portfolio.git
   cd my-react-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Launch development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Crafted with precision by Guru Wangchuk.**
