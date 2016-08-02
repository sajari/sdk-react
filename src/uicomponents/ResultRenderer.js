import React from "react";

export default class ResultRenderer extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    fields: React.PropTypes.arrayOf(React.PropTypes.string),
  };

  constructor(props) {
    super(props);
  }

  render() {
    const results = this.props.results ? (
      this.props.results.map(r => (
        <div className="panel panel-default" key={r.meta._id}>
          {this.props.title ? (
            <div className="panel-heading">
              <h3 className="panel-title">
                {r.meta[this.props.title]}
              </h3>
            </div>
          ) : null}
          {this.props.fields ? (
            <div className="panel-body">
              {this.props.fields.map(f => <p>{r.meta[f]}</p>)}
            </div>
          ) : null}
        </div>
      ))
    ) : null;
    return (
      <div>
        {results}
      </div>
    );
  }
}
