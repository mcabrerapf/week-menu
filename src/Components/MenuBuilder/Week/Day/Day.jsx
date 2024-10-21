/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React from 'react';
import PropTypes from 'prop-types';
import { DAYS } from '../../../../constants/MENU';
import Meal from '../Meal/Meal';

function Day({
  day, index, handleClick,
}) {
  const { dishes: dayDishes } = day;
  return (
    <div key={DAYS[index][2]} className="week__day row w-f h-f border-rad-5 bgc-primary">
      <div className="week__day__label row label centered upright-text border-r">
        <span className="week__day__label__text label font-l pad-h-5">
          {DAYS[index][2]}
        </span>
      </div>
      <div className="week__day__list row w-f h-f">
        {dayDishes.map((dish, mealIndex) => (
          <Meal
            dish={dish}
            index={mealIndex}
            dayIndex={index}
            handleClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
}

Day.propTypes = {
  handleClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  day: PropTypes.shape(),

};

Day.defaultProps = {
  day: {},
};

export default Day;
