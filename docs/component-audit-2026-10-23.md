# Component audit — 2026-10-23

Source: [Figma component page](https://www.figma.com/design/686IP0J8jTGiix3IXVcA45?node-id=2536-19469).

The page contains 63 top-level component families: 39 current and 24 under Hold or explicitly named Legacy. The audit traversed each family, including nested instances, checking solid paint variable bindings and text style references. This is a structural audit of the whole page; it is not a claim of browser pixel parity for all product components.

## Changes

- ChoiceGroup CSS now supplies the subtle group background, removes the outer Consta outline, and uses round 4×4px dividers for the default rounded form. Dividers adjacent to the selected item stay hidden as in Consta. Explicit brick form keeps its shape.
- Secondary 2 retains its selected background and now uses accent text/icons plus a 1px accent inset border. Disabled selected labels do not retain that border.
- ChoiceGroup icon spacing is 8px; height is 36px, horizontal text padding 20px, label typography 14/32.
- Figma Card/Assistant badge background now references Surface.
- Figma ComboboxList approval badges now reference success background / on-accent text and Typography/Micro/Badge.
- Figma Chat list text now uses Typography/Body/Compact-Regular and primary text; time labels use secondary text. Checkbox border and transparent collapsed menu background use semantic variables.
- Editor outlines for Combobox, Chat list and file component sets use the editor border token.

## Remaining explicit exceptions

- Menu's two brand glyphs use GPN_ID and are intentionally not replaced with body text styles.
- AttachmentCard/Module/File contains 174 raw solid paints in format-specific icon artwork. These are not automatically recolored; changing illustration colors to interface tokens would change the artwork.
- Star has one raw component-set editor outline; its user-facing variants use semantic colors.
- Hold/Legacy components retain historical styles. They are not templates for new implementation; use their current counterparts.
- Composer, Menu, ChatHeader, cards, chat messages, ContextPanel, pagination and toolbars are application compositions. The theme exports tokens, not their full markup or interactive implementation. A theme import alone cannot reproduce their geometry.

## Validation

Real Consta 5.33.3 browser checks cover light/dark themes, ChoiceGroup selected colors, border, group outline, 4px dividers, 36px height, 20px padding, 32px line height, Primary, Ghost and disabled examples, mouse selection and keyboard navigation. Existing checks cover Button, explicit brick form, TextField, Combobox, portaled dropdown, typography and prompt badge. JSON/CSS consistency and production bundle are checked separately.

## Inventory

Raw/remote counts below include editor outlines and artwork, not only rendered controls. Zero counts establish binding coverage, not complete visual parity.

| Component | Figma ID | Scope | Raw solid paints | Remote solid paints | Text without style |
| --- | --- | --- | ---: | ---: | ---: |
| Menu | `17413:24046` | Current | 0 | 0 | 2 |
| Menu/Module/Nav | `17413:9626` | Current | 0 | 0 | 0 |
| Menu/Module/Group | `17726:100298` | Current | 0 | 0 | 0 |
| Composer | `20081:142227` | Current | 0 | 0 | 0 |
| Composer/Module/Input | `20081:143734` | Current | 0 | 0 | 0 |
| Composer/Module/File | `20159:165090` | Current | 0 | 0 | 0 |
| Button | `20055:141169` | Current | 0 | 0 | 0 |
| ChoiceGroup/Module/Item | `20133:82484` | Current | 0 | 0 | 0 |
| ChoiceGroup | `20133:83399` | Current | 0 | 0 | 0 |
| ChoiceGroup/Module/Part | `20133:83857` | Current | 0 | 0 | 0 |
| ContextPanel/Legacy | `20159:168176` | Hold / Legacy | 0 | 0 | 0 |
| AttachmentCard | `20159:164867` | Current | 0 | 0 | 0 |
| AttachmentCard/Module/File | `20154:92413` | Current | 174 | 0 | 0 |
| ChatHeader | `20399:192155` | Current | 0 | 0 | 0 |
| ChatHeader/Module/Breadcrumbs | `20434:194235` | Current | 0 | 0 | 0 |
| Card/Assistant | `21195:106283` | Current | 0 | 0 | 0 |
| Star | `21200:106921` | Current | 1 | 0 | 0 |
| List | `21250:134977` | Current | 0 | 0 | 0 |
| List/Module/Item | `21250:134988` | Current | 0 | 0 | 0 |
| List/Module/Header | `21257:135053` | Current | 0 | 0 | 0 |
| ChatMessage | `20882:136599` | Current | 0 | 0 | 0 |
| ChatMessage/Module/Text | `20882:136767` | Current | 0 | 0 | 0 |
| ChatMessage/Module/File | `20882:136255` | Current | 0 | 0 | 0 |
| ChatMessage/Module/Actions | `20882:136515` | Current | 0 | 0 | 0 |
| ChatMessage/Module/Reasoning/Module/Header | `9643:91439` | Current | 0 | 0 | 0 |
| ChatMessage/Module/Reasoning/Module/Step | `9643:91454` | Current | 0 | 0 | 0 |
| ChatMessage/Module/Reasoning | `8965:9563` | Current | 0 | 0 | 0 |
| SourceLink | `13850:168109` | Current | 0 | 0 | 0 |
| SourceLink/Module/Icon | `13850:178127` | Current | 0 | 0 | 0 |
| assistant | `928:11700` | Hold / Legacy | 3 | 1 | 2 |
| icon | `928:11713` | Hold / Legacy | 1 | 4 | 0 |
| Icon | `955:12497` | Hold / Legacy | 4 | 0 | 0 |
| icon | `1282:55385` | Hold / Legacy | 17 | 0 | 0 |
| card | `1282:55495` | Hold / Legacy | 16 | 2 | 6 |
| sidebar | `955:12488` | Hold / Legacy | 19 | 61 | 21 |
| Menu | `928:10815` | Hold / Legacy | 38 | 10 | 16 |
| Menu/State3 | `17329:34976` | Hold / Legacy | 32 | 7 | 15 |
| input field | `1435:39695` | Hold / Legacy | 19 | 78 | 24 |
| File | `9904:32341` | Hold / Legacy | 5 | 3 | 2 |
| Image | `10372:145515` | Hold / Legacy | 19 | 4 | 0 |
| ModuleFile | `10372:147585` | Hold / Legacy | 49 | 20 | 20 |
| IconStar | `8646:36479` | Hold / Legacy | 4 | 0 | 0 |
| List/Module/Header | `9825:3433` | Hold / Legacy | 0 | 0 | 0 |
| List | `9825:4107` | Hold / Legacy | 1 | 0 | 3 |
| List/Module/Item | `9938:7755` | Hold / Legacy | 1 | 0 | 2 |
| Dialogue | `929:10417` | Hold / Legacy | 3 | 8 | 1 |
| Interactions | `10688:64031` | Hold / Legacy | 1 | 7 | 0 |
| ModuleFile | `9983:55011` | Hold / Legacy | 36 | 16 | 16 |
| header | `10985:22725` | Hold / Legacy | 10 | 13 | 2 |
| iconlekst | `10985:21497` | Hold / Legacy | 13 | 0 | 0 |
| assistant | `10985:22796` | Hold / Legacy | 14 | 32 | 11 |
| _Legacy/Star | `21250:132226` | Hold / Legacy | 1 | 0 | 0 |
| ComboboxList | `21266:140775` | Current | 0 | 0 | 0 |
| ComboboxList/Module/Item | `21266:140897` | Current | 0 | 0 | 0 |
| ContextPanel | `21257:135648` | Current | 0 | 0 | 0 |
| Card/Prompt | `21282:146431` | Current | 0 | 0 | 0 |
| AutoComplete | `21276:144887` | Current | 0 | 0 | 0 |
| Combobox | `21617:100922` | Current | 0 | 0 | 0 |
| Pagination | `21290:148089` | Current | 0 | 0 | 0 |
| Pagination/Module/Pages | `21290:147766` | Current | 0 | 0 | 0 |
| PromptCatalog/Toolbar | `21282:146468` | Current | 0 | 0 | 0 |
| Chat list | `21443:262757` | Current | 0 | 0 | 0 |
| Chat list | `21448:262998` | Current | 0 | 0 | 0 |
