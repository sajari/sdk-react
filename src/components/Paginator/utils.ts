export function pageNumbers(
  page: number,
  totalPages: number,
  windowSize: number
) {
  let pages = [page];
  for (let i = 1; i < windowSize; i++) {
    pages.unshift(page - i);
    pages.push(page + i);
  }

  // filter out negative values
  pages = pages.filter(v => v > 0);

  return windowFn(page, pages, totalPages, windowSize);
}

function windowFn(center: number, arr: number[], max: number, size: number) {
  const centerIdx = arr.indexOf(center);
  const maxIdx = arr.indexOf(max);

  if (max < size) {
    size = max;
  }

  let start = centerIdx - Math.floor(size / 2);
  let end = centerIdx + Math.ceil(size / 2);

  // If the center of the window is less than half,
  // just show the first window
  if (centerIdx <= Math.ceil(size / center)) {
    start = 0;
    end = size;
    return arr.slice(start > 0 ? start : 0, end);
  }

  if (maxIdx !== -1 && maxIdx - centerIdx < 2) {
    start = maxIdx - (size - 1);
    end = maxIdx + 1;
    return arr.slice(start > 0 ? start : 0, end);
  }

  return arr.slice(start > 0 ? start : 0, end);
}
