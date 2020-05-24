import React from "react";
import "./draweToggle.css";
const drawerToggle = (props) => {
  return (
    <div className="DrawerToggle" onClick={props.click}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
export default drawerToggle;
