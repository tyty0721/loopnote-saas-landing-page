# LoopNote — responsive bilingual SaaS concept

A self-initiated landing page for a **fictional** meeting productivity product. Built with plain HTML, CSS and JavaScript, with complete English and Simplified Chinese content. It presents a real local interface with preset data; it does not provide a working SaaS service.

## Open the page

The verified preview uses local HTTP. From this directory, run `python -m http.server 8022` and open `http://localhost:8022`. All runtime assets are local and ordinary scripts; no build step, API key or online CDN is required.

The source is designed to open directly by double-clicking `index.html`. That path remains **unverified**: the available browser automation blocked `file://` URLs through its safety policy, so direct file opening and a fully disconnected session were not tested. This restriction did not prevent local HTTP preview checks.

## Explore

- Switch between English and 简体中文 in the navigation. The meeting selection and task states stay the same.
- Choose one of three preset meetings. With the keyboard, use arrow keys, Home or End on a meeting tab.
- Toggle example tasks and see the completion count update. Reset restores all original task states and the first meeting. Refresh also resets everything.
- Explore any plan to open its explanation. Use the close button, Esc or the backdrop to close. Keyboard focus returns to the opening button.
- Expand FAQ answers and open the navigation menu on a phone.

## Files and editing

| File | Purpose |
|---|---|
| `index.html` | Semantic page structure, hero interface illustration, anchors and dialog |
| `assets/styles.css` | Responsive layout, colors, spacing, focus and reduced motion rules |
| `assets/content.js` | Both language dictionaries, shared prices and three preset meetings |
| `assets/app.js` | Language, navigation, tabs, task state, reset, FAQ and dialog |
| `assets/favicon.svg` | Original LoopNote mark |
| `docs/` | Product facts, editable copy exports, design notes, QA and evidence |
| `portfolio/` | Actual browser captures and a clearly labeled case study |
| `revision-copy/` | Separate simulated client modification; **not the official delivery** |
| `scripts/` | Optional development helpers for documentation and source checks |

To change a price, edit the `plans` array in `assets/content.js`, then update the product brief and any FAQ wording that mentions that price. To change copy, edit the English and Chinese entries with the same key. Meeting/task data follows the same order in both languages. Keep translated names, task states and numbers aligned. Content is inserted as text, not executable HTML. A newline in a string produces a line break in a static copy element.

To regenerate copy documents and the independent simulation, run `node scripts/build-docs.cjs`. This deliberately rebuilds `revision-copy/`, so save any manual experimental revision changes first. Then run `node scripts/verify-source.cjs`. Node.js is a development convenience only, not a website dependency. These checks verify source contracts; they do not replace a browser check.

The interface illustration uses HTML/CSS. Replace it by changing its semantic markup and styles. When adding an image, put the local asset in `assets/`, add useful alternative text and record its source/license in `docs/asset-sources.md`.

## Delivery and boundaries

The official Pro price is **$12/user/month**. The independent client simulation uses **$15**, a new hero subtitle and a sixth FAQ. For an official website ZIP, include `index.html`, `assets/`, `docs/`, `portfolio/`, and this README; omit `revision-copy/` (provide it as a separate evidence package if requested), development helper scripts and SPEC.md if the client does not need them.

No recording, transcription, model calls, calendar connections, live Notion/Slack/Jira integrations, signup, subscription, payment or persistent data storage are implemented. No personal data is collected. The concept does not make customer-count, certification, conversion or productivity-result claims. This is an AI-assisted, self-initiated design and development exercise.

Local HTTP browser checks passed at 375, 768, 1024 and 1440px in both languages without horizontal overflow. Meeting/task state, reset, FAQ, pricing dialogs, Esc/focus return and mobile menu navigation were operated successfully. The separate $15 / six-FAQ revision was checked in both languages. Actual 200% browser zoom, direct file opening, a disconnected session and another browser remain unverified. Exact evidence and boundaries are recorded in `docs/qa-report.md`; source checks are recorded separately and do not prove browser behavior. Chinese copy still requires the user's final human review.
