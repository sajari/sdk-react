import { theme } from 'twin.macro';

import { ColorProps } from './types';

export const colors: ColorProps[] = [
  {
    id: 'White',
    bg: theme`colors.white`,
  },
  {
    id: 'Silver',
    bg: theme`colors.gray.300`,
  },
  {
    id: 'Black',
    bg: theme`colors.black`,
  },
  {
    id: 'Pink',
    bg: theme`colors.pink.400`,
  },
  {
    id: 'Magenta',
    bg: theme`colors.pink.600`,
  },
  {
    id: 'Red',
    bg: theme`colors.red.500`,
  },
  {
    id: 'Beige',
    bg: theme`colors.orange.200`,
  },
  {
    id: 'Orange',
    bg: theme`colors.orange.400`,
  },
  {
    id: 'Brown',
    bg: theme`colors.orange.700`,
  },
  {
    id: 'Yellow',
    bg: theme`colors.yellow.300`,
  },
  {
    id: 'Green',
    bg: theme`colors.green.400`,
  },
  {
    id: 'Azure',
    bg: theme`colors.teal.100`,
  },
  {
    id: 'Aqua',
    bg: theme`colors.teal.300`,
  },
  {
    id: 'Teal',
    bg: theme`colors.teal.400`,
  },
  {
    id: 'Turquoise',
    bg: theme`colors.teal.500`,
  },
  {
    id: 'Blue',
    bg: theme`colors.blue.400`,
  },
  {
    id: 'ElectricBlue',
    bg: theme`colors.blue.600`,
  },
  {
    id: 'Lilac',
    bg: theme`colors.purple.300`,
  },
  {
    id: 'Purple',
    bg: theme`colors.purple.400`,
  },
  {
    id: 'Violet',
    bg: theme`colors.purple.600`,
  },
];

export const colorKeys = colors.map(({ id }) => id);
