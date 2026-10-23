import type { FC, SVGProps } from 'react';
import { createIcon } from '@consta/icons/Icon';
import Plus from '@gravity-ui/icons/Plus';
import Magnifier from '@gravity-ui/icons/Magnifier';
import ChevronDown from '@gravity-ui/icons/ChevronDown';
import Xmark from '@gravity-ui/icons/Xmark';

/** Adapt a Gravity SVG to Consta's IconComponent API (size/view/className/ref). */
export function createGravityIcon(name: string, glyph: FC<SVGProps<SVGSVGElement>>) {
  return createIcon({
    name: `Gravity${name}`,
    xs: glyph, s: glyph, m: glyph, l: glyph,
    color: 'mono',
    renderType: { xs: 'default', s: 'default', m: 'default', l: 'default' },
  });
}

export const IconPlus = createGravityIcon('Plus', Plus);
export const IconSearch = createGravityIcon('Magnifier', Magnifier);
export const IconChevronDown = createGravityIcon('ChevronDown', ChevronDown);
export const IconClose = createGravityIcon('Xmark', Xmark);
