# Select

[Figma component](https://www.figma.com/design/686IP0J8jTGiix3IXVcA45/Assistant?node-id=22593-12286).

Select chooses one option from a list. Use Combobox when the user also needs to type and filter options. Both share the same field appearance in this theme.

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

The popup reuses the existing ComboboxList style; do not build a second palette or duplicate its item component. Consta owns opening, closing, selection, keyboard navigation and disabled behavior. See [ThemePreview](../examples/ThemePreview.tsx) for working examples.

| Figma | Consta |
| --- | --- |
| View=Default | Default view |
| View=Clear | `view="clear"` |
| Content=Value | Non-null `value` |
| Content=Placeholder | `value={null}` and `placeholder` |
| Label / Placeholder | `getItemLabel` / `placeholder` |

Field: height 36px, radius 12px, left inset 8px, 36px dropdown-indicator area with 16px icon. Typography: Inter Regular 14/21, vertically centered. Default uses Surface and the approved 16% global border; Clear has no fill or border. Values use primary text, placeholder and arrow retain their existing placeholder roles. Hover, focus and disabled inherit the existing Consta theme tokens. Figma documents four base combinations; runtime hover/focus/disabled behavior is checked in the browser rather than represented as new Figma variants.

## How updates work

CSS styles matching DOM classes inside the Theme wrapper and themed Consta portals. It does not edit Figma, switch one React component into another, or rebuild all application components. A border token change affects every element using that token; a Select-specific rule affects only Select. Figma source components and variables update their linked instances separately. To update another Figma file, publish the private library update and accept it in the consuming file; publishing is not performed by this code change and does not change file-sharing permissions.

No existing components were detached or replaced, and no new colors were added.
