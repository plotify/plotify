import React from "react";

export default class Character extends React.Component {
  render() {

    let character;

    if (this.props.character) {
      character = <p>{this.props.character.getName() + " ausgewählt."}</p>;
    } else {
      character = <p>Wählen Sie einen Charakter aus der Liste aus,<br /> um diesen anzuzeigen.</p>;
    }

    return (
      <div id="character">
        {character}
      </div>
    );

  }
}
