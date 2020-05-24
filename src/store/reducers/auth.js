import * as actions from "../actions/actionTypes";

const initState = {
  loading: false,
  error: null,
  userId: null,
  token: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.AUTH_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.AUTH_SUCCESS: {
      return {
        ...state,
        loading: false,
        userId: action.userId,
        token: action.token,
      };
    }
    case actions.AUTH_FAIL: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case actions.LOGOUT: {
      return {
        ...state,
        loading: false,
        error: null,
        userId: null,
        token: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
