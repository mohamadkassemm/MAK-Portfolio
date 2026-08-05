# MAK Portfolio — React

A React + Vite conversion of the original single-file HTML portfolio. All sections, animations
(particle network canvas, scroll reveals, marquee, orbiting hero rings, shimmer text), the
loading screen, mobile nav, and the CV/Certificate modals have been ported to React components,
with the exact original CSS preserved in `src/index.css`.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
index.html                 Vite entry HTML (fonts + icon CDNs)
src/
  main.jsx                 React root
  App.jsx                  Top-level layout, loader/header/modal state
  index.css                Global styles (ported 1:1 from the original <style> block)
  components/
    Reveal.jsx              Scroll-reveal wrapper (IntersectionObserver, replaces data-reveal script)
    ParticlesCanvas.jsx     Animated particle-network background
    Loader.jsx               Splash/loading screen
    Header.jsx                Nav bar + mobile menu + "View CV" trigger
    CvModal.jsx                CV viewer modal
    CertModal.jsx               Certificate viewer modal
    Hero.jsx, BugBounty.jsx, Experience.jsx, Projects.jsx,
    Education.jsx, Skills.jsx, Contact.jsx, Footer.jsx   Page sections
public/
  Mohammad_Kassem_CV.pdf          <-- add your CV here
  MAK Certificates/                <-- add certificate PDFs here
```

## Adding your PDFs

The original site referenced a CV and six certificate PDFs by relative path. Drop the actual
files into `public/` using these exact names (or update the `src` paths in
`src/components/Education.jsx` and `src/components/CvModal.jsx` to match your filenames):

- `public/Mohammad_Kassem_CV.pdf`
- `public/MAK Certificates/Information Security Associate.pdf`
- `public/MAK Certificates/Ethical Hacking.pdf`
- `public/MAK Certificates/MERN Stack.pdf`
- `public/MAK Certificates/CTF.pdf`
- `public/MAK Certificates/Project Management.pdf`
- `public/MAK Certificates/FCS.pdf`

Anything placed in `public/` is served as-is at the site root, matching how the original
`.html` file referenced these files as plain relative paths.

## Notes

- Content (job history, projects, skills, certificates) lives as small data arrays at the top
  of each section component — edit those arrays to update copy without touching markup.
- The contact form opens the visitor's email client via a `mailto:` link, same as the original.
- Reduced-motion and responsive breakpoints from the original CSS are unchanged.
