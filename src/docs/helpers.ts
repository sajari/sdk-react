import { styled, StyledComponent } from '../components/styles';
import { Filter } from '../controllers';

export const ExampleContainer = styled('div')({
  border: '1px solid #D3DCE6',
  borderRadius: '5px',
  marginBottom: '1rem',
  padding: '2rem',
});

export const categoryFilter = () =>
  new Filter(
    {
      // tslint:disable:object-literal-sort-keys
      All: '',
      Blog: "dir1='blog'",
      Articles: "dir1='articles'",
      // tslint:enable:object-literal-sort-keys
    },
    ['All'],
  );

export const categoryMultiFilter = () =>
  new Filter(
    {
      // tslint:disable:object-literal-sort-keys
      Other: "dir1!='blog' AND dir1!='articles'",
      Blog: "dir1='blog'",
      Articles: "dir1='articles'",
      // tslint:enable:object-literal-sort-keys
    },
    ['Blog', 'Articles'],
    true,
  );
