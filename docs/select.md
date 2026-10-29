# Select — Consta

Use the existing [Consta Select instance](https://www.figma.com/design/686IP0J8jTGiix3IXVcA45/Assistant?node-id=22589-109289). It remains linked to the Consta UI-Kit component set `22589:109240`; its current source variant is `22589:109265` (`Size=S, Label=Top`). There is no new local Select component or custom React implementation. The earlier custom family and its unnecessary showcase were removed. The supplied native instance is in the user's Form controls section (`21295:22654`); its ID and library connection are preserved.

Select chooses an option from a list. Combobox also accepts typed input for filtering. The website already uses the standard `@consta/uikit/Select`.

```tsx
import { Select } from '@consta/uikit/Select';

<Select
  size="s"
  items={items}
  value={value}
  onChange={setValue}
  placeholder="Choose an option"
  dropdownClassName="DsComboboxList"
/>
```

The popup reuses the existing ComboboxList style. Consta owns opening, closing, selection, keyboard navigation and disabled behavior. See [ThemePreview](../examples/ThemePreview.tsx) for working examples.

## Figma settings

The original instance keeps its native properties: Size (XS/S/M/L), Label (None/Top/Left), and Caption. There are no invented Content, Label-text, or Placeholder-text properties on a replacement component. Edit the existing text layers. Default/Clear is a nested Modules/Input option in the Consta model. The original instance keeps the user's label/caption visibility configuration.

Existing DS variables are bound to Surface, border/default (16%), primary/placeholder text, secondary label, tertiary caption, and the placeholder indicator. Radius is 12px. Body and label use Body/Regular 14/21; caption uses Caption/Relaxed 12/18. No palette was added.

## Geometry

The current instance has a 36px field, matching the website theme and Combobox. Its radius is 12px. It remains a native Consta instance; no local replacement Select component is created. The original Consta Size/Label/Caption API is preserved.

## How updates work

CSS applies to matching DOM elements inside Theme and themed Consta portals. A shared token affects all its consumers; a Select-specific rule affects Select. CSS does not modify Figma or replace components. Figma instances update through their linked source components and variables. Changing overrides on this native instance does not edit the upstream Consta library or automatically theme every other Consta instance.

No library publication or sharing changes are performed by this update.
