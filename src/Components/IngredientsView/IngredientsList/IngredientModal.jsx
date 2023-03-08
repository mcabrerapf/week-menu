import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { INGREDIENTS_UNITS_MOCK, INGREDIENT_TYPES_MOCK } from '../../constants';
import {
  handleCreateIngredient, handleUpdateIngredient, handleGetAllIngredients, handleDeleteIngredient,
} from '../../../Services';
import { initData } from './helpers';
import { buildSelectOptions } from '../../helpers';

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
  const isEdit = action === 0 || action === 2;

  return (
    <div className="ingredient-modal-content">
      {action === 1 && (
        <div>
          <div>{name}</div>
          <div>{type}</div>
          <div>{unit}</div>
        </div>
      )}
      {isEdit && (
        <form className="ingredient-modal-form">
          <input
            className="ingredient-modal-form-input"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleInputChange}
            placeholder="Name"
          />
          <select
            className="ingredient-modal-form-select"
            name="type"
            id="type"
            value={type}
            onChange={handleInputChange}
          >
            <option value="" className="ingredient-modal-form-select-option" disabled>Chose an ingredient type...</option>
            {buildSelectOptions(INGREDIENT_TYPES_MOCK)}
          </select>
          <select
            className="ingredient-modal-form-select"
            id="unit"
            name="unit"
            value={unit}
            onChange={handleInputChange}
          >
            <option value="" className="ingredient-modal-form-select-option" disabled>Chose an ingredient unit...</option>
            {buildSelectOptions(INGREDIENTS_UNITS_MOCK)}
          </select>
          <button className="ingredient-modal-button" type="button" onClick={handleSubmit} disabled={isButtonDisabled}>
            Save
          </button>
        </form>
      )}
      {action === 3 && (
        <button className="ingredient-modal-button" type="button" onClick={handleDelete}>
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
