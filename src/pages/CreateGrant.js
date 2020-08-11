import React,{useState} from "react";
import { createGrant } from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { styles } from "./styles";
import { AuthContext } from "../App";

const CreateGrant = () =>{
  const { state } = React.useContext(AuthContext);
  const initialFormData = { name: "", description: "",status: "DRAFT" };
  const [formData, setFormData] = useState(initialFormData);
  const history = useHistory();

  if(!state.isAuthenticated){
    history.push("/login");
    return <div>redirecting</div>
  }

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  async function handleCreateGraphEvent(){
    try {
      if (!formData.name || !formData.description) return;
      const result = await API.graphql(
        graphqlOperation(createGrant, { input: formData })
      );
      const newGrant = result.data.createGrant;
      history.push("/grants/" + newGrant.id);
    } catch (err) {
      console.log("error creating grant:", err);
    }
  }

 return (
   <div className="container">
     <h2>Create new Grant</h2>
     <input
       onChange={handleInputChange}
       style={styles.input}
       value={formData.name}
       placeholder="Name"
     />
     <input
       onChange={handleInputChange}
       style={styles.input}
       value={formData.description}
       placeholder="Description"
     />
     <button style={styles.button} onClick={handleCreateGraphEvent}>
       Apply
     </button>
   </div>
 );
}

export default CreateGrant;
