export interface Theme {
  layout?: {
    type?: 'list' | 'grid';
  };

  colors?: {
    brand?: {
      primary?: string;
      secondary?: string;
    };
  };
}
