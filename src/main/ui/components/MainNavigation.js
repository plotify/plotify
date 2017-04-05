import React from "react";
import ReactDOM from "react-dom";


//---- MATERIAL UI START
//------ COMPONENTS START
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import Drawer from "material-ui/Drawer";
//------ COMPONENTS END
//------ ICONS START
import SocialPerson from "material-ui/svg-icons/social/person";
import ActionDelete from "material-ui/svg-icons/action/delete";
//------ ICONS END
//------ LAYOUT START
import spacing from "material-ui/styles/spacing";
//------ LAYOUT END
//---- MATERIAL UI COMPONENTS END

//---- INTERNALS START
import packageJson from "../../package.json";
//---- INTERNALS END

const styles = {
  menu: {
    position: "relative",
    height: "100%"
  },
  menuItem: {
  },
  trash: {
    position: "absolute",
    bottom: 0,
  }
};

export default class MainNavigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div style={styles.menu}>
        <MenuItem tooltip="Charaktere verwalten"
          leftIcon={
            <SocialPerson/>
          }/>
        <MenuItem style={styles.trash}
          leftIcon={
            <ActionDelete/>
          }>
        </MenuItem>
      </div>
    );
  }
}
