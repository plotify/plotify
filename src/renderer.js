/* jslint browser: true */

import React from "react";
import ReactDOM from "react-dom";

class CharacterList extends React.Component {
  render() {
    return(
      <ul data-empty-message={this.props.emptyMessage}>
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
    this.state = { characters: [], filter: "" };
    this.addCharacter = this.addCharacter.bind(this);
    this.filterCharacters = this.filterCharacters.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  getRandomElementFromArray(array) {
    return array[Math.floor(Math.random() * (array.length - 1 + 1))];
  }

  addCharacter(event) {

    const firstNames = ["Max", "Erika", "Rebecca", "Sebastian", "Jasper"];
    const firstName = this.getRandomElementFromArray(firstNames);

    const lastNames = ["Mustermann", "Musterfrau", "Rademacher", "Schmidt", "Meyer"];
    const lastName = this.getRandomElementFromArray(lastNames);

    const newState = Object.assign({}, this.state,
      {
        characters: this.state.characters.concat(firstName + " " + lastName),
        filter: ""
      });
    this.setState(newState);

  }

  filterCharacters(value) {
    return value.toLowerCase().includes(this.state.filter.toLowerCase());
  }

  handleFilterChange(event) {
    const newState = Object.assign({}, this.state,
      {
        filter: event.target.value
      });
    this.setState(newState);
  }

  render() {

    let emptyMessage = "Erstelle deinen ersten Charakter, indem du auf das Plus drückst.";

    if (this.state.filter && this.state.characters.length > 0) {
      emptyMessage = "Keine Charaktere gefunden.";
    }

    return(
      <div id="characters">
        <div id="characters-toolbar">
          <label htmlFor="characters-search-input"
                 className={this.state.filter ? 'filter-not-empty' : ''}>
            <i className="fa fa-search" aria-hidden="true"></i>
          </label>
          <input id="characters-search-input" type="text"
                 placeholder="Charaktere suchen"
                 value={this.state.filter} onChange={this.handleFilterChange} />
               <button onClick={this.addCharacter}>
            <i className="fa fa-plus" aria-hidden="true"></i>
          </button>
        </div>
        <CharacterList characters={this.state.characters.filter(this.filterCharacters)}
                       emptyMessage={emptyMessage} />
      </div>
    );
  }

}

window.onload = () => {
  ReactDOM.render(<App />,
  document.getElementById("root"));
};
