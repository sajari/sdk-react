import { AriaTextFieldOptions, TextFieldAria } from "@react-aria/textfield";
import { RangeProps } from "rc-slider";
import { RangeSliderProps } from "../RangeSlider";

export interface CustomInputProps {
  /** Usual props for the input and label to be accessible and work correctly */
  getCustomInputProps: () => TextFieldAria;
}

export type RangeInputProps = RangeSliderProps &
  RangeProps & {
    /** Left custom input */
    leftInput?: (props: CustomInputProps) => React.ReactNode;
    /** Right custom input */
    rightInput?: (props: CustomInputProps) => React.ReactNode;
  };

export type RangeInputInputProps = AriaTextFieldOptions & {
  /** Label */
  label: string;
  /** Min value */
  min: number;
  /** Max value */
  max: number;
};
