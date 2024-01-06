import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import Input from '../../Input';
import { MainContext } from '../../../Contexts/MainContext';
import { deepCopy, findByKey } from '../../helpers';
import Icon from '../../Icon';
import { getDishesAndSideDishes } from './helpers';
import { DAYS } from '../../../constants/MENU';
import { DISH_TYPES } from '../../../constants/DISH';

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
  const [sortedDishes] = getDishesAndSideDishes(dishesCopy, dish);
  const [selectedDishId, setSelectedDish] = useState(sortedDishes[0].id);

  const handleButtonClick = (changeAll) => {
    const selectedDish = findByKey(sortedDishes, selectedDishId);
    const updatedDays = selectedWeek.days.map((day, dIndex) => {
      const { dishes } = day;
      const updatedDishes = dishes.map((dayDish, mIndex) => {
        if (dayDish?.id === dish?.id) {
          if (changeAll) return selectedDish;
        }
        if (dIndex === dayIndex && mIndex === mealIndex) return selectedDish;
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
          <div className="col icon centered gap-5 pad-b-5 m-5 border-b">
            <span>{DAYS[dayIndex][1]}</span>
            <Icon iconName={DISH_TYPES[mealIndex].id} />
          </div>
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
            placeholder=""
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
          <Button
            onClick={() => handleButtonClick()}
            disabled={!selectedDishId}
          >
            <Icon iconName="check" />
          </Button>
          {name && (
          <Button
            onClick={() => handleButtonClick(true)}
            disabled={!selectedDishId}
          >
            <Icon iconName="check-double" />
          </Button>
          )}
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
