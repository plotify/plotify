import React, { Component } from "react";
import { connect } from "react-redux";
import { isCharacterSelected } from "../list/selectors";
import { Paper, TextField } from "material-ui";


const mapStateToProps = (state) => {
  return {
    isCharacterSelected: isCharacterSelected(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

class CharacterProfileComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <h1>Character Profile</h1>
        <Paper zDepth={2}>
          <TextField
            floatingLabelText="Name"
            defaultValue="Jasper"/>
        </Paper>
      </div>
    );
  }
}

const CharacterProfile = connect(
  mapStateToProps,
  mapDispatchToProps
) (CharacterProfileComponent);

export default CharacterProfile;