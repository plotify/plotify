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
//---- MATERIAL UI COMPONENTS END

//---- INTERNALS START
//------ LAYOUT START
import PlotifyMainTheme, {spacing, palette} from "../themes/PlotifyMainTheme";
//------ LAYOUT END
//------ SHARED START
import Pages from "../../shared/constants/pages";
//------ SHARED END
//---- INTERNALS END

const styles = {
  menu: {
    position: "relative",
    height: "100%"
  },
  iconActive: {
    color: palette.alternateTextColor
  },
  menuItem: {

  },
  active: {
    backgroundColor: palette.primary2Color,
  },
  trash: {
    position: "absolute",
    bottom: 0,
  },
  trashActive: {
    position: "absolute",
    bottom: 0,
    backgroundColor: palette.primary2Color,
    color: palette.alternateTextColor,
  }
};

export default class MainNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.goToCharacters = this.goToCharacters.bind(this);
    this.goToTrash = this.goToTrash.bind(this);
  }

  goToCharacters() {
    this.props.changePage(Pages.CHARACTER);
  }

  goToTrash() {
    this.props.changePage(Pages.TRASH);
  }

  render() {

    const page = this.props.currentPage;

    return(
      <div style={styles.menu}>
        <MenuItem
          style={
            page == Pages.CHARACTER ?
            styles.active :
            styles.menuItem
          }
          leftIcon={<SocialPerson
            color={
              page == Pages.CHARACTER ?
              styles.iconActive.color :
              ""
            }
          />}
          onTouchTap={this.goToCharacters}/>
        <MenuItem
          style={
            page === Pages.TRASH ?
              styles.trashActive :
              styles.trash
          }
          leftIcon={<ActionDelete
              color={
                page === Pages.TRASH ?
                styles.iconActive.color :
                ""
              }
            />}
          onTouchTap={this.goToTrash}/>
      </div>
    );
  }
}
