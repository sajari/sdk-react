export const pageNumbers = (page: number, totalPages: number) => {
  // XXX(@benhinchley): I need to look into this function
  // and break down what it is actually doing, I'm a little bit confused by it
  const pages = [];

  let i = 2;
  while (i >= 0) {
    if (page - i > 0) {
      pages.push(page - i);
    }
    i--;
  }

  i = 1;
  while (pages.length < 5 && page + i <= totalPages) {
    pages.push(page + i);
    i++;
  }

  i = 3;
  while (pages.length < 5 && page - i > 0) {
    pages.unshift(page - i);
    i++;
  }
  return pages;
};
