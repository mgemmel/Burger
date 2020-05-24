import * as actions from "../actions/actionTypes";

const initState = {
  ingredients: null,
  error: false,
  price: 4,
};

const INGREDIENT_PRICES = {
  salad: 0.3,
  bacon: 0.8,
  cheese: 0.5,
  meat: 1.2,
};

const reducer = (state = initState, action) => {
  //console.log("builderreducer");
  switch (action.type) {
    case actions.ADD:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] + 1,
        },
        price: state.price + INGREDIENT_PRICES[action.ingredient],
      };
    case actions.REMOVE:
      let ingredients = { ...state.ingredients };
      let price = { ...state }.price;
      if (ingredients[action.ingredient] > 0) {
        ingredients[action.ingredient]--;
        price -= INGREDIENT_PRICES[action.ingredient];
      }
      return {
        ...state,
        ingredients: ingredients,
        price: price,
      };
    case actions.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
        price: 4,
      };
    case actions.SET_INGREDIENTS_FAIL:
      return {
        ...state,
        error: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
