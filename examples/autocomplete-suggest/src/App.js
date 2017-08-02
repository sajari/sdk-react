import React from "react";
import PropTypes from "prop-types";

import {
  Pipeline,
  Values,
  responseUpdatedEvent
} from "sajari-react/controllers";
import { AutocompleteInput } from "sajari-react/ui/text";

import "sajari-react/ui/text/AutocompleteInput.css";

import "./AutocompleteSuggestions.css";

const pipeline = new Pipeline("sajariptyltd", "sajari-com", "autocomplete");
const values = new Values();

const AutocompleteSuggestion = ({ text, suggestion, setText }) => {
  let prefix = null;
  let prefixLen = 0;
  if (suggestion.substr(0, text.length) === text) {
    prefix = (
      <strong>
        {text}
      </strong>
    );
    prefixLen = text.length;
  }

  return (
    <div className="suggestion" onClick={() => setText(suggestion)}>
      {prefix}
      {suggestion.substr(prefixLen)}
    </div>
  );
};

class AutocompleteSuggestions extends React.Component {
  /**
   * propTypes
   * @property {Values} values Values object.
   * @property {Pipeline} pipeline Pipeline object.
   * @property {string} [qParam="q"] Search parameter.
   * @property {string} [qOverrideParam="q.override"] Override parameter.
   * @property {boolean} [focus=false] Whether to focus the input element.
   */
  static get propTypes() {
    return {
      values: PropTypes.instanceOf(Values).isRequired,
      pipeline: PropTypes.instanceOf(Pipeline).isRequired,
      qParam: PropTypes.string,
      qOverrideParam: PropTypes.string
    };
  }

  constructor(props) {
    super(props);

    this.state = { response: this.props.pipeline.getResponse() };
    this.setText = this.setText.bind(this);
  }

  componentDidMount() {
    this.removeResponseListener = this.props.pipeline.listen(
      responseUpdatedEvent,
      this.responseUpdated.bind(this)
    );
  }

  componentWillUnmount() {
    this.removeResponseListener();
  }

  responseUpdated(response) {
    this.setState({ response });
  }

  setText(text, override = false) {
    const textValues = {
      [this.props.qParam]: text,
      [this.props.qOverrideParam]: override ? "true" : undefined
    };
    this.props.values.set(textValues);
    if (textValues[this.props.qParam]) {
      this.props.pipeline.search(this.props.values.get());
    } else {
      this.props.pipeline.clearResponse(this.props.values.get());
    }
  }

  render() {
    const { response } = this.state;
    if (response.isEmpty()) {
      return null;
    }

    if (response.isError()) {
      return (
        <div className="suggestions">
          There was an error running the request.
        </div>
      );
    }

    const values = response.getValues();
    const suggestions = values["q.suggestions"];
    if (!suggestions) {
      return null;
    }

    return (
      <div className="suggestions">
        {suggestions
          .split(",")
          .map(x =>
            <AutocompleteSuggestion
              key={x}
              suggestion={x}
              text={response.getQueryValues()["q"]}
              setText={this.setText}
            />
          )}
      </div>
    );
  }
}

AutocompleteSuggestions.defaultProps = {
  qParam: "q",
  qOverrideParam: "q.override"
};

const App = () =>
  <div className="searchApp">
    <AutocompleteInput values={values} pipeline={pipeline} />
    <AutocompleteSuggestions values={values} pipeline={pipeline} />
  </div>;

export default App;
