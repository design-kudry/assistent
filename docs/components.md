# Компоненты: подробности

Заметки по каждому компоненту темы. Как подключить тему — в [README](../README.md).

## Button hover

Existing `Hover=on` variants in Figma now use semantic colors in both themes. The Light/Dark color reference includes examples.

- Primary: background `#33A5FB`; white label and icons remain unchanged.
- Secondary: border, label and icons `#33A5FB`; background stays transparent.
- Ghost: neutral background at 8% opacity.
- Clear: neutral background at 6% opacity.

Light neutral is `#102A3A`, Dark neutral is `#E5EDF5`. Tokens are under `color/action/{primary,secondary,ghost,clear}` with the `-hover` suffix. Consta hover variables reference these tokens directly. Disabled variants keep their existing appearance.

## Compact buttons and read-only notice

Figma `Button/XS` includes all 24 variants: Primary, Secondary, Ghost and Clear; text and icon-only; default, disabled and hover. Existing Button components are preserved.

Use `<Button size="xs" />`: height 24px, text 12/16.8px, horizontal padding 10px and icon gap 8px. Icon-only buttons are 24 × 24px. Hover colors are shared with the regular buttons.

The read-only notice on frame `21423:193998` uses existing semantic tokens: Surface for the base, `color/badge/accent/background` for the tint, `color/border/default` for the border, `color/text/primary` for text and `color/action/primary/background` for the icon. Both Light and Dark are supported. Its text, geometry and component link are preserved.

## Combobox variants

Design note updated on 2026-10-23. Source: [Combobox in Figma](https://www.figma.com/design/686IP0J8jTGiix3IXVcA45?node-id=21617-100922).

The component set now contains `View=Default` (`21276:144886`) and `View=Clear` (`21617:100923`).

| Property | Default | Clear |
| --- | --- | --- |
| Height | 36px | 36px |
| Example width | 375px | 375px |
| Input radius | 12px | 12px |
| Background | `color/background/surface` | None; parent background remains visible |
| Border | `color/border/default` | None |
| Text | `color/text/placeholder` | `color/text/secondary` |
| Caret | `color/icon/disabled` | `color/text/secondary` |
| Typography | `Typography/Body/Regular`, Inter 14/21 | Same |
| Input left padding | 8px | 0px |
| Text wrapper right padding | 8px | 10px |
| Caret button / icon frame | 36×36px / 16×16px | Same |

Implementation notes:

- Use the existing small Combobox size (`size="s"`, 36px). The 375px width is the Figma example width; adapt width to the container.
- Clear is a visual variant, not a disabled state and not a clear-value button. Keep Combobox selection, search, keyboard navigation and visible focus treatment.
- Clear text and caret share `--gpn-ai-text-secondary`; resolve colors through the active theme instead of hardcoding light values.
- This entry records the two shown Figma variants. Hover, focus, open and disabled appearances are not specified by these two examples.
- Documentation only: this change does not add a CSS class, change the exported theme or claim that a Consta prop reproduces the custom Clear styling. Apply the documented styling in the application when implementing this variant.

## ChoiceGroup: matching Figma

Use `<ChoiceGroup size="s" view="secondary" className="DsChoiceGroup_secondary2" ... />` for Secondary 2. The class changes the selected item to a light/dark blue tint with a 1px accent border and accent text/icons. Without this class, `view="secondary"` keeps the standard outlined selected variant.

The theme also supplies the subtle group background, removes the outer Consta outline and uses round 4×4px dividers for the default rounded form. Height is 36px, text is 14/32 and horizontal label padding is 20px. Use `width="full"` only when the layout calls for stretched items. Explicit `form="brick"` keeps its square geometry.

Use the presets from this repository: loading only exported color variables does not load component CSS. [Component audit and implementation boundaries](component-audit-2026-10-23.md).

## Gravity UI Icons

Основной набор новых иконок — [Gravity UI Icons](https://github.com/gravity-ui/icons), пакет `@gravity-ui/icons@2.23.0` (MIT). Зависимости входят в пакет темы. Gravity UI Kit для этого не нужен.

Тема экспортирует адаптированные `IconPlus`, `IconSearch`, `IconChevronDown`, `IconClose` и функцию `createGravityIcon`. Адаптер сохраняет Consta API: `size`, `view`, `className`, `ref`; SVG использует `currentColor` и переключает цвет вместе с темой.

```tsx
import { Button } from '@consta/uikit/Button';
import { IconPlus, createGravityIcon } from '@design-kudry/gpn-ai-theme';
import Folder from '@gravity-ui/icons/Folder';

// Создавайте адаптер один раз, вне рендера компонента.
const IconFolder = createGravityIcon('Folder', Folder);
<Button size="s" iconSize="s" iconLeft={IconPlus} label="Добавить" />
<Button size="xs" iconLeft={IconFolder} label="Проект" />
```

Размеры иконок Consta: `xs` — 12px, `s` — 16px, `m` — 24px, `l` — 32px. У Button размер иконки задавайте через `iconSize`; у компактной кнопки XS оставляйте 12px. Импорт конкретной иконки по пути уменьшает зависимость от tree shaking.

Этот экспорт позволяет использовать Gravity в доступных иконковых слотах. Встроенные SVG внутри контролов Consta не заменяются автоматически; их замена требует отдельного слота или компонента приложения.

## Combobox без разделителя

Тема скрывает `.Select_type_combobox .Select-Delimiter`: между полем и стрелкой нет вертикальной линии. Очистка, стрелка, поиск и внешний контур поля сохраняются. Оба варианта Combobox в Figma уже не содержат такого разделителя.

## Чекбоксы списка чатов

Поместите чекбоксы списка чатов в контейнер `className="DsChatList"`. Внутри него чекбокс остаётся без заливки, с обводкой `--gpn-ai-border-default`; выбранное состояние показывает нейтральную галочку `--gpn-ai-control-default`. Обычные чекбоксы в других частях приложения сохраняют свои настройки. Новые цветовые токены для этого не создавались.

## Tabs

Новый компонент Tabs использует существующие цвета темы: неактивный текст — `text/secondary`, активный текст и линия — акцент, общая линия — `border/default`. Для Consta используйте `<Tabs size="s" view="bordered" ... />`. Размер S: высота 36px, текст Inter 14/19.6, отступ справа 12px, активная линия 2px. [Спецификация и пример](tabs.md).

## TextArea

Используйте `<TextField className="DsTextArea" type="textarea" size="s" rows={1} ... />`. Начальная высота поля — 100px, радиус — 12px, текст — 14/21, внутренние отступы — 8px. Подпись использует secondary, ввод — primary, счётчик справа — tertiary и 12/18. Цвета переключаются с темой. Счётчик передавайте через `caption` и обновляйте из значения поля. [Описание и пример](text-area.md).

## AttachmentCard and file selection

Обновлённые карточки файлов: 248×48px, радиус 12px, отступы 8px, иконка 24×28px, текст Caption/Compact 12/14.4, три кнопки XS по 24px. Для вёрстки приложения добавлены классы `DsAttachmentCard-*` и `DsFileCheckbox`. Пустой чекбокс — нейтральная обводка; выбранный и промежуточный — голубой фон и белая галочка/черта. Цвета Doc/Xls/png используют существующие file-токены. [Состав, цвета и интеграция](attachment-card.md).

## Snackbar

Approved status colors, dark mode and action buttons are described in [docs/snackbar.md](snackbar.md). Use the existing Consta SnackBar; no replacement component is required.


### DS review — 2026-10-29

[Current component review](component-audit-2026-10-29.md) covers 46 families and their variants, including optional hidden parts. The machine-readable snapshot is [component-inventory.json](../tokens/components/component-inventory.json).

`typography.bodyMessage` maps to Inter Regular 16/22.4; `typography.captionCounter` maps to Inter Bold 12/24. Existing heading styles and dimensions are preserved.

The existing Figma search shadow is exported as `--gpn-ai-shadow-search`: use `box-shadow: var(--gpn-ai-shadow-search)` on the search panel. Its two color roles switch with Light/Dark. Importing the theme does not build the application panel.

### Select

Figma uses the existing [Consta Select instance](https://www.figma.com/design/686IP0J8jTGiix3IXVcA45?node-id=22589-109289), with its library connection preserved. The unnecessary custom Figma family has been removed. It is in Form controls and its field is 36px, matching the website theme and Combobox.

Use Consta `<Select size="s" dropdownClassName="DsComboboxList" />`. It shares the Combobox field height (36px), radius (12px), Surface, default border (16%) and existing hover/focus/disabled tokens. `view="clear"` removes the field surface and border. [Select guide and Figma variants](select.md).

Select chooses a value from a list; Combobox also lets the user type to filter. The shared dropdown class gives the list the existing DS appearance. CSS applies only to matching elements inside the installed Theme, including Consta themed portals. It neither edits Figma nor automatically recreates product layouts or replaces components. Figma instances update through their source components and variables.
