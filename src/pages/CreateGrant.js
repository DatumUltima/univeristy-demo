import React,{useState} from "react";
import { createGrant } from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { styles } from "./styles";


const CreateGrant = props =>{
  const [name, setName] = useState(String);
  const [description, setDescription] = useState(String);
  const history = useHistory();

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  async function handleCreateGraphEvent(){
    try {
      if (!name || !description)
        return;
      const grant = { name, description, status: "DRAFT" };
      const result = await API.graphql(
        graphqlOperation(createGrant, { input: grant })
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
       onChange={handleNameChange}
       style={styles.input}
       value={name}
       placeholder="Name"
     />
     <input
       onChange={handleDescriptionChange}
       style={styles.input}
       value={description}
       placeholder="Description"
     />
     <button style={styles.button} onClick={handleCreateGraphEvent}>
       Apply
     </button>
   </div>
 );
}

export { CreateGrant };
export default CreateGrant;
