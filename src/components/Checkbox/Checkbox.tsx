import * as React from "react";
import { FilterConsumer } from "../context/filter";
import { CheckedIcon, EmptyIcon } from "./icons";
import { Container, HiddenInput, icon as iconStyles } from "./styled";

export interface CheckboxProps {
  name: string;
}

export class Checkbox extends React.Component<CheckboxProps> {
  public render() {
    const { name } = this.props;

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
              <CheckboxIcon isChecked={isSelected} />
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
  ) => (event: any) => set(name, !isSelected);
}

const CheckboxIcon: React.SFC<{ isChecked: boolean }> = ({ isChecked }) => (
  <React.Fragment>
    {isChecked ? (
      <CheckedIcon
        fill="currentcolor"
        shapeRendering="geometricPrecision"
        className={iconStyles}
      />
    ) : (
      <EmptyIcon
        fill="currentcolor"
        shapeRendering="crispEdges"
        className={iconStyles}
      />
    )}
  </React.Fragment>
);
