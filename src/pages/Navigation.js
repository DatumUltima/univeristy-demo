import React from "react";
import { Auth } from "aws-amplify";
import { getUser } from "./Authentication";
import { Redirect } from "react-router-dom";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
    };
  }

  async signOut() {
    try {
      await Auth.signOut();
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    const loggedIn = getUser() ? true : false;
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
              <a className="nav-item nav-link" href="/todo">
                ToDos
                <span className="sr-only">(current)</span>
              </a>
            </div>
            {loggedIn ? (
              <div className="navbar-nav">
                <a
                  className="nav-item nav-link"
                  href="#"
                  onClick={this.signOut}
                >
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
  }
}
export { Nav };
export default Nav;
