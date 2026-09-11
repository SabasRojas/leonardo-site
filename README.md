# Leonardo Perez — Portfolio

Personal site for Leonardo Perez, Mechanical Engineering @ UTEP. Static single-page app built for CloudFront.

## Stack

- **Vite 8 + React 19 + TypeScript** — static output in `dist/`
- **Tailwind CSS v4** — design tokens live in `src/index.css` (`@theme`)
- **Motion** (`motion/react`) — scroll reveals, hero drawing animation, lightbox, modals
- **Self-hosted variable fonts** (Space Grotesk, Inter, JetBrains Mono) via `@fontsource-variable` — no third-party requests
- **lucide-react** icons

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

Production build + preview of the exact files that will be deployed:

```bash
npm run build
npm run preview    # http://localhost:4173
```

Other scripts: `npm run lint` (oxlint), `npx tsc -b` (typecheck).

## Editing content

Everything on the page is data-driven from one file:

- `src/data/content.ts` — profile, hero stats, experience, projects, awards, skills, gallery captions, nav
- `src/data/images.ts` — generated manifest (src, dimensions, blur placeholder) for the WebP files in `public/images/`
- `public/Leonardo_Perez_Resume.pdf` — the resume served by the "Resume" buttons

To add a photo: drop a `.webp` into `public/images/`, add an entry to `images.ts` (width/height required; `blur` can be an empty string), then reference its key from `content.ts`.

## Deploying to CloudFront

The site is fully static. Upload the contents of `dist/` to the S3 origin and invalidate:

```bash
npm run build
aws s3 sync dist/ s3://YOUR_BUCKET --delete \
  --cache-control "public,max-age=31536000,immutable" --exclude "index.html"
aws s3 cp dist/index.html s3://YOUR_BUCKET/index.html \
  --cache-control "public,max-age=0,must-revalidate"
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/index.html" "/"
```

- Default root object: `index.html`
- Hashed assets under `/assets/*` are safe to cache forever; only `index.html` needs a short TTL.

## Structure

```
src/
  components/   Img (blur-up), Lightbox, Toolpath (hero SVG), SchematicArt, Reveal, Button, ...
  sections/     Nav, Hero, About, Experience, Work, Awards, Gallery, Skills, Contact, Footer
  data/         content.ts, images.ts
  hooks/        useActiveSection
  lib/          cn, motion presets
public/
  images/       optimized WebP photography
  og.png, favicon.svg, apple-touch-icon.png, icon-512.png, Leonardo_Perez_Resume.pdf
```
