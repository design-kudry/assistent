# AttachmentCard and file Checkbox — 2026-10-27

Sources: [AttachmentCard](https://www.figma.com/design/686IP0J8jTGiix3IXVcA45?node-id=20159-164867), [Checkbox](https://www.figma.com/design/686IP0J8jTGiix3IXVcA45?node-id=22254-198039).

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
- Actions: three XS icon buttons, each 24×24px with 8px gaps. Existing control icon and button hover tokens apply. The 248px design with all actions leaves 80px for the title; truncation is intentional.

## Checkbox colors

Empty, Check and Inter... states now use a neutral `color/border/default` outline with no fill. Check/dash uses `color/control/default`. This follows the existing decision to avoid blue filled selection checkboxes. The original variant names and IDs remain; no instances were detached.

## Application integration

AttachmentCard is an application composition; the theme supplies CSS recipes, not a React AttachmentCard export. Use these classes with the application's existing file glyph and controls:

| Class | Element |
| --- | --- |
| `DsAttachmentCard` | Card wrapper |
| `DsAttachmentCard-File` | Existing file glyph wrapper |
| `DsAttachmentCard-Content` | Name/metadata stack |
| `DsAttachmentCard-Name` | Name with accessible full text/tooltip |
| `DsAttachmentCard-Metadata` | File size or other metadata |
| `DsAttachmentCard-Actions` | XS Button controls |
| `DsFileCheckbox` | Standalone Consta Checkbox using these styles |

Within `DsAttachmentCard`, ordinary Consta Checkbox also receives the file checkbox style. Use `<Button size="xs" onlyIcon iconLeft={...} />` for actions and provide an accessible label/title. The application owns selection, indeterminate state, opening, editing, deletion and download handlers. Apply `width: 100%` on the card when a responsive parent should determine its width.

## Verification

After rebinding, the three card variants contain no unbound visible solid paints. Existing text styles and 48px geometry were preserved. A separate component snapshot is stored at `tokens/components/attachment-card.json`. Theme token values are unchanged.
