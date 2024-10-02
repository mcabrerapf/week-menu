/* eslint-disable max-len */
import React from 'react';
import Button from '../../../Button';
import QuantityInput from '../../../QuantityInput';
import Icon from '../../../Icon';
import { DAYS } from '../../../../constants/MENU';
import useGeneralView from './useGeneralView';

function GeneralView(props) {
  const {
    weeks,
    days,
    weekLimit,
    people,
    mealLimits,
    selectedWeekIndex,
    setSelectedWeekIndex,
    handleDayChange,
    handleMealChange,
    handleLimitChange,
    handleWeekLimitChange,
  } = useGeneralView(props);

  return (
    <div className="menu-builder-modal__content row j-bet pad-10">
      <div className="menu-builder-modal__content__left row gap-5">
        <div className="menu-builder-modal__content__left__weeks col a-c gap-5">
          {weeks.map((_, i) => (
            <Button
        // eslint-disable-next-line react/no-array-index-key
              key={i}
              modifier="icon"
              fakeDisabled={i !== selectedWeekIndex}
              onClick={() => setSelectedWeekIndex(i)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
        <div className="menu-builder-modal__content__left__days col gap-5">
          {days.map((day, index) => {
            const dayName = DAYS[index][2];
            const hasMeal = day[0] || day[1] || day[2];

            return (
              <div key={dayName} className="row">
                <Button
                  value={index}
                  modifier="square"
                  fakeDisabled={!hasMeal}
                  buttonText={dayName}
                  onClick={() => {
                    handleDayChange(hasMeal, index);
                  }}
                />
                <Button
                  modifier="square icon"
                  fakeDisabled={!day[0]}
                  value={day[0]}
                  onClick={() => {
                    handleMealChange(index, 0, day[0]);
                  }}
                >
                  <Icon iconName="breakfast" />
                </Button>
                <Button
                  modifier="square icon"
                  fakeDisabled={!day[1]}
                  value={day[1]}
                  onClick={() => {
                    handleMealChange(index, 1, day[1]);
                  }}
                >
                  <Icon iconName="lunch" />
                </Button>
                <Button
                  modifier="square icon"
                  fakeDisabled={!day[2]}
                  value={day[2]}
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
      </div>
      <div className="menu-builder-modal__content__right col gap-10">
        <QuantityInput
          value={weekLimit}
          valueKey="weekLimit"
          min={1}
          max={5}
          handleDecrease={() => handleWeekLimitChange()}
          handleIncrease={() => handleWeekLimitChange(true)}
          iconName="calendar"
        />
        <QuantityInput
          value={people}
          valueKey="people"
          min={1}
          max={10}
          handleDecrease={(key, index) => handleLimitChange(key, index)}
          handleIncrease={(key, index) => handleLimitChange(key, index, true)}
          iconName="people"
        />
        <QuantityInput
          value={mealLimits[0]}
          valueIndex={0}
          min={0}
          max={7}
          handleDecrease={(key, index) => handleLimitChange(key, index)}
          handleIncrease={(key, index) => handleLimitChange(key, index, true)}
          iconName="breakfast"
        />
        <QuantityInput
          value={mealLimits[1]}
          valueIndex={1}
          min={0}
          max={7}
          handleDecrease={(key, index) => handleLimitChange(key, index)}
          handleIncrease={(key, index) => handleLimitChange(key, index, true)}
          iconName="lunch"
        />
        <QuantityInput
          value={mealLimits[2]}
          valueIndex={2}
          min={0}
          max={7}
          handleDecrease={(key, index) => handleLimitChange(key, index)}
          handleIncrease={(key, index) => handleLimitChange(key, index, true)}
          iconName="dinner"
        />
      </div>
    </div>
  );
}

export default GeneralView;
