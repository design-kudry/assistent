# ComboboxList

Source: [Figma section](https://www.figma.com/design/686IP0J8jTGiix3IXVcA45/Assistant?node-id=21272-18933). Reviewed on 2026-10-29.

Use Consta 5.33.3 `Combobox` with `size="s"` and `dropdownClassName="DsComboboxList"`. The class must be on the dropdown because it is rendered through a portal. Other dropdowns keep their existing styles.

| State | Label and leading icon | Background |
| --- | --- | --- |
| Default | `color/text/primary` | Transparent |
| Selected (`activ=On`) | Existing primary action accent | Transparent |
| Hover or keyboard highlight | Keep current label color | `color/navigation/item/background-active` |

The selected state does not add a side stripe or a blue fill. Selection and hover are independent: a selected item can also be highlighted. These combinations use the same existing roles; the Figma set currently documents three variants.

The popup uses Surface, the existing context menu border and list shadow, 16px radius and 8px padding. Plain items have a minimum height of 36px, 8px horizontal padding and 12px radius. Popup width follows the field; the Figma 285px width is an example, not a fixed application width. Keep scrolling enabled.

## Text module

`Text` (`3885:32503`) stacks a title and description with a 4px gap. The title uses `Typography/Body/Compact-Regular` (14px / 16.8px, Regular); the description uses `Typography/Caption/Compact` (12px / 14.4px, Regular) and `color/text/secondary`, including in selected items. The Figma text block has 4px vertical padding inside an item with another 4px, giving 8px total. A description row grows naturally; do not force it into 36px.

For descriptions, pass a `renderItem` that renders Consta `ListItem` with class `SelectItem`. Its label contains `.DsComboboxList-Text` and `.DsComboboxList-Description`. Forward `ref`, `onClick`, `onMouseEnter` and `hovered` from Consta, and map `active` to `aria-selected` and `checked`. These callbacks preserve keyboard selection and scrolling. For disabled items, forward `disabled` and `aria-disabled`; do not attach an enabled click handler.

See the runnable [ThemePreview](../examples/ThemePreview.tsx) for the complete render function and theme switch. Icons inherit the item color through `currentColor`. Optional counters use `color/text/tertiary`; optional checkboxes keep their own Empty/Check/Intermediate state and are not selected merely because `activ=On` is set. Use the existing file checkbox styling when a checkbox is needed.

No new colors or typography tokens are introduced. Documentation layout changes in Figma preserve all existing component IDs and instances.
