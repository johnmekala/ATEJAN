# AJETAN Premium Agency Website

## Goal
Build a complete, polished multi-page website that positions AJETAN as a trusted technology partner through a restrained white-and-blue identity, editorial layouts, relevant product visuals, concise copy, and purposeful motion.

## Experience and visual system
- Establish a consistent semantic design system: white/light-neutral foundations, deep navy typography, professional blue and electric-blue accents, quiet gray borders, restrained shadows, and controlled radii.
- Use a strong modern sans-serif pairing and large editorial typography without oversized or crowded mobile text.
- Create a cohesive visual language of abstract product interfaces, system diagrams, device frames, workflow canvases, and analytics surfaces rather than generic people or futuristic stock art.
- Add quick, deliberate motion: staged page entry, scroll reveals, image masks, card lift, arrows, process progression, navigation compression, mobile-menu sequencing, and reduced-motion fallbacks.

## Pages and routing
- `/` — immersive home page with hero, positioning statement, service showcase, reasons to choose AJETAN, animated process, technology capabilities, selected placeholder work, featured case-study structure, FAQ, and final call to action.
- `/about` — story, mission, vision, values, approach, capabilities, and clearly labeled team placeholders.
- `/services` — service overview and detailed capability matrix.
- `/services/$slug` — reusable detail experience for web development, app development, AI automation, digital marketing, UI/UX, and custom software; includes problems, process, technologies, deliverables, FAQ, and project CTA.
- `/portfolio` — filterable portfolio with clearly labeled replaceable concept placeholders and future-CMS-ready fields.
- `/portfolio/$slug` — reusable case-study architecture showing problem, approach, solution, and editable outcome fields without invented claims.
- `/contact` — accessible, validated project inquiry form with loading, error, and success states; integration-ready but no fake submission backend.
- `/privacy` and `/terms` — structured editable legal templates that avoid claiming finalized legal advice.
- Global custom 404 experience via the root route.

## Shared architecture
- Separate editable company, service, project, FAQ, team, social, contact, and visual configuration from presentation components.
- Build shared navigation, mobile panel, footer, buttons, headings, reveal wrappers, service cards, portfolio cards, process display, accordion, visual panels, and contact form.
- Keep future CMS/admin integration straightforward through stable typed content models and slug-driven route data.
- Centralize all imagery and visual references; use local, optimized, consistently art-directed assets and lazy loading below the fold.

## Interaction and functionality
- Sticky navigation with active states, compact scrolled mode, keyboard-accessible mobile menu, and prominent project CTA.
- Smooth page transitions and lightweight branded loading feedback only where navigation actually waits.
- Interactive service cards, category-filtered portfolio transitions, progressive process timeline, FAQ accordion, and subtle desktop pointer feedback where it improves clarity.
- Contact form validation for required fields, email, and phone; configurable service and budget choices; honest integration-ready success messaging.

## SEO, accessibility, and production safeguards
- Add unique title, description, Open Graph text, Twitter card data, self-referencing canonical, and correct semantic headings on every content route.
- Preserve crawler access, add route-aware sitemap structure when a public production domain exists, and include appropriate organization/service structured data without fabricated facts.
- Ensure semantic landmarks, accessible names, focus visibility, keyboard operation, contrast, alt text, form errors, and `prefers-reduced-motion` support.
- Add `.env.example` for optional future integrations without credentials; validate input again when a real server submission is connected.

## Verification
- Inspect all routes, navigation paths, filters, accordions, service links, case-study links, legal pages, and the contact form.
- Check desktop and mobile layouts, including narrow 320px behavior, for overflow, overlap, and typography failures.
- Verify page metadata, broken images, console/runtime errors, loading behavior, keyboard focus, reduced motion, and final build health.
- Keep placeholders visibly honest: no invented clients, results, team members, contact details, awards, statistics, or technology claims.
