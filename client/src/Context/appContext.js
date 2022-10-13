import React, { useContext, useReducer } from "react";
import axios from "axios";
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
 
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
} from "./actions";

import reducer from "./reducer";

const initialState = {
  user: user ? JSON.parse(user) : null,
  token: null,
  userLocation: userLocation || "",
  jobLocation: jobLocation || "",
  showSidebar: false,
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
};

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const userLocation = localStorage.getItem("location");

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 3000);
  };

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  //sidebar
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  //add user to local storage
  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  //remove user from local storage (logout,etc)
  const removeUserFromLocalStorage = ({ user, token, location }) => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
  };

  //register user
  //TODO: SETUP_USER DOES THE SAME
  // const registerUser = async currentUser => {
  //   dispatch({ type: REGISTER_USER_BEGIN });
  //   try {
  //     const response = await axios.post("/api/v1/auth/register", currentUser);
  //     const { user, token, location } = response.data;
  //     dispatch({
  //       type: REGISTER_USER_SUCCESS,
  //       payload: { user, token, location },
  //     });
  //     addUserToLocalStorage({ user, token, location });
  //   } catch (error) {
  //     dispatch({
  //       type: REGISTER_USER_ERROR,
  //       payload: { msg: error.response.data.msg },
  //     });
  //   }
  //   clearAlert();
  // };

  //login user
  //TODO: SETUP_USER DOES THE SAME

  // const loginUser = async currentUser => {
  //   dispatch({ type: LOGIN_USER_BEGIN });
  //   try {
  //     const { data } = await axios.post("/api/v1/auth/login", currentUser);
  //     const { user, token, location } = data;
  //     dispatch({
  //       type: LOGIN_USER_SUCCESS,
  //       payload: { user, token, location },
  //     });
  //     addUserToLocalStorage({ user, token, location });
  //   } catch (error) {
  //     dispatch({
  //       type: LOGIN_USER_ERROR,
  //       payload: { msg: error.response.data.msg },
  //     });
  //   }
  //   clearAlert();
  // };

  //setup user(register+login)
  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );
      const { user, token, location } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  //logout
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  return (
    <AppContext.Provider
      value={{ ...state, displayAlert, setupUser, logoutUser, toggleSidebar }}
    >
      {children}
    </AppContext.Provider>
  );
};

//TODO:   CUSTOM HOOK
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
