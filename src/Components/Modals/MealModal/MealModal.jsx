import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import Input from '../../Input';
import { MainContext } from '../../../Contexts/MainContext';
import { deepCopy, sortBy } from '../../helpers';
import Icon from '../../Icon';
import { SIDE_STRING } from '../../../constants';

const getDishesAndSideDishes = (dishes, usedDishes) => {
  const mainDishes = [];
  const sideDishes = [];
  dishes.forEach((dish) => {
    const { id: dishId, types } = dish;
    if (usedDishes.find(({ id: usedId }) => usedId === dishId)) return;
    if (types.includes(SIDE_STRING)) sideDishes.push(dish);
    else mainDishes.push(dish);
  });
  return [sortBy(mainDishes, 'name', 'alphabetical'), sortBy(sideDishes, 'name', 'alphabetical')];
};

const getMenuDishes = (selectedWeek) => {
  const menuDishes = [];
  const { days } = selectedWeek;
  days.forEach(({ dishes }) => {
    dishes.forEach((dish) => {
      if (!dish) return;
      const alreadyAdded = menuDishes.find((menuDish) => menuDish.id === dish.id);
      if (!alreadyAdded)menuDishes.push(dish);
    });
  });
  return menuDishes;
};

function MealModal({ modalData, closeModal, onClose }) {
  const { dishes: dishesFromContext, currentMenu } = useContext(MainContext);
  const {
    dish,
    dayIndex,
    mealIndex,
    weekIndex,
  } = modalData;
  const { weeks } = currentMenu;
  const selectedWeek = deepCopy(weeks[weekIndex]);
  const dishesCopy = deepCopy(dishesFromContext);
  const [selectedDishId, setSelectedDish] = useState();
  // const [selectedSideDish, setSelectedSideDish] = useState();
  // const [mode, setMode] = useState(id ? 'display' : 'edit');
  const menuDishes = getMenuDishes(selectedWeek);
  const [sortedDishes] = getDishesAndSideDishes(dishesCopy, menuDishes);

  const handleButtonClick = (changeAll) => {
    const selectedDish = sortedDishes.find((sortedDish) => sortedDish.id === selectedDishId);
    const updatedDays = selectedWeek.days.map((day, dIndex) => {
      const { dishes } = day;
      const updatedDishes = dishes.map((dayDish, mIndex) => {
        if (!dayDish) return null;
        if (dayDish.id === dish.id) {
          if (changeAll) return selectedDish;
        } if (dIndex === dayIndex && mIndex === mealIndex) return selectedDish;
        return dayDish;
      });
      return { ...day, dishes: updatedDishes };
    });
    const updatedWeek = { ...selectedWeek, days: updatedDays };
    onClose(updatedWeek);
    return closeModal();
  };

  const {
    name,
  } = dish || {};

  return (
    <div className="col">
      {/* {mode === 'display' && (
      <DisplayMode modalData={modalData} setModalMode={setMode} buttonText="Change Dish" />
      )} */}
      {/* {mode === 'edit' && ( */}
      <div className="col pad-10 gap-10">
        <div className="col gap-10">
          {name && (
          <div className="col gap-5 centered icon">
            <span>{name}</span>
            <Icon iconName="arrow-d" />
          </div>
          )}
          <Input
            name="dish"
            id="dish"
            value={selectedDishId}
            onChange={({ target: { value: eValue } }) => setSelectedDish(eValue)}
            placeholder="Selecet dish"
            selectOptions={sortedDishes}
            type="select"
          />
          {/* {!!sortedSideDishes.length && (
          <Input
            name="dish"
            id="dish"
            value={selectedSideDish}
            onChange={({ target: { value: eValue } }) => setSelectedSideDish(eValue)}
            placeholder="Side dish"
            selectOptions={sortedSideDishes}
            type="select"
          />
          )} */}
        </div>
        <div className="row gap-5">
          {name && (
          <Button
            onClick={() => handleButtonClick(true)}
            disabled={!selectedDishId}
          >
            <Icon iconName="check-double" />
          </Button>
          )}
          <Button
            onClick={() => handleButtonClick()}
            disabled={!selectedDishId}
          >
            <Icon iconName="check" />
          </Button>
        </div>
      </div>
    </div>
  );
}

MealModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  modalData: PropTypes.shape().isRequired,
};

export default MealModal;
