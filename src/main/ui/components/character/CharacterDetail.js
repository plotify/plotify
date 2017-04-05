import React from "react";
import ReactDOM from "react-dom";

//---- MATERIAL UI START
//------ COMPONENTS START
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
//------ COMPONENTS END
//---- MATERIAL UI END


const styles = {
  panel: {
    padding: 15,
    height: "auto",
    width: 300,
    margin: 20,
    display: "inline-block"
  }
};

export default class CharacterDetail extends React.Component {
  render() {
    return(
      <div id="CharacterDetails" style={styles}>
        <Paper style={styles.panel} zDepth={1}>
          <TextField
            hintText="Gebe hier den Namen ein"
            floatingLabelText="Name"
            defaultValue={this.props.characterId}
          />
        </Paper>
        <br/>
        <Paper style={styles.panel} zDepth={1}>
          <TextField
            hintText=""
            floatingLabelText="Körpergröße"
          />
          <TextField
            hintText=""
            floatingLabelText="Augenfarbe"
          />
        </Paper>
      </div>
    );
  }
}
