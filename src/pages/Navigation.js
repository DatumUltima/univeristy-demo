import React from "react";
import { Auth } from "aws-amplify";
import { AuthContext } from "../App";

const Nav = () => {
  const { state, dispatch } = React.useContext(AuthContext);

  function signOut( event ) {
    event.preventDefault();
    console.log("logging out")
    Auth.signOut()
      .then((res) => {
        dispatch({ type: "LOGOUT", payload: {} });
        return res;
      })
      .catch((ex) => {
        console.log("error signing in", ex);
      });
  }

  return (
    <div className="navbar navbar-default navbar-fixed-top navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link" href="/">
              Home
              <span className="sr-only">(current)</span>
            </a>
          </div>
          <div className="navbar-nav">
            <a className="nav-item nav-link" href="/grants">
              Grants
              <span className="sr-only">(current)</span>
            </a>
          </div>
          {state.isAuthenticated ? (
            <div className="navbar-nav">
              <a className="nav-item nav-link" onClick={signOut}>
                Logout
              </a>
            </div>
          ) : (
            <div className="navbar-nav">
              <a className="nav-item nav-link" href="/login">
                Login
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Nav;
