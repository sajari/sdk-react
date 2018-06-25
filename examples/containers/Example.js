import React, { Component } from "react";
import styled from "react-emotion";

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
