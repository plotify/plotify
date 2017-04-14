import React from "react";
import ReactDOM from "react-dom";

//---- MATERIAL UI WELCOME
//------ COMPONENTS WELCOME
import {Toolbar, ToolbarGroup, ToolbarTitle} from "material-ui/Toolbar";
import ActionSearch from "material-ui/svg-icons/action/search";
import TextField from "material-ui/TextField";
//------ COMPONENTS END
//---- MATERIAL UI END

const styles = {
  toolbar: {
    background: "",
    overflow: "hidden"
  },
  icon: {
    margin: 5,
    textAlign: "right",
    cursor: "pointer",
  },
  searchGroup: {
    marginLeft: "calc(100% - 75px)",
    active: {
      marginLeft: 0
    }
  },
  input: {
    marginLeft: 50,
    marginRight: 10,
    overflow: "hidden",
    active: {
      marginRight: 10
    }
  },
  title: {
    marginLeft: 0,
    active: {
      marginLeft: -150
    }
  }
};

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  focus() {
    this.refs.input.focus();
    this.setState({
      active: true
    });
  }

  blur() {
    this.refs.input.blur();
    this.setState({
      active: this.state.value !== ""
    });
  }

  handleChange(event) {
    const val = event.target.value;
    console.log("FILTER VALUE", val);
    this.setState({
      value: val
    });
    this.props.onSetFilter(val);
  }

  render() {
    const {active} = this.state;

    return (
      <Toolbar style={styles.toolbar}>
        <ToolbarGroup
          className="marginTransition"
          style={active ? styles.title.active : styles.title }>
          <ToolbarTitle text="Alle"/>
        </ToolbarGroup>
        <ToolbarGroup
          className="marginTransition"
          style={active ? styles.searchGroup.active : styles.searchGroup}>
          <ActionSearch
            style={styles.icon}
            onClick={this.focus}
          />
          <TextField
            className="marginTransition"
            ref="input"
            hintText="Suche"
            onFocus={this.focus}
            onBlur={this.blur}
            onChange={this.handleChange}
            style={ active ? styles.input.active : styles.input}
          />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}
