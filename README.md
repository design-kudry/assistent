# Тема gpn.ai для Consta

Два пресета: `presetGpnAiLight` и `presetGpnAiDark`. Цвета синхронизированы со снимком переменных Figma от 20.10.2026. Основной акцент — `#008EFA`; обычный Control — `#426A80` / `#B3C6D5`.

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
- Inter и исходные шкалы размеров, отступов и высот сохранены. Радиус базовых контролов остаётся 4px; круглые кнопки и другие радиусы задаются на уровне компонентов.
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
.Sidebar { background: var(--gpn-ai-bg-sidebar); }
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

Проверяется совпадение CSS и JSON, ссылки на CSS и шрифты, разрешение переменных в обеих схемах, значения основных ролей по снимку Figma и неизменность размеров/отступов относительно исходного экспорта.

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
- `Typography/{Heading,Body,Control,Caption}/{font size}/{weight}-{line height}`: sizes and line heights are in px. Existing alternate styles retain distinct IDs.
- `Effects/Shadow`: Card, Popover; older shadows are under Legacy.
- `Effects/Glow`: Home, Chat, Project, Composer; older effects are under Legacy.

`tokens/figma-styles.json` records the original and current names with stable Figma style IDs. CSS token names are unchanged by this organization pass.
