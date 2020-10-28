import { css, SerializedStyles } from '@emotion/core';
import tw from 'twin.macro';

import { ResultsProps } from './types';

type Styles = {
  container: SerializedStyles[];
  item: SerializedStyles[];
};

export default function useResultsStyles({ appearance = 'row' }: ResultsProps): Styles {
  const styles = {
    container: [appearance === 'grid' && tw`grid md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-8`],
    item: [tw`mb-8`],
  };

  return Object.entries(styles).reduce((obj, [key, value]) => Object.assign(obj, { [key]: css(value) }), {}) as Styles;
}
