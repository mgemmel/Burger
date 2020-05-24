import React from "react";
import Burger from "../Burger/Burger";
import Button from "../UI/Button/Button";
import "./CheckSummary.css";
const checkoutSummary = (props) => {
  return (
    <div className="Summary">
      <h1>Nice burger</h1>
      <div className="BurgerSummary">
        <Burger ingredients={props.ingredients} />
      </div>
      <Button clicked={props.cancel} btnType="Danger">
        Cancel
      </Button>
      <Button clicked={props.continue} btnType="Success">
        Continue
      </Button>
    </div>
  );
};

export default checkoutSummary;
