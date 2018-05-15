import React, { Fragment } from "react";
import { Route, Link, Switch, withRouter } from "react-router-dom";
import styled, { injectGlobal } from "react-emotion";
import { Example } from "../containers/Example";

injectGlobal({
  html: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
  },
  "html, body": {
    padding: 0,
    margin: 0,
    height: "100%",
    width: "100%"
  }
});

export default ({ examples }) => (
  <Fragment>
    <Header>
      <Title>Sajari React SDK - Examples</Title>
      <Navigation>
        <TabContainer>
          {examples.map(({ to, label }) => (
            <RouterTab key={label} to={to}>
              <Link to={to}>{label}</Link>
            </RouterTab>
          ))}
        </TabContainer>
      </Navigation>
    </Header>

    <Switch>
      {examples.map(({ to, label, component: Component }) => (
        <Route
          key={label}
          exact
          path={to}
          render={() => {
            return (
              <Example>
                <Component />
              </Example>
            );
          }}
        />
      ))}
    </Switch>
  </Fragment>
);

const Header = styled("header")({
  padding: "1rem"
});

const Title = styled("h1")({
  marginTop: 0
});

const Navigation = styled("nav")({
  borderBottom: "1px solid #ebebeb",
  color: "#777",
  width: "100%",
  marginBottom: "1em"
});

const TabContainer = styled("ul")({
  padding: 0,
  margin: 0,
  overflow: "auto",
  whiteSpace: "nowrap",
  color: "#777"
});

const Tab = styled("li")(
  {
    display: "inline-block",
    fontSize: 16,
    cursor: "pointer",
    margin: 0,
    padding: ".9em",
    userSelect: "none",
    a: {
      color: "#777",
      textDecoration: "none"
    }
  },
  ({ location: { pathname }, to }) =>
    pathname === to
      ? {
          a: { color: " #333" },
          borderBottom: "3px solid #333"
        }
      : {}
);

const RouterTab = withRouter(Tab);
