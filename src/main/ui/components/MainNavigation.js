import React from "react";
import ReactDOM from "react-dom";


//---- MATERIAL UI START
//------ COMPONENTS START
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import MenuItem from "material-ui/MenuItem";
import Drawer from "material-ui/Drawer";
import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
//------ COMPONENTS END
//------ ICONS START
import SocialPerson from "material-ui/svg-icons/social/person";
//------ ICONS END
//---- MATERIAL UI COMPONENTS END

//---- INTERNALS START
import packageJson from "../../package.json";
//---- INTERNALS END

const styles = {
  appBar: {
    color: "#fff"
  },
  menuItem: {

  }
};

export default class MainNavigation extends React.Component {

  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  close() {
    this.props.onRequestChange(false);
  }

  render()  {
    return(

      <Drawer id="MainNavigation"
          style={styles}
          docked={this.props.docked}
          width={this.props.width}
          open={this.props.open}>

          <Toolbar
            style={styles.toolbar}>
            {packageJson.productName}
          </Toolbar>

          <MenuItem
           style={styles.menuItem}
           primaryText="Charaktere"
           leftIcon={<SocialPerson />}
           onTouchTap={this.close}
          />

        </Drawer>

    );
  }

}
