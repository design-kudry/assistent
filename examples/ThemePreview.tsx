import React, { useState } from 'react';
import { Theme } from '@consta/uikit/Theme';
import { Button } from '@consta/uikit/Button';
import { Tabs } from '@consta/uikit/Tabs';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { Combobox } from '@consta/uikit/Combobox';
import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';
import { Checkbox } from '@consta/uikit/Checkbox';
import { SnackBar } from '@consta/uikit/SnackBar';
import { Badge } from '@consta/uikit/Badge';
import { presetGpnAiLight, presetGpnAiDark, typography, IconPlus, IconSearch } from '../index';

const items = [{ id: 1, label: 'Assistants' }, { id: 2, label: 'Prompts' }];
export function ThemePreview() {
  const [snackAction, setSnackAction] = useState('');
  const [dark, setDark] = useState(false);
  const [value, setValue] = useState<string | null>('');
  const [selected, setSelected] = useState<(typeof items)[number] | null>(items[0]);
  const [activeTab, setActiveTab] = useState(items[0]);
  const [prompt, setPrompt] = useState<string | null>('Answer using the uploaded documents.');
  return (
    <Theme preset={dark ? presetGpnAiDark : presetGpnAiLight}>
      <main style={{ background: 'var(--color-bg-default)', color: 'var(--color-typo-primary)', minHeight: '100vh', padding: 32, display: 'grid', gap: 20, alignContent: 'start' }}>
        <Text as="h1" className={typography.headingM}>Assistant catalog</Text>
        <Text className={typography.bodyRegular}>Theme settings are applied to Consta components.</Text>
        <div style={{ display: 'flex', gap: 12 }}>
          <Button size="s" label="Switch theme" onClick={() => setDark(!dark)} />
          <Button size="s" view="secondary" label="Secondary" iconLeft={IconPlus} iconSize="s" />
          <Button size="s" disabled label="Disabled" />
          <Button size="xs" label="Add" iconLeft={IconPlus} />
          <Button size="s" form="brick" label="Brick" />
        </div>
        <div style={{ width: 375 }}>
          <TextField size="s" placeholder="Search" leftSide={IconSearch} value={value} onChange={setValue} />
        </div>
        <div style={{ width: 375 }}>
          <Combobox size="s" placeholder="Select an assistant" items={items} value={selected} onChange={setSelected} />
        </div>
        <ChoiceGroup size="s" name="catalog" view="secondary" className="DsChoiceGroup_secondary2" items={items} value={selected} onChange={setSelected} />
        <ChoiceGroup size="s" name="primary" view="primary" className="AuditChoicePrimary" items={[...items, { id: 3, label: 'Projects' }, { id: 4, label: 'Chats' }]} value={selected} onChange={setSelected} />
        <ChoiceGroup size="s" name="ghost" view="ghost" className="AuditChoiceGhost" items={items} value={selected} onChange={setSelected} />
        <ChoiceGroup size="s" name="disabled" view="secondary" disabled className="DsChoiceGroup_secondary2 AuditChoiceDisabled" items={items} value={selected} onChange={setSelected} />
        <Tabs size="s" view="bordered" items={items} value={activeTab} onChange={setActiveTab} />
        <TextField className="DsTextArea" type="textarea" rows={1} size="s" label="Prompt for answers" value={prompt} onChange={setPrompt} maxLength={5000} caption={`${prompt?.length ?? 0}/5000`} />
        <div className="DsChatList"><Checkbox size="s" label="Select chat" checked={!!selected} onChange={() => setSelected(selected ? null : items[0])} /></div>
        <section aria-label="Snackbar colors" style={{ width: 400, maxWidth: '100%' }}>
          <SnackBar form="round" items={(['system', 'success', 'warning', 'alert'] as const).map(status => ({
            key: status, status, message: status === 'system' ? 'Deleting chats' : status,
            autoClose: 5, showProgress: 'timer' as const,
            actions: [{ label: 'Undo', onClick: () => setSnackAction(status) }],
          }))} />
          <output data-testid="snack-action">{snackAction}</output>
        </section>
        <div><Badge className="DsPromptBadge" label="Education" status="system" form="round" /></div>
      </main>
    </Theme>
  );
}
