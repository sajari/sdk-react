import React from "react";
import { SwatchProps } from "./types";

const SwatchContext = React.createContext<
  Omit<Required<SwatchProps>, "children">
>({
  checkedColors: [],
  onChange: () => {}
});

export const SwatchProvider = ({
  children,
  ...rest
}: Required<SwatchProps>) => {
  return (
    <SwatchContext.Provider value={rest}>{children}</SwatchContext.Provider>
  );
};

export const useSwatch = () => React.useContext(SwatchContext);
