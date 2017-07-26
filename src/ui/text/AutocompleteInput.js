import React from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";

import { Tracking } from "sajari";

import { Pipeline, Values, resultsEvent, changeEvent } from "../../controllers";

const RIGHT_ARROW_KEYCODE = 39;
const TAB_KEYCODE = 9;
const RETURN_KEYCODE = 13;

class AutocompleteInput extends React.Component {
  /**
   * propTypes
   * @property {Values} values Values object.
   * @property {Pipeline} pipeline Pipeline object.
   * @property {Tracking} tracking Tracking object.
   * @property {string} [qParam="q"] Search parameter.
   * @property {string} [qOverrideParam="q.override"] Override parameter.
   * @property {boolean} [focus=false] Whether to focus the input element.
   */
  static get propTypes() {
    return {
      values: PropTypes.instanceOf(Values).isRequired,
      pipeline: PropTypes.instanceOf(Pipeline).isRequired,
      tracking: PropTypes.instanceOf(Tracking).isRequired,
      qParam: PropTypes.string,
      qOverrideParam: PropTypes.string,
      focus: PropTypes.bool
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      ...this.getState(props.values, props.pipeline, props.qParam),
      qParam: props.qParam,
      qOverrideParam: props.qOverrideParam
    };
  }

  componentDidMount() {
    this.removeValuesListener = this.props.values.listen(
      changeEvent,
      this.valuesChanged
    );
    this.removeResultsListener = this.props.pipeline.listen(
      resultsEvent,
      this.valuesChanged
    );
  }

  componentWillUnmount() {
    this.removeValuesListener();
    this.removeResultsListener();
  }

  getState = (values, pipeline, qParam) => {
    const text = values.get()[qParam] || "";
    const responseValues = pipeline.getResponseValues();
    const completion =
      text && responseValues ? responseValues[qParam] || "" : "";
    return { text, completion };
  };

  valuesChanged = () => {
    this.setState(
      this.getState(this.props.values, this.props.pipeline, this.state.qParam)
    );
  };

  setText = (text, override = false) => {
    const textValues = {
      [this.state.qParam]: text,
      [this.state.qOverrideParam]: override ? "true" : undefined
    };
    this.props.values.set(textValues);
    if (textValues[this.state.qParam]) {
      this.props.pipeline.search(this.props.values, this.props.tracking);
    } else {
      this.props.pipeline.clearResults();
      this.props.pipeline.emitTrackingReset();
    }
  };

  handleChange = e => {
    this.setText(e.target.value);
  };

  handleKeyDown = e => {
    if (e.keyCode === RETURN_KEYCODE) {
      e.preventDefault();
      this.setText(text, true);
    }
    if (!this.state.completion) {
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
    const { placeHolder, focus } = this.props;

    return (
      <div className="sj-search-input-holder-outer">
        <div className="sj-search-input-holder-inner">
          <input
            type="text"
            className="sj-search-bar-completion sj-search-bar-input-common"
            value={completion.indexOf(text) === 0 ? completion : text}
            readOnly
          />
          <input
            type="text"
            className="sj-search-bar-input sj-search-bar-input-common"
            placeholder={placeHolder}
            autoFocus={focus}
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
  qOverrideParam: "q.override"
};

export default AutocompleteInput;
