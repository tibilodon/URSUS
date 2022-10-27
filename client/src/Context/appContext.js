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
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_RECIPE_BEGIN,
  CREATE_RECIPE_SUCCESS,
  CREATE_RECIPE_ERROR,
  GET_RECIPES_BEGIN,
  GET_RECIPES_SUCCESS,
  SET_EDIT_RECIPE,
  DELETE_RECIPE_BEGIN,
  EDIT_RECIPE_BEGIN,
  EDIT_RECIPE_SUCCESS,
  EDIT_RECIPE_ERROR,
  CLEAR_FILTERS,
  CHANGE_PAGE,
} from "./actions";

import reducer from "./reducer";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const userLocation = localStorage.getItem("location");

const initialState = {
  // utils
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  //sidebar
  showSidebar: false,
  //user
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  //recipe
  isEditing: false,
  editRecipeId: "",
  position: "",
  title: "",
  recipeType: "egyéb",
  recipeTypeOptions: ["desszert", "főétel", "leves", "egyéb"],
  difficulty: "könnyű",
  difficultyOptions: ["könnyű", "közepes", "nehéz"],
  steps: { step_1: "", step_2: "", step_3: "" },
  ing_1: 1,
  ing_1ingredient: "",
  ing_1options: ["L", "g", "kg"],
  ing_2: 1,
  ing_2ingredient: "",
  ing_2options: ["L", "g", "kg"],
  ing_3: 1,
  ing_3ingredient: "",
  ing_3options: ["L", "g", "kg"],
  description: "",
  timeItTakes: 1,
  timeItTakesMinutes: ["perc"],
  timeItTakesHours: ["óra"],
  //search
  search: "",
  searchDifficulty: "összes",
  searchType: "összes",
  sort: "latest",
  sortOptions: ["összes", "legújabb", "legrégebbi", "a-z", "z-a"],
};

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
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
  };

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

  //auth
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  // request
  authFetch.interceptors.request.use(
    config => {
      config.headers["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  //response
  authFetch.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  //updateUser
  const updateUser = async currentUser => {
    dispatch({
      type: UPDATE_USER_BEGIN,
    });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);
      const { user, location, token } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });
      addUserToLocalStorage({ user, location, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: {
            msg: error.response.data.msg,
          },
        });
      }
    }
    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        logoutUser,
        toggleSidebar,
        updateUser,
      }}
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
