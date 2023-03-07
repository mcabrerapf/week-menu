import { API } from 'aws-amplify';
import { CREATE_INGREDIENT_MUTATION, DELETE_INGREDIENT_MUTATION, UPDATE_INGREDIENT_MUTATION } from './mutations';
import { GET_ALL_INGREDIENTS_QUERY } from './querys';

const fetchData = async (queryObject) => {
  try {
    return await API.graphql(queryObject);
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const handleCreateIngredient = async (input) => fetchData({
  query: CREATE_INGREDIENT_MUTATION,
  variables: { input },
});

export const handleUpdateIngredient = async (input) => fetchData({
  query: UPDATE_INGREDIENT_MUTATION,
  variables: { input },
});

export const handleDeleteIngredient = async (input) => fetchData({
  query: DELETE_INGREDIENT_MUTATION,
  variables: { input },
});

export const handleGetAllIngredients = async () => fetchData({ query: GET_ALL_INGREDIENTS_QUERY });
