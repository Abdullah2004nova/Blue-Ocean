# 🌊 Blue Ocean — KIIT University Campus Events

A modern, responsive event management website for **KIIT University**, built with pure HTML5, CSS3, and vanilla JavaScript. Students can explore campus events, search and filter by category, view detailed event info with live countdown timers, and register instantly — with data saved to Local Storage.

🔗 **Live Demo:** https://abdullah2004nova.github.io/Blue-Ocean/
📁 **Repository:** https://github.com/Abdullah2004nova/Blue-Ocean

## ✨ Features

### Core Requirements
- ✅ Attractive hero section introducing the platform
- ✅ Upcoming events displayed as responsive cards
- ✅ Each card shows name, date, venue, image, and short description
- ✅ Search events by title, venue, description, or category
- ✅ Category filters — Technology, Music, Business, Art, Sports, Education
- ✅ Event detail modal with full description, meta info, and registration CTA
- ✅ Registration form collecting name, email, phone, and selected event
- ✅ JavaScript form validation with inline error messages
- ✅ Confirmation message on successful registration
- ✅ Fully responsive across mobile, tablet, and desktop

### Bonus Features
- 🌗 Dark / light mode with saved preference
- ⏳ Live countdown timers for each event
- 🎞️ Animations — scroll reveals, staggered card entrances, floating elements, shimmer buttons
- 💾 Local Storage — every registration is persisted client-side

### Extra Polish
- 🎨 Ocean-inspired design system with CSS custom properties
- 🌊 Animated water waves flowing at the bottom of the hero and featured card
- 🔄 Organic drift animation on the featured event card
- 🧭 Centered animated logo with rotating conic-gradient glow and shimmering wordmark
- 📊 Animated stat counters triggered on scroll
- ♿ Accessibility — ARIA labels, keyboard-friendly modal (Esc to close), `prefers-reduced-motion` support
- 🔍 Real-time search combined with category chip filtering
- 📱 Mobile-first layout with horizontal-scroll chips on small screens

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic elements, ARIA) |
| Styling | CSS3 (custom properties, Grid, Flexbox, animations, masks) |
| Behaviour | Vanilla JavaScript (ES2020+) |
| Storage | Local Storage API |
| Fonts | Plus Jakarta Sans (Google Fonts) |
| Version Control | Git + GitHub |
| Deployment | GitHub Pages |

**No frameworks. No build tools. No dependencies.** Just open `index.html` and it runs.

---

## 📂 Project Structure

```text
blue-ocean-events/
├── index.html          # Page structure, hero, events, form, modal
├── styles.css          # Full design system + animations + responsive rules
├── script.js           # Event data, search/filter, validation, storage, theme
└── README.md
