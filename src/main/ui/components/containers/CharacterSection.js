import React from "react";
import VisibleCharacterList from "./VisibleCharacterList";
import VisibleProfile from "./VisibleProfile";
import {
  deselectCharacter, findCharacters, selectCharacter, setFilter,
  updateSelectedCharacter
} from "../../service/actions";
import {connect} from "react-redux";
import {palette} from "../../themes/PlotifyMainTheme";
import Profile from "../presentational/Profile";

const styles = {
  columns: {
    col2: {
      float: "left",
      borderRightWidth: 1,
      borderRightStyle: "solid",
      borderColor: palette.borderColor,
      height: "100%",
      width: 340,
    },
    col3: {
      position: "relative",
      float: "left",
      width: "calc(100% - 396px)",
      height: "100%",
    }
  }
};

class MixedCharacterSection extends React.Component {
  render() {
    return (
      <span>
        <div style={styles.columns.col2}>
          <VisibleCharacterList
            onSelect={this.props.onSelect}
            onDeselect={this.props.onDeselect}
            onSetFilter={this.props.onSetFilter}
            selectedCharacter={this.props.selectCharacter}
          />
        </div>
        <div style={styles.columns.col3}>
          <VisibleProfile
            character={this.props.selectCharacter}
            onUpdateSelectedCharacter={this.props.onUpdateSelectedCharacter}/>
        </div>
      </span>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
    selectCharacter: state.selectedCharacter,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelect: (character) => {
      dispatch(selectCharacter(character));
    },
    onDeselect: () => {
      dispatch(deselectCharacter());
    },
    onSetFilter: (filter) => {
      dispatch(setFilter(filter));
      dispatch(findCharacters(filter));
    },
    onUpdateSelectedCharacter: (updatedCharacter) => {
      dispatch(updateSelectedCharacter(updatedCharacter));
    }
  }
};

const CharacterSection = connect(
  mapStateToProps,
  mapDispatchToProps
)(MixedCharacterSection);

export default CharacterSection;