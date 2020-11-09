import { FilterItem } from '@sajari/react-hooks';

// Move selected items to top
export function sortList(list: FilterItem[], selected: string[]) {
  const sortedList: FilterItem[] = [];
  let count = 0;
  list.forEach((item) => {
    if (selected.includes(item.label)) {
      sortedList.splice(count, 0, item);
      count += 1;
      return;
    }

    sortedList.push(item);
  });

  return sortedList;
}
