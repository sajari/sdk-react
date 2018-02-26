import React from "react";

import { Pipeline, Values } from "sajari-react/controllers";
import { Response, Results, Summary, Paginator } from "sajari-react/ui/results";
import { AutocompleteDropdown } from "sajari-react/ui/text";

import "sajari-react/ui/text/AutocompleteInput.css";
import "sajari-react/ui/text/AutocompleteDropdown.css";
import "sajari-react/ui/results/Results.css";
import "sajari-react/ui/results/Paginator.css";

import "./styles.css";

import SearchIcon from "./search.svg";

const project = "sajariptyltd";
const collection = "sajari-com";
const autocompletePipeline = new Pipeline(project, collection, "autocomplete");
const autocompleteValues = new Values();

const websitePipeline = new Pipeline(project, collection, "website");
const websiteValues = new Values();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
  }

  handleSearchIconClick = () => {
    this.setState(({ active }) => ({ active: !active }));
  };

  render() {
    const { active } = this.state;
    return (
      <div>
        <p className="info-text">Example nav bar</p>
        <div className="search-app">
          <div className="nav">
            <div className={"search-box-wrapper" + (active ? " active" : "")}>
              <h2 className="nav-title">Home</h2>
              <div>
                <AutocompleteDropdown
                  values={autocompleteValues}
                  pipeline={autocompletePipeline}
                  forceSearchValues={websiteValues}
                  forceSearchPipeline={websitePipeline}
                  numSuggestions={5}
                  placeholder="Type to search"
                />
                <img
                  id="nav-search-box-controller"
                  src={SearchIcon}
                  onClick={this.handleSearchIconClick}
                  alt="search icon"
                />
              </div>
            </div>
          </div>
          <Response pipeline={websitePipeline}>
            <Summary values={websiteValues} pipeline={websitePipeline} />
            <Results pipeline={websitePipeline} />
            <Paginator values={websiteValues} pipeline={websitePipeline} />
          </Response>
        </div>
      </div>
    );
  }
}

export default App;
