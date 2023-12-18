import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import './MealModal.css';
import Button from '../../Button';
import Input from '../../Input';
import { MainContext } from '../../../Contexts/MainContext';
import { deepCopy, sortBy } from '../../helpers';
import { ArrowDownIcon } from '../../Icons';
// import DisplayMode from '../DisplayMode';

const getDishesAndSideDishes = (dishes, id) => {
  const mainDishes = [];
  const sideDishes = [];
  dishes.forEach((dish) => {
    const { id: dishId, types } = dish;
    if (dishId === id) return;
    if (types.includes('SIDE')) sideDishes.push(dish);
    else mainDishes.push(dish);
  });
  return [sortBy(mainDishes, 'name', 'alphabetical'), sortBy(sideDishes, 'name', 'alphabetical')];
};

function MealModal({ modalData, closeModal }) {
  const { dishes: dishesFromContext } = useContext(MainContext);
  const {
    id, name,
  } = modalData;
  const dishesCopy = deepCopy(dishesFromContext);
  const [selectedDish, setSelectedDish] = useState();
  const [selectedSideDish, setSelectedSideDish] = useState();
  // const [mode, setMode] = useState(id ? 'display' : 'edit');
  const [sortedDishes, sortedSideDishes] = getDishesAndSideDishes(dishesCopy, id);

  const handleButtonClick = (changeAll) => {
    if (!selectedDish) return closeModal();
    const newSideDish = sortedSideDishes
      .find(({ id: newSideDishId }) => newSideDishId === selectedSideDish);
    const sideDishesToUse = newSideDish ? [newSideDish] : [];
    const newDish = sortedDishes.find(({ id: newDishId }) => newDishId === selectedDish);
    const data = { newDish: { ...newDish, sideDishesToUse }, oldDishId: id, changeAll };
    return closeModal({ updateParent: true, data });
  };

  return (
    <div className="meal-modal-content">
      {/* {mode === 'display' && (
      <DisplayMode modalData={modalData} setModalMode={setMode} buttonText="Change Dish" />
      )} */}
      {/* {mode === 'edit' && ( */}
      <div className="edit-container">
        <div className="meal-modal-inputs">
          {id && (
          <div className="old-dish-name">

            <span>{name}</span>
            <ArrowDownIcon />
          </div>
          )}
          <Input
            name="dish"
            id="dish"
            value={selectedDish}
            onChange={({ target: { value: eValue } }) => setSelectedDish(eValue)}
            placeholder="Selecet dish"
            selectOptions={sortedDishes}
            type="select"
          />
          {!!sortedSideDishes.length && (
          <Input
            name="dish"
            id="dish"
            value={selectedSideDish}
            onChange={({ target: { value: eValue } }) => setSelectedSideDish(eValue)}
            placeholder="Side dish"
            selectOptions={sortedSideDishes}
            type="select"
          />
          )}
        </div>

        <div className="meal-modal-buttons">
          {!id && <Button buttonText="Add dish" onClick={() => handleButtonClick(false)} disabled={!selectedDish} />}
          {id && <Button buttonText="ALL" onClick={() => handleButtonClick(true)} disabled={!selectedDish} />}
          {id && <Button buttonText="One" onClick={() => handleButtonClick(false)} disabled={!selectedDish} />}
        </div>
      </div>
      {/* )} */}
    </div>
  );
}

MealModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape().isRequired,
};

export default MealModal;
