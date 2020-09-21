import React from "react";
import { As, ComponentWithAs } from "../types/component-as";

export function forwardRefWithAs<Props, DefaultType extends As>(
  component: React.ForwardRefRenderFunction<any, any>
) {
  return (React.forwardRef(component) as unknown) as ComponentWithAs<
    Props,
    DefaultType
  >;
}
