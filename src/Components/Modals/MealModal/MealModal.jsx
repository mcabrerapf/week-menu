import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './MealModal.scss';
import Button from '../../Button';
import Input from '../../Input';
import { deepCopy, findByKey, truncateString } from '../../helpers';
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
  const [sortedDishes] = getDishesAndSideDishes(dishes);
  const [selectedDishId, setSelectedDish] = useState(dish?.id || sortedDishes[0].id);
  const [selectedSideDishId, setSelectedSideDish] = useState(dish?.sideDishesToUse[0]?.id);
  const [dishInfo, setDishInfo] = useState(null);

  const handleButtonClick = (changeAll) => {
    const selectedDish = findByKey(sortedDishes, selectedDishId);
    const side = dishes.find(({ id: dId }) => dId === selectedSideDishId);
    const withSide = selectedSideDishId
      ? { ...selectedDish, sideDishesToUse: [side] }
      : { ...selectedDish, sideDishesToUse: [] };

    const updatedDays = selectedWeek.days.map((day, dIndex) => {
      const { dishes: dayDishes } = day;
      const updatedDishes = dayDishes.map((dayDish, mIndex) => {
        if (dayDish?.id === dish?.id) {
          if (changeAll) return withSide;
        }
        if (dIndex === dayIndex && mIndex === mealIndex) return withSide;
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

  const handleInfoClick = (dInfoId) => {
    if (!dInfoId) setDishInfo(null);
    const dData = dishes.find(({ id: dId }) => dId === dInfoId);
    setDishInfo(dData);
  };

  return (
    <div className="meal-modal col pad-10">
      <div className="meal-modal__content col gap-10 m-b-10">
        <div className="row icon j-bet gap-10 pad-b-5 h-4 border-b a-c">
          <div className="row gap-10 a-c">
            <Icon modifier="icon" iconName={DISH_TYPES[mealIndex].id} />
            <span className="label">{DAYS[dayIndex][2]}</span>
            <span className="label">{truncateString(dishInfo?.name, 20)}</span>

          </div>
          <Button
            modifier="icon"
            onClick={() => setDishInfo(null)}
          >
            <Icon iconName="arrow-l" />
          </Button>
        </div>
        <div className="col gap-10">
          {dishInfo && <DisplayView dishData={dishInfo} hideFooter />}
          {!dishInfo && dish?.name && (
            <div className="col gap-5 centered icon">
              <span className="label">{dish?.name}</span>
              <Icon iconName="arrow-d" />
            </div>
          )}
          {!dishInfo && (
          <div className="col gap-10">
            <div className="row border-box gap-10">
              <Input
                name="dish"
                id="dish"
                modifier="font-l"
                value={selectedDishId}
                onChange={({ target: { value: eValue } }) => setSelectedDish(eValue)}
                selectOptions={sortedDishes}
                type="select"
              />
              <Button
                modifier="icon"
                onClick={() => handleInfoClick(selectedDishId)}
              >
                <Icon iconName="info" />
              </Button>
            </div>
            <div className="row border-box gap-10">
              <Input
                name="side-dish"
                id="side-dish"
                modifier="font-l"
                value={selectedSideDishId}
                onChange={({ target: { value: eValue } }) => setSelectedSideDish(eValue)}
                selectOptions={[{}, ...sortedDishes]}
                type="select"
              />
              <Button
                modifier="icon"
                disabled={!selectedSideDishId}
                onClick={() => handleInfoClick(selectedSideDishId)}
              >
                <Icon iconName="info" />
              </Button>
            </div>
          </div>
          )}
        </div>
      </div>
      <div className="meal-modal__footer row gap-5">
        {!dishInfo && (
        <>
          <Button
            modifier="icon w-f"
            onClick={() => handleButtonClick()}
            disabled={!selectedDishId}
          >
            <Icon iconName="check" />
          </Button>
          {dish?.name && (
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
