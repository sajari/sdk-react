export type ListViewType = 'list' | 'grid';

export interface ViewTypeProps {
  defaultView?: ListViewType;
  label?: string;
}
