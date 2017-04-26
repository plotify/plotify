import React, { Component } from "react";
import CharacterList from "../list/components/CharacterList";
import { connect } from "react-redux";
import { isCharacterSelected } from "../list/selectors";
import CharacterProfile from "./CharacterProfile";


const mapStateToProps = (state) => {
  return {
    isCharacterSelected: isCharacterSelected(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

class CharacterPageComponent extends Component {
  render() {
    return (
      <div id="CharacterPage">
        <CharacterList />
        {
          this.props.isCharacterSelected && <CharacterProfile/>
        }
      </div>
    );
  }
}

const CharacterPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterPageComponent)

export default CharacterPage;