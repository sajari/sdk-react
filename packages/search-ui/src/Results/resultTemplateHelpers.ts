import { Args, Blocks, Compiler } from 'tempura';

export const join: Compiler = (args: Args) => {
  const { items, joiner: joinerParam } = args;
  const joiner = joinerParam ?? '';

  if (items?.length > 1) {
    return items.join(joiner);
  }
  if (items?.length === 1) {
    return items[0];
  }

  return '';
};

const blocks: Blocks = {
  join,
};

export default blocks;
