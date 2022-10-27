import React, { useContext, useReducer, useEffect } from "react";
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
  //create recipe
  isEditing: false,
  editRecipeId: "",
  // position: "",
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
  //get recipes
  recipes: [],
  totalRecipes: 0,
  numOfPages: 0,
  page: 1,
  //search
  search: "",
  searchDifficulty: "összes",
  searchType: "összes",
  sort: "legújabb",
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

  //create job handleChange
  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  //clear values
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  //create recipe
  const createRecipe = async () => {
    dispatch({ type: CREATE_RECIPE_BEGIN });
    try {
      const {
        title,
        recipeType,
        recipeTypeOptions,
        difficulty,
        difficultyOptions,
        steps,
        ing_1,
        ing_1ingredient,
        ing_1options,
        ing_2,
        ing_2ingredient,
        ing_2options,
        ing_3,
        ing_3ingredient,
        ing_3options,
        description,
        timeItTakes,
        timeItTakesMinutes,
        timeItTakesHours,
      } = state;
      await authFetch.post("/recipes", {
        title,
        recipeType,
        recipeTypeOptions,
        difficulty,
        difficultyOptions,
        steps,
        ing_1,
        ing_1ingredient,
        ing_1options,
        ing_2,
        ing_2ingredient,
        ing_2options,
        ing_3,
        ing_3ingredient,
        ing_3options,
        description,
        timeItTakes,
        timeItTakesMinutes,
        timeItTakesHours,
      });
      dispatch({ type: CREATE_RECIPE_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) {
        return;
      }
      dispatch({
        type: CREATE_RECIPE_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const getRecipes = async () => {
    const { search, searchDifficulty, searchType, sort, page } = state;
    let url = `/recipes?page=${page}&searchDifficulty=${searchDifficulty}&recipeType=${searchType}&sort${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_RECIPES_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { recipes, totalRecipes, numOfPages } = data;
      dispatch({
        type: GET_RECIPES_SUCCESS,
        payload: { recipes, totalRecipes, numOfPages },
      });
    } catch (error) {
      console.log(error.response);
      //TODO: uncomment before build
      // logoutUser()
    }
    clearAlert();
  };

  useEffect(() => {
    getRecipes();
  }, []);

  //set recipe to form
  const setEditRecipe = id => {
    dispatch({ type: SET_EDIT_RECIPE, payload: { id } });
  };

  //edit recipe
  const editRecipe = async () => {
    dispatch({ type: EDIT_RECIPE_BEGIN });
    try {
      const {
        title,
        recipeType,
        recipeTypeOptions,
        difficulty,
        difficultyOptions,
        steps,
        ing_1,
        ing_1ingredient,
        ing_1options,
        ing_2,
        ing_2ingredient,
        ing_2options,
        ing_3,
        ing_3ingredient,
        ing_3options,
        description,
        timeItTakes,
        timeItTakesMinutes,
        timeItTakesHours,
      } = state;
      await authFetch.patch(`/recipes/${state.editRecipeId}`, {
        title,
        recipeType,
        recipeTypeOptions,
        difficulty,
        difficultyOptions,
        steps,
        ing_1,
        ing_1ingredient,
        ing_1options,
        ing_2,
        ing_2ingredient,
        ing_2options,
        ing_3,
        ing_3ingredient,
        ing_3options,
        description,
        timeItTakes,
        timeItTakesMinutes,
        timeItTakesHours,
      });
      dispatch({ type: EDIT_RECIPE_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) {
        return;
      }
      dispatch({
        type: EDIT_RECIPE_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    clearAlert();
  };

  const deleteRecipe = async recipeId => {
    dispatch({ type: DELETE_RECIPE_BEGIN });
    try {
      await authFetch.delete(`/recipes/${recipeId}`);
      getRecipes();
    } catch (error) {
      console.log(error);
      // TODO:uncomment before build
      // logoutUser()
    }
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const changePage = page => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
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
        handleChange,
        clearValues,
        createRecipe,
        getRecipes,
        setEditRecipe,
        editRecipe,
        deleteRecipe,
        clearFilters,
        changePage,
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
