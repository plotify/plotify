import React, { PureComponent } from "react";
import VisibleCharacterList from "../_containers/VisibleCharacterList";
import CharacterFilter from "../_containers/CharacterFilter";

export default class FilterableCharactersList extends PureComponent {
  render() {
    return (
      <div className="plotify-character-list--filterable">
        <CharacterFilter id="filterCharacterList" />
        <VisibleCharacterList />
      </div>
    );
  }
}
