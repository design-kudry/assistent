# Tables

Use the existing `Table` from `@consta/uikit/Table` (5.33.3). Add `DsTable` to opt into these styles.

```tsx
import { Table } from '@consta/uikit/Table';

// rows and columns come from the application; no data or behavior is added by CSS.
<Table
  className="DsTable DsTable_assistants"
  rows={rows}
  columns={columns}
  size="s"
  verticalAlign="top"
  borderBetweenRows
  borderBetweenColumns
/>
```

| Variant | Class | Minimum body row height |
| --- | --- | --- |
| Dislike categories | DsTable | 40px |
| Assistant management | DsTable DsTable_assistants | 62px |
| Prompt catalog | DsTable DsTable_prompts | 112px |

Header minimum height is 40px. Body cells have 8px vertical and 12px horizontal padding. Long content can increase the row height. Keep text wrapping enabled in the column settings when the full value should be shown.

The container uses the current reference radius of 20px, AI Surface and border/default. Header text is Inter Semi Bold 14/19.6, with its original case. Body text is Inter Regular 14/21. Hover uses the existing AI navigation background. Light/Dark colors come from the active AI theme; no new colors are introduced.

Figma sources:
- [Reference screen](https://www.figma.com/design/686IP0J8jTGiix3IXVcA45/Assistant?node-id=22739-170088)
- [Assistant management scenario](https://www.figma.com/design/686IP0J8jTGiix3IXVcA45/Assistant?node-id=22739-167182)
- [Table components](https://www.figma.com/design/686IP0J8jTGiix3IXVcA45/Assistant?node-id=6156-103451)

The existing Header/Row components remain linked. CSS provides appearance only: application code still owns columns, row data, copying an ID, visibility switches, navigation, preview and editing. Render existing Button and Switch components inside cells as needed. Badge styling is independent.

Verified against the native Table, TableCell and TableHeader CSS and Table props shipped in @consta/uikit 5.33.3. Selector names and border props match that version. The current package remains a theme, not a complete table implementation.
