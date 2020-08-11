import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { styles } from "./styles";

import { listGrants } from "../graphql/queries";
import { Link, useHistory } from "react-router-dom";
import { getUser } from "./Authentication";

const UIState = {
  Loading: "Loading",
  Error: "Error",
  Unauthorized: "Unauthorized",
  Loaded: "Loaded",
};

const GrantList = () => {
  const history = useHistory();
  const [grantList, setGrantList] = useState([]);
  const [uiState, setUIState] = useState(UIState.Loading);
  const [error, setError] = useState([]);

  useEffect(() => {
    getGrants();
  }, []);

  async function getGrants() {
    const user = await getUser();
    console.log("called");
    if (user == null) {
      history.push("/login");
    }
    API.graphql(graphqlOperation(listGrants))
      .then((res) => {
        setGrantList(res.data.listGrants.items);
        setUIState(UIState.Loaded);
      })
      .catch((ex) => {
        if (ex.errors[0].message === "Request failed with status code 401") {
          setUIState(UIState.Unauthorized);
        } else {
          console.log("error fetching grants");
          console.log(ex);
          setError(ex.errors[0].message);
          setUIState(UIState.Error);
        }
      });
  }

  switch (uiState) {
    case UIState.Loading:
      return <div className="container">Loading...</div>;
    case UIState.Loaded:
      return (
        <div className="container">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Description</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {grantList.map((grant, index) => (
                <tr key={grant.id}>
                  <td>{grant.name}</td>
                  <td>{grant.description}</td>
                  <td>{grant.status}</td>
                  <td>
                    <Link to={"/grants/" + grant.id}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <Link style={styles.button} to="/grants/new">
            Create Grant
          </Link>
        </div>
      );
    case UIState.Error:
      return <div className="container">An error has ocurred {error}</div>;
    case UIState.Unauthorized:
      return <div className="container">You are not authorized to view this page</div>;
    default:
      return <div className="container">An unknown error has occurred</div>;
  }
};

export default GrantList;
