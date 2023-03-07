import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { INGREDIENTS_UNITS_MOCK, INGREDIENT_TYPES_MOCK } from '../../constants';
import {
  handleCreateIngredient, handleUpdateIngredient, handleGetAllIngredients, handleDeleteIngredient,
} from '../../../Services';
import { initData } from './helpers';

const buildSelectOptions = (options) => options
  .map(({
    value, name,
  }) => <option key={value} value={value}>{name}</option>);
function IngredentModal({
  ingredient, action, setIngredients, setShowModal,
}) {
  const [ingredientData, setIngredientData] = useState();

  const { id } = ingredient;
  useEffect(() => {
    setIngredientData(initData(ingredient));
  }, []);

  if (!ingredientData) return null;
  const { name, type, unit } = ingredientData;
  const isButtonDisabled = !name || !type || !unit;

  const handleInputChange = ({ target: { value, name: eName } }) => {
    setIngredientData({ ...ingredientData, [eName]: value });
  };

  const handleSubmit = async () => {
    if (isButtonDisabled) return;
    const actionToUse = action === 0 ? handleCreateIngredient : handleUpdateIngredient;
    const parsedD = action === 0 ? ingredientData : { ...ingredientData, id };
    await actionToUse(parsedD);
    const {
      data: {
        listIngredients: { items: updatedIngredientList },
      },
    } = await handleGetAllIngredients();
    setIngredients(updatedIngredientList);
    setShowModal({ show: false });
  };

  const handleDelete = async () => {
    await handleDeleteIngredient({ id });
    const {
      data: {
        listIngredients: { items: updatedIngredientList },
      },
    } = await handleGetAllIngredients();
    setIngredients(updatedIngredientList);
    setShowModal({ show: false });
  };

  return (
    <div className="ingredient-modal-content">
      {action !== 2 && (
        <form className="ingredient-modal-form">
          <label htmlFor="name" className="ingredient-modal-form-input">
            Name:
            <input type="text" id="name" name="name" value={name} onChange={handleInputChange} />
          </label>
          <label htmlFor="type" className="ingredient-modal-form-input">
            Type:
            <select id="type" name="type" value={type} onChange={handleInputChange}>
              {buildSelectOptions(INGREDIENT_TYPES_MOCK)}
            </select>
          </label>
          <label htmlFor="unit" className="ingredient-modal-form-input">
            Unit:
            <select id="unit" name="unit" value={unit} onChange={handleInputChange}>
              {buildSelectOptions(INGREDIENTS_UNITS_MOCK)}
            </select>
          </label>

          <button type="button" onClick={handleSubmit} disabled={isButtonDisabled}>
            Save
          </button>
        </form>
      )}
      {action === 2 && (
        <button type="button" onClick={handleDelete}>
          DELETE
        </button>
      )}
    </div>
  );
}

IngredentModal.propTypes = {
  setIngredients: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
  ingredient: PropTypes.shape(),
  action: PropTypes.number,
};

IngredentModal.defaultProps = {
  ingredient: {},
  action: 0,
};

export default IngredentModal;
