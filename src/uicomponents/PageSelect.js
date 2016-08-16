import React from 'react';

import Page from '../components/Page.js';

class PageSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 1 };

    this.onPageChange = this.onPageChange.bind(this);
  }

  onPageChange(evt) {
    this.setState({
      page: Number(evt.target.value),
    });
  }

  render() {
    const { options, ...others } = this.props;
    const optionElements = options.map((n) => (
      <option value={n} key={n}>{n}</option>
    ));

    return (
      <select value={this.state.page} onChange={this.onPageChange}>
        {optionElements}
        <Page
          {...others}
          page={this.state.page}
        />
      </select>
    );
  }
}

PageSelect.propTypes = {
  options: React.PropTypes.arrayOf(React.PropTypes.number),
};

export default Page;
