import { AriaTextFieldOptions } from "@react-aria/textfield";
import { RangeProps } from "rc-slider";
import { RangeSliderProps } from "../RangeSlider";

export type RangeInputProps = RangeSliderProps & RangeProps;

export type RangeInputInputProps = AriaTextFieldOptions & {
  /** Label */
  label: string;
  /** Min value */
  min: number;
  /** Max value */
  max: number;
};
