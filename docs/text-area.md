# TextArea

Source: [Figma instance 21932:182684](https://www.figma.com/design/686IP0J8jTGiix3IXVcA45?node-id=21932-182684). Reviewed 2026-10-26.

The linked node is an instance of a textarea, not a new local component set. Its instance link, text and geometry are preserved. Existing variables and text styles are reused; no colors or styles were created.

| Element | Existing Figma role | Text style |
| --- | --- | --- |
| Input surface | `color/background/surface` | — |
| Border | `color/border/default` | — |
| Entered text | `color/text/primary` | `Typography/Body/Regular` (14/21) |
| Label | `color/text/secondary` | `Typography/Body/Regular` (14/21) |
| Help and resize icons | `color/icon/secondary` | — |
| Character count | `color/text/tertiary` | `Typography/Caption/Relaxed` (12/18) |

The field is 100px high initially, with a 12px radius and 8px input padding. Label and counter gaps are 4px. The source instance is 816px wide and 147px high including label/counter; width follows the application container. Long text scrolls within the textarea. The resize handle allows vertical resizing.

## Consta usage

```tsx
import { useState } from 'react';
import { TextField } from '@consta/uikit/TextField';

const limit = 5000;
const [value, setValue] = useState<string | null>('');

<TextField
  className="DsTextArea"
  type="textarea"
  size="s"
  rows={1}
  label="Промпт для ответов"
  value={value}
  onChange={setValue}
  maxLength={limit}
  caption={`${value?.length ?? 0}/${limit}`}
/>
```

`DsTextArea` is an opt-in theme class. It applies the source field's minimum height, spacing, label, body and right-aligned counter styles. `rows={1}` lets the 100px minimum determine the initial height; a larger rows value can intentionally increase the field. Counter content and its limit belong to the application, not to a color token. An optional help tooltip is also application content.

Default TextField focus, error and disabled behavior stays with Consta. Disabled input color is not overridden. Do not pass helper errors as the counter caption if the application needs separate error text: render the counter and error separately in that case.

## Verification

- Every visible solid fill/stroke in the Figma instance now has a local semantic color binding.
- Dark theme screenshot checked; original inherited mode restored.
- Real Consta 5.33.3 checked in Light and Dark: input background and text, secondary label, 100px initial field, 21px line height, vertical resize, value editing and live counter update.
