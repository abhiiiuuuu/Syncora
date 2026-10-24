# Syncora

The Syncora studio website — an independent web design and development studio.

Built with React, Vite, and Tailwind CSS v4.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Configuration

All studio details live in [`src/config/site.js`](src/config/site.js):

- `CONTACT_EMAIL` — used by the contact form, email buttons, and footer.
- `ATELIER_NOIR_URL` — the published URL for the live Atelier Noir website.

### Atelier Noir live link

The portfolio section renders the **View live website ↗** button only when
`ATELIER_NOIR_URL` contains a confirmed public `https://` address. It is
currently set to the published Atelier Noir URL (taken from that project's own
README live-preview entry). Never point it at a localhost or development
server — if the address ever changes, update it here:

```js
export const ATELIER_NOIR_URL = 'https://your-confirmed-live-url.example';
```

## Contact form

The form composes a `mailto:` message to `CONTACT_EMAIL` with the enquiry
details filled in. It does not post to a server, so no backend or third-party
form service is required.

## Project structure

```
public/                 static assets, favicon, grain, Atelier Noir visual
src/App.jsx             page sections and content
src/index.css           design tokens, typography, motion, form styles
src/components/         Logo, MagneticButton, Reveal
src/config/site.js      contact email and Atelier Noir URL
```
