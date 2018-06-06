import * as React from "react";
// @ts-ignore: module missing type defs file
import memoize from "memoize-one";
// @ts-ignore: module missing type defs file
import isEqual from "deep-is";

import { Consumer as PipelineConsumer } from "../../context/pipeline/Consumer";
import { Context, InputContext } from "./context";
import { isNotEmptyString, isNotEmptyArray } from "../utils";

const pipelineConnect = (Component: React.ComponentType<ProviderProps>) => ({
  value,
  children
}: {
  [k: string]: any;
}) => (
  <PipelineConsumer>
    {({ search, instant }) => (
      <Component search={search} instant={instant} value={value}>
        {children}
      </Component>
    )}
  </PipelineConsumer>
);

export interface ProviderProps {
  search: any;
  instant: any;
  value: { [k: string]: any };
  children: RenderFn;
}

export type RenderFnProps = InputContext;
export type RenderFn = (props: RenderFnProps) => React.ReactNode;

export class Provider extends React.Component<ProviderProps> {
  private getContext = memoize(
    (state: { [k: string]: any }) => ({
      ...state,
      search: {
        search: (query: string, override: boolean) =>
          this.props.search.search(query, override),
        clear: (values?: { [k: string]: string | undefined }) =>
          this.props.search.clear(values)
      },
      instant: {
        search: (query: string, override: boolean) =>
          this.props.instant.search(query, override),
        clear: (values?: { [k: string]: string | undefined }) =>
          this.props.instant.clear(values)
      }
    }),
    isEqual
  );

  render() {
    const { children, search, instant } = this.props;

    const results =
      search.response !== null && search.response !== undefined
        ? search.response.getResults() || []
        : [];

    const value = this.getContext({
      ...this.props.value,
      query: isNotEmptyString(search.query, instant.query),
      completion: isNotEmptyString(search.completion, instant.completion),
      suggestions: isNotEmptyArray(search.suggestions, instant.suggestions),
      results
    });

    return (
      <Context.Provider value={value}>
        <Context.Consumer>{context => children(context)}</Context.Consumer>
      </Context.Provider>
    );
  }
}

export const InputProvider: React.SFC<{
  value: { [k: string]: any };
}> = pipelineConnect(Provider);
InputProvider.displayName = "InputProvider";
