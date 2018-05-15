import React, { Component } from "react";
import CodeSandboxer from "react-codesandboxer";
import styled from "react-emotion";

const AddToCodesandbox = ({ example }) => (
  <CodeSandboxer
    examplePath={example}
    gitInfo={{
      account: "sajari",
      repository: "sajari-react",
      host: "github"
    }}
  >
    {() => <button type="submit">Upload to CodeSandbox</button>}
  </CodeSandboxer>
);

export const Example = ({ children }) => (
  <Container>
    <InterfaceContainer>{children}</InterfaceContainer>
  </Container>
);

const Container = styled("div")({
  boxSizing: "border-box",
  height: "100%"
});

const InterfaceContainer = styled("div")({
  boxSizing: "border-box",
  padding: "1rem",
  minHeight: "100%"
});
