# Status badges

Source: [Figma Badge](https://www.figma.com/design/686IP0J8jTGiix3IXVcA45/Assistant?node-id=22704-165394). Reviewed on 2026-11-02.

Use the existing Consta `Badge` with the opt-in `DsStatusBadge` class. Other Consta badges and `DsPromptBadge` keep their current styles.

```tsx
import { Badge } from '@consta/uikit/Badge';

const status = 'success' as const;
<Badge
  className="DsStatusBadge"
  status={status}
  data-status={status}
  size="s"
  view="tinted"
  form="default"
  label="статусный бейдж"
/>;
```

Pass the same value to `status` and `data-status`. Consta 5.33.3 resolves status through inline CSS variables and does not render a status class. The theme uses the supported `--badge-*-color-prop` overrides. No replacement React component is required.

| Figma status | Consta status / data-status |
| --- | --- |
| System | system |
| Normal | normal |
| Success | success |
| Warning | warning |
| Error | alert |
| disabled | disabled |

The family has 36 unique combinations: three views (Filled, Stroked, Tinted), two forms (Default, Round), six statuses. The duplicate names were corrected and the top Tinted group now uses Default form.

Text content, uppercase presentation, Inter Medium 10px and 20px line height are preserved. The local style is `Typography/Micro/Badge-Medium`. Height is 20px; Default radius is 8px and Round uses the existing pill radius.

System uses the existing AI `color/background/subtle` role for Filled and Tinted, with AI secondary text and icons. Colored backgrounds and foregrounds use the existing bright status background roles; muted validation text colors are not used for these badges. Filled colored badges use white text and icons. Stroked uses the exact same bright status background role for the border, label and icons, including System and disabled. Tinted uses Surface plus 10% of the status fill (System uses the AI subtle role directly). Disabled uses existing disabled roles. No new colors were added.

All variants retain their nested Consta instances. Library publication is separate from saving these edits. The existing v2.0.0 release tag is unchanged; these additions are in main.

Validation: all 36 variant keys are unique; text content and 10/20 Medium metrics are preserved; visible paints are variable-bound; native Badge 5.33.3 source maps and CSS override hooks were inspected.
