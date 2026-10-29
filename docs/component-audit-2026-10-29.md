# Component review — 2026-10-29

Source: [Figma component page](https://www.figma.com/design/686IP0J8jTGiix3IXVcA45?node-id=2536-19469). Git base: `aabed6ef2df4356fd00bbe17b7167b38ded1bc6b`.

The current page has **46 top-level component families**. The audit traversed **2329 nodes**, including hidden optional parts. The visible-content pass covered 301 non-empty text layers. This replaces the older page inventory for current implementation; it does not relabel removed or historical components as current.

## Completed

- Compared all 85 previously exported semantic colors with the current Figma Light/Dark values: no differences. Global `color/border/default` remains the approved 16% in both modes. The review does not claim that this softened border meets 3:1 contrast.
- All 26 existing local text-style definitions match the committed metrics.
- Bound 43 text layers to local styles: reasoning headers/steps, source links, chat timestamps, Snackbar message and timer counter. Verified font family, weight, size, effective line height and letter spacing stayed unchanged for every edited layer. No headings were resized.
- Added exact missing local styles `Typography/Body/Message` (Inter Regular 16/22.4) and `Typography/Caption/Counter` (Inter Bold 12/24), exported as `typography.bodyMessage` and `typography.captionCounter` with matching CSS variables and Consta Snackbar overrides.
- Bound the Logo and Star component-set editor outlines to the existing editor token. User-facing colors are unchanged.
- Exported the already approved Figma search shadow, previously missing from Git: `--gpn-ai-shadow-search`, with the existing semantic wide/near roles in both themes. Geometry: 0 24px 90px and 0 8px 36px. These are existing Figma colors, not a new palette proposal.
- Recorded each family ID, dimensions, variants, used color variables and text styles in `tokens/components/component-inventory.json`.

## Explicit exceptions

- Three visible brand text layers (two originals and one nested instance) use GPN_ID. They are brand artwork, not interface typography; they remain unchanged.
- AttachmentCard/Module/File contains 165 unbound solid paints in original format-icon artwork. Those illustrations are deliberately preserved. They are listed with exact node IDs in the snapshot and are not treated as interface theme colors.
- After fixes, no unbound/remote interface solid paints or non-brand text styles remain in the audited families, including hidden optional parts. No local typography metric overrides remain.

## Implementation scope

This repository is a Consta theme package. Composer, Menu, cards, messages, reasoning, context panels, pagination and other application compositions still need application markup and behavior. The component snapshot documents their design; it is not a claim of complete React implementation or pixel parity for all 46 families. Existing component IDs and instances are preserved. The Figma file was edited; this does not publish a team library or change sharing permissions.

## Inventory

| Family | Figma ID | Variants | Nodes |
| --- | --- | ---: | ---: |
| Menu | `17413:24046` | 2 | 168 |
| Menu/Module/Nav | `17413:9626` | 2 | 27 |
| Menu/Module/Group | `17726:100298` | — | 22 |
| Logo | `22507:117100` | 2 | 8 |
| Composer | `20081:142227` | 5 | 176 |
| Composer/Module/Input | `20081:143734` | — | 10 |
| Composer/Module/File | `20159:165090` | — | 56 |
| Button | `20055:141169` | 48 | 265 |
| ChoiceGroup/Module/Item | `20133:82484` | 12 | 55 |
| ChoiceGroup | `20133:83399` | — | 48 |
| ChoiceGroup/Module/Part | `20133:83857` | — | 6 |
| AttachmentCard | `20159:164867` | 3 | 40 |
| AttachmentCard/Module/File | `20154:92413` | 56 | 273 |
| Parts/RightSide | `22254:194653` | — | 13 |
| ChatHeader | `20399:192155` | — | 21 |
| ChatHeader/Module/Breadcrumbs | `20434:194235` | — | 15 |
| Card/Assistant | `21195:106283` | — | 10 |
| Star | `21200:106921` | 2 | 7 |
| List | `21250:134977` | 2 | 33 |
| List/Module/Item | `21250:134988` | 2 | 13 |
| List/Module/Header | `21257:135053` | — | 4 |
| ChatMessage | `20882:136599` | 2 | 123 |
| ChatMessage/Module/Text | `20882:136767` | — | 5 |
| ChatMessage/Module/File | `20882:136255` | — | 42 |
| ChatMessage/Module/Actions | `20882:136515` | — | 11 |
| ChatMessage/Module/Reasoning/Module/Header | `9643:91439` | 2 | 15 |
| ChatMessage/Module/Reasoning/Module/Step | `9643:91454` | 2 | 61 |
| ChatMessage/Module/Reasoning | `8965:9563` | 4 | 157 |
| SourceLink | `13850:168109` | 4 | 19 |
| SourceLink/Module/Icon | `13850:178127` | 2 | 6 |
| ComboboxList | `21266:140775` | — | 39 |
| ComboboxList/Module/Item | `21266:140897` | 3 | 40 |
| Text | `3885:32503` | — | 3 |
| ContextPanel | `21257:135648` | — | 79 |
| Card/Prompt | `21282:146431` | 2 | 31 |
| AutoComplete | `21276:144887` | — | 11 |
| Combobox | `21617:100922` | 2 | 19 |
| Pagination | `21290:148089` | — | 57 |
| Pagination/Module/Pages | `21290:147766` | — | 28 |
| PromptCatalog/Toolbar | `21282:146468` | — | 61 |
| Chat list | `21443:262757` | — | 92 |
| Chat list | `21448:262998` | 2 | 22 |
| Tabs | `21632:60004` | — | 43 |
| Tabs/Modules | `21632:59899` | 2 | 12 |
| Checkbox | `22254:198039` | 3 | 14 |
| Snackbar | `22475:94248` | 4 | 69 |

## Validation

JSON/CSS and Figma snapshot consistency, WEB aliases and variable references, TypeScript, production build, and browser checks against real Consta 5.33.3 in Light/Dark. Browser coverage includes fields, ChoiceGroup, dropdown portals, keyboard selection, Tabs, chat checkbox styling, and Snackbar colors, actions and exact message/counter typography. Passing these checks does not imply full application-level coverage.

Local validation note: custom Inter asset paths were verified against the Git tree. Their binaries were not present in this scratch checkout, so the browser render used fallback fonts for those custom paths. Browser checks establish CSS metrics and interaction behavior; font-preserving verification of the Figma edits was performed directly on the text nodes. This is not a font-loading or screenshot-parity approval of the consuming application.
