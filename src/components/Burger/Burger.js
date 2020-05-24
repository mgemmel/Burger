import React from "react";
import "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
const burger = (props) => {
  let ingredients = null;
  //console.log(props);
  if (props.ingredients) {
    ingredients = Object.keys(props.ingredients)
      .map((key) => {
        return [...Array(props.ingredients[key])].map((val, index) => {
          return <BurgerIngredient key={key + index} type={key} />;
        });
      })
      .reduce((previousArr, current) => {
        return previousArr.concat(current);
      }, []);
    if (ingredients.length === 0) {
      ingredients = <p>Please start adding ingredients</p>;
    }
  }
  return (
    <div className="Burger">
      <BurgerIngredient type="bread-top" />
      {ingredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
export default burger;
