# Design QA — hero and dither illustrations

## Visual truth

- Approved hero concept: `/workspace/scratch/bc5530c8c6fa/generated_images/exec-90687619-d20f-4e9b-b2c8-2dd1b61d302b.png` (1487 × 1058).
- Browser implementation evidence: `qa/implementation-services.jpg` (1348 × 926) plus a live top-of-page browser review at the same desktop viewport.
- State reviewed: desktop, page load at `#inicio`, then the first sticky service state at `#servicios`.

## Full-view comparison

- The implemented hero keeps the approved hierarchy: centered copy over a full-bleed monochrome dither field.
- The artwork uses the actual 4HER logotype, centered in white, instead of a recreated text approximation.
- The existing navigation, typography, copy, and header CTA remain unchanged; the hero CTA and discipline line were removed as approved.
- The original one-at-a-time sticky services layout remains intact.

## Focused regions

### Hero artwork

- Grayscale ordered-dither field fills the viewport width without decorative dividers.
- Cursor proximity changes a local dither layer and applies subtle wordmark parallax.
- Reduced-motion preferences remove the wordmark transition and time-based drift.

### Service illustrations

- All nine exports have genuine transparent backgrounds.
- The illustration silhouette itself carries the dither texture; there is no white tile or dot-grid panel behind it.
- Service transitions combine opacity, a small vertical shift, scale, and blur while preserving the original sticky scroll behavior.

## Findings

- P0: none.
- P1: none.
- P2: none.
- P3: the live header is intentionally the existing dark pill instead of the concept's loose white navigation; this preserves the established site system requested by the user.

## Interaction and runtime checks

- Verified hero load, responsive full-width crop, service sticky state, transparent illustration rendering, and navigation targets in a browser-rendered preview.
- No Next.js error overlay was present.
- TypeScript, changed-file ESLint, and production build checks are recorded in the implementation handoff.

## Result

passed
