import React from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { logout as logoutMutation } from "../../graphql/mutations/Users.gql";

const Navigation = ({ user, logoutOnClient }) => {
  const router = useRouter();
  const [logoutOnServer] = useMutation(logoutMutation);

  const handleLogout = (event) => {
    event.stopPropagation();
    logoutOnServer().then(() => {
      logoutOnClient();
      router.push("/login");
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link href="/">
          <a className="navbar-brand" href="#">
            App
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {user && (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link href="/documents">
                  <a
                    className={`nav-link ${
                      "/documents" === router.pathname ? "active" : ""
                    }`}
                  >
                    Documents
                  </a>
                </Link>
              </li>
            </ul>
          )}
          {user ? (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user && user.emailAddress}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li onClick={handleLogout}>
                    <a href="#" className="dropdown-item">
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link href="/login">
                  <a
                    className={`nav-link ${
                      "/login" === router.pathname ? "active" : ""
                    }`}
                  >
                    Login
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/signup">
                  <a
                    className={`nav-link ${
                      "/signup" === router.pathname ? "active" : ""
                    }`}
                  >
                    Signup
                  </a>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default connect(
  (state) => ({
    user: state.user,
  }),
  (dispatch) => ({
    logoutOnClient: () => dispatch({ type: "LOGOUT" }),
  })
)(Navigation);
