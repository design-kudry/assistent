# Tabs

[Figma Tabs](https://www.figma.com/design/686IP0J8jTGiix3IXVcA45?node-id=21632-60004) · [Tabs/Modules](https://www.figma.com/design/686IP0J8jTGiix3IXVcA45?node-id=21632-59899)

Checked on 2026-10-23. Existing component IDs and instance links are preserved. No color variables were created.

| Element | Figma variable | CSS token |
| --- | --- | --- |
| Inactive text | `color/text/secondary` | `--gpn-ai-text-secondary` |
| Active text and underline | `color/action/primary/background` | `--gpn-ai-action-primary-background` |
| Shared baseline | `color/border/default` | `--gpn-ai-border-default` |
| Label style | `Typography/Body/Dense` | `--gpn-ai-body-dense-*` |

Inactive text: Light #102A3A at 70%, Dark #9BAFBF. Accent: #008EFA in both themes. Baseline: Light #102A3A at 8%, Dark #E5EDF5 at 8%. Do not multiply token opacity again.

The horizontal size S tab is 36px high with Inter Regular 14/19.6, no background, 12px right padding and no extra inter-item margin. The active underline is 2px high and follows the text width, excluding the right padding. The common baseline is 1px. The Figma 432px width is an example container width.

```tsx
import { Tabs } from '@consta/uikit/Tabs';
const items = [{ label: 'Чаты' }, { label: 'Настройки' }, { label: 'База знаний' }];
// Keep items outside render or memoize them; store the selected item in state.
<Tabs size="s" view="bordered" items={items} value={activeTab} onChange={setActiveTab} />
```

Both presets load these styles automatically. Consta handles switching and overflow. Disabled tabs retain Consta's existing disabled token; hover uses the existing accent. Hover/disabled variants were not added to the Figma component set. A visible keyboard focus outline is retained in code.

Validation: Consta 5.33.3, Light/Dark active and inactive colors, shared baseline, 36px tab height, 14px label and 2px active underline; mouse switching. Text style and colors in Figma now use local semantic tokens instead of remote Consta tokens.
