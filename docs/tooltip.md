# Tooltip

Source: [Tooltip in Figma](https://www.figma.com/design/686IP0J8jTGiix3IXVcA45?node-id=22791-254720). Reviewed 2026-11-03.

Use the native `@consta/uikit/Tooltip`. Both AI presets load these styles automatically, including tooltips rendered through Consta's theme portal. No replacement React component is needed.

| Figma status | Native status prop | Background in Light and Dark |
| --- | --- | --- |
| default | omit status | neutral / #426A80 |
| normal | normal | neutral / #426A80 |
| alert | alert | error / #FE4343 |
| success | success | success / #24C38E |
| warning | warning | warning / #F38B01 |

Body and arrow use the same existing AI status background. Text and icons use on-accent white. Consta's inverted default theme must not turn the neutral tooltip into a white surface.

Body: Inter Regular 12/18, `Typography/Caption/Relaxed`. Title: Inter Bold 12/18, `Typography/Caption/Strong`. Existing Figma strings and their case are preserved. Content padding is 8px, title gap 4px, action gap 8px, radius 12px, shadow `Effects/Shadow/Popover`.

Native sizes remain S 150px, M 260px and L 400px maximum content width. Direction and arrow positioning remain native. Figma shows four body directions with five statuses each, plus three body sizes and arrow alignment parts.

Actions match Snackbar: Ghost, S, round, 36px height, 14/21 Regular, white text and the existing pale neutral at 20% opacity. Hover keeps this fill; keyboard focus has a white outline. Small tooltips stack actions vertically.

```tsx
import { Tooltip } from '@consta/uikit/Tooltip';
import { Button } from '@consta/uikit/Button';

<Tooltip
  isOpen={isOpen}
  anchorRef={anchorRef}
  size="l"
  status="success"
  direction="downRight"
  isInteractive
  onClickOutside={() => setIsOpen(false)}
>
  <div className="DsTooltipTitle">{title}</div>
  <div className="DsTooltipBody">{description}</div>
  <div className="DsTooltipActions">
    <Button size="s" view="ghost" form="round" label={actionLabel} onClick={onAction} />
    <Button size="s" view="ghost" form="round" label={closeLabel} onClick={() => setIsOpen(false)} />
  </div>
</Tooltip>
```

Set `isInteractive` for action buttons. The application owns visibility, anchoring, labels, actions and dismissal. The optional content classes above arrange existing children; they do not introduce new colors or a new Tooltip API.
