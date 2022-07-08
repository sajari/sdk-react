import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Args, Blocks, Compiler } from 'tempura';

dayjs.extend(utc);

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

export const date: Compiler = (args: Args) => {
  const { value, format = 'DD MMMM YYYY HH:mm (UTC)' } = args;
  const dateObj = dayjs(value);

  return dateObj.utc().format(format);
};

const blocks: Blocks = {
  join,
  date,
};

export default blocks;
