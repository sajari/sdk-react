import React from "react";

import {
  Filter,
  selectionUpdatedEvent,
  optionsUpdatedEvent,
  Pipeline,
  responseUpdatedEvent,
  Values
} from "sajari-react/controllers";
import { CheckboxFacet } from "sajari-react/ui/facets";
import { AutocompleteInput } from "sajari-react/ui/text";
import { Response, Results, Summary, Paginator } from "sajari-react/ui/results";

import "sajari-react/ui/text/AutocompleteInput.css";
import "sajari-react/ui/results/Paginator.css";
import "sajari-react/ui/results/Results.css";

const pipeline = new Pipeline("sajariptyltd", "sajari-com", "website");
const values = new Values();

// Setup the counting aggregate on field dir1.
values.set({ count: "dir1" });

// Create a categorisation filter.
const categoryFilter = new Filter({}, [], true);
values.set({ filter: () => categoryFilter.filter() });

// Trigger a search when the selection of the filter
// changes.
categoryFilter.listen(selectionUpdatedEvent, () => {
  pipeline.search(values);
});

// Listen for responses combing back and populate
// categoryFilter with aggregate result.
pipeline.listen(responseUpdatedEvent, response => {
  if (response.isEmpty() || response.isError()) {
    // Empty or error in response, should clear filter
    // options.
    const clearOpt = {};
    Object.keys(categoryFilter.getOptions()).forEach(
      k => (clearOpt[k] = undefined)
    );
    categoryFilter.setOptions(clearOpt);
    return;
  }

  const opts = CountAggregateFilterOptions(response, "dir1");
  categoryFilter.setOptions(opts);
});

/**
 * Convert aggregate data from a Response into a filter
 * option dictionary.
 * 
 * @param {sajari-react/controllers/Response} response Response from search. Assumed
 * to be non-empty and not an error (see Response.isEmpty() and Response.isError()).
 * @param {string} field Field aggregate was run on.
 */
const CountAggregateFilterOptions = (response, field) => {
  // Extract the aggregates from the response.
  const aggs = response.getAggregates();
  const countAggs = aggs[`count.${field}`]["count"]["counts"];

  let opts = {};
  Object.keys(countAggs).forEach(c => {
    // Setup the name -> filter pair.
    opts[c] = `${field}='${c}'`;
  });
  return opts;
};

class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = { categories: [] };
  }

  componentDidMount() {
    this.unregister = this.props.filter.listen(
      optionsUpdatedEvent,
      this.optionsUpdated
    );
  }

  componentWillUnmount() {
    this.unregister();
  }

  optionsUpdated = () => {
    this.setState({
      categories: Object.keys(this.props.filter.getOptions()).filter(
        k => k.length > 0
      )
    });
  };

  render() {
    const categories = this.state.categories.map(c =>
      <div key={c}>
        <CheckboxFacet filter={this.props.filter} name={c} />
        <label>
          {c[0].toUpperCase() + c.slice(1)}
        </label>
      </div>
    );

    if (categories.length > 0) {
      return (
        <div>
          <h3>Categories</h3>
          {categories}
        </div>
      );
    }
    return null;
  }
}

const App = () =>
  <div className="searchApp">
    <div className="left">
      <Categories values={values} pipeline={pipeline} filter={categoryFilter} />
    </div>
    <div className="right">
      <AutocompleteInput pipeline={pipeline} values={values} />
      <Response pipeline={pipeline}>
        <Summary values={values} pipeline={pipeline} />
        <Results pipeline={pipeline} />
        <Paginator values={values} pipeline={pipeline} />
      </Response>
    </div>
  </div>;

export default App;
