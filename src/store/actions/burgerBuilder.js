import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD,
    ingredient: name,
  };
};
export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE,
    ingredient: name,
  };
};

const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

const setIngredientsFail = () => {
  return {
    type: actionTypes.SET_INGREDIENTS_FAIL,
  };
};

export const initIngredients = () => {
  return (despatch) => {
    axios
      .get("/ingredients.json")
      .then((response) => {
        despatch(setIngredients(response.data));
      })
      .catch((err) => {
        despatch(setIngredientsFail());
      });
  };
};
