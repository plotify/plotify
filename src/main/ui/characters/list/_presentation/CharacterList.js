import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import CharacterListItem from "./CharacterListItem";
import { List } from "../../../mdl-components/List";


export default class CharacterList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="plotify-character-list">
        <List>
          {
            this.props.characters.map(({ id, name, deleted }) => (
              <CharacterListItem
                key={ id }
                name={ name }
                deleted={ deleted }
                selected={ this.props.isThisCharacterSelected(id) }
                handleSelect={ () => this.props.onSelectCharacter(id) }
              />
            ))
          }
        </List>
      </div>
    );
  }
}

CharacterList.propTypes = {
  characters:              PropTypes.array.isRequired,
  onSelectCharacter:       PropTypes.func.isRequired,
  isThisCharacterSelected: PropTypes.func.isRequired,
};

CharacterList.defaultProps = {
  items:        [],
  selectedItem: "",
};
