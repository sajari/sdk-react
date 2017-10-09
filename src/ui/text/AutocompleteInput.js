import React from "react";
import PropTypes from "prop-types";

import {
  Pipeline,
  Values,
  responseUpdatedEvent,
  valuesUpdatedEvent
} from "../../controllers";

const RIGHT_ARROW_KEYCODE = 39;
const TAB_KEYCODE = 9;
const RETURN_KEYCODE = 13;

const getState = (values, pipeline, qParam) => {
  const text = values.get()[qParam] || "";
  const responseValues = pipeline.getResponse().getValues();
  const completion = text && responseValues ? responseValues[qParam] || "" : "";
  return { text, completion };
};

class AutocompleteInput extends React.Component {
  /**
   * propTypes
   * @property {Values} values Values object.
   * @property {Pipeline} pipeline Pipeline object.
   * @property {string} placeholder Placeholder to use.
   * @property {string} [qParam="q"] Search parameter.
   * @property {string} [qOverrideParam="q.override"] Override parameter.
   * @property {boolean} [autoFocus=false] Whether to focus the input element.
   */
  static get propTypes() {
    return {
      values: PropTypes.instanceOf(Values).isRequired,
      pipeline: PropTypes.instanceOf(Pipeline).isRequired,
      placeholder: PropTypes.string,
      qParam: PropTypes.string,
      qOverrideParam: PropTypes.string,
      autoFocus: PropTypes.bool
    };
  }

  constructor(props) {
    super(props);

    this.state = getState(props.values, props.pipeline, props.qParam);
  }

  componentDidMount() {
    this.removeValuesListener = this.props.values.listen(
      valuesUpdatedEvent,
      this.valuesChanged
    );
    this.removeResponseListener = this.props.pipeline.listen(
      responseUpdatedEvent,
      this.valuesChanged
    );
  }

  componentWillUnmount() {
    this.removeValuesListener();
    this.removeResponseListener();
  }

  valuesChanged = () => {
    this.setState(
      getState(this.props.values, this.props.pipeline, this.props.qParam)
    );
  };

  setText = (text, override = false) => {
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
  };

  handleChange = e => {
    this.setText(e.target.value);
  };

  handleKeyDown = e => {
    const { text, completion } = this.state;
    if (e.keyCode === RETURN_KEYCODE) {
      e.preventDefault();
      this.setText(text, true);
    }
    if (!completion) {
      return;
    }
    if (
      e.keyCode === TAB_KEYCODE ||
      (e.keyCode === RIGHT_ARROW_KEYCODE &&
        e.target.selectionStart === text.length)
    ) {
      e.preventDefault();
      this.setText(completion);
    }
  };

  render() {
    const { text, completion } = this.state;
    const { placeholder, autoFocus } = this.props;

    return (
      <div className="sj-search-holder-outer">
        <div className="sj-search-holder-inner">
          <input
            type="text"
            className="sj-search-bar-completion sj-search-bar-input-common"
            value={completion.indexOf(text) === 0 ? completion : text}
            readOnly
          />
          <input
            type="text"
            className="sj-search-bar-input sj-search-bar-input-common"
            placeholder={placeholder}
            autoFocus={autoFocus}
            value={text}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
        </div>
      </div>
    );
  }
}

AutocompleteInput.defaultProps = {
  qParam: "q",
  qOverrideParam: "q.override",
  placeHolder: "Type to search"
};

export default AutocompleteInput;
