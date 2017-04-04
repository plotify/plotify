import React from "react";
import ReactDOM from "react-dom";

//---- MATERIAL UI START
//------ COMPONENTS START
import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import Avatar from "material-ui/Avatar";
import ActionSearch from "material-ui/svg-icons/action/search";
import TextField from "material-ui/TextField";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Subheader from "material-ui/Subheader";
//------ COMPONENTS END
//------ ICONS START
import ContentAdd from "material-ui/svg-icons/content/add";
//------ ICONS END

import spacing from "material-ui/styles/spacing";
//---- MATERIAL UI COMPONENTS END


const styles = {
  list: {
  },
  searchBar: {
    background: "#fff",
    icon: {
      color: "blue",
      margin: 5
    }
  },
  characterItem: {
    letterAvatar: {
      margin: 5
    }
  },
  addButton: {
    marginLeft: "calc(50% - 28px)"
  }
};

export default class CharacterList extends React.Component {

  render() {
    return(
      <div id="CharacterList" style={styles.list}>
        <Toolbar style={styles.searchBar}>
          <ToolbarGroup>
            <ActionSearch style={styles.searchBar.icon} />
            <TextField
              hintText="Suche"
            />
          </ToolbarGroup>
        </Toolbar>
        <List>
           <Subheader>Charaktere</Subheader>
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
