export default function pageRange(currentPage, lastPage, range) {
  let pages = [];

  // If pages is less than or equal to the range add them
  if (lastPage <= range) {
    for (let i = 1; i <= lastPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  pages.push(currentPage);
  for (let i = 1; pages.length < range; i++) {
    const prev = currentPage - i;
    if (prev >= 1) {
      pages = [prev].concat(pages);
    }

    const next = currentPage + i;
    if (next <= lastPage) {
      pages.push(next);
    }
  }
  return pages;
}
