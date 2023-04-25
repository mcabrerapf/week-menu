import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import './MealModal.css';
import Button from '../../Button';
import Input from '../../Input';
import { MainContext } from '../../../Contexts/MainContext';
import { deepCopy, sortBy } from '../../helpers';
import DisplayMode from '../DisplayMode';

function MealModal({ modalData, closeModal }) {
  const { dishes: dishesFromContext } = useContext(MainContext);
  const {
    id, name,
  } = modalData;
  const dishesCopy = deepCopy(dishesFromContext);
  const sortedDishes = sortBy(dishesCopy, 'name', 'alphabetical').filter(({ id: dishId }) => dishId !== id);
  const [selectedDish, setSelectedDish] = useState();
  const [mode, setMode] = useState(id ? 'display' : 'edit');

  const handleButtonClick = (changeAll) => {
    if (!selectedDish) return closeModal();
    const newDish = sortedDishes.find(({ id: newDishId }) => newDishId === selectedDish);
    const data = { newDish, oldDishId: id, changeAll };
    return closeModal({ updateParent: true, data });
  };

  return (
    <div className="meal-modal-content">
      {mode === 'display' && (
      <DisplayMode modalData={modalData} setModalMode={setMode} buttonText="Change Dish" />
      )}
      {mode === 'edit' && (
      <div className="edit-container">
        <div className="meal-modal-inputs">
          {id ? (
            <div className="old-dish-name">
              Change
              {' '}
              <strong>{name}</strong>
              {' '}
              to:
            </div>
          ) : (
            <div className="old-dish-name">
              Add dish
            </div>
          )}
          <Input
            name="dish"
            id="dish"
            value={selectedDish}
            onChange={({ target: { value: eValue } }) => setSelectedDish(eValue)}
            placeholder="Choose a dish"
            selectOptions={sortedDishes}
            type="select"
          />
        </div>

        <div className="meal-modal-buttons">
          <Button buttonText="ALL" onClick={() => handleButtonClick(true)} />
          <Button buttonText="One" onClick={() => handleButtonClick(false)} />
        </div>
      </div>
      )}
    </div>
  );
}

MealModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape().isRequired,
};

export default MealModal;
