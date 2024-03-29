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
  FETCH_ALL,
} from "./actions";

import reducer from "./reducer";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

//TODO:----FETCH ALL----
const fetchAllState = {
  title: "",
  recipeType: "egyéb",
  recipeTypeOptions: ["desszert", "főétel", "leves", "egyéb"],
  difficulty: "könnyű",
  difficultyOptions: ["könnyű", "közepes", "nehéz"],
  //steps
  steps: [],
  //ingredients
  ingredients: [],

  timeMinutesValue: 0,
  timeHoursValue: 0,

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
  sortOptions: ["legújabb", "legrégebbi", "a-z", "z-a"],
  imgRef: "",
  // imgURL: "",
};

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
  //create recipe
  isEditing: false,
  editRecipeId: "",
  title: "",
  recipeType: "egyéb",
  recipeTypeOptions: ["desszert", "főétel", "leves", "egyéb"],
  difficulty: "könnyű",
  difficultyOptions: ["könnyű", "közepes", "nehéz"],
  //steps
  steps: [],
  //ingredients
  ingredients: [],

  timeMinutesValue: 0,
  timeHoursValue: 0,

  //get recipes
  recipes: [],
  allRecipes: [],
  totalRecipes: 0,
  numOfPages: 0,
  page: 1,
  //search
  search: "",
  searchDifficulty: "összes",
  searchType: "összes",
  sort: "legújabb",
  sortOptions: ["legújabb", "legrégebbi", "a-z", "z-a"],
  imgRef: null,
  // imgURL: "",
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
  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  //remove user from local storage (logout,etc)
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );
      const { user, token } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText },
      });
      addUserToLocalStorage({ user, token });
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

  //TODO:---FETCH ALL----
  const allFetchUrl = axios.create({
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
      const { user, token } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token },
      });
      addUserToLocalStorage({ user, token });
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

  //create/edit recipe handleChange
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
        // recipeTypeOptions,
        difficulty,
        // difficultyOptions,
        steps,
        ingredients,

        timeMinutesValue,

        timeHoursValue,
        imgRef,
        // imgURL,
      } = state;
      await authFetch.post("/recipes", {
        title,
        recipeType,
        // recipeTypeOptions,
        difficulty,
        // difficultyOptions,

        steps,

        ingredients,

        timeMinutesValue,
        timeHoursValue,
        imgRef,
        // imgURL,
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

  //TODO:----FETCH ALL---
  const fetchAll = async () => {
    let url = "/all";
    try {
      const { data } = await allFetchUrl(url);
      // const { title } = data;
      // console.log("----DATA---", data);
      dispatch({ type: FETCH_ALL, payload: { allRecipes: data } });
    } catch (error) {
      console.log(error);
    }
  };

  const getRecipes = async () => {
    const { search, searchType, searchDifficulty, sort, page } = state;
    let url = `/recipes?page=${page}&recipeType=${searchType}&difficulty=${searchDifficulty}&sort=${sort}`;
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
      // console.log(error.response);
      //TODO: uncomment before build
      logoutUser();
    }
    clearAlert();
  };

  // useEffect(() => {
  // getRecipes();
  // fetchAll();
  // eslint-disable-next-line
  // }, []);

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
        // recipeTypeOptions,
        difficulty,
        // difficultyOptions,
        steps,
        ingredients,

        timeMinutesValue,
        timeHoursValue,
        imgRef,
        // imgURL
      } = state;
      await authFetch.patch(`/recipes/${state.editRecipeId}`, {
        title,
        recipeType,
        // recipeTypeOptions,
        difficulty,
        // difficultyOptions,
        steps,
        ingredients,

        timeMinutesValue,
        timeHoursValue,
        imgRef,
        // imgURL
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
      logoutUser();
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
        fetchAll,
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

export { AppProvider, initialState, useAppContext, fetchAllState };
