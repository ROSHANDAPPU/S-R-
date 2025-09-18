# S&R Photography — Client Welcome Packet

A modern, responsive 6-slide presentation-style website for S&R Photography's Client Welcome Packet. Built with semantic HTML, CSS (glass-morphism, gradients, parallax), and vanilla JavaScript for smooth navigation and accessibility.

## Project Structure

```
sr-photography-website/
├── index.html
├── styles/
│   └── main.css
├── scripts/
│   └── main.js
├── assets/
│   └── images/
│       └── .gitkeep
└── README.md
```

## Features

- Fullscreen 6-slide layout with scroll-snap for precise section alignment
- Fixed navigation dots for quick slide navigation
- Smooth scrolling and active slide tracking
- Parallax-style Unsplash backgrounds with graceful fallback colors
- Glass-morphism content cards using backdrop blur
- Responsive grid layouts for team and services
- Accessibility: semantic HTML, ARIA roles, focusable navigation, keyboard support
- Performance: font preconnects, reduced motion support, minimal JavaScript

## Slides (Content)

1. Cover/Title
2. Welcome message
3. Meet Our Team (Saad Sheikh & Roshan Dappu)
4. Project Timeline (6 steps)
5. Services Offered (6 services)
6. Thank You

All text content matches the provided specification. Visible ampersands are HTML-escaped as `&amp;` for validity.

## Getting Started

- Option 1: Open `index.html` directly in your browser.
- Option 2: Serve locally (recommended for best asset loading and browser security rules):
  - Using Python 3
    ```bash
    python3 -m http.server 5500
    ```
    Then open http://localhost:5500/ in your browser and navigate to `sr-photography-website/`.

  - Using Node (serve):
    ```bash
    npx serve -l 5500
    ```

No build step is required.

## Customizing Images

- Add your custom images to `assets/images/`.
- To replace Unsplash background images, edit the slide rules in `styles/main.css` (selectors `.slide-1::before` through `.slide-6::before`). Replace the `url(...)` with your own.
- Fallback background colors are defined on each `.slide-N` class (`background-color`); adjust as desired.

## Accessibility & Keyboard Navigation

- Navigation dots are keyboard-accessible.
  - Arrow Up/Down to move between dots
  - Enter/Space to activate
- PageUp/PageDown or Arrow Up/Down navigate slides
- Home/End jump to first/last slide
- A "Skip to content" link is included for screen readers and keyboard users.
- Reduced motion users will not see scroll animations or indicator animation.

## Performance Notes

- Google Fonts `preconnect` hints are used to speed up font loads.
- Backgrounds use `background-attachment: fixed` for a parallax feel; some mobile browsers may ignore this. The design includes graceful fallbacks.
- CSS-only effects are preferred where possible.

## Browser Support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). Older browsers may not support `backdrop-filter`; cards will gracefully degrade.

## License

This project is provided as-is for S&R Photography. Unsplash images are loaded by URL and subject to Unsplash licensing. Replace with your own licensed assets if required.
