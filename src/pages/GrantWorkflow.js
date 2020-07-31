import React from "react";
import { API, graphqlOperation } from "aws-amplify";

import { createGrant } from "../graphql/mutations";
import { getGrant } from "../graphql/queries";
import { Redirect } from "react-router-dom";
import { getUser } from "./Authentication";
import { styles } from "./styles";

const initialState = { name: "", description: "" };

class GrantWorkflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grantId: null,
      grant: null,
      formState: initialState,
      redirectLogin: false,
      loaded: false,
    };

    this.fetchGrant = this.fetchGrant.bind(this);
    this.createGrant = this.createGrant.bind(this);
  }

  async componentDidMount() {
    const user = await getUser();
    if (user != null) {
      const { grantId } = this.props.match.params;
      if (grantId == "new") {
        this.setState({ loaded: true });
      } else if (grantId) {
        this.setState({ grantId });
        this.fetchGrant();
      }
    } else {
      this.setState({ redirectLogin: true });
    }
  }

  setInput(key, value) {
    this.setState({
      formState: {
        ...this.state.formState,
        [key]: value,
      },
    });
  }

  async fetchGrant() {
    try {
      const id = this.state.grantId;
      const grantData = await API.graphql(
        graphqlOperation(getGrant, { id: id })
      );
      const grant = grantData.data.getGrant;
      this.setState({ grant, loaded: true });
    } catch (err) {
      console.log("error fetching grant");
      this.setState({ loaded: true });
    }
  }

  async createGrant() {
    try {
      if (!this.state.formState.name || !this.state.formState.description)
        return;
      const grant = { ...this.state.formState, status: "DRAFT" };
      const result = await API.graphql(
        graphqlOperation(createGrant, { input: grant })
      );
      const newGrant = result.data.createGrant;
      this.props.history.push("/grants/" + newGrant.id);
    } catch (err) {
      console.log("error creating grant:", err);
    }
  }

  render() {
    const grantId = this.state.grantId;
    const grant = this.state.grant;

    if (this.state.redirectLogin) {
      return <Redirect to="/login" source={"/grant/" + grantId} />;
    }

    if (!this.state.loaded) {
      return <div>loading...</div>;
    }

    if (grantId == null) {
      const formState = this.state.formState;
      return (
        <div className="container">
          <h2>Create new Grant</h2>
          <input
            onChange={(event) => this.setInput("name", event.target.value)}
            style={styles.input}
            value={formState.name}
            placeholder="Name"
          />
          <input
            onChange={(event) =>
              this.setInput("description", event.target.value)
            }
            style={styles.input}
            value={formState.description}
            placeholder="Description"
          />
          <button style={styles.button} onClick={this.createGrant}>
            Apply
          </button>
        </div>
      );
    }

    if (grantId != null && grant == null) {
      return (
        <div>
          Cannot find grant <span style={styles.bold}>{grantId}</span>
        </div>
      );
    }

    if (grant != null) {
      return (
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
    }

    return <div>error</div>;
  }
}

export { GrantWorkflow };
export default GrantWorkflow;
