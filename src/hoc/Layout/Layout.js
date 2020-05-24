import React, { Component } from "react";
import Aux from "../Aux/Aux";
import "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";
class Layout extends Component {
  state = {
    showSideDraw: false,
  };
  closeSideDrawHandler = () => {
    this.setState({
      showSideDraw: false,
    });
  };
  sideDrawerToggle = () => {
    this.setState((prev) => {
      return { showSideDraw: !prev.showSideDraw };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar click={this.sideDrawerToggle} auth={this.props.auth} />
        <SideDrawer
          auth={this.props.auth}
          show={this.state.showSideDraw}
          close={this.closeSideDrawHandler}
        />
        <main className="Content">{this.props.children}</main>
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth.token ? true : false,
  };
};
export default connect(mapStateToProps)(Layout);
