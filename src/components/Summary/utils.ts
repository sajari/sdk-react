export const formatQueryTime = (time: number) => {
  if (!time) {
    return '';
  }

  const strTime = String(time);

  const splitNum = strTime.split('.');
  if (splitNum.length === 1 || parseInt(splitNum[1], 10) === 0) {
    return parseInt(splitNum[0], 10) + 's';
  }

  const numZeros = (/0*/.exec(splitNum[1]) as RegExpExecArray)[0].length;
  const fractional = splitNum[1].slice(0, numZeros + 1);

  return splitNum[0] + '.' + fractional + 's';
};
