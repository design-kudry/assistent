import '../Theme.css';
import '../_color/Theme_color_gpnAiLight.css';
import '../_color/Theme_color_gpnAiDark.css';
import '../_control/Theme_control_gpnAi.css';
import '../_font/Theme_font_gpnAi.css';
import '../_size/Theme_size_gpnAi.css';
import '../_space/Theme_space_gpnAi.css';
import '../_shadow/Theme_shadow_gpnAi.css';
import '../_extensions/Theme_extensions_gpnAi.css';

import '../_components/Theme_components_gpnAi.css';
import '../_components/Theme_typography_gpnAi.css';

import type { ThemePreset } from '@consta/uikit/Theme';

export const presetGpnAiDark: ThemePreset = {
  color: { primary: 'gpnAiDark', accent: 'gpnAiLight', invert: 'gpnAiLight' },
  control: 'gpnAi',
  font: 'gpnAi',
  size: 'gpnAi',
  space: 'gpnAi',
  shadow: 'gpnAi',
};
