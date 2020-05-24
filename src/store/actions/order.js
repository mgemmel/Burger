import * as actions from "./actionTypes";
import axios from "../../axios-orders";

const success = (data) => {
  return {
    type: actions.SAVE_ORDER,
    data: data,
  };
};
const fail = () => {
  return {
    type: actions.SAVE_ORDER_FAIL,
  };
};
const failOrders = () => {
  return {
    type: actions.LOAD_ORDERS_FAIL,
  };
};
const loading = () => {
  return {
    type: actions.LOADING,
  };
};
const loadedOrders = (data) => {
  return {
    type: actions.LOAD_ORDERS,
    data: data,
  };
};

export const saveOrder = (data, token) => {
  return (despatch) => {
    despatch(loading());
    axios
      .post("/orders.json?auth=" + token, data)
      .then((response) => {
        despatch(success(response.data));
      })
      .catch((err) => {
        despatch(fail(err));
      });
  };
};
export const loadOrders = (token, userId) => {
  return (despatch) => {
    despatch(loading());
    const req = "/orders.json?auth=" + token;
    axios
      .get(req)
      .then((response) => {
        let orders = [];
        for (let key in response.data) {
          orders.push({
            ...response.data[key],
            id: key,
          });
        }
        despatch(loadedOrders(orders));
      })
      .catch((err) => {
        despatch(failOrders(err));
      });
  };
};
