import React from 'react';
import { SwatchProps } from './types';

interface SwatchContextProps {
  state: string[];
  setState: (checkedColors: string[]) => void;
}

const SwatchContext = React.createContext<SwatchContextProps>({
  state: [],
  setState: () => {},
});

export const SwatchProvider = ({ children, checkedColors, onChange }: Required<SwatchProps>) => (
  <SwatchContext.Provider value={{ state: checkedColors, setState: onChange }}>{children}</SwatchContext.Provider>
);

export const useSwatch = () => React.useContext(SwatchContext);
