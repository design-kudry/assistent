# Тема для Consta

Два пресета: `presetGpnAiLight` и `presetGpnAiDark`. Цвета синхронизированы со снимком переменных Figma от 21.10.2026. Основной акцент — `#008EFA`; обычный Control — `#426A80` / `#B3C6D5`.

## Подключение

Скопируйте каталог темы в React-проект с установленным `@consta/uikit`. Сборщик должен поддерживать CSS-импорты и локальные файлы шрифтов. Npm-пакет пока не опубликован.

```tsx
import { Theme } from '@consta/uikit/Theme';
import { presetGpnAiLight, presetGpnAiDark } from './theme';

export function App({ dark = false }) {
  return (
    <Theme preset={dark ? presetGpnAiDark : presetGpnAiLight}>
      {/* компоненты приложения */}
    </Theme>
  );
}
```

В пресетах подключается **CSS**, JSON-файлы — таблицы значений. `accent` и `invert` используют противоположную цветовую схему по структуре исходного экспорта. Проверьте контраст Informer, Snackbar, Badge, Tooltip в используемой версии Consta.

## Что изменено

- Цвета текста, контролов, фонов, ссылок, выбранных состояний и скроллбаров.
- Сохранена отдельная роль Control; подсказки и предупреждение об ошибках ИИ используют приглушённый текст.
- Добавлены токены сервиса, файлов, меню, контекста, поверхностей и свечений.
- Inter и шкала отступов сохранены. Размер контролов `s` — 36px; базовый радиус полей — 12px. Круглые кнопки, ChoiceGroup и списки настраиваются автоматически через CSS, подключённый пресетом.
- Исправлены исходные ссылки `.woff2`, CSS-импорты пресетов и параметры нейтральных теней: в экспорте были потеряны вторые blur/offset.
- Убраны имена Example из экспортированных файлов. Файлы шрифтов сохранены.

## Свечения и составные компоненты

`_extensions/Theme_extensions_gpnAi.css` импортируется пресетами автоматически. Он содержит переменные, но не меняет разметку и размеры компонентов.

```css
.ComposerHome { box-shadow: var(--gpn-ai-glow-home); }
.ComposerChat { box-shadow: var(--gpn-ai-glow-chat); }
.ComposerProject { box-shadow: var(--gpn-ai-glow-project); }

.Composer {
  background: var(--gpn-ai-bg-raised);
  border-color: var(--gpn-ai-composer-border);
}
.Composer:focus-within {
  border-color: var(--gpn-ai-composer-border);
}
.Composer:has(:focus-visible) {
  outline: 2px solid var(--color-control-bg-border-focus);
  outline-offset: 3px;
}
.Sidebar { background: var(--gpn-ai-background-surface); }
.NavItemActive {
  color: var(--gpn-ai-nav-active-text);
  background: var(--gpn-ai-nav-active-bg);
}
.AiDisclaimer { color: var(--color-typo-ghost); }
```

У свечения один оттенок для каждой темы. Различается область: Home шире, Chat ближе к полю, Project компактнее. Не складывайте несколько фиолетовых теней. Для поповеров доступен `--gpn-ai-shadow-popover`, для карточек — `--gpn-ai-shadow-card`. Они не заменяют глобально Consta `--shadow-layer` или `--shadow-modal`.

Для точных межстрочных интервалов используйте `--gpn-ai-body-line-height`, `--gpn-ai-control-line-height` и другие переменные расширения на нужном компоненте. Не меняйте глобальную шкалу ради локального текста.

## Конструктор тем

`ConstructorConfigGpnAi.json` сохраняет исходную схему импорта: базовые цвета, шрифт, шкалы, радиус и тени.

**Конструктор не описывает все наши точные семантические значения и продуктовые эффекты.** Например, отдельный Control, точные проценты текста, третий фон и Glow/Home/Chat/Project находятся в CSS и расширениях. Повторный экспорт только из конструктора не восстановит их автоматически. Для приложения используйте пресеты из этого репозитория, а JSON конструктора — для редактирования базовой палитры.

`tokens/figma-colors.json` содержит исходный снимок значений. Это экспорт, не живая синхронизация с Figma.

## Проверка

```sh
python3 scripts/validate_theme.py
```

Проверяется совпадение CSS и JSON, ссылки на CSS и шрифты, разрешение переменных в обеих схемах, значения основных ролей по снимку Figma и соответствие высоты контролов и радиусов макетам.

Для hover акцента добавлен производный `#33A5FB`; эти состояния требуют визуальной проверки вместе с pressed/focus/disabled в приложении. Это набор темы, а не готовая перевёрстка всех компонентов. Совпадение каждого экрана и доступность проверяются после подключения к версии `@consta/uikit` проекта.

## Источники

- [UI-kit и переменные Figma](https://www.figma.com/design/686IP0J8jTGiix3IXVcA45?node-id=2536-19469)
- [Theme — Consta](https://uikit.consta.design/libs/uikit/components-theme-stable/dev)
- [Конструктор тем](https://consta-design-system.github.io/#/theme-constructor)

## Haze and Overlay

Synced with the Figma color reference on 2026-10-20. New style names and token identifiers use English.

| Figma style | CSS variable | Usage |
| --- | --- | --- |
| `Color/Background/Haze/Top` | `--gpn-ai-haze` | Opaque top, transparent bottom |
| `Color/Background/Haze/Bottom` | `--gpn-ai-haze-bottom` | Opaque bottom, transparent top |
| `Color/Background/Overlay` | `--gpn-ai-background-overlay` | Modal backdrop |

```css
.ChatHeader { background: var(--gpn-ai-haze); }
.ChatFooter { background: var(--gpn-ai-haze-bottom); }
.ModalBackdrop {
  background: var(--gpn-ai-background-overlay);
  opacity: 1;
}
```

Haze uses four stops (0%, 45%, 75%, 100%) with opacity 100%, 100%, 95%, 0%. Light uses #FFFFFF; Dark uses #19232E, including the transparent endpoint to avoid a pale fringe. Overlay uses #102A3A at 48% in Light and #050A10 at 64% in Dark. Do not add layer opacity: alpha is already in the token. Both follow the Consta color modifier.

`raised` remains a compatibility token and now resolves to `surface` in both themes. Existing CSS names are retained. Update this repository and the [Figma color reference](https://www.figma.com/design/686IP0J8jTGiix3IXVcA45?node-id=20965-146584) together whenever product colors or gradients change. This is a manual synchronization workflow, not a background watcher.

## Figma style categories

Existing styles were renamed in place on 2026-10-20. IDs, values, variable bindings and component links are preserved; no styles were recreated or deleted.

- `Color/Background`: Avatar, Overlay and Haze/Top, Haze/Bottom.
- `Typography/{Heading,Body,Control,Caption,Micro}/{role}`: readable role names. Exact font sizes, weights and line heights are documented in each Figma style description. Existing styles retain distinct IDs.
- `Effects/Shadow`: Card, Popover; older shadows are under Legacy.
- `Effects/Glow`: Home, Chat, Project, Composer; older effects are under Legacy.

`tokens/figma-styles.json` records the original and current names with stable Figma style IDs. CSS token names are unchanged by this organization pass.

## Selected control background

`ChoiceGroup/Module/Item` variants with `View=Secondary 2` use `color/control/background-selected`, exposed as `--gpn-ai-control-background-selected`. Figma style: `Color/Background/Control/Selected`. Light preserves the designer's blue (#DFF1FF); Dark uses #173D59. Examples are documented in both color reference themes. The catalog screen uses `Color/Background/Haze/Top`.

## Catalog production glow

Source: `design-kudry/kudry-server/gpn-ai/dist/style.css`, checked 2026-10-20. Figma style: `Color/Background/Glow/Catalog`. Keep the glow on a separate layer behind content; layer blur is not a blur of the content.

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

Typography now uses semantic names such as `Typography/Heading/L`, `Typography/Body/Regular`, `Typography/Body/Compact-Regular`, `Typography/Caption/Link`. `Regular-Relative` preserves the existing proportional line-height variant. No font metrics or style IDs changed.


## Design system sync — 2026-10-21

The current Figma variables and all 26 text styles are recorded in `tokens/figma-variables.json` and `tokens/figma-styles.json`. Color values for both themes are in `tokens/figma-colors.json`.

- Sidebar uses `color/background/surface`. The old CSS names `--gpn-ai-background-sidebar` and `--gpn-ai-bg-sidebar` are compatibility aliases to Surface; Sidebar is no longer a separate semantic token.
- Active navigation background is `rgba(0, 32, 51, .05)` in Light and `rgba(229, 237, 245, .05)` in Dark.
- List background, list shadow, context menu border, danger text and success tag colors now follow Figma.
- `Effects/Shadow/List` is exposed as `--gpn-ai-shadow-list`: blur 28/32px and vertical offset 8/12px in Light/Dark.
- Every WEB variable name recorded in Figma resolves in the theme. Alternate prefixes are aliases to the canonical `--gpn-ai-*` tokens; existing consumers continue to work.
- `Heading/S` now means 20px / 30px, weight 700. Use `--gpn-ai-heading-xs-*` for the previous 16px / 24px medium heading. `Heading/M` remains 24px / 36px.
- Prompt card badges use `Typography/Caption/Badge`: 12px / 24px, weight 600. `Micro/Badge` remains a separate 10px / 20px style.
- Text style properties use `--gpn-ai-{category}-{role}-{size,line-height,font-weight,font-style}`; for example, `--gpn-ai-body-list-line-height` and `--gpn-ai-caption-badge-size`.

```css
.PromptBadge {
  font-size: var(--gpn-ai-caption-badge-size);
  line-height: var(--gpn-ai-caption-badge-line-height);
  font-weight: var(--gpn-ai-caption-badge-font-weight);
}
.SuccessBadge { color: var(--gpn-ai-status-success-text); }
.ContextMenu {
  background: var(--gpn-ai-background-list);
  border-color: var(--gpn-ai-border-context-menu);
  box-shadow: var(--gpn-ai-shadow-list);
}
```

Current Figma names include `Card/Assistant`, `Card/Prompt`, `PromptCatalog/Toolbar` and `Pagination/Module/Pages`. This repository provides theme values; component layout remains in the application.

## Работа с компонентами

Оба пресета автоматически подключают `_components/Theme_components_gpnAi.css` и `_components/Theme_typography_gpnAi.css`. Подключать их повторно или копировать CSS в приложение не нужно. Проверяемая версия — `@consta/uikit@5.33.3`.

| Элемент Figma | Как использовать в Consta | Что применяет тема |
| --- | --- | --- |
| Button | `<Button size="s" />` | Высота 36px, текст 14/21, круглые углы, горизонтальный отступ 16px |
| Combobox / AutoComplete / TextField | `size="s"`, стандартная форма | Высота 36px, радиус 12px, текст 14px |
| ChoiceGroup | `size="s"` | Высота 36px, круглые элементы, отступы 20px, интерлиньяж 32px |
| ChoiceGroup Secondary 2 | `view="secondary" className="DsChoiceGroup_secondary2"` | Фон выбранного пункта из `color/control/background-selected`, с переключением темы |
| Выпадающий список | Стандартная форма списка | Радиус 20px, тематические фон, граница и тень List |
| Заголовок каталога | `<Text as="h1" className={typography.headingM}>` | Inter 24/36, Medium |
| Бейдж карточки запроса | `className="DsPromptBadge"` | Высота 24px, текст 12/24, Semi Bold |

`form="brick"` и другие явно выбранные формы остаются доступны. Размеры `xs`, `m`, `l` сохраняют высоты 24, 40, 48px. Шкала отступов не меняется ради высоты одного контрола. Размер `s` изменён с 32 до 36px для всех использующих его контролов — при обновлении проверьте плотные строки приложения.

```tsx
import { typography } from './theme';

<Text as="h1" className={typography.headingM}>Каталог ассистентов</Text>
<Text className={typography.bodyRegular}>Описание</Text>
<Button size="s" label="Создать" />
```

`typography` содержит все 26 существующих текстовых стилей Figma. Точный стиль выбирается по роли: размер текста сам по себе не задаёт вес и интерлиньяж. Полный пример с переключением темы и работающими контролами — `examples/ThemePreview.tsx`.

Составные элементы приложения (Composer, Menu, Card/Assistant, Card/Prompt) используют существующие продуктовые токены и собственную разметку. Пресет не создаёт их автоматически. Тени списков подключены локально к ListBox, поэтому модальные окна не получают тень списка.

Новые цвета и стили в Figma не создавались: этот слой связывает уже существующие значения с Consta. При обновлении Consta запускайте проверку: адаптер использует классы компонентов. Цвета focus, hover, disabled продолжает задавать тема; обработчики и клавиатурная навигация остаются у Consta.

### Проверка в браузере

```sh
cd tests
npm install
npx playwright install chromium
npm run dev
# Во втором терминале из tests:
npm test
npm run typecheck
npm run build
```

Тест проверяет реальные компоненты в обеих темах, переключение темы, выпадающий список в портале, сохранение формы brick, выбранное состояние, типографику и размер бейджа. Для установленного Chromium можно задать `CHROMIUM_PATH`.
