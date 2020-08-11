import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";

import { getGrant } from "../graphql/queries";
import { useHistory } from "react-router-dom";
import { styles } from "./styles";
import { AuthContext } from "../App";

const GrantWorkflow = (props) => {
  const { state } = React.useContext(AuthContext);
  const history = useHistory();
  const [grant, setGrant] = useState({});
  const [grantId, setGrantId] = useState(String);

  useEffect(() => {
    if (!state.isAuthenticated) {
      history.push("/login");
    } else {
      getGrantId();
    }
  });

  function getGrantId() {
    setGrantId(props.match.params);
    fetchGrant();
  }

  async function fetchGrant() {
    try {
      const id = this.state.grantId;
      const grantData = await API.graphql(
        graphqlOperation(getGrant, { id: id })
      );
      const grant = grantData.data.getGrant;
      setGrant(grant);
    } catch (err) {
      console.log("error fetching grant");
      setGrant(grant);
    }
  }

  return grant == null ? (
    <div>
      Cannot find grant <span style={styles.bold}>{grantId}</span>
    </div>
  ) : (
    <div className="container">
      <div className="row">
        <div className="col-3">Application name</div>
        <div className="col-9">{grant.name}</div>
      </div>
      <div className="row">
        <div className="col-3">Description</div>
        <div className="col-9">{grant.description}</div>
      </div>
    </div>
  );
};

export default GrantWorkflow;
