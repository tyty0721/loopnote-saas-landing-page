# LoopNote QA report

Date: 2026-10-01. Project type: self-initiated, AI-assisted concept website for a fictional product. Official source uses Pro $12; the independent simulated revision under `revision-copy/` uses Pro $15.

Browser results below were supplied by the coordinating agent after operating the local HTTP preview in the Codex in-app browser. Source checks are a separate layer of evidence. No real SaaS deployment, signup, payment or integration was tested or implemented.

## Actual browser checks

| Check | Observed result |
|---|---|
| English and Chinese at 375 / 768 / 1024 / 1440px | Passed: no horizontal overflow in the checked layouts |
| Three preset meeting choices | Passed: selection changed the displayed meeting content |
| Task completion | Passed: example task state changed |
| Language switching | Passed: selected meeting and changed task state were preserved across English/Chinese switches |
| Reset | Passed: original sample data was restored |
| FAQ | Passed: all five official FAQs operated |
| Official pricing | Passed: Free / Pro / Team displayed $0 / $12 / $29 |
| Plan dialogs | Passed: all three plan explanations opened; visible close and Esc worked |
| Dialog focus return | Passed: closing and Esc returned focus to the opening button |
| Mobile navigation | Passed: menu opened; choosing a section navigated and closed the menu |
| Independent revision | Passed: Pro $15 and six FAQs were consistent in English and Chinese |

These are observed HTTP browser behaviors. The presence of `aria-*`, `dialog`, responsive rules or event handlers in source was not used as a substitute for the operations above.

## Source and content checks

`node scripts/build-docs.cjs` generated the independent revision and matching bilingual copy. `node scripts/verify-source.cjs` passed nine source contract checks; the timestamp and exact before/after values are in `docs/source-checks.json`. `node --check` passed for the application and content scripts.

- Every HTML content key exists in both languages, with matching dictionary keys.
- Shared official prices remain 0 / 12 / 29; three meetings and nine tasks correspond across the two languages.
- Official/revised FAQ counts are five/six, with revised subtitles and $15 price reflected in revised documents.
- Local assets and page anchors resolve in the source.
- Runtime sources do not include external URLs, `fetch`, module scripts, `localStorage` or `sessionStorage`.

Source checks prove these code/content contracts; they do not prove a fully offline browser session, visual quality, console behavior or keyboard accessibility.

## Unverified items and limitations

- Direct `file://` navigation was blocked by the available browser's safety policy. Double-click opening and a fully disconnected session remain unverified; the implementation uses local assets and ordinary scripts and is intended to support that path.
- An attempted 200% browser zoom produced no observable zoom change. Actual 200% zoom compliance is unverified; resizing the viewport is not equivalent to browser zoom.
- A second browser was not tested.
- A complete keyboard-only traversal, modal Tab focus-boundary check, refresh-state check, runtime reduced-motion check and measured contrast audit are not established by the supplied browser evidence. Close/Esc focus return was tested as described above.
- The Chinese copy received an agent consistency pass; the user's final human review remains pending. No professional translation certification is claimed.

## Captured evidence

Real browser captures are stored in `portfolio/`:

- `01-desktop-hero.png`
- `02-mobile-layout.png`
- `03-chinese-demo.png`
- `04-pricing-dialog.png`

`docs/source-checks.json` and `docs/revision-log.md` record the source contracts and independent client-modification exercise. Portfolio media demonstrates the implemented page, not real service availability or measured business outcomes.
