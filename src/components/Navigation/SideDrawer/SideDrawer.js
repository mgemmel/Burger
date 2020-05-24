import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux/Aux";
const SideDrawer = (props) => {
  let classes = ["sideDrawer", "close"];
  if (props.show) {
    classes = ["sideDrawer", "open"];
  }
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.close} />
      <div className={classes.join(" ")}>
        <div style={{ height: "20%", marginBottom: "10px" }}>
          <Logo />
        </div>
        <nav>
          <NavigationItems auth={props.auth} />
        </nav>
      </div>
    </Aux>
  );
};
export default SideDrawer;
