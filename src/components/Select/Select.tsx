import memoize from "fast-memoize";
import * as React from "react";
// @ts-ignore: module missing defintion file
import ReactSelect from "react-select";

import { Filter, Options } from "../../controllers/filter";
import { FilterConsumer, FilterProvider } from "../context/filter";
import { styles as defaultStyles } from "./styled";

export interface SelectProps {
  filter: Filter;
}

export const Select: React.SFC<SelectProps> = ({ filter }) => (
  <FilterProvider filter={filter}>
    <FilterConsumer>
      {({ options, selected, set }) => {
        const opts = mapOptions(options);
        const defaultValue = opts.filter(x => x.label === selected[0]).pop();

        return (
          <ReactSelect
            key={"1" + defaultValue}
            defaultValue={defaultValue}
            isClearable={true}
            options={mapOptions(options)}
            onChange={handleChange(selected, set)}
            styles={defaultStyles}
          />
        );
      }}
    </FilterConsumer>
  </FilterProvider>
);

const mapOptions = memoize((options: Options) =>
  Object.entries(options).map(([label, value]) => ({
    label,
    value
  }))
);

const ActionSelect = "select-option";
const ActionPop = "pop-value";
const ActionClear = "clear";

const handleChange = (
  selected: string[],
  set: (name: string, value: boolean) => void
) => (value: any, { action }: any) => {
  switch (action) {
    case ActionSelect:
      set(value.label, true);
      break;
    case ActionPop:
      set(selected[0], false);
      break;
    case ActionClear:
      selected.forEach(option => {
        set(option, false);
      });
      break;

    default:
      break;
  }
};
