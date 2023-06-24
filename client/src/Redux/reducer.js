import {
    GET_ALL_DIETS,
    GET_ALL_RECIPES,
    GET_RECIPE_NAME,
    SET_FILTER,
    SET_ORDER,
    SET_VIEW_FILTER_AND_ORDER,
    SET_LOADING,
} from "./action"

const initialState = {
    diets: [],
    allRecipes: [],
    recipesCopy: [],
    isLoading: false,
    filters: { diets: "all", origin: "all", healthScore:0 },
    order: { orderType: "" },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
            

        case GET_ALL_DIETS:
            return {
                ...state,
                diets: action.payload
            };

        case GET_ALL_RECIPES:
            return {
                ...state,
                allRecipes: action.payload
            };

        case GET_RECIPE_NAME:
            return {
                ...state,
                allRecipes: action.payload
            }

        case SET_FILTER:
            return {
                ...state,
                filters: { ...state.filters, ...action.payload }
            };

        case SET_ORDER:
            return {
                ...state,
                order: { ...action.payload }
            };

        case SET_VIEW_FILTER_AND_ORDER:
            const originFiltered = state.allRecipes.filter(recipe => {
                if (state.filters.origin !== 'all') {
                    const isFromDB = recipe.createdInDB;
                    const isFilteredByDb = state.filters.origin === 'db';
                    if (isFilteredByDb) {
                        return isFromDB;
                    }
                    return !isFromDB;
                }
                return true;
            });

            const healthScoreFilter = originFiltered.filter( recipe => {
                if (recipe.healthScore>=state.filters.healthScore ) {
                    return true;
                }
            });

            const lastFilter = healthScoreFilter.filter(recipe => {
                if (state.filters.diets !== 'all') {
                    return recipe.diets.includes(state.filters.diets);
                }
                return true;
            });

            let orderedRecipes = lastFilter;

            if (state.order.orderType === "menor-health-score") {
                orderedRecipes = lastFilter.sort((a, b) => {
                    return 1 * (a.healthScore - b.healthScore);
                });
            }
            if (state.order.orderType === "mayor-health-score") {
                orderedRecipes = lastFilter.sort((a, b) => {
                    return -1 * (a.healthScore - b.healthScore);
                });
            }
            if (state.order.orderType === "orden-za") {
                orderedRecipes = lastFilter.sort((a, b) => {
                    return -1 * a.name.localeCompare(b.name);
                })
            }
            if (state.order.orderType === "orden-az") {
                orderedRecipes = lastFilter.sort((a, b) => {
                    return 1 * a.name.localeCompare(b.name);
                })
            }
            
            return {
                ...state,
                recipesCopy: orderedRecipes
            };

        default:
            return { ...state };
    }
};

export default reducer;
