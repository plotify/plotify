import React from "react";

export default class Character extends React.Component {

  render() {

    let character;

    if (this.props.character) {
      character = this.renderCharacter();
    } else {
      character = <p className="no-characters-hint">
                    Wählen Sie einen Charakter aus der Liste aus,<br />
                    um diesen anzuzeigen.
                  </p>;
    }

    return (
      <div id="character">
        {character}
      </div>
    );

  }

  renderCharacter() {
    return (
      <input
        ref={(input) => { this.nameInput = input; }}
        type="text"
        placeholder="Name des Charakters"
        value={this.props.character.name}
        className="character-name"
        onChange={event => {
          this.props.onCharacterNameChanged(this.props.character.id, event.target.value); }} />
    );
  }

  componentDidUpdate() {
    if (this.nameInput && !this.props.character.name) {
      this.nameInput.focus();
    }
  }

}
