import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { Provider as ReduxProvider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import Navigation from "../components/Navigation";
import loginWithToken from "../lib/users/loginWithToken";
import store from "../lib/store";
import pong from "../lib/pong";
import client from "../graphql/client";

import "../styles/styles.css";

class App extends React.Component {
  state = {
    loading: true,
  };

  async componentDidMount() {
    const user = typeof window !== "undefined" ? await loginWithToken() : null;

    if (user && user._id) {
      store.dispatch({
        type: "LOGIN",
        authenticated: user && !!user._id,
        user,
      });
    }

    this.setState({ loading: false });
  }

  render() {
    const { Component, pageProps } = this.props;
    const { loading } = this.state;

    if (loading) return <div />;

    return (
      <React.Fragment>
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
  Component: PropTypes.object.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App;
