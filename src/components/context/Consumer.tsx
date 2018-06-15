import * as React from "react";

// @ts-ignore: module missing definintions file
import { LiveMessenger } from "react-aria-live";
import { PipelineConsumer, PipelineContext } from "./pipeline";

export interface AriaMessengerValue {
  announcePolite: (message: string) => void;
  announceAssertive: (message: string) => void;
}

export type RenderFn = (
  props: PipelineContext & AriaMessengerValue
) => React.ReactNode;

export class Consumer extends React.Component<{ children?: RenderFn }> {
  public render() {
    const { children } = this.props;

    if (typeof children !== "function") {
      throw new Error("Consumer requires a render function as a child");
    }

    return (
      <PipelineConsumer>
        {searchValue => (
          <LiveMessenger>
            {(ariaValue: AriaMessengerValue) =>
              children({ ...searchValue, ...ariaValue })
            }
          </LiveMessenger>
        )}
      </PipelineConsumer>
    );
  }
}
