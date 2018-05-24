import { ThemeProvider } from "emotion-theming";
import * as React from "react";

import { IConfig } from "../../config";
import { Pipeline, Values } from "../../controllers";
import { IPipelineContext, PipelineProvider } from "./pipeline";
import { IProviderPipelineConfig } from "./pipeline/Provider";

export interface IProviderProps {
  search: IProviderPipelineConfig;
  instant?: IProviderPipelineConfig;

  theme?: { [k: string]: any };
}

export class Provider extends React.PureComponent<IProviderProps> {
  public render() {
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
