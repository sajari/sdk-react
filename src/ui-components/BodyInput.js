import React from 'react';

import Body from '../api-components/Body.js';

class BodyInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: props.body };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(evt) {
    this.setState({ text: evt.target.value });
  }

  render() {
    const { namespace, ...others } = this.props;

    return (
      <div>
        <input
          type='text'
          value={this.state.text}
          onChange={this.onInputChange}
        />
        <Body
          {...others}
          namespace={namespace}
          body={this.state.text}
        />
      </div>
    );
  }
}

BodyInput.propTypes = {
  body: React.PropTypes.string,
  namespace: React.PropTypes.string,
};

BodyInput.defaultProps = {
  body: '',
  namespace: 'default',
};

export default BodyInput;
