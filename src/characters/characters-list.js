import React from "react";

export default class CharactersList extends React.Component {
  render() {
    return(
      <div id="characters">
        <div id="characters-toolbar">
          <label htmlFor="characters-search-input"
                 className={this.props.filter ? "filter-not-empty" : ""}>
            <i className="fa fa-search" aria-hidden="true"></i>
          </label>
          <input
            id="characters-search-input"
            type="text"
            placeholder="Charaktere suchen"
            value={this.props.filter}
            onChange={event => { this.props.onSetFilter(event.target.value); }} />
          <button onClick={this.props.onAddRandomCharacter}>
            <i className="fa fa-plus" aria-hidden="true"></i>
          </button>
        </div>
        <ul data-empty-message={this.props.emptyMessage}>
          {this.props.characters.map((character, index) => {
            return <CharacterListElement name={character.name} key={index} />;
          })}
        </ul>
      </div>
    );
  }
}

export class CharacterListElement extends React.Component {
  render() {
    return <li>{this.props.name}</li>;
  }
}
