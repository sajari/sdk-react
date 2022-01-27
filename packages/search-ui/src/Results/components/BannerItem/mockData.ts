import { Banner, TextPosition } from './types';

export const banners: Banner[] = [
  {
    id: '1',
    height: 2,
    width: 2,
    position: 2,
    title: 'Cake',
    description:
      'a sweet, baked, breadlike food, made with or without shortening, and usually containing flour, sugar, baking powder or soda, eggs, and liquid flavoring. 2. a flat, thin mass of bread, esp. unleavened bread.',
    textPosition: TextPosition.TopRight,
    textColor: 'white',
    imageUrl:
      '	https://images.unsplash.com/photo-1642588355539-1fa4ebb910c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1888&q=80',
    targetUrl: 'https://www.bestbuy.com/site//5307812.p?cmp=SAJARI&skuId=5307812&utm_medium=search&utm_campaign=sajari',
  },
  {
    id: '2',
    height: 2,
    width: 2,
    position: 7,
    title: 'Cake',
    description:
      'a sweet, baked, breadlike food, made with or without shortening, and usually containing flour, sugar, baking powder or soda, eggs, and liquid flavoring. 2. a flat, thin mass of bread, esp. unleavened bread.',
    textPosition: TextPosition.BottomLeft,
    textColor: 'white',
    imageUrl:
      '	https://images.unsplash.com/photo-1642588355539-1fa4ebb910c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1888&q=80',
    targetUrl: 'https://www.bestbuy.com/site//5307812.p?cmp=SAJARI&skuId=5307812&utm_medium=search&utm_campaign=sajari',
  },
];
