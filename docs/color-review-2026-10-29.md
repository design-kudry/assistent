# Color review — home display settings and Form controls

Reviewed on 2026-10-29.

| Area | Figma ID | Checked visible nodes | Result |
| --- | --- | ---: | --- |
| Home with assistant display settings | `22589:111153` | 187 | 33 old/raw paints replaced |
| Home with settings tooltip | `22589:110806` | 98 | 1 old text paint replaced |
| Form controls | `21295:22654` | 67 | Native Select retained; three arrow bindings use the correct placeholder role |

## Existing roles used

- Dialog surface: `color/background/surface`.
- Assistant labels: `color/text/primary`.
- Drag handles: `color/control/default`.
- Enabled primary Switch: `color/action/primary/background` and `color/text/on-accent`.
- Disabled-position (unchecked, enabled) Switch outline and thumb: `color/border/default`. This follows Consta's primary Switch CSS and the approved 16% global border; it is not a new disabled-state design.
- Tooltip text: `color/text/on-accent`. Its existing neutral background remains `color/status/neutral/background` in both themes.
- Enabled Select/Combobox arrows: `color/text/placeholder`, replacing the disabled-icon role without changing their rendered color.

No new colors were created. Heading text, typography, layout and screen content were not changed. No remaining raw or remote visible interface solid paints were found on the two screens. The Form controls documentation badges and editorial outlines retain the same artwork/appearance as other DS sections; they are not application controls.

## Native Select correction

The supplied instance `22589:109289` remains linked to Consta source `22589:109265`, inside Form controls at the user's position (64, 384). Its field is 36px with a 12px radius. The separate custom family `22593:12286` and its unnecessary showcase are removed from the canvas. No replacement Select component or local palette was created. The React example already uses `@consta/uikit/Select`.

These screens are application layouts, not standalone React components shipped by this theme package. Existing theme variables already supply the Switch and Tooltip colors; no extra component CSS is necessary for this color correction.
