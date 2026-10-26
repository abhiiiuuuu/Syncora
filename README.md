# Syncora

Syncora's studio website — the public home of the studio. It presents the
practice, the work, and a direct way to get in touch. See [LICENSE](LICENSE) for
ownership terms.

Built with React 19, Vite, Tailwind CSS v4, React Three Fiber and Framer Motion.

## Run it

```bash
npm install
npm run dev
```

```bash
npm run build     # production bundle in dist/
npm run preview   # serve the production build locally
npm run lint
```

## Deploy

The site is a static bundle, so any static host works. On Vercel, import the
repository and Vercel will run `npm run build` and publish `dist/`.

[`vercel.json`](vercel.json) adds the production headers: a Content Security
Policy, HSTS, `nosniff`, `DENY` framing, a restrictive Permissions Policy and
immutable caching for hashed assets. There are no environment variables, no API
keys and no server runtime.

## What is on the page

- Hero: studio positioning, primary calls to action, featured project link.
- Capability marquee.
- Selected work: Atelier Noir and ClayKraft, each with a **View live website ↗** button.
- Capabilities, studio principles, process.
- Project enquiry form (composes a `mailto:` draft).
- Contact details, WhatsApp, Instagram, footer.

## Configuration

All public studio details live in [`src/config/site.js`](src/config/site.js):

| Value | Used by |
| --- | --- |
| `CONTACT_EMAIL` | contact section, footer, mobile menu, enquiry form |
| `WHATSAPP_PHONE` / `WHATSAPP_URL` | work section, contact section, footer |
| `INSTAGRAM_HANDLE` / `INSTAGRAM_URL` | contact section, footer |
| `ATELIER_NOIR_URL` | the live-site button in Selected work |
| `CLAYKRAFT_URL` | the second live-site button in Selected work |

`ATELIER_NOIR_URL` must stay a confirmed `https://` address. If it is empty the
portfolio hides the live-site button rather than linking somewhere unverified.
The current value, `https://atelier-noir-ashy.vercel.app`, was checked and
returns the live Atelier Noir site.

`CLAYKRAFT_URL` follows the same rule. Its current value,
`https://claykraft.netlify.app`, was checked and returns the live ClayKraft
shop.

## The background scene

[`src/components/Scene/Scene.jsx`](src/components/Scene/Scene.jsx) draws the
Earth, its lime atmospheric rim and the ring system in shaders. The planet's
surface is the NASA Blue Marble day map (public domain), stored at
[`public/textures/earth-day.webp`](public/textures/earth-day.webp); the lighting,
the graticule and the rim are generated in the fragment shader. There is no 3D
model to download. The ring is a single additive plane large enough to run past
every edge of the viewport.

- Three.js is code-split and loads after the page content is usable.
- Reduced-motion visitors and browsers without WebGL get a painted fallback;
  no animation loop starts.
- The loop pauses while the tab is hidden, and pixel ratio is capped.
- Phones use fewer sphere segments and a smaller, lower planet.
- The scene never receives pointer events and cannot block text or navigation.

## Ownership and security

Syncora owns this site, its copy, its visual system and the Atelier Noir
showcase. The copyright line in the footer is generated from the current year.

- No passwords, API keys, tokens or private endpoints exist in this repository
  or in the shipped JavaScript.
- No analytics, trackers, advertising pixels or third-party scripts are loaded.
- The enquiry form does not post to a server. It opens the visitor's email app
  with a pre-filled draft; the visitor decides whether to send it. That is why
  there is no enquiry database to secure.
- A demo admin portal previously lived in `src/components/AdminPortal.jsx`. It
  held a plaintext username and password in the client bundle and persisted
  invented client requests in `localStorage`. Both are security anti-patterns,
  so the file was removed from the build and archived under `.backup/`. A real
  owner dashboard needs server-side authentication and storage; it must never
  be shipped as client-side JavaScript.
- If the contact mechanism is changed to a real form backend, keep its
  credentials on the server (Vercel environment variables or a hosted function)
  and never in `src/`.

## Project structure

```
public/                     favicon, grain, Atelier Noir cover, earth texture, robots.txt
src/App.jsx                 page sections and content
src/index.css               design tokens, typography, mobile and motion rules
src/components/CustomCursor.jsx
src/components/Logo.jsx     glass capsule wordmark
src/components/MagneticButton.jsx
src/components/Reveal.jsx
src/components/Scene/       lazy-loaded Earth + ring background
src/config/site.js          public contact and portfolio configuration
```
