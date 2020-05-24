import React from "react";
import "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/drawerToggle";
const toolbar = (props) => (
  <header className="Toolbar">
    <DrawerToggle click={props.click} />
    <Logo />
    <nav className="desktop">
      <NavigationItems auth={props.auth} />
    </nav>
  </header>
);

export default toolbar;
