# Fogline | Litebox challenge concept

## Product
Fogline is a fictional developer productivity and code-review workspace for engineering teams working across repositories, issue trackers and documentation.

**Problem:** Pull-request reviews lose momentum because comments, diffs, tasks, decisions, and documentation live in separate places.

**Value proposition:** See the complete context behind every change, review with more confidence, and keep work moving toward merge.

**Primary audience:** Software engineers, technical leads and reviewers in fast-moving product teams.

**Launch assumption:** The product is preparing to launch. The landing page's primary conversion is an email-only early-access waitlist, not a user login. The mockup form does not save emails.

## Art direction
Use 4HER's real visual and motion system as the base: Funnel Display and Funnel Sans, Lenis scrolling, Reveal/TextReveal, responsive primitives, accessible reduced-motion behavior.

- Fogline pixel-cloud mark with an understated wordmark.
- Editorial typography, ample negative space, warm neutrals with blue-gray and sage accents.
- Flat realistic product interfaces, subtle borders and practical content. No dramatic perspective, heavy shadows or glowing decorative wires.
- Four illustrated San Francisco scenes with restrained pixel/dither detail.
- Small cable car progresses along a slim navigation rail as the story moves. The journey is a creative collage of city landmarks, **not a literal cable-car service itinerary**.

## Narrative

| Stop | Time and place | Headline | Proof / interface |
| --- | --- | --- | --- |
| 01 | Golden Gate, foggy morning | Lift the fog around your code. | Clear value proposition, waitlist |
| 02 | Painted Ladies, sunny morning | Every change has a bigger picture. | Review queue + related tasks and docs |
| 03 | Crissy Field, golden hour | Less back-and-forth. Better reviews. | Complete code diff, threaded comment, checks, reviewer context |
| 04 | City overlook, sunset | A better view of what's next. | Merge-ready state + final early-access CTA |

## Realistic product content
Featured PR #482: **Improve session renewal**.
- Review queue: #482, #478, #469 with differing statuses.
- File: `src/auth/session.ts`.
- Diff: session token retrieval and login redirect handling.
- Inline feedback from Maya Chen about cache expiry during refresh.
- Related task: PLAT-184, Refresh sessions safely.
- Related doc: Authentication strategy.
- Checks: 6 passing; reviewers: 2 requested.
- Terminal state: ready to merge once discussions are resolved.

## Review checklist
- [x] Choose category: developer productivity + code review
- [x] Choose conversion: early-access waitlist
- [x] Approve exploratory name: Fogline
- [x] Define story and landing copy
- [x] Implement scroll journey, transitions and clickable navigation
- [x] Implement realistic developer-tool UI mockups
- [x] Implement responsive waitlist panel, with simulated submission
- [ ] Replace drafted SVG scenery with final approved cropped image layers and refine motion
- [ ] Visual QA on actual browser breakpoints
- [ ] Final Figma desktop landing, mobile hero, extra mobile section, components

## Implementation
Branch: `litebox-exploration` in `hddhdhdydjv/4her`.

Main implementation files:
- `src/components/sections/fogline-landing.tsx`
- `src/components/graphics/fogline-scenes.tsx`
- `src/styles/fogline.css`

Built on 4HER's existing Next.js 16, React 19, Lenis and motion components. Source project remains unchanged on `main`.

**Current visual limitation:** background scenery is a self-contained SVG illustration set. High-resolution generated pixel-art imagery is not yet embedded into the published branch. The imagery still needs final compositing and on-device visual review.
