import { theme } from 'twin.macro';
import { ColorProps } from './types';

export const colors: ColorProps[] = [
  {
    id: 'White',
    bg: theme`colors.white`,
    color: theme`colors.gray.600`,
    border: theme`colors.gray.300`,
  },
  {
    id: 'Silver',
    bg: theme`colors.gray.300`,
    color: theme`colors.gray.700`,
    border: theme`colors.gray.400`,
  },
  {
    id: 'Black',
    bg: theme`colors.black`,
    color: theme`colors.white`,
    border: theme`colors.black`,
  },
  {
    id: 'Pink',
    bg: theme`colors.pink.400`,
    color: theme`colors.pink.100`,
    border: theme`colors.pink.500`,
  },
  {
    id: 'Magenta',
    bg: theme`colors.pink.600`,
    color: theme`colors.pink.100`,
    border: theme`colors.pink.700`,
  },
  {
    id: 'Red',
    bg: theme`colors.red.400`,
    color: theme`colors.red.800`,
    border: theme`colors.red.500`,
  },
  {
    id: 'Beige',
    bg: theme`colors.orange.200`,
    color: theme`colors.orange.600`,
    border: theme`colors.orange.300`,
  },
  {
    id: 'Orange',
    bg: theme`colors.orange.400`,
    color: theme`colors.orange.800`,
    border: theme`colors.orange.500`,
  },
  {
    id: 'Brown',
    bg: theme`colors.orange.700`,
    color: theme`colors.orange.100`,
    border: theme`colors.orange.800`,
  },
  {
    id: 'Yellow',
    bg: theme`colors.yellow.300`,
    color: theme`colors.yellow.600`,
    border: theme`colors.yellow.400`,
  },
  {
    id: 'Green',
    bg: theme`colors.green.400`,
    color: theme`colors.green.100`,
    border: theme`colors.green.500`,
  },
  {
    id: 'Azure',
    bg: theme`colors.teal.100`,
    color: theme`colors.teal.500`,
    border: theme`colors.teal.200`,
  },
  {
    id: 'Aqua',
    bg: theme`colors.teal.300`,
    color: theme`colors.teal.700`,
    border: theme`colors.teal.400`,
  },
  {
    id: 'Teal',
    bg: theme`colors.teal.400`,
    color: theme`colors.teal.100`,
    border: theme`colors.teal.500`,
  },
  {
    id: 'Turquoise',
    bg: theme`colors.teal.500`,
    color: theme`colors.teal.100`,
    border: theme`colors.teal.600`,
  },
  {
    id: 'Blue',
    bg: theme`colors.blue.400`,
    color: theme`colors.blue.800`,
    border: theme`colors.blue.500`,
  },
  {
    id: 'ElectricBlue',
    bg: theme`colors.blue.600`,
    color: theme`colors.blue.100`,
    border: theme`colors.blue.700`,
  },
  {
    id: 'Lilac',
    bg: theme`colors.purple.300`,
    color: theme`colors.purple.700`,
    border: theme`colors.purple.400`,
  },
  {
    id: 'Purple',
    bg: theme`colors.purple.400`,
    color: theme`colors.purple.800`,
    border: theme`colors.purple.500`,
  },
  {
    id: 'Violet',
    bg: theme`colors.purple.600`,
    color: theme`colors.purple.100`,
    border: theme`colors.purple.700`,
  },
];
