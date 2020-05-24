import * as actions from "../actions/actionTypes";

const initState = {
  orders: [],
  error: false,
  loading: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.SAVE_ORDER:
      //console.log(action.data);
      return {
        ...state,
        loading: false,
        orders: state.orders.concat({
          id: action.data.name,
          ...action.data,
        }),
      };
    case actions.SAVE_ORDER_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case actions.LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.LOAD_ORDERS: {
      return {
        ...state,
        orders: action.data,
        loading: false,
      };
    }
    case actions.LOAD_ORDERS_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return { ...state };
  }
};

export default reducer;
