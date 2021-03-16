import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import Link from "next/link";
import { logout as logoutMutation } from "../../graphql/mutations/Users.gql";
import NavigationLink from "../NavigationLink";

const Navigation = ({ user, logoutOnClient }) => {
  const router = useRouter();
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [logoutOnServer] = useMutation(logoutMutation);

  const handleRouteChange = () => {
    setNavigationOpen(false);
  };

  const handleLogout = () => {
    logoutOnServer().then(() => {
      logoutOnClient();
      router.push("/login");
    });
  };

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  return (
    <div className={`navigation ${navigationOpen ? "open" : ""}`}>
      <div className="container">
        <Link href="/" passHref>
          <a className="brand">App</a>
        </Link>
        <i
          className="fas fa-bars"
          onClick={() => setNavigationOpen(!navigationOpen)}
        />
        <div className="navigation-items">
          {user && (
            <ul>
              <NavigationLink href="/documents">Documents</NavigationLink>
            </ul>
          )}
          {user ? (
            <ul className="navigation-right">
              <li className="dropdown">
                <span>
                  {user && user.emailAddress}{" "}
                  <i className="fas fa-chevron-down" />
                </span>
                <ul className="dropdown">
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              </li>
            </ul>
          ) : (
            <ul className="navigation-right">
              <NavigationLink href="/login">Login</NavigationLink>
              <NavigationLink href="/signup">Signup</NavigationLink>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

Navigation.propTypes = {};

export default connect(
  (state) => ({
    user: state.user,
  }),
  (dispatch) => ({
    logoutOnClient: () => dispatch({ type: "LOGOUT" }),
  })
)(Navigation);
