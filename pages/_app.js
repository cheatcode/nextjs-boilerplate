import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { Provider as ReduxProvider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { createGlobalStyle } from "styled-components";
import Navigation from "../components/Navigation";
import loginWithToken from "../lib/users/loginWithToken";
import store from "../lib/store";
import client from "../graphql/client";
import formatGraphqlError from "../lib/formatGraphqlError";
import isClient from "../lib/isClient";

import "bootstrap/dist/css/bootstrap.min.css";
import pong from "./pong.css";

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #4747f3;
    --success: #24dfa1;
    --warning: #ffcc00;
    --danger: #f44d3f;

    --gray-0: #fcfcfc;
    --gray-1: #eeeeee;
    --gray-2: #aaaaaa;
    --gray-3: #555555;
    --gray-4: #222222;
  }

  ${pong} /* CSS for /lib/pong.js alerts. */

  body > #__next > .container {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .input-hint {
    font-size: 15px;
    margin: 12px 0px 15px;
    color: var(--gray-2);
  }

  .input-hint.error {
    color: var(--danger);
  }

  .page-header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--gray-1);
    margin-bottom: 20px;
    padding-bottom: 20px;
  }

  .page-header h1,
  .page-header h2,
  .page-header h3,
  .page-header h4,
  .page-header h5,
  .page-header h6 {
    margin: 0;
  }

  .page-header button {
    margin-left: auto;
  }

  @media screen and (min-width: 768px) {
    body > #__next > .container {
      padding-top: 40px;
      padding-bottom: 40px;
    }
  }

  @media screen and (min-width: 768px) {
    body > #__next > .container {
      padding-top: 40px;
      padding-bottom: 40px;
    }
  }
`;

class App extends React.Component {
  state = {};

  async componentDidMount() {
    if (isClient) {
      loginWithToken().then((user) => {
        if (user && user._id) {
          store.dispatch({
            type: "LOGIN",
            authenticated: user && !!user._id,
            user,
          });
        }
      });
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <GlobalStyle />
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>App</title>
        </Head>
        <ReduxProvider store={store}>
          <ApolloProvider client={client}>
            <Navigation />
            <div className="container">
              <Component {...pageProps} />
            </div>
          </ApolloProvider>
        </ReduxProvider>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App;
