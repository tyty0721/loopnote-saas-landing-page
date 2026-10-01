# Design notes

The page is organized around a project owner's question: “What did we decide, and who does what next?” A focused hero with a concrete workspace illustration leads to problems/features, workflow, an operable demo, concept integrations, pricing, FAQ and a final demo entry. Social proof is intentionally absent because there are no real customers or results.

## Visual system

| Token | Value / rule |
|---|---|
| Primary | Indigo `#4F46E5`; hover `#3730A3` |
| Secondary | Teal `#0F766E` for completed state and small accents |
| Text | Ink `#0F172A`; supporting text `#5B6474` |
| Surfaces | White and `#F8FAFC`; muted lavender for summary |
| Divider | `#E4E8EF` |
| Font | Local system sans-serif; Segoe UI, PingFang SC, Microsoft YaHei fallbacks |
| Content width | 1200px maximum; 40px desktop outer gutters, 20px mobile |
| Headings | Desktop hero up to 64px; section 42px; mobile hero 49px / Chinese 43px; section 33px |
| Spacing | 8px-inspired progression; section padding 95px desktop / 65px phone |
| Corners | 18px content cards; 9px buttons; 14–17px workspace frames |
| Buttons | Indigo primary; secondary text actions; 52px hero button height |
| Focus | Visible 3px teal outline with 5px offset |

Large type, restrained negative space, asymmetric hero composition and a fine-lined workspace frame establish the page's hierarchy. The final section uses deep violet to mark the last demo entry. The hero preview contains three named tasks, owners and dates rather than decorative placeholder bars.

## Responsive and interaction rules

- Desktop: two-column hero/workflow, three feature/pricing cards, split demo navigation and meeting panel.
- At 850px: reduce spacing and preview scale while preserving the same section sequence.
- At 650px and below: collapsible navigation, single-column hero/cards/workflow/FAQ, horizontal meeting choices above the panel.
- At 360px: tighten gutters and allow task dates to wrap.
- Light button hover and progress transitions; all transitions and smooth scroll are disabled under `prefers-reduced-motion: reduce`.
- Native `dialog.showModal()` provides the modal focus boundary and Esc behavior. The app focuses the close button and restores the opening plan button on close.
- Meeting tabs use selected state, roving tabindex and arrow/Home/End controls. Task buttons use `aria-pressed`; FAQ buttons use `aria-expanded` and `aria-controls`.

The implementation is original plain HTML/CSS/JS. A framework or large template would add deployment and license overhead without helping this fixed, local demo. Browser layout and behavior checks must be read from the QA report; these design notes describe intended rules, not proof that every viewport passed.
