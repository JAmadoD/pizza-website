# Pizza Website

A modern, local-only restaurant website for a pizza shop, inspired by Royal Pizza in Fall River.

## What it includes

- Responsive single-page restaurant site
- Modern hero section and contact CTA
- Tabbed menu browsing
- Local order pad for building a call-in order summary
- Static frontend only, no backend required

## Files

- `index.html` - page structure
- `styles.css` - visual design and responsive layout
- `menuData.js` - menu data used by the interface
- `script.js` - tab switching and order pad logic

## Run locally

### Option 1: open directly
Open `index.html` in your browser.

### Option 2: serve locally
If you have Python:

```bash
python3 -m http.server 8080
```

Then visit:

```text
http://localhost:8080
```

### Option 3: npm script

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:8080
```

## Notes

- This is designed for local use.
- Menu items and prices are based on public information and should be confirmed with the restaurant when ordering.
- The site currently uses a call-to-order flow rather than live checkout.
