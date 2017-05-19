import React, { Component } from "react";
import SearchBar from "./../../components/SearchBar";
import CharacterList from "./CharacterList";

const style = {
  searchBar: {
    height: 48,
  },
  list: {
    // TODO dynamically receive the height of the SearchBar.
    height: "calc(100% - 48px)",
  },
};

export default class FilterableCharactersListComponent extends Component {
  constructor(props) {
    super(props);
  }

  getStyle() {
    return style;
  }

  render() {
    return(
      <div>
        <SearchBar />
        <div style={this.getStyle().list}>
          <CharacterList />
        </div>
      </div>
    );
  }

}
