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
  const sortedDishes = sortBy(dishesCopy, 'name', 'alphabetical');
  const [selectedDish, setSelectedDish] = useState(id);
  const [mode, setMode] = useState('display');

  const handleButtonClick = (changeAll) => {
    const newDish = sortedDishes.find(({ id: newDishId }) => newDishId === selectedDish);
    const data = { newDish, oldDishId: id, changeAll };
    closeModal({ updateParent: true, data });
  };

  return (
    <div className="meal-modal-content">
      {mode === 'display' && (
      <DisplayMode modalData={modalData} setModalMode={setMode} buttonText="Change Dish" />
      )}
      {mode === 'edit' && (
      <div className="edit-container">
        <div className="old-dish-name">
          Change
          {' '}
          <strong>{name}</strong>
          {' '}
          to:
        </div>
        <Input
          name="dish"
          id="dish"
          value={selectedDish}
          onChange={({ target: { value: eValue } }) => setSelectedDish(eValue)}
          placeholder="Choose a dishs"
          selectOptions={sortedDishes}
          type="select"
        />
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
