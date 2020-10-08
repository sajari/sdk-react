import { loremIpsum } from 'lorem-ipsum';

const randomNumber = (min = 1, max = 10) => Math.floor(Math.random() * max) + min;

const generateQuery = () =>
  loremIpsum({
    count: randomNumber(1, 3),
    units: 'words',
  }).toLowerCase();

const makeData = (rows: number) =>
  Array.from(Array(rows)).map(() => ({
    query: generateQuery(),
    searches: randomNumber(0, 20000),
    ctr: `${randomNumber(0, 90)}%`,
  }));

export default makeData;
