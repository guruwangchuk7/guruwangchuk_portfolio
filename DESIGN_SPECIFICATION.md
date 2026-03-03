# Front-End Design & Animation Specification
## Project: Guru Wangchuk Portfolio 2026

### 1. Vision & Aesthetic
The objective is a **Cinematic Editorial** experience. The design avoids traditional web patterns in favor of high-contrast monochrome layouts, monumental typography, and intentional motion that rewards the user's scroll.

---

### 2. Design System Tokens

#### 🎨 Color Palette (High-Contrast Monochrome)
| Token | Hex | Usage |
| :--- | :--- | :--- |
| `bg-dark` | `#1A1A1A` | Hero background, Dark sections, Footer background |
| `bg-light` | `#F4F4F4` | Experience, Skills, Secondary content |
| `text-dark` | `#1A1A1A` | Typography on light backgrounds |
| `text-light` | `#F4F4F4` | Typography on dark backgrounds, Asterisks |
| `accent-dim` | `rgba(0,0,0,0.1)` | Borders, Dividers, Inactive states |

#### 🖋 Typography (Inter Engine)
*   **Primary Font**: `Inter` (Sans-serif)
*   **Monospace Font**: `SF Mono / Roboto Mono` (Numbers, Meta-data)
*   **Hero Headers**: `800 Weight`, `-0.05em Letter Spacing`, `0.9 Line Height`.
*   **Section Headers**: `clamp(2.5rem, 6vw, 5rem)`, Uppercase.
*   **Body Text**: `1.15rem`, `1.6 Line Height`, `rgba(0, 0, 0, 0.7)` for sub-text.

---

### 3. Animation Principles (GSAP Core)

#### 🔄 Global Easings
All animations follow a custom cubic-bezier for a "weighty" yet fluid feel:
*   **`mainEase`**: `0.76, 0, 0.24, 1` (Used for masks and reveals).
*   **`revealEase`**: `power3.out` (Used for staggered entries).

#### 🎭 Motion Categories
1. **Mask/Viewport Reveals**:
   - Section titles use a `y: 100` to `y: 0` translation with `overflow: hidden` on the container.
   - **Trigger**: `top 85%` of the viewport.
2. **Staggered Orchestration**:
   - Lists (Experience, Arsenal, Education) use a `0.1s` stagger.
   - Initial entries have a subtle `opacity: 0` and `y: 40` offset.
3. **Cursor-Driven Interaction**:
   - **Projects**: Floating image follower using `gsap.quickTo` for zero-lag mouse tracking.
   - **Interactive Scaling**: Images scale from `0` to `1` with a `scaleX: 0.5` underline animation on hover.

---

### 4. Technical Architecture

#### ⚙️ The Smooth Scroll Engine (Lenis)
To prevent "scroll-jacking" while maintaining 60fps animations:
*   **Lenis Integration**: Integrated into the GSAP Ticker.
*   **Synchronization**: `ScrollTrigger.update` is fired on every Lenis scroll event.
*   **Initialization**: Post-Opening Sequence `ScrollTrigger.refresh()` to lock in dynamic offsets.

#### 🏗 Component Breakdown
*   **OpeningSequence**: Dual-layer clipping path (`inset`) and width interpolation for name reveal.
*   **Experience (01)**: Left-aligned vertical stack with numeric anchoring.
*   **Arsenal (02)**: Dynamic horizontal underline expansion on hover.
*   **Footer**: Massive scale typography reveal with a Live API-driven clock (IST/BST).

---

### 5. Performance Strategy
*   **Hardware Acceleration**: Extensive use of `will-change: transform` on high-frequency motion elements (Hero Name, Project Rows).
*   **Scoped Contexts**: `gsap.context()` used in every React component to ensure zero memory leaks and clean animation cleanup on unmount.
*   **Responsive Scaling**: All `rem` and `vh` values are clamped via CSS `clamp()` to maintain editorial proportions from 4K displays down to mobile.
