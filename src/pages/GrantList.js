import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { styles } from "./styles";

import { listGrants } from "../graphql/queries";
import { Link, useHistory } from "react-router-dom";
import { getUser } from "./Authentication";

const GrantList = () => {
  const history = useHistory();
  const [grantList, setGrantList] = useState([]);

  useEffect(() => {
    getGrants();
  });

  async function getGrants() {
    const user = await getUser();
    if (user == null) {
      history.push("/login");
    }
    try {
      const grantRes = await API.graphql(graphqlOperation(listGrants));
      setGrantList(grantRes.data.listGrants.items);
    } catch (err) {
      console.log("error fetching grants");
    }
  }

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
};

export { GrantList };
export default GrantList;
