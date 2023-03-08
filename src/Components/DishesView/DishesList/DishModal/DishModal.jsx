import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  handleCreateDish,
  handleUpdateDish,
  handleGetAllDishes,
  handleDeleteDish,
  handleGetAllIngredients,
} from '../../../../Services';
import './DishModal.css';
import { buildSelectOptions } from '../../../helpers';

const DISH_TYPES_MOCK = [
  {
    id: 'BREAKFAST', name: 'Breakfast',
  },
  {
    id: 'LUNCH', name: 'Lunch',
  },
  {
    id: 'DINNER', name: 'Dinner',
  },
  {
    id: 'DESSERT', name: 'Dessert',
  },
  {
    id: 'VERMUT', name: 'Vermut',
  },
  {
    id: 'MUNCH', name: 'Pica pica',
  },
];

const initData = ({
  name, type, ingredients, instructions, description,
}) => ({
  name: name || '',
  type: type || '',
  // time: time || '',f
  ingredients: ingredients || [],
  // size: size || '',
  instructions: instructions || '',
  description: description || '',
});

function DishModal({
  dish, action, setDishes, setShowModal,
}) {
  const [dishData, setDishData] = useState();
  const [ingredientsData, setIngredientData] = useState();
  const { id } = dish;

  useEffect(() => {
    async function getAllIngs() {
      const {
        data: {
          listIngredients: { items },
        },
      } = await handleGetAllIngredients();
      setIngredientData(items);
    }
    getAllIngs();
    setDishData(initData(dish));
  }, []);

  if (!dishData || !ingredientsData) return null;

  const {
    name, type, instructions, description, ingredients,
  } = dishData;
  const isButtonDisabled = !name || !ingredients.length || !type;

  const handleInputChange = ({ target: { value, name: eName } }) => {
    setDishData({ ...dishData, [eName]: value });
  };

  const handleIngredientQuantityChange = (e) => {
    const { target: { value: eValue, name: eName } } = e;

    const updatedIngredients = ingredients.map((ing) => {
      const { id: ingId } = ing;
      if (ingId === eName) return { ...ing, quantity: Number(eValue) };
      return ing;
    });
    setDishData({ ...dishData, ingredients: updatedIngredients });
  };

  const handleSubmit = async () => {
    if (isButtonDisabled) return;
    const actionToUse = action === 0 ? handleCreateDish : handleUpdateDish;
    const parsedData = action === 0 ? dishData : { ...dishData, id };

    await actionToUse(parsedData);
    const {
      data: {
        listDishes: { items: updatedDishesList },
      },
    } = await handleGetAllDishes();
    setDishes(updatedDishesList);
    setShowModal({ show: false });
  };

  const handleDelete = async () => {
    await handleDeleteDish({ id });
    const {
      data: {
        listDishes: { items: updatedDishesList },
      },
    } = await handleGetAllDishes();
    setDishes(updatedDishesList);
    setShowModal({ show: false });
  };

  const handleAddIngredient = ({ target: { value: eValue } }) => {
    if (!eValue) return;
    if (ingredients.find(({ id: ingId }) => ingId === eValue)) return;
    const updatedIngredients = [...ingredients, { id: eValue, quantity: 1 }];
    setDishData({ ...dishData, ingredients: updatedIngredients });
  };

  const handleRemoveIngredient = (ingredientId) => {
    const updatedIngredients = ingredients
      .filter(({ id: currentId }) => ingredientId !== currentId);
    setDishData({ ...dishData, ingredients: updatedIngredients });
  };
  const isEdit = action === 0 || action === 2;

  return (
    <div className="dish-modal-content">
      {action === 1 && (
        <div>{name}</div>
      )}
      {isEdit && (
        <form className="dish-modal-form">
          <div className="dish-modal-form-inputs">
            <input
              className="dish-modal-form-input"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <select
              className="dish-modal-form-select"
              name="type"
              id="type"
              value={type}
              onChange={handleInputChange}
            >
              <option value="" className="dish-modal-form-select-option" disabled>Chose an dish type...</option>
              {buildSelectOptions(DISH_TYPES_MOCK)}
            </select>
            <select
              className="dish-modal-form-select"
              value=""
              name="ingredients"
              id="ingredients"
              onChange={handleAddIngredient}
            >
              <option value="" className="dish-modal-form-select-option" disabled>Chose an ingredient...</option>
              {buildSelectOptions(ingredientsData)}
            </select>

            <div className="dish-modal-form-ingredients">
              {ingredients.map(({ id: selectedIngId, quantity: ingredientQuantity }) => {
                if (!selectedIngId) return null;

                const ingMatch = ingredientsData
                  .find(({ id: ingI }) => ingI === selectedIngId);
                if (!ingMatch) return null;
                const { name: ingName, unit: ingUnit } = ingMatch;

                return (
                  <div className="dish-modal-form-ingredients-ingredient" key={selectedIngId}>
                    <div className="dish-modal-form-ingredients-ingredient-name">{ingName}</div>
                    <div className="dish-modal-form-ingredients-ingredient-quantity-container">
                      <input
                        type="number"
                        className="dish-modal-form-ingredients-ingredient-quantity"
                        aria-label={selectedIngId}
                        key={selectedIngId}
                        id={selectedIngId}
                        name={selectedIngId}
                        min={1}
                        value={ingredientQuantity}
                        onChange={handleIngredientQuantityChange}
                      />
                      <div className="dish-modal-form-ingredients-ingredient-unit">{ingUnit}</div>
                      <button
                        className="dish-modal-form-ingredients-ingredient-remove"
                        aria-label={`remove-${selectedIngId}`}
                        type="button"
                        value={selectedIngId}
                        onClick={() => handleRemoveIngredient(selectedIngId)}
                      >
                        <i className="fa fa-times" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <textarea
              className="dish-modal-form-textarea"
              id="description"
              name="description"
              value={description}
              onChange={handleInputChange}
              placeholder="Dish description..."
            />
            <textarea
              className="dish-modal-form-textarea"
              id="instructions"
              name="instructions"
              value={instructions}
              onChange={handleInputChange}
              placeholder="Dish instructions..."

            />
          </div>
          <button
            className="dish-modal-form-submit-button"
            type="button"
            onClick={handleSubmit}
            disabled={isButtonDisabled}
          >
            Save
          </button>
        </form>
      )}
      {action === 3 && (
        <div className="dish-modal-delete-warning">
          <div className="dish-modal-delete-text">
            Are you sure you want to delete
            {' '}
            {name}
          </div>
          <button className="dish-modal-delete-warning-button" type="button" onClick={handleDelete}>
            DELETE
          </button>
        </div>

      )}
    </div>
  );
}

DishModal.propTypes = {
  setDishes: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
  dish: PropTypes.shape(),
  action: PropTypes.number,
};

DishModal.defaultProps = {
  dish: {},
  action: 0,
};

export default DishModal;
