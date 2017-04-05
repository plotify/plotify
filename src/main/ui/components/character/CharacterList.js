import React from "react";
import ReactDOM from "react-dom";

//---- MATERIAL UI START
//------ COMPONENTS START
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import Avatar from "material-ui/Avatar";
import TextField from "material-ui/TextField";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Subheader from "material-ui/Subheader";
//------ COMPONENTS END
//------ ICONS START
import ContentAdd from "material-ui/svg-icons/content/add";
//------ ICONS END

import spacing from "material-ui/styles/spacing";
//---- MATERIAL UI COMPONENTS END

//---- INTERNALS START
import SearchBar from "../search/SearchBar";
//---- INTERNALS END

const styles = {
  list: {
    position: "relative",
    height: "100%"
  },
  characterItem: {
    letterAvatar: {
      margin: 5
    }
  },
  addButton: {
    marginLeft: "calc(50% - 28px)",
    position: "absolute",
    bottom: 26,
  }
};

export default class CharacterList extends React.Component {

  render() {
    return(
      <div id="CharacterList" style={styles.list}>
        <SearchBar />
        <List>
           <ListItem
             primaryText="Rumpelstielzchen"
             leftAvatar={
               <Avatar
                 size={30}
                 style={styles.characterItem.letterAvatar}>
                 R
               </Avatar>
             }
           />
        </List>
        <FloatingActionButton style={styles.addButton}>
          <ContentAdd/>
        </FloatingActionButton>
      </div>
    );
  }
}
