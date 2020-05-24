import * as actions from "./actionTypes";
import axios from "axios";

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  localStorage.removeItem("userId");
  return {
    type: actions.LOGOUT,
  };
};

const loading = () => {
  return {
    type: actions.AUTH_LOADING,
  };
};

const success = (response) => {
  return {
    type: actions.AUTH_SUCCESS,
    userId: response.localId,
    token: response.idToken,
  };
};

const fail = (error) => {
  return {
    type: actions.AUTH_FAIL,
    error: error,
  };
};

export const checkAuth = () => {
  return (despatch) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    let expiration = localStorage.getItem("expiration");
    if (token && expiration && userId) {
      let date = new Date(expiration);
      if (date > new Date()) {
        despatch(success({ idToken: token, userId: userId }));
      } else {
        despatch(logout());
      }
    } else {
      despatch(logout());
    }
  };
};

export const auth = (email, password, register) => {
  return (despatch) => {
    despatch(loading());
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZarfzVLypPFdthxeKFuvpHGrG0gkYBOA";
    if (!register) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZarfzVLypPFdthxeKFuvpHGrG0gkYBOA";
    }
    axios
      .post(url, data)
      .then((response) => {
        const expiration = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem("expiration", expiration);
        despatch(success(response.data));
      })
      .catch((err) => {
        despatch(fail(err.message));
      });
  };
};
