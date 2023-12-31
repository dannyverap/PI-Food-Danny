import axios from "axios";

export const GET_ALL_DIETS = "GET_ALL_DIETS";
export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_RECIPE_NAME = "GET_RECIPE_NAME";
export const SET_FILTER = "SET_FILTER"
export const SET_ORDER = "SET_ORDER"
export const SET_VIEW_FILTER_AND_ORDER = "SET_VIEW_FILTER_AND_ORDER"
export const SET_LOADING = "SET_LOADING"



export const getAllDiets = () => {
  return async function (dispatch) {
    const { data } = await axios.get(`diets/`);
    return dispatch({ type: GET_ALL_DIETS, payload: data })
  }
}

export const getAllRecipes = () => {
  return async function (dispatch) {
    dispatch({ type: SET_LOADING, payload: true }); // establece isLoading en true
    try {
      const { data } = await axios.get(`recipes/getall`);
      dispatch({ type: GET_ALL_RECIPES, payload: data });
    } catch (error) {
    } finally {
      dispatch({ type: SET_LOADING, payload: false }); // establece isLoading en false
    }
  };
};

export const getRecipeName = (name) => {
  return async function (dispatch) {
    dispatch({ type: SET_LOADING, payload: true }); 
    try {
      const response = await axios.get(`recipes/?name=${name}`);
      const recipe = response.data;
      dispatch({ type: GET_RECIPE_NAME, payload: recipe });
    } catch (error) {
    } finally {
      dispatch({ type: SET_LOADING, payload: false }); 
    }
  };
};


export const setFilter = (payload) => {
  return {
    type: SET_FILTER,
    payload,
  }
}

export const setViewFilterAndOrder = () => {
  return {
    type: SET_VIEW_FILTER_AND_ORDER,
  }
}

export const setOrder = (payload) => {
  return {
    type: SET_ORDER,
    payload,
  }
}


