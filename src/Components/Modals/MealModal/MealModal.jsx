import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './MealModal.css';
import Button from '../../Button';
import Input from '../../Input';
import { deepCopy, findByKey } from '../../helpers';
import Icon from '../../Icon';
import { getDishesAndSideDishes } from './helpers';
import { DAYS } from '../../../constants/MENU';
import { DISH_TYPES } from '../../../constants/DISH';
import DisplayView from '../DishModal/DisplayView/DisplayView';

function MealModal({ modalData, closeModal }) {
  const {
    itemData: {
      dish,
      dishes,
      currentMenu,
      dayIndex,
      mealIndex,
      weekIndex,
    },
  } = modalData;
  const { weeks } = currentMenu;
  const selectedWeek = deepCopy(weeks[weekIndex]);
  const [sortedDishes] = getDishesAndSideDishes(dishes, dish);
  const [selectedDishId, setSelectedDish] = useState(sortedDishes[0].id);
  const [showDishInfo, setShowDishInfo] = useState(false);

  const handleButtonClick = (changeAll) => {
    const selectedDish = findByKey(sortedDishes, selectedDishId);
    const updatedDays = selectedWeek.days.map((day, dIndex) => {
      const { dishes: dayDishes } = day;
      const updatedDishes = dayDishes.map((dayDish, mIndex) => {
        if (dayDish?.id === dish?.id) {
          if (changeAll) return selectedDish;
        }
        if (dIndex === dayIndex && mIndex === mealIndex) return selectedDish;
        return dayDish;
      });
      return { ...day, dishes: updatedDishes };
    });
    const updatedWeek = { ...selectedWeek, days: updatedDays };
    return closeModal(updatedWeek);
  };

  const handleRemoveMeal = () => {
    const updatedDays = selectedWeek.days.map((day, dIndex) => {
      const { dishes: dayDishes } = day;
      const updatedDishes = dayDishes.map((dayDish, mIndex) => {
        if (dIndex === dayIndex && mIndex === mealIndex) return null;
        return dayDish;
      });
      return { ...day, dishes: updatedDishes };
    });
    const updatedWeek = { ...selectedWeek, days: updatedDays };
    return closeModal(updatedWeek);
  };

  const {
    name,
  } = dish || {};

  return (
    <div className="meal-modal col">
      <div className="col pad-10 gap-10">
        <div className="col gap-10">
          <div className="row icon j-bet gap-10 pad-b-5 border-b a-c">
            <div />
            <div className="row gap-5 a-c">
              <span>{DAYS[dayIndex][2]}</span>
              <Icon iconName={DISH_TYPES[mealIndex].id} />
            </div>
            <div>
              <Button modifier="w-3 h-3" onClick={() => setShowDishInfo(!showDishInfo)}>
                <Icon iconName="info" />
              </Button>
            </div>

          </div>
          <div className="col gap-10">
            {showDishInfo && <DisplayView dishData={dish} hideFooter />}
            {!showDishInfo && name && (
            <div className="col gap-5 centered icon">
              <span>{name}</span>
              <Icon iconName="arrow-d" />

            </div>
            )}
            {!showDishInfo && (
            <Input
              name="dish"
              id="dish"
              value={selectedDishId}
              onChange={({ target: { value: eValue } }) => setSelectedDish(eValue)}
              placeholder=""
              selectOptions={sortedDishes}
              type="select"
            />
            )}

          </div>

        </div>
        {!showDishInfo && (
        <div className="row gap-5">
          <Button
            onClick={() => handleButtonClick()}
            disabled={!selectedDishId}
          >
            <Icon iconName="check" />
          </Button>
          {name && (
          <>
            <Button
              onClick={() => handleButtonClick(true)}
              disabled={!selectedDishId}
            >
              <Icon iconName="check-double" />
            </Button>
            <Button
              onClick={handleRemoveMeal}
              disabled={!selectedDishId}
            >
              <Icon iconName="delete" />
            </Button>
          </>

          )}

        </div>
        )}
      </div>
    </div>
  );
}

MealModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape().isRequired,
};

export default MealModal;
