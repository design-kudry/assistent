import '../Theme.css';
import '../_color/Theme_color_exampleDefault.json';
import '../_color/Theme_color_exampleDark.json';
import '../_control/Theme_control_example.json';
import '../_font/Theme_font_example.json';
import '../_size/Theme_size_example.json';
import '../_space/Theme_space_example.json';
import '../_shadow/Theme_shadow_example.json';

import { ThemePreset } from '@consta/uikit/Theme';

export const presetExampleDark: ThemePreset = {
	color: {
		primary: 'exampleDark',
		accent: 'exampleDefault',
		invert: 'exampleDefault',
        },
	control: 'example',
	font: 'example',
	size: 'example',
	space: 'example',
	shadow: 'example',
      
};

