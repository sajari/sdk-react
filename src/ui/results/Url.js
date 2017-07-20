import React from "react";

import TokenLink from "./TokenLink";

const Url = ({ url, token, resultClicked }) =>
  <p className="sj-result-url">
    <TokenLink
      token={token}
      url={url}
      text={url}
      resultClicked={resultClicked}
    />
  </p>;

export default Url;
