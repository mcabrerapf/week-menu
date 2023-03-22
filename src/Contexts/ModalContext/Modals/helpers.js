/* eslint-disable import/prefer-default-export */
import { deepCopy } from '../../../Components/helpers';

const validateData = (data) => {
  const copiedData = deepCopy(data);
  if (data.ingredients) {
    const updatedIngredients = data.ingredients.map((ing) => {
      const { id, quantity, unit } = ing;
      return { id, quantity, unit };
    });
    copiedData.ingredients = updatedIngredients;
  }
  return copiedData;
};
export { validateData };
