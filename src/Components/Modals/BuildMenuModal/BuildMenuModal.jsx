import React, { useState, useEffect, useContext } from 'react';
import { FaCheck } from 'react-icons/fa6';
import PropTypes from 'prop-types';
import './BuildMenuModal.css';
import Button from '../../Button';
import { buildMenuDishes, deepCopy } from '../../helpers';
import { initMenuOptions, getMealMinMax } from './helpers';
import QuantityInput from '../../QuantityInput';
import { MainContext } from '../../../Contexts/MainContext';
import Icon from '../../Icon';

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

  const [breakfastMin, breakfastMax, availableBreakfasts] = getMealMinMax(dishesData, currentData, 'breakfast', 'hasBreakfast');
  const [lunchMin, lunchMax, availableLunches] = getMealMinMax(dishesData, currentData, 'lunch', 'hasLunch');
  const [dinnerMin, dinnerMax, availableDinners] = getMealMinMax(dishesData, currentData, 'dinner', 'hasDinner');
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
    <div className="col pad-10 gap-10">
      <div className="row gap-20">
        <div className="menu-builder-day col gap-5">
          {days.map((day, index) => {
            const {
              hasBreakfast, hasLunch, hasDinner, name,
            } = day;
            const hasMeal = hasBreakfast || hasLunch || hasDinner;

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
                  modifier={`centered square l icon${hasBreakfast ? '' : ' bgc-gr'}`}
                  value={hasBreakfast}
                  disabled={availableBreakfasts === 0}
                  onClick={() => {
                    handleMealChange(index, 'hasBreakfast', hasBreakfast);
                  }}
                >
                  <Icon iconName="breakfast" />
                </Button>
                <Button
                  modifier={`centered square l icon${hasLunch ? '' : ' bgc-gr'}`}
                  value={hasLunch}
                  disabled={availableLunches === 0}
                  onClick={() => {
                    handleMealChange(index, 'hasLunch', hasLunch);
                  }}
                >
                  <Icon iconName="lunch" />
                </Button>
                <Button
                  modifier={`centered square l icon${hasDinner ? '' : ' bgc-gr'} ${name.toLowerCase()}`}
                  value={hasDinner}
                  disabled={availableDinners === 0}
                  onClick={() => {
                    handleMealChange(index, 'hasDinner', hasDinner);
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
            value={maxBreakfasts}
            valueKey="maxBreakfasts"
            min={breakfastMin}
            max={breakfastMax}
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
            iconName="breakfast"
          />
          <QuantityInput
            value={maxLunches}
            valueKey="maxLunches"
            min={lunchMin}
            max={lunchMax}
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
            iconName="lunch"
          />
          <QuantityInput
            value={maxDinners}
            valueKey="maxDinners"
            min={dinnerMin}
            max={dinnerMax}
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
            iconName="dinner"
          />

          <QuantityInput
            value={people}
            valueKey="people"
            min={1}
            max={99}
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
            iconName="people"
          />

        </div>
      </div>
      <div className="row">
        <Button
          modifier="icon"
          onClick={handleButtonClick}
          disabled={daysWithMeals === 0}
        >
          <FaCheck />
        </Button>
      </div>

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
