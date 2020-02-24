import * as React from "react";
import { FilterConsumer } from "../context/filter";
import { Container, HiddenInput, NativeInput } from "./styled";

export interface CheckboxProps {
  name: string;
  all?: boolean;
  CheckboxRenderer?: React.ComponentType<CheckboxRendererProps>;
}

export interface CheckboxRendererProps {
  isChecked: boolean;
}

export class Checkbox extends React.Component<CheckboxProps> {
  public render() {
    const { name, all, CheckboxRenderer = NativeCheckbox } = this.props;

    return (
      <FilterConsumer>
        {({ selected, options, set }) => {
          const isSelected = all
            ? selected.length === 0
            : selected.includes(name);
          return (
            <Container
              isSelected={isSelected}
              onClick={
                all
                  ? () => {
                      Object.keys(options).forEach(k => set(k, false));
                    }
                  : this.onClick(name, isSelected, set)
              }
            >
              <HiddenInput type="checkbox" value={name} checked={isSelected} />
              <CheckboxRenderer isChecked={isSelected} />
            </Container>
          );
        }}
      </FilterConsumer>
    );
  }

  private onClick = (
    name: string,
    isSelected: boolean,
    set: (name: string, value: boolean) => void
  ) => () => set(name, !isSelected);
}

const NativeCheckbox: React.SFC<CheckboxRendererProps> = ({ isChecked }) => (
  <NativeInput type="checkbox" checked={isChecked} />
);
