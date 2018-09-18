import * as React from "react";
import { FilterConsumer } from "../context/filter";
import { Container, HiddenInput, NativeInput } from "./styled";

export interface CheckboxProps {
  name: string;
  CheckboxRenderer?: React.ComponentType<CheckboxRendererProps>;
}

export interface CheckboxRendererProps {
  isChecked: boolean;
}

export class Checkbox extends React.Component<CheckboxProps> {
  public render() {
    const { name, CheckboxRenderer = NativeCheckbox } = this.props;

    return (
      <FilterConsumer>
        {({ selected, set }) => {
          const isSelected = selected.includes(name);
          return (
            <Container
              isSelected={isSelected}
              onClick={this.onClick(name, isSelected, set)}
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
