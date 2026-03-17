import { style } from '@vanilla-extract/css';
import { color, DefaultReset, toRem } from 'folds';

export const Sidebar = style([
  DefaultReset,
  {
    width: toRem(66),
    backgroundColor: color.Background.Container,
    position: 'relative',
    overflow: 'hidden',

    display: 'flex',
    flexDirection: 'column',
    color: color.Background.OnContainer,
  },
]);
