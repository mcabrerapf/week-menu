/* eslint-disable max-len */
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './MenuBuilderModal.css';
import Button from '../../Button';
import { buildMenu, deepCopy } from '../../helpers';
import { initMenuOptions, getMealMinMax } from './helpers';
import QuantityInput from '../../QuantityInput';
import { MainContext } from '../../../Contexts/MainContext';
import Icon from '../../Icon';
import { BREAKFAST_STRING, DINNER_STRING, LUNCH_STRING } from '../../../constants';
import { DAYS, DEFAULT_WEEK_SETTINGS } from '../../constants';

function MenuBuilderModal({
  modalData, closeModal, onClose,
}) {
  const { dishes, currentMenu, setContextState } = useContext(MainContext);
  const [currentData, setCurrentData] = useState(null);
  const [dishesData, setDishesData] = useState(null);
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);

  useEffect(() => {
    const copiedData = deepCopy(modalData);
    const copiedDishes = deepCopy(dishes);
    const initedData = initMenuOptions(
      copiedData,
      copiedDishes,
      selectedWeekIndex,
    );
    setDishesData(copiedDishes);
    setCurrentData(initedData);
  }, []);

  if (!currentData) return null;
  const {
    weeks,
    weekLimit,
  } = currentData;
  const selectedWeek = weeks[selectedWeekIndex];
  const { days, mealLimits, people } = selectedWeek;

  const handleBuildMenu = () => {
    const menuWeeks = buildMenu(dishes, currentData);
    setContextState('menuOptions', currentData);
    setContextState('currentMenu', { ...currentMenu, weeks: menuWeeks });
    onClose();
    closeModal();
  };

  const handleLimitChange = (key, index, increase) => {
    const quantity = key ? currentData.weeks[selectedWeekIndex][key] : currentData.weeks[selectedWeekIndex].mealLimits[index];
    const newQuantity = increase ? quantity + 1 : quantity - 1;
    const updatedValues = { ...currentData };
    if (key) {
      updatedValues.weeks[selectedWeekIndex][key] = newQuantity;
    } else updatedValues.weeks[selectedWeekIndex].mealLimits[index] = newQuantity;

    setCurrentData(updatedValues);
  };

  const handleWeekLimitChange = (increase) => {
    const updatedValues = { ...currentData };
    const newQuantity = increase ? currentData.weekLimit + 1 : currentData.weekLimit - 1;
    const updatedWeeks = increase ? [...currentData.weeks, DEFAULT_WEEK_SETTINGS] : currentData.weeks.slice(0, currentData.weeks.length - 1);
    updatedValues.weeks = updatedWeeks;
    updatedValues.weekLimit = newQuantity;
    if (!increase && selectedWeekIndex === currentData.weeks.length - 1) setSelectedWeekIndex(selectedWeekIndex - 1);
    setCurrentData(updatedValues);
  };

  const [breakfastMin, breakfastMax, availableBreakfasts] = getMealMinMax(dishesData, days, BREAKFAST_STRING, 0);
  const [lunchMin, lunchMax, availableLunches] = getMealMinMax(dishesData, days, LUNCH_STRING, 1);
  const [dinnerMin, dinnerMax, availableDinners] = getMealMinMax(dishesData, days, DINNER_STRING, 2);
  const { length: daysWithMeals } = days
    .filter((day) => day[0] || day[1] || day[2]);

  const handleMealChange = (dayIndex, mealIndex, mealValue) => {
    const updatedData = deepCopy(currentData);
    updatedData.weeks[selectedWeekIndex].days[dayIndex][mealIndex] = !mealValue;
    const initedData = initMenuOptions(
      updatedData,
      dishesData,
      selectedWeekIndex,
    );
    setCurrentData(initedData);
  };

  const handleDayChange = (hasMeal, dayIndex) => {
    const updatedData = deepCopy(currentData);
    if (hasMeal) {
      updatedData.weeks[selectedWeekIndex].days[dayIndex][0] = false;
      updatedData.weeks[selectedWeekIndex].days[dayIndex][1] = false;
      updatedData.weeks[selectedWeekIndex].days[dayIndex][2] = false;
    } else {
      updatedData.weeks[selectedWeekIndex].days[dayIndex][0] = availableBreakfasts > 0;
      updatedData.weeks[selectedWeekIndex].days[dayIndex][1] = availableLunches > 0;
      updatedData.weeks[selectedWeekIndex].days[dayIndex][2] = availableDinners > 0;
    }
    const initedData = initMenuOptions(
      updatedData,
      dishesData,
      selectedWeekIndex,
    );
    setCurrentData(initedData);
  };

  return (
    <div className="col pad-10 gap-10">
      <div className="row centered gap-20">
        <Button
          modifier="m icon"
          disabled={selectedWeekIndex === 0}
          onClick={() => setSelectedWeekIndex(selectedWeekIndex - 1)}
        >
          <Icon iconName="arrow-l" />
        </Button>
        <div className="icon w-2">{selectedWeekIndex + 1}</div>
        <Button
          modifier="m icon"
          disabled={selectedWeekIndex >= weeks.length - 1}
          onClick={() => setSelectedWeekIndex(selectedWeekIndex + 1)}
        >
          <Icon iconName="arrow-r" />
        </Button>
      </div>
      <div className="row j-around">
        <div className="menu-builder-day col gap-5">
          {days.map((day, index) => {
            const name = DAYS[index][2];
            const hasMeal = day[0] || day[1] || day[2];

            return (
              <div key={name} className="row">
                <Button
                  value={index}
                  modifier={`centered square l${hasMeal ? '' : ' bgc-gr'}`}
                  buttonText={name}
                  onClick={() => {
                    handleDayChange(hasMeal, index);
                  }}
                />
                <Button
                  modifier={`centered square l icon${day[0] ? '' : ' bgc-gr'}`}
                  value={day[0]}
                  disabled={availableBreakfasts === 0}
                  onClick={() => {
                    handleMealChange(index, 0, day[0]);
                  }}
                >
                  <Icon iconName="breakfast" />
                </Button>
                <Button
                  modifier={`centered square l icon${day[1] ? '' : ' bgc-gr'}`}
                  value={day[1]}
                  disabled={availableLunches === 0}
                  onClick={() => {
                    handleMealChange(index, 1, day[1]);
                  }}
                >
                  <Icon iconName="lunch" />
                </Button>
                <Button
                  modifier={`centered square l icon${day[2] ? '' : ' bgc-gr'} ${name.toLowerCase()}`}
                  value={day[2]}
                  disabled={availableDinners === 0}
                  onClick={() => {
                    handleMealChange(index, 2, day[2]);
                  }}
                >
                  <Icon iconName="dinner" />
                </Button>

              </div>
            );
          })}
        </div>

        <div className="col gap-10">
          <QuantityInput
            value={weekLimit}
            valueKey="weekLimit"
            min={1}
            max={99}
            handleDecrease={() => handleWeekLimitChange()}
            handleIncrease={() => handleWeekLimitChange(true)}
            iconName="calendar"
          />
          <QuantityInput
            value={people}
            valueKey="people"
            min={1}
            max={99}
            handleDecrease={(key, index) => handleLimitChange(key, index)}
            handleIncrease={(key, index) => handleLimitChange(key, index, true)}
            iconName="people"
          />
          <QuantityInput
            value={mealLimits[0]}
            valueIndex={0}
            min={breakfastMin}
            max={breakfastMax}
            handleDecrease={(key, index) => handleLimitChange(key, index)}
            handleIncrease={(key, index) => handleLimitChange(key, index, true)}
            iconName="breakfast"
          />
          <QuantityInput
            value={mealLimits[1]}
            valueIndex={1}
            min={lunchMin}
            max={lunchMax}
            handleDecrease={(key, index) => handleLimitChange(key, index)}
            handleIncrease={(key, index) => handleLimitChange(key, index, true)}
            iconName="lunch"
          />
          <QuantityInput
            value={mealLimits[2]}
            valueIndex={2}
            min={dinnerMin}
            max={dinnerMax}
            handleDecrease={(key, index) => handleLimitChange(key, index)}
            handleIncrease={(key, index) => handleLimitChange(key, index, true)}
            iconName="dinner"
          />
        </div>
      </div>
      <div className="row">
        <Button
          modifier="icon"
          onClick={handleBuildMenu}
          disabled={daysWithMeals === 0}
        >
          <Icon iconName="check" />
        </Button>
      </div>

    </div>
  );
}

MenuBuilderModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  modalData: PropTypes.shape(),
};

MenuBuilderModal.defaultProps = {
  onClose: null,
  modalData: {},
};

export default MenuBuilderModal;
