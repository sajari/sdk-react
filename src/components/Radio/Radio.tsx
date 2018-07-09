import * as React from "react";
import { FilterConsumer } from "../context/filter";
import { Container, HiddenInput, NativeInput } from "./styled";

export interface RadioProps {
  name: string;
  RadioRenderer?: React.ComponentType<RadioRendererProps>;
}

export interface RadioRendererProps {
  isChecked: boolean;
}

export class Radio extends React.Component<RadioProps> {
  public render() {
    const { name, RadioRenderer = NativeRadio } = this.props;

    return (
      <FilterConsumer>
        {({ selected, set }) => {
          const isSelected = selected.includes(name);
          return (
            <Container
              isSelected={isSelected}
              onClick={this.onClick(name, isSelected, set)}
            >
              <HiddenInput type="radio" value={name} checked={isSelected} />
              <RadioRenderer isChecked={isSelected} />
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
  ) => (event: any) => {
    if (isSelected) {
      return;
    }

    set(name, !isSelected);
  };
}

const NativeRadio: React.SFC<RadioRendererProps> = ({ isChecked }) => (
  <NativeInput type="radio" checked={isChecked} />
);
