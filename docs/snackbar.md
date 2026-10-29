# Snackbar and status colors

Source: [Snackbar](https://www.figma.com/design/686IP0J8jTGiix3IXVcA45?node-id=22475-94248). Reviewed 2026-10-28.

| Figma status | Consta status | Background in both themes | Content |
| --- | --- | --- | --- |
| Neutral | system (normal also uses this fill) | #426A80 | white |
| Success | success | #24C38E | white |
| Warning | warning | #F38B01 | white |
| Error | alert | #FE4343 | white |

The neutral background stays dark in Dark mode. Action buttons use the existing pale neutral at 20% opacity, white text, size S (36px), and round form. The countdown has a 16% white track and a white ring/counter. Component IDs and links are preserved.

## Shared roles

Use `--gpn-ai-status-{status}-background` with `--gpn-ai-status-{status}-on-background` for filled messages. Use `--gpn-ai-status-{status}-text` for validation text, outlines and icons on ordinary surfaces. The text role has a lighter Dark value; the filled background must not be used as small error text.

Consta `--color-typo-alert`, `--color-typo-warning` and `--color-typo-success` map to these text roles. Existing `color/text/danger` remains available for earlier uses. Info roles are exported for informational feedback; the approved Snackbar set has four variants.

The theme styles the real Consta SnackBar and its nested action Buttons/Timer. No custom React Snackbar is exported. The application owns messages, actions, timers and dismissal.

```tsx
<SnackBar
  form="round"
  items={[{
    key: 'delete',
    status: 'system',
    message: 'Deleting chats',
    autoClose: 5,
    showProgress: 'timer',
    actions: [{ label: 'Undo', onClick: undoDelete }],
  }]}
/>
```

The approved vivid fills and white content are copied exactly from Figma. They are not the same as the more contrasting validation text colors. Exploratory concept frames are not part of this export.

## Typography

Message: `Typography/Body/Message`, Inter Regular 16/22.4. Timer counter: `Typography/Caption/Counter`, Inter Bold 12/24. These roles preserve the existing Figma typography. The Consta overrides apply the same metrics; action labels keep Body/Regular 14/21.
