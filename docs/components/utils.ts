/* eslint-disable no-param-reassign, import/prefer-default-export */

export const mapIcons = (iconList: string[]) =>
  iconList.reduce((obj: Record<string, string[]>, icon: string) => {
    let prefix = icon.split('-')[0];
    const prefixes = ['small', 'large', 'xl', '2xl', '3xl'];

    if (!prefixes.includes(prefix)) {
      prefix = 'medium';
    }

    obj[prefix] = obj[prefix] || [];
    obj[prefix].push(icon);

    return obj;
  }, {});
