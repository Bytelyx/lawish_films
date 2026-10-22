# LUMINA STUDIOS — Haute Couture & Cinematic Photography Portfolio

A premium, cinematic frontend-only photography portfolio website for a luxury photography atelier. Built with **React.js, Tailwind CSS v4, GSAP, GSAP ScrollTrigger, Lenis Smooth Scroll, Three.js, Framer Motion, and React Router**.

---

## 🌟 Visual Architecture & Highlights

- **Pure Frontend Architecture**: No backend, database, authentication, or external API dependencies. All content, packages, curated photography stories, and videos are managed via centralized local datasets.
- **Lenis + GSAP ScrollTrigger Synchronization**: Seamless momentum scrolling synchronized with GSAP tickers and ScrollTrigger instances for smooth editorial parallax.
- **Three.js Subtle 3D Depth Canvas**: Floating luminous gold dust and architectural ambient shards reacting in real-time to mouse positioning and scroll depth without overpowering photography.
- **Cinematic 3D Hero Section**: Layered focal-depth planes where images scale, rotate subtly, and separate on scroll, unveiling the grand typography and leading into curated stories.
- **Asymmetric Editorial Category Panels**: Curated showcases for all 5 core disciplines:
  1. `Wedding`
  2. `Intimate`
  3. `Lifestyle`
  4. `Party & Celebrations`
  5. `Maternity`
- **Alternating Storytelling Sections**: Editorial split layouts (Left/Right alternating) with package previews and direct routes.
- **Haute Couture Package Information**: Editorial layout displaying pricing, hours, artist counts, delivered retouched frames, heirloom album details, and 4K film options.
- **Integrated High-Resolution Galleries**: 15–20 curated fine-art frames per discipline with asymmetric layout styling (panoramic, portrait, landscape, masonry).
- **Fullscreen Image Lightbox**: Powered by Framer Motion with zoom in/out, keyboard navigation (Escape, Left, Right), captions, and index counter.
- **Cinema Video Showcase**: Looping muted 4K/HD video presentation with custom play/pause overlay, mute toggle, and fullscreen control.
- **Dynamic Filterable Gallery (`/gallery`)**: Smooth Framer Motion layout animations for filtering across `ALL`, `WEDDING`, `INTIMATE`, `LIFESTYLE`, `PARTY`, and `MATERNITY` without page reload.
- **Photographer Biography & Philosophy (`/about`)**: Editorial split layout, philosophy manifesto, awards, press coverage (Vogue, Harper's Bazaar, Elle), and 4-step commission workflow.
- **Direct WhatsApp Dispatch**: Configurable phone number and custom pre-filled message generator via `src/data/config.js`.

---

## 📁 Project Structure

```
lumina-photography/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── wedding/       # 20 curated sample frames
│   │   │   ├── intimate/      # 15 curated sample frames
│   │   │   ├── lifestyle/     # 15 curated sample frames
│   │   │   ├── party/         # 15 curated sample frames
│   │   │   └── maternity/     # 15 curated sample frames
│   │   └── videos/
│   │       └── wedding-highlight.mp4
│   │
│   ├── components/
│   │   ├── Navbar.jsx              # Floating glassmorphic navigation with scroll reaction
│   │   ├── Footer.jsx              # Luxury minimal footer with smooth Back-to-Top
│   │   ├── Hero.jsx                # Cinematic 3D scroll depth hero
│   │   ├── ThreeHeroBackground.jsx # WebGL golden particle dust & depth planes
│   │   ├── CategorySection.jsx     # Editorial category panels with clip-path reveal
│   │   ├── CategoryStory.jsx       # Alternating storytelling section
│   │   ├── GalleryGrid.jsx         # Asymmetric editorial gallery with Lightbox trigger
│   │   ├── Lightbox.jsx            # Fullscreen interactive zoom & keyboard lightbox
│   │   ├── PackageDetails.jsx      # Luxury pricing & investment breakdown
│   │   ├── VideoSection.jsx        # Film showcase with custom player controls
│   │   ├── AboutSection.jsx        # Photographer introduction split section
│   │   ├── LetsConnect.jsx         # Minimal luxury CTA with WhatsApp dispatch
│   │   ├── SocialIcons.jsx         # Clean SVGs for Instagram, Facebook, YouTube, WhatsApp
│   │   └── ScrollToTop.jsx         # Instant scroll reset on route changes
│   │
│   ├── pages/
│   │   ├── Home.jsx                # Master homepage assembly
│   │   ├── Gallery.jsx             # Filterable permanent archive
│   │   ├── About.jsx               # Dedicated biography and commission journey
│   │   └── CategoryDetails.jsx     # Dynamic route for all 5 categories (/category/:id)
│   │
│   ├── data/
│   │   ├── config.js               # Central WhatsApp number, socials, studio metadata
│   │   └── categories.js           # 5 photography services, packages, galleries & videos
│   │
│   ├── animations/
│   │   ├── scrollAnimations.js     # GSAP ScrollTrigger parallax & clip-path helpers
│   │   └── pageTransitions.js      # Framer Motion page variants
│   │
│   ├── hooks/
│   │   └── useLenis.jsx            # Lenis smooth scroll provider & GSAP sync
│   │
│   ├── App.jsx                     # Router, layout, AnimatePresence wrapper
│   ├── main.jsx                    # Application entry
│   └── index.css                   # Tailwind v4 import, custom fonts & scrollbar
│
├── vite.config.js                  # Vite configuration with Tailwind v4 plugin
└── package.json
```

---

## 🛠️ Tech Stack

- **React 19**
- **JavaScript (ES Modules, JSX)**
- **Tailwind CSS v4** (with `@tailwindcss/vite`)
- **GSAP 3 & ScrollTrigger**
- **Lenis 1.3** (`lenis`)
- **Three.js** (`three`)
- **Framer Motion 13** (`framer-motion`)
- **React Router 7** (`react-router-dom`)
- **Lucide React** (`lucide-react`)

---

## 📱 WhatsApp Configuration

To customize the WhatsApp contact destination:
Open `src/data/config.js` and modify the `whatsapp` block:

```javascript
export const SITE_CONFIG = {
  studioName: "LUMINA STUDIOS",
  whatsapp: {
    number: "19175550198", // Country code + phone digits (no symbols or spaces)
    defaultMessage: "Hello Elena, I would like to inquire about booking a photography session with Lumina Studios.",
    getLink(customMessage) {
      const msg = encodeURIComponent(customMessage || this.defaultMessage);
      return `https://wa.me/${this.number}?text=${msg}`;
    }
  },
  // ...
};
```

---

## 🚀 Running the Project

```bash
# 1. Navigate to directory
cd C:\Users\ASUS\.gemini\antigravity\scratch\lumina-photography

# 2. Start the development server
npm run dev

# 3. Create a production build
npm run build

# 4. Preview the production build
npm run preview
```

Development server runs at `http://localhost:5173/`.
