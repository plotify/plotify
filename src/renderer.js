/* jslint browser: true */

import React from "react";
import ReactDOM from "react-dom";

class CharacterList extends React.Component {
  render() {
    return(
      <ul data-empty-message="Erstelle deinen ersten Charakter, indem du auf das Plus drückst.">
        {this.props.characters.map((character, index) => {
          return <CharacterListElement name={character} key={index} />;
        })}
      </ul>
    );
  }
}

class CharacterListElement extends React.Component {
  render() {
    return <li>{this.props.name}</li>;
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { characters: [] };
    this.addCharacter = this.addCharacter.bind(this);
  }

  getRandomElementFromArray(array) {
    return array[Math.floor(Math.random() * (array.length - 1 + 1))];
  }

  addCharacter() {

    const firstNames = ["Max", "Erika", "Rebecca", "Sebastian", "Jasper"];
    const firstName = this.getRandomElementFromArray(firstNames);

    const lastNames = ["Mustermann", "Musterfrau", "Rademacher", "Schmidt", "Meyer"];
    const lastName = this.getRandomElementFromArray(lastNames);

    const newState = Object.assign({}, this.state,
      {
        characters: this.state.characters.concat(firstName + " " + lastName)
      });
    this.setState(newState);

  }

  render() {
    return(
      <div id="characters">
        <div id="characters-toolbar">
          <label htmlFor="characters-search-input">
            <i className="fa fa-search" aria-hidden="true"></i>
          </label>
          <input id="characters-search-input" type="text"
                 placeholder="Charaktere suchen" />
               <button onClick={this.addCharacter}>
            <i className="fa fa-plus" aria-hidden="true"></i>
          </button>
        </div>
        <CharacterList characters={this.state.characters} />
      </div>
    );
  }
  
}

window.onload = () => {
  ReactDOM.render(<App />,
  document.getElementById("root"));
};
