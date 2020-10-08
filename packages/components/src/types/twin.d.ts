import 'twin.macro';
import styledImport from '../styles/styled';

declare module 'twin.macro' {
  const styled: typeof styledImport;
}
