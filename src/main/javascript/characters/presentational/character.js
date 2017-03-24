import React from "react";

export default class Character extends React.Component {

  render() {

    let character;

    if (this.props.character) {
      character = this.renderCharacter();
    } else {
      character = <span>Wählen Sie einen Charakter aus der Liste aus,<br />
                        um diesen anzuzeigen.</span>;
    }

    return (
      <div id="character">
        <p>{character}</p>
      </div>
    );

  }

  renderCharacter() {
    return (
      <input
        type="text"
        value={this.props.character.name}
        onChange={event => {
          this.props.onCharacterNameChanged(this.props.character.id, event.target.value); }} />
    );
  }

}
