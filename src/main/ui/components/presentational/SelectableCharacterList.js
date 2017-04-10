// import React from "react";
// import {List, ListItem, makeSelectable} from "material-ui/List";
// import Avatar from "material-ui/Avatar";
// import FloatingActionButton from "material-ui/FloatingActionButton";
// import ContentAdd from "material-ui/svg-icons/content/add";
// import SearchBar from "../search/SearchBar";
// import {palette, spacing} from "../../themes/PlotifyMainTheme";
//
//
// class SelectableList extends React.Component {
//   render() {
//     const ComposedComponent = makeSelectable(List);
//     return (
//       <ComposedComponent
//         value={this.props.characterId}
//         onChange={this.props.handleRequestChange}>
//
//         {this.props.children}
//       </ComposedComponent>
//     );
//   }
// }
//
// // function wrapState() {
// //   return class SelectableList extends React.Component {
// //     static propTypes = {
// //       children: PropTypes.node.isRequired,
// //       defaultValue: PropTypes.number.isRequired,
// //     };
// //
// //     componentWillMount() {
// //       this.setState({
// //         selectedIndex: this.props.defaultValue,
// //       });
// //     }
// //
// //     handleRequestChange = (event, index) => {
// //       this.setState({
// //         selectedIndex: index,
// //       });
// //     };
// //
// //     render() {
// //       const ComposedComponent = makeSelectable(List);
// //       return (
// //         <ComposedComponent
// //           value={this.state.selectedIndex}
// //           onChange={this.handleRequestChange}
// //         >
// //           {this.props.children}
// //         </ComposedComponent>
// //       );
// //     }
// //   };
// // }
// //
// // SelectableList = wrapState();
//
// export default class CharacterList extends React.Component {
//
//   render() {
//     return(
//       <SelectableList defaultValue={this.props.}>
//         <ListItem
//           value={1}
//           primaryText="Brendan Lim"
//           leftAvatar={<Avatar src="images/ok-128.jpg"/>}
//         />
//       </SelectableList>
//     );
//   }
//
// }