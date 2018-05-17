import * as React from "react";
import { ThemeProvider } from "emotion-theming";

import { PipelineProvider, IPipelineContext } from "./pipeline";
import { ProviderPipelineConfig } from "./pipeline/Provider";
import { Pipeline, Values } from "../../controllers";
import { IConfig } from "../../config";

export interface IProviderProps {
  search: ProviderPipelineConfig;
  instant?: ProviderPipelineConfig;

  theme?: { [k: string]: any };
}

export class Provider extends React.PureComponent<IProviderProps> {
  render() {
    const { search, instant, theme, children } = this.props;

    return (
      <PipelineProvider search={search} instant={instant}>
        <ThemeProvider theme={theme || {}}>
          <React.Fragment>{children}</React.Fragment>
        </ThemeProvider>
      </PipelineProvider>
    );
  }
}
