export interface Theme {
  layout?: {
    type?: "list" | "grid";
    custom?: {
      container?: React.CSSProperties;
      item?: React.CSSProperties;
    };
  };

  colors?: {
    brand?: {
      primary?: string;
      secondary?: string;
    };
  };
}
