import React from "react";
import Router from "next/router";
import { connect } from "react-redux";

const publicRoute = (Component = null, options = {}) => {
  class PublicRoute extends React.Component {
    state = {
      loading: true,
    };

    componentDidMount() {
      if (!this.props.isLoggedIn) {
        this.setState({ loading: false });
      } else {
        Router.push(options.pathAfterFailure || "/documents");
      }
    }

    render() {
      const { loading } = this.state;

      if (loading) {
        return <div />;
      }

      return <Component {...this.props} />;
    }
  }

  return connect((state) => ({
    isLoggedIn: state?.authenticated && !!state?.user,
  }))(PublicRoute);
};

export default publicRoute;
