import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { FloatingActionButton } from "../../mdl-components/Buttons";
import { Card } from "../../mdl-components/Card/";
import FilterableCharactersList from "../list/_presentation/FilterableCharactersList";
import CharacterProfile from "../profile/_presentation/CharacterProfile";

export default class CharacterPage extends PureComponent {
  render() {
    return (
      <div id="CharacterPage" className="plotify-character-section">
        <Card className="list-flex">
          <FilterableCharactersList />
          <div className="btn-container">
            <FloatingActionButton
              action={this.props.createCharacter}
              icon="add"
            />
          </div>
        </Card>

        <div className="profile-flex">
          {
            this.props.visible ?
              <CharacterProfile />
              : "No Character Selected"
          }
        </div>
      </div>
    );
  }
}

CharacterPage.propTypes = {
  visible:         PropTypes.bool.isRequired,
  createCharacter: PropTypes.func.isRequired,
};

CharacterPage.defaultProps = {
  visible: false,
};
