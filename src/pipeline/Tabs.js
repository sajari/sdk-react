import React from 'react'

import { State, VALUES_CHANGED } from 'sajari-react/pipeline/state'

const _state = State.default();


class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {selected: this.props.defaultTab};
    this.onValuesChange = this.onValuesChange.bind(this);
  }

  _state() {
    return State.ns(this.props.namespace);
  }

  componentDidMount() {
    this._state().registerListener(VALUES_CHANGED, this.onValuesChange);
  }

  componentWillUnmount() {
    this._state().unregisterListener(VALUES_CHANGED, this.onValuesChange);
  }

  onValuesChange() {
    let values = this._state().getValues();

    const { defaultTab, tabs } = this.props;

    let defaultTabFilter = undefined;
    tabs.forEach(t => {
      if (t.title === defaultTab) {
        defaultTabFilter = t.filter;
      }
    });

    if (!values["filter"] && defaultTabFilter) {
      this.setState({ selected: this.props.defaultTab });
      this._state().setValues({ filter: defaultTabFilter });
    }
  }

  onClickTab(title, filter) {
    this.setState({
      selected: title,
    })

    this._state().setValues({
      filter: filter,
    }, true);
  }

  render() {
    return (
      <div className='sj-tabs-container'>
        <div className='sj-tabs'>
          {this.props.tabs.map((t) => (
            <div
              key={t.title}
              className={`sj-tab${t.title === this.state.selected ? ' sj-tab-active' : ''}`}
              onClick={() => {this.onClickTab(t.title, t.filter)
              }}>
              {t.title}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

Tabs.defaultProps = {
  namespace: 'default',
}

export default Tabs