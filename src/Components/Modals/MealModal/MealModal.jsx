import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './MealModal.scss';
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
    <div className="meal-modal col pad-10">
      <div className="meal-modal__content col gap-10 m-b-10">
        <div className="row icon j-bet gap-10 pad-b-5 h-4 border-b a-c">
          <div className="row gap-10 a-c">
            <Icon modifier="icon" iconName={DISH_TYPES[mealIndex].id} />
            <span className="label">{DAYS[dayIndex][2]}</span>

          </div>
          <div>
            {name && (
            <Button modifier="icon" onClick={() => setShowDishInfo(!showDishInfo)}>
              <Icon iconName="info" />
            </Button>
            )}
          </div>
        </div>
        <div className="col gap-10">
          {showDishInfo && <DisplayView dishData={dish} hideFooter />}
          {!showDishInfo && name && (
            <div className="col gap-5 centered icon">
              <span className="label">{name}</span>
              <Icon iconName="arrow-d" />
            </div>
          )}
          {!showDishInfo && (
            <Input
              name="dish"
              id="dish"
              modifier="font-l"
              value={selectedDishId}
              onChange={({ target: { value: eValue } }) => setSelectedDish(eValue)}
              placeholder=""
              selectOptions={sortedDishes}
              type="select"
            />
          )}

        </div>
      </div>
      <div className="meal-modal__footer row gap-5">
        {!showDishInfo && (
        <>
          <Button
            modifier="icon w-f"
            onClick={() => handleButtonClick()}
            disabled={!selectedDishId}
          >
            <Icon iconName="check" />
          </Button>
          {name && (
          <>
            <Button
              modifier="icon w-f"
              onClick={() => handleButtonClick(true)}
              disabled={!selectedDishId}
            >
              <Icon iconName="check-double" />
            </Button>
            <Button
              modifier="icon w-f"
              onClick={handleRemoveMeal}
              disabled={!selectedDishId}
            >
              <Icon iconName="delete" />
            </Button>
          </>

          )}
        </>
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
