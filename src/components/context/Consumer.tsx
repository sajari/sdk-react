import * as React from "react";

import { PipelineConsumer, PipelineContext } from "./pipeline";

export type RenderFn = (props: PipelineContext) => React.ReactNode;

export class Consumer extends React.Component<{ children?: RenderFn }> {
  public render() {
    const { children } = this.props;

    if (typeof children !== "function") {
      // https://reactpatterns.com/#function-as-children
      throw new Error("Consumer requires a function as children");
    }

    return (
      <PipelineConsumer>
        {searchValue => children({ ...searchValue })}
      </PipelineConsumer>
    );
  }
}
