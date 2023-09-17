import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './BuildMenuModal.css';
import Button from '../../Button';
import { buildMenuDishes, deepCopy } from '../../helpers';
import { initMenuOptions, getMealMinMax } from './helpers';
import QuantityInput from '../../QuantityInput';
import { MainContext } from '../../../Contexts/MainContext';

function BuildMenuModal({
  modalData, closeModal,
}) {
  const { dishes, setContextState } = useContext(MainContext);
  const [currentData, setCurrentData] = useState(null);
  const [dishesData, setDishesData] = useState(null);

  useEffect(() => {
    const copiedData = deepCopy(modalData);
    const copiedDishes = deepCopy(dishes);
    const initedData = initMenuOptions(
      copiedData,
      copiedDishes,
    );
    setDishesData(copiedDishes);
    setCurrentData(initedData);
  }, []);

  const handleButtonClick = () => {
    const menuDishes = buildMenuDishes(dishes, currentData);
    setContextState('currentMenu', { menuDishes, menuOptions: currentData });
    closeModal({ updateParent: true, data: {} });
  };

  const handleDecrease = (valueKey) => {
    const { [valueKey]: quantity } = currentData;
    setCurrentData({ ...currentData, [valueKey]: quantity - 1 });
  };

  const handleIncrease = (valueKey) => {
    const { [valueKey]: quantity } = currentData;
    setCurrentData({ ...currentData, [valueKey]: quantity + 1 });
  };

  if (!currentData) return null;

  const {
    days,
    maxBreakfasts,
    maxLunches,
    maxDinners,
    people,
  } = currentData;

  const [breakfastMin, breakfastMax, availableBreakfasts] = getMealMinMax(dishesData, currentData, 'BREAKFAST', 'hasBreakfast');
  const [lunchMin, lunchMax, availableLunches] = getMealMinMax(dishesData, currentData, 'LUNCH', 'hasLunch');
  const [dinnerMin, dinnerMax, availableDinners] = getMealMinMax(dishesData, currentData, 'DINNER', 'hasDinner');
  const { length: daysWithMeals } = days
    .filter(({ hasBreakfast: hB, hasLunch: hL, hasDinner: hD }) => hB || hL || hD);

  const handleMealChange = (dayIndex, mealKey, mealValue) => {
    const updatedData = deepCopy(currentData);
    updatedData.days[dayIndex][mealKey] = !mealValue;
    const initedData = initMenuOptions(
      updatedData,
      dishesData,
    );
    setCurrentData(initedData);
  };

  const handleDayChange = (hasMeal, dayIndex) => {
    const updatedData = deepCopy(currentData);
    if (hasMeal) {
      updatedData.days[dayIndex].hasBreakfast = false;
      updatedData.days[dayIndex].hasLunch = false;
      updatedData.days[dayIndex].hasDinner = false;
    } else {
      updatedData.days[dayIndex].hasBreakfast = availableBreakfasts > 0;
      updatedData.days[dayIndex].hasLunch = availableLunches > 0;
      updatedData.days[dayIndex].hasDinner = availableDinners > 0;
    }
    const initedData = initMenuOptions(
      updatedData,
      dishesData,
    );
    setCurrentData(initedData);
  };

  return (
    <div className="build-menu-modal-content">
      <div className="build-menu-modal-inputs">
        <div className="build-menu-modal-day-inputs">
          {days.map((day, index) => {
            const {
              hasBreakfast, hasLunch, hasDinner, name,
            } = day;
            const hasMeal = hasBreakfast || hasLunch || hasDinner;
            const dayMealsClassname = 'build-menu-modal-day-meals';
            const dayButtonClassName = `day-button${hasMeal ? '' : ' disabled'} ${name.toLowerCase()}`;

            return (
              <div key={name} className="build-menu-modal-day-container">
                <Button
                  value={index}
                  modifier={dayButtonClassName}
                  buttonText={name}
                  onClick={() => {
                    handleDayChange(hasMeal, index);
                  }}
                />
                <div className={dayMealsClassname}>
                  <Button
                    modifier={`has-meal-button${hasBreakfast ? '' : ' disabled'}`}
                    value={hasBreakfast}
                    buttonText="B"
                    disabled={availableBreakfasts === 0}
                    onClick={() => {
                      handleMealChange(index, 'hasBreakfast', hasBreakfast);
                    }}
                  />
                  <Button
                    modifier={`has-meal-button${hasLunch ? '' : ' disabled'}`}
                    value={hasLunch}
                    buttonText="L"
                    disabled={availableLunches === 0}
                    onClick={() => {
                      handleMealChange(index, 'hasLunch', hasLunch);
                    }}
                  />
                  <Button
                    modifier={`has-meal-button${hasDinner ? '' : ' disabled'} ${name.toLowerCase()}`}
                    value={hasDinner}
                    buttonText="D"
                    disabled={availableDinners === 0}
                    onClick={() => {
                      handleMealChange(index, 'hasDinner', hasDinner);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="build-menu-modal-max-inputs">
          {/* <div className="build-menu-modal-max-inputs-header">Max</div> */}
          <QuantityInput
            value={maxBreakfasts}
            valueKey="maxBreakfasts"
            min={breakfastMin}
            max={breakfastMax}
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
            labelText="Breakfasts"
          />
          <QuantityInput
            value={maxLunches}
            valueKey="maxLunches"
            min={lunchMin}
            max={lunchMax}
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
            labelText="Lunches"
          />
          <QuantityInput
            value={maxDinners}
            valueKey="maxDinners"
            min={dinnerMin}
            max={dinnerMax}
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
            labelText="Dinners"
          />

          <QuantityInput
            value={people}
            valueKey="people"
            min={1}
            max={99}
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
            labelText="People"
          />

        </div>

      </div>
      <Button buttonText="🍽️" onClick={handleButtonClick} disabled={daysWithMeals === 0} modifier="build-menu-button" />
    </div>
  );
}

BuildMenuModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape(),
};

BuildMenuModal.defaultProps = {
  modalData: {},
};

export default BuildMenuModal;
