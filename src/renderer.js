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
  render() {
    const characters = ["Max Mustermann", "Erika Musterfrau", "Rebecca Rademacher",
                        "Sebastian Schmidt", "Jasper Meyer"];
    return(
      <div id="characters">
        <div id="characters-toolbar">
          <label htmlFor="characters-search-input">
            <i className="fa fa-search" aria-hidden="true"></i>
          </label>
          <input id="characters-search-input" type="text"
                 placeholder="Charaktere suchen" />
          <button>
            <i className="fa fa-plus" aria-hidden="true"></i>
          </button>
        </div>
        <CharacterList characters={characters} />
      </div>
    );
  }
}

window.onload = () => {
  ReactDOM.render(<App />,
  document.getElementById("root"));
};
