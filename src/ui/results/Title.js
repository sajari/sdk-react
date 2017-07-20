import React from "react";

const Title = ({ title, url, token, resultClicked }) =>
  <h3 className="sj-result-title">
    <TokenLink
      token={token}
      url={url}
      text={title}
      resultClicked={resultClicked}
    />
  </h3>;

export default Title;
