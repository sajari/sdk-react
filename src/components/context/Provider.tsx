import { ThemeProvider } from "emotion-theming";
import * as React from "react";
// @ts-ignore: module missing definintions file
import { LiveAnnouncer } from "react-aria-live";

import { Config } from "../../config";
import { Pipeline, Values } from "../../controllers";
import { PipelineContext, PipelineProvider } from "./pipeline";
import { ProviderPipelineConfig } from "./pipeline/Provider";

export interface ProviderProps {
  search: ProviderPipelineConfig;
  instant?: ProviderPipelineConfig;

  theme?: { [k: string]: any };
  searchOnLoad?: boolean;
}

export class Provider extends React.PureComponent<ProviderProps> {
  public render() {
    const { search, instant, theme, searchOnLoad, children } = this.props;

    return (
      <PipelineProvider
        search={search}
        instant={instant}
        searchOnLoad={searchOnLoad}
      >
        <ThemeProvider theme={theme || {}}>
          <React.Fragment>
            <LiveAnnouncer>{children}</LiveAnnouncer>
          </React.Fragment>
        </ThemeProvider>
      </PipelineProvider>
    );
  }
}
