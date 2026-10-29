# AttachmentCard and file Checkbox — 2026-10-28

Sources: [AttachmentCard](https://www.figma.com/design/686IP0J8jTGiix3IXVcA45?node-id=20159-164867), [Parts/RightSide](https://www.figma.com/design/686IP0J8jTGiix3IXVcA45?node-id=22254-194653), [Checkbox](https://www.figma.com/design/686IP0J8jTGiix3IXVcA45?node-id=22254-198039).

## Current variants

| Variant | Figma ID | Existing background token | Both themes |
| --- | --- | --- | --- |
| Attach=Doc | 20156:164811 | `color/file/text/background` / `--gpn-ai-file-text-background` | #399FF5 |
| Attach=Xls | 22254:197844 | `color/file/spreadsheet/background` / `--gpn-ai-file-spreadsheet-background` | #42C995 |
| Attach=png | 22254:197945 | `color/file/image/background` / `--gpn-ai-file-image-background` | #FFAA68 |

Doc intentionally retains the existing text-file blue shown in the updated design. It does not switch to the older `file/doc/background` token. Format background hues remain fixed across themes; surrounding text, border and controls adapt to Light/Dark.

The inner pictogram uses `color/file/icon/foreground` (white at 70%), and the extension glyph uses `color/text/on-accent` (opaque white). Opacity is already in the token. Raw colors in the XLS/PNG glyph variants and their visible card instances were bound to these existing roles. No color values or tokens were added.

## Card structure

- Card: 248×48px, radius 12px, padding and gap 8px, transparent background, inset 1px `color/file/card/border` (5% neutral in each theme).
- Checkbox: 16×16px, radius 6px.
- File glyph: 24×28px.
- Content: flexible width with ellipsis; name and metadata use `Typography/Caption/Compact` (Inter Regular 12/14.4), gap 4px. Name uses primary text; metadata uses tertiary.
- Actions: optional instance of `Parts/RightSide` (22254:194653), 88×24px. Edit, delete and download use three Clear XS icon buttons, 24×24px with 8px gaps and 12px glyphs. Existing control icon and button hover tokens apply.
- Checkbox and actions default to hidden, matching the updated Figma properties. At 248px, title width is 200px with neither, 176px with only the checkbox, 104px with only actions, and 80px with both.
- `Border` defaults to true; switch it off for files placed in an already grouped list or surface. It uses a separate absolute border layer, so toggling it does not change size or spacing. The existing three file variants and their IDs are preserved.

## Checkbox colors

Empty uses the softer existing `color/text/tertiary` neutral outline with no fill. The empty checkbox outline remains tertiary (40% in Light, 45% in Dark), stronger than the global default border (16% in both themes) and softer than the full-opacity control color. The global border update does not change this checkbox-specific override. Disabled styles retain their existing subdued appearance. Check and Inter... use the existing blue `color/selection/checkbox/background` fill and `color/selection/checkbox/border`; the check/dash is white `color/text/on-accent`. This applies to the file Checkbox; the separately scoped chat-list checkbox is unchanged. The original variant names and IDs remain; no instances were detached.

## Application integration

AttachmentCard is an application composition; the theme supplies CSS recipes, not a React AttachmentCard export. Use these classes with the application's existing file glyph and controls:

| Class | Element |
| --- | --- |
| `DsAttachmentCard` | Card wrapper; bordered by default |
| `DsAttachmentCard_borderless` | Add to the wrapper to hide the border |
| `DsAttachmentCard-File` | Existing file glyph wrapper |
| `DsAttachmentCard-Content` | Name/metadata stack |
| `DsAttachmentCard-Name` | Name with accessible full text/tooltip |
| `DsAttachmentCard-Metadata` | File size or other metadata |
| `DsAttachmentCard-Actions` | XS Button controls |
| `DsFileCheckbox` | Standalone Consta Checkbox using these styles |

Border, checkbox and actions are independent options. Omit the checkbox or actions element when hidden; do not leave empty wrappers. Use `className="DsAttachmentCard DsAttachmentCard_borderless"` for the unbordered version. Render the shared actions group with `DsAttachmentCard-Actions`, either inside the card or as a separate application toolbar. Use `view="clear"` for its buttons.

Within `DsAttachmentCard`, ordinary Consta Checkbox also receives the file checkbox style. Use `<Button size="xs" onlyIcon iconLeft={...} />` for actions and provide an accessible label/title. The application owns selection, indeterminate state, opening, editing, deletion and download handlers. Apply `width: 100%` on the card when a responsive parent should determine its width.

## Verification

After rebinding, the three card variants contain no unbound visible solid paints. Existing text styles and 48px geometry were preserved. A separate component snapshot is stored at `tokens/components/attachment-card.json`. Theme token values are unchanged.
