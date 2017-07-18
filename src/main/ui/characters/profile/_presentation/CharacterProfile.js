import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import GroupsList from "../_containers/GroupsList";
import CharacterName from "../_containers/CharacterName";

export default class CharacterProfile extends PureComponent {
  render() {
    return (
      <div className="plotify-character-profile">
        <CharacterName id="profile-character-name" />
        <GroupsList />
      </div>
    );
  }
}

CharacterProfile.propTypes = {};

CharacterProfile.defaultProps = {};
