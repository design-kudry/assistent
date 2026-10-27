# Тема gpn.ai для Consta

Светлый и тёмный пресеты для `@consta/uikit@5.33.3`: цвета, шрифт, размеры, отступы, тени, типографика и настройки компонентов из макетов Figma.

Здесь описано **текущее состояние** темы. Что менялось от версии к версии и что нужно поправить в приложении при обновлении — в [CHANGELOG.md](CHANGELOG.md).

## Быстрый старт

### 1. Установка

```sh
npm install github:design-kudry/assistent#v1.0.0
```

Указывайте тег версии (`#v1.0.0`), а не ветку: так тема не поменяется у вас без ведома. Чтобы обновиться, смените тег и прочитайте раздел этой версии в CHANGELOG.

Пакет ставит исходники на TypeScript и CSS. Vite собирает их без настроек. В Next.js добавьте `transpilePackages: ['@design-kudry/gpn-ai-theme']` в `next.config.js`. В webpack убедитесь, что TS-загрузчик и CSS-загрузчик обрабатывают этот пакет в `node_modules`.

### 2. Подключение

```tsx
import { Theme } from '@consta/uikit/Theme';
import { presetGpnAiLight, presetGpnAiDark } from '@design-kudry/gpn-ai-theme';

export function App({ dark = false }) {
  return (
    <Theme preset={dark ? presetGpnAiDark : presetGpnAiLight}>
      {/* компоненты приложения */}
    </Theme>
  );
}
```

Пресет сам подключает весь CSS темы: цвета, шрифты Inter, размеры, настройки компонентов, типографику и переменные `--gpn-ai-*`. Ничего дополнительно импортировать или копировать не нужно.

### 3. Версия Consta

Тема рассчитана на `@consta/uikit` **5.33.3** и проверяется на ней. Часть настроек обращается к внутренним классам компонентов Consta (`.Button_size_s`, `.ChoiceGroup-Label`, `.ListBox`). Если обновить Consta отдельно от темы, эти настройки могут перестать работать без ошибок в консоли. Обновляйте Consta только вместе с версией темы, в которой это указано.

## Компоненты

| Элемент Figma | Как писать в коде | Что применяет тема |
| --- | --- | --- |
| Button | `<Button size="s" />` | Высота 36px, текст 14/21, круглые углы, отступ по бокам 16px |
| TextField, Combobox, AutoComplete | `size="s"` | Высота 36px, радиус 12px, текст 14px |
| ChoiceGroup | `size="s"` | Высота 36px, круглые элементы, отступы 20px, интерлиньяж 32px |
| ChoiceGroup / View=Secondary 2 | `view="secondary" className="DsChoiceGroup_secondary2"` | Фон выбранного пункта `--gpn-ai-control-background-selected` (#DFF1FF / #173D59), синяя рамка 1px, синий текст и иконки |
| Выпадающий список | обычный, без пропсов | Радиус 20px, фон, граница и тень List |
| Бейдж карточки запроса | `<Badge className="DsPromptBadge" />` | Высота 24px, текст 12/24, Semi Bold |
| Текст | `<Text className={typography.bodyRegular} />` | Стиль из Figma, см. «Типографика» |

- Размер `s` у **всех** контролов Consta — 36px. Размеры `xs`, `m`, `l` остались 24, 40, 48px.
- Явно заданные формы (`form="brick"` и другие) работают как обычно.
- Цвета hover, focus, disabled задаёт тема; поведение и клавиатура остаются у Consta.
- Тень списка подключена только к ListBox, модальные окна её не получают.

Рабочий пример с переключением темы и всеми настроенными контролами — [examples/ThemePreview.tsx](examples/ThemePreview.tsx).

### Что тема не делает

Composer, Menu, Sidebar, Card/Assistant, Card/Prompt, PromptCatalog/Toolbar, Pagination — это вёрстка приложения. Тема даёт для них токены (раздел «Продуктовые переменные»), но разметку, размеры и расположение делает приложение.

## Типографика

```tsx
import { typography } from '@design-kudry/gpn-ai-theme';

<Text as="h1" className={typography.headingM}>Каталог ассистентов</Text>
<Text className={typography.bodyRegular}>Описание</Text>
```

`typography` содержит все 26 текстовых стилей Figma. Имя в коде повторяет имя стиля: `Typography/Heading/M` → `typography.headingM`, `Typography/Body/Compact-Regular` → `typography.bodyCompactRegular`. Выбирайте стиль по роли текста, а не по размеру: стили одного размера отличаются весом и интерлиньяжем.

| Стиль | Размер / интерлиньяж, вес |
| --- | --- |
| `headingM` | 24 / 36, Medium |
| `headingS` | 20 / 30, Bold |
| `headingXs` | 16 / 24, Medium |
| `captionBadge` | 12 / 24, Semi Bold |
| `microBadge` | 10 / 20, Semi Bold |

Точные значения остальных стилей указаны в описании каждого стиля в Figma и в `tokens/figma-styles.json`.

Если нужен отдельный параметр стиля, у каждого есть переменные `--gpn-ai-{категория}-{роль}-{size,line-height,font-weight,font-style}`:

```css
.PromptBadge {
  font-size: var(--gpn-ai-caption-badge-size);
  line-height: var(--gpn-ai-caption-badge-line-height);
  font-weight: var(--gpn-ai-caption-badge-font-weight);
}
```

Не меняйте глобальную шкалу Consta ради одного места — используйте эти переменные на нужном элементе.

## Продуктовые переменные

Значения, которых нет в стандартной теме Consta. Все переменные переключаются вместе со светлой и тёмной темой.

| Назначение | Переменные |
| --- | --- |
| Фоны | `--gpn-ai-background-page`, `-surface`, `-subtle`, `-list`, `-overlay` |
| Текст | `--gpn-ai-text-primary`, `-secondary`, `-tertiary`, `-strong`, `-placeholder`, `-danger`, `-disclaimer`, `-on-accent` |
| Границы | `--gpn-ai-border-default`, `-composer`, `-context-menu` |
| Навигация | `--gpn-ai-nav-active-bg`, `--gpn-ai-nav-active-text` |
| Control | `--gpn-ai-control-default`, `-background-selected`, `-disabled-background` |
| Статусы | `--gpn-ai-status-success-text`, `-success-background` |
| Файлы | `--gpn-ai-file-doc-background`, `-pdf-`, `-image-`, `-spreadsheet-`, `-text-background`, `--gpn-ai-file-card-border` |
| Тени | `--gpn-ai-shadow-card`, `-popover`, `-list` |
| Свечения | `--gpn-ai-glow-home`, `-chat`, `-project`, `--gpn-ai-catalog-glow` |
| Градиенты | `--gpn-ai-haze` (сверху), `--gpn-ai-haze-bottom` (снизу) |
| Радиусы | `--gpn-ai-radius-4` … `-32`, `-999` |
| Отступы | `--gpn-ai-space-4` … `-40` |

Полный список — в `_extensions/Theme_extensions_gpnAi.css`. Тени темы не заменяют глобальные `--shadow-layer` и `--shadow-modal` Consta.

### Примеры

```css
/* Поле ввода и свечения: одно свечение на элемент, не складывайте несколько */
.Composer {
  background: var(--gpn-ai-background-surface);
  border-color: var(--gpn-ai-border-composer);
}
.Composer:has(:focus-visible) {
  outline: 2px solid var(--color-control-bg-border-focus);
  outline-offset: 3px;
}
.ComposerHome { box-shadow: var(--gpn-ai-glow-home); }       /* шире всех */
.ComposerChat { box-shadow: var(--gpn-ai-glow-chat); }       /* ближе к полю */
.ComposerProject { box-shadow: var(--gpn-ai-glow-project); } /* компактнее */

/* Навигация */
.Sidebar { background: var(--gpn-ai-background-surface); }
.NavItemActive {
  color: var(--gpn-ai-nav-active-text);
  background: var(--gpn-ai-nav-active-bg);
}
.AiDisclaimer { color: var(--color-typo-ghost); }

/* Контекстное меню */
.ContextMenu {
  background: var(--gpn-ai-background-list);
  border-color: var(--gpn-ai-border-context-menu);
  box-shadow: var(--gpn-ai-shadow-list);
}

/* Затухание шапки и подвала чата, фон модального окна */
.ChatHeader { background: var(--gpn-ai-haze); }
.ChatFooter { background: var(--gpn-ai-haze-bottom); }
.ModalBackdrop {
  background: var(--gpn-ai-background-overlay);
  opacity: 1; /* прозрачность уже внутри токена, не добавляйте свою */
}
```

### Свечение каталога

Свечение рисуется отдельным слоем позади контента. Размытие применяется к слою, а не к содержимому.

```css
.Catalog { position: relative; isolation: isolate; overflow: hidden; }
.Catalog::before {
  content: ''; position: absolute; z-index: -1; pointer-events: none;
  left: 50%; top: var(--gpn-ai-catalog-glow-top);
  width: min(var(--gpn-ai-catalog-glow-width), 110%);
  height: var(--gpn-ai-catalog-glow-height);
  transform: translateX(-50%);
  background: var(--gpn-ai-catalog-glow);
  filter: blur(var(--gpn-ai-catalog-glow-blur));
}
```

### Устаревшие имена

Эти переменные работают, но в новом коде используйте замену:

| Старое имя | Замена |
| --- | --- |
| `--gpn-ai-background-sidebar`, `--gpn-ai-bg-sidebar` | `--gpn-ai-background-surface` |
| `--gpn-ai-background-raised`, `--gpn-ai-bg-raised` | `--gpn-ai-background-surface` |
| `--gpn-ai-composer-border` | `--gpn-ai-border-composer` |

## Соответствие Figma

| Figma | Код |
| --- | --- |
| `Color/Background/Haze/Top`, `/Bottom` | `--gpn-ai-haze`, `--gpn-ai-haze-bottom` |
| `Color/Background/Overlay` | `--gpn-ai-background-overlay` |
| `Color/Background/Control/Selected` | `--gpn-ai-control-background-selected` |
| `Color/Background/Glow/Catalog` | `--gpn-ai-catalog-glow` |
| `Effects/Shadow/Card`, `/Popover`, `/List` | `--gpn-ai-shadow-card`, `-popover`, `-list` |
| `Effects/Glow/Home`, `/Chat`, `/Project` | `--gpn-ai-glow-home`, `-chat`, `-project` |
| `Typography/{Heading,Body,Control,Caption,Micro}/{роль}` | `typography.{категорияРоль}` |

Каждое имя WEB-переменной из Figma доступно в теме. Снимки Figma лежат в `tokens/`: `figma-variables.json` (переменные), `figma-styles.json` (26 текстовых стилей с ID), `figma-colors.json` (цвета обеих тем). Это снимки, а не живая синхронизация.

Источники: [UI-kit и переменные Figma](https://www.figma.com/design/686IP0J8jTGiix3IXVcA45?node-id=2536-19469), [справочник цветов](https://www.figma.com/design/686IP0J8jTGiix3IXVcA45?node-id=20965-146584), [Theme — Consta](https://uikit.consta.design/libs/uikit/components-theme-stable/dev).

## Конструктор тем Consta

`ConstructorConfigGpnAi.json` можно загрузить в [конструктор тем](https://consta-design-system.github.io/#/theme-constructor), чтобы править базовую палитру, шрифт, шкалы, радиус и тени.

Конструктор не хранит отдельную роль Control, точные значения текста, дополнительные фоны, свечения и типографику. Новый экспорт из конструктора **не заменяет** этот репозиторий: перенесите изменённые базовые значения в CSS и JSON вручную и запустите проверку.

## Для тех, кто обновляет тему

### Порядок изменения

1. Создайте ветку, внесите изменения в CSS **и** соответствующий JSON.
2. Если изменились значения в Figma, обновите снимки в `tokens/`.
3. Запустите `python3 scripts/validate_theme.py`.
4. Добавьте запись в раздел «Не выпущено» в `CHANGELOG.md`. Если фронтам нужно что-то поменять в коде, опишите это в «Ломающих изменениях».
5. Откройте pull request. Проверки запустятся автоматически.
6. После слияния: перенесите «Не выпущено» в новую версию, поднимите `version` в `package.json`, поставьте тег (`git tag v1.1.0 && git push --tags`).

Номер версии: исправили значение — `1.0.1`; добавили токен или стиль — `1.1.0`; изменили или удалили то, что уже используется (размер, имя, смысл стиля) — `2.0.0`.

### Проверки

```sh
python3 scripts/validate_theme.py
```

Проверяет совпадение CSS и JSON, ссылки на CSS и шрифты, разрешение переменных в обеих темах, значения ролей по снимку Figma, высоту контролов и радиусы.

```sh
cd tests
npm install
npx playwright install chromium
npm run dev          # в одном терминале
npm test             # во втором
npm run typecheck
npm run build
```

Проверяет настоящие компоненты Consta в обеих темах: размеры, переключение темы, выпадающий список в портале, форму brick, выбранное состояние, типографику и бейдж. Путь к установленному Chromium можно задать через `CHROMIUM_PATH`.

Обе проверки запускаются в GitHub Actions на каждый pull request и коммит в `main`.

### Структура

| Путь | Что внутри |
| --- | --- |
| `index.ts` | Точка входа: пресеты и `typography` |
| `presets/` | Светлый и тёмный пресеты |
| `_color`, `_control`, `_font`, `_size`, `_space`, `_shadow` | Слои темы в формате Consta, CSS + JSON |
| `_extensions/` | Продуктовые переменные `--gpn-ai-*` |
| `_components/` | Настройки компонентов и классы типографики |
| `tokens/` | Снимки Figma |
| `examples/` | Пример подключения |
| `tests/`, `scripts/` | Проверки |

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

Use the presets from this repository: loading only exported color variables does not load component CSS. [Component audit and implementation boundaries](docs/component-audit-2026-10-23.md).

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

Новый компонент Tabs использует существующие цвета темы: неактивный текст — `text/secondary`, активный текст и линия — акцент, общая линия — `border/default`. Для Consta используйте `<Tabs size="s" view="bordered" ... />`. Размер S: высота 36px, текст Inter 14/19.6, отступ справа 12px, активная линия 2px. [Спецификация и пример](docs/tabs.md).

## TextArea

Используйте `<TextField className="DsTextArea" type="textarea" size="s" rows={1} ... />`. Начальная высота поля — 100px, радиус — 12px, текст — 14/21, внутренние отступы — 8px. Подпись использует secondary, ввод — primary, счётчик справа — tertiary и 12/18. Цвета переключаются с темой. Счётчик передавайте через `caption` и обновляйте из значения поля. [Описание и пример](docs/text-area.md).

## AttachmentCard and file selection

Обновлённые карточки файлов: 248×48px, радиус 12px, отступы 8px, иконка 24×28px, текст Caption/Compact 12/14.4, три кнопки XS по 24px. Для вёрстки приложения добавлены классы `DsAttachmentCard-*` и `DsFileCheckbox`. Пустой чекбокс — нейтральная обводка; выбранный и промежуточный — голубой фон и белая галочка/черта. Цвета Doc/Xls/png используют существующие file-токены. [Состав, цвета и интеграция](docs/attachment-card.md).
