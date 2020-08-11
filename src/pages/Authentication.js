import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { styles } from "./styles";
import { AuthContext } from "../App";
import { useHistory } from "react-router-dom";

export const getUser = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return user;
  } catch (err) {
    if (err === "not authenticated") {
      return null;
    } else {
      console.log(`Unexpected error: ${err}`);
      return null;
    }
  }
};

export const isAuthenticated = async () => {
  return getUser().then((res) => {
    return res ? true : false;
  });
};

const SignIn = () => {
  const { dispatch } = React.useContext(AuthContext);
  const initialFormData = { username: "", password: "" };
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(String);
  const history = useHistory();

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  async function signIn(event) {
    event.preventDefault();
    console.log("logging in");
    const { username, password } = formData;
    Auth.signIn(username, password)
      .then((res) => {
        dispatch({ type: "LOGIN", payload: {} });
        return res;
      })
      .then((res) => {
        history.goBack();
      })
      .catch((ex) => {
        console.log("error signing in", ex);
        setError(ex.message);
      });
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <input
        onChange={handleInputChange}
        name="username"
        style={styles.input}
        value={formData.username}
        placeholder="Username"
      />
      <input
        name="password"
        onChange={handleInputChange}
        style={styles.password}
        value={formData.password}
        type="password"
        placeholder="Password"
      />
      <div style={styles.error}>{error}</div>
      <button style={styles.button} onClick={signIn}>
        Sign In
      </button>
    </div>
  );
};
export default SignIn;
