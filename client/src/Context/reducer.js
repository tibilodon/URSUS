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

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all details!",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  //sidebar
  if (action.type === TOGGLE_SIDEBAR) {
    return { ...state, showSidebar: !state.showSidebar };
  }
  //setup user
  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      userLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      userLocation: "",
    };
  }
  //update user
  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      showAlert: true,
      alertType: "Success",
      alertText: "User Profile Updated",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }

  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editRecipeId: "",
      // position: "",
      title: "",
      recipeType: "egyéb",
      // recipeTypeOptions: ["desszert", "főétel", "leves", "egyéb"],
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
      timeMinutesValue: "",
      timeHoursValue: "",
    };
    return {
      ...state,
      ...initialState,
    };
  }

  //create recipe
  if (action.type === CREATE_RECIPE_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === CREATE_RECIPE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New recipe created",
    };
  }

  if (action.type === CREATE_RECIPE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  //get recipes
  if (action.type === GET_RECIPES_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }

  if (action.type === GET_RECIPES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      recipes: action.payload.recipes,
      totalRecipes: action.payload.totalRecipes,
      numOfPages: action.payload.numOfPages,
    };
  }

  //set edit to form
  if (action.type === SET_EDIT_RECIPE) {
    const recipe = state.recipes.find(
      recipe => recipe._id === action.payload.id
    );
    const {
      _id,
      title,
      recipeType,
      // recipeTypeOptions,
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
      timeMinutesValue,
      timeHoursValue,
    } = recipe;
    return {
      ...state,
      isEditing: true,
      editRecipeId: _id,
      title,
      recipeType,
      // recipeTypeOptions,
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
      timeMinutesValue,
      timeHoursValue,
    };
  }
  //delete
  if (action.type === DELETE_RECIPE_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  //edit recipe
  if (action.type === EDIT_RECIPE_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === EDIT_RECIPE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Recipe updated/edited",
    };
  }

  if (action.type === EDIT_RECIPE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  //clear filters
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: "",
      searchDifficulty: "összes",
      searchType: "összes",
      sort: "legújabb",
    };
  }

  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }

  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
