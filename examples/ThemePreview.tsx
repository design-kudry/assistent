import React, { useState } from 'react';
import { Theme } from '@consta/uikit/Theme';
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { Combobox } from '@consta/uikit/Combobox';
import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';
import { Badge } from '@consta/uikit/Badge';
import { presetGpnAiLight, presetGpnAiDark, typography } from '../index';

const items = [{ id: 1, label: 'Assistants' }, { id: 2, label: 'Prompts' }];
export function ThemePreview() {
  const [dark, setDark] = useState(false);
  const [value, setValue] = useState<string | null>('');
  const [selected, setSelected] = useState<(typeof items)[number] | null>(items[0]);
  return (
    <Theme preset={dark ? presetGpnAiDark : presetGpnAiLight}>
      <main style={{ background: 'var(--color-bg-default)', color: 'var(--color-typo-primary)', minHeight: '100vh', padding: 32, display: 'grid', gap: 20, alignContent: 'start' }}>
        <Text as="h1" className={typography.headingM}>Assistant catalog</Text>
        <Text className={typography.bodyRegular}>Theme settings are applied to Consta components.</Text>
        <div style={{ display: 'flex', gap: 12 }}>
          <Button size="s" label="Switch theme" onClick={() => setDark(!dark)} />
          <Button size="s" view="secondary" label="Secondary" />
          <Button size="s" disabled label="Disabled" />
          <Button size="s" form="brick" label="Brick" />
        </div>
        <div style={{ width: 375 }}>
          <TextField size="s" placeholder="Search" value={value} onChange={setValue} />
        </div>
        <div style={{ width: 375 }}>
          <Combobox size="s" placeholder="Select an assistant" items={items} value={selected} onChange={setSelected} />
        </div>
        <ChoiceGroup size="s" name="catalog" view="secondary" className="DsChoiceGroup_secondary2" items={items} value={selected} onChange={setSelected} />
        <ChoiceGroup size="s" name="primary" view="primary" className="AuditChoicePrimary" items={[...items, { id: 3, label: 'Projects' }, { id: 4, label: 'Chats' }]} value={selected} onChange={setSelected} />
        <ChoiceGroup size="s" name="ghost" view="ghost" className="AuditChoiceGhost" items={items} value={selected} onChange={setSelected} />
        <ChoiceGroup size="s" name="disabled" view="secondary" disabled className="DsChoiceGroup_secondary2 AuditChoiceDisabled" items={items} value={selected} onChange={setSelected} />
        <div><Badge className="DsPromptBadge" label="Education" status="system" form="round" /></div>
      </main>
    </Theme>
  );
}
