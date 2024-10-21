/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React from 'react';
import PropTypes from 'prop-types';
import { truncateString } from '../../../helpers';

function Meal({
  dish, index, dayIndex, handleClick,
}) {
  const sideDishName = dish?.sideDishesToUse[0] ? dish?.sideDishesToUse[0].name : null;

  const truncValue = sideDishName ? 25 : 45;

  const dishClassName = 'week__day__list__day__text centered label w-f';
  const dayClassName = `week__day__list__day col h-f centered border-box  pad-10 ${sideDishName ? 'font-m' : 'font-l'}`;

  return (
    <div
    // eslint-disable-next-line react/no-array-index-key
      key={index}
      style={{ width: '33.3%' }}
      className={`${dayClassName}${dish?.name ? '' : ' bgc-light'}${index !== 2 ? ' border-r' : ''}`}
      role="button"
      onClick={() => handleClick({
        dish, dayIndex, mealIndex: index,
      })}
      onKeyDown={() => {}}
    >
      <div className={dishClassName}>
        {truncateString(dish?.name, truncValue)}
      </div>
      {sideDishName && (
        <>
          <div className={dishClassName}>
            +
          </div>
          <div className={dishClassName}>

            {truncateString(sideDishName, truncValue)}
          </div>
        </>
      )}

    </div>
  );
}

Meal.propTypes = {
  handleClick: PropTypes.func.isRequired,
  dayIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  dish: PropTypes.shape(),

};

Meal.defaultProps = {
  dish: {},
};

export default Meal;
