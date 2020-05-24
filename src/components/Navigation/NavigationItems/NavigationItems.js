import React from "react";
import "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const navigationItems = (props) => (
  <ul className="NavigationItems">
    <NavigationItem link="/">Burger Builder</NavigationItem>
    {props.auth ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
    {!props.auth ? (
      <NavigationItem link="/auth">Auth</NavigationItem>
    ) : (
      <NavigationItem link="/logout">Logout</NavigationItem>
    )}
  </ul>
);
export default navigationItems;
