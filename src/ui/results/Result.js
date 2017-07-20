import React from "react";

import { TokenLink, Image, Title, Description, Url } from "./";

const Result = ({
  title,
  description,
  url,
  token,
  showImage,
  image,
  resultClicked
}) =>
  <div className="sj-result">
    {showImage && image
      ? <div className="sj-result-image-container">
          <TokenLink token={token} url={url}>
            <Image url={image} title={title} />
          </TokenLink>
        </div>
      : null}
    <div className="sj-result-text">
      <Title
        title={title}
        url={url}
        token={token}
        resultClicked={resultClicked}
      />
      <Description description={description} />
      <Url url={url} token={token} resultClicked={resultClicked} />
    </div>
  </div>;

export default Result;
