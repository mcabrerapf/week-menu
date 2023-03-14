import React from 'react';
import PropTypes from 'prop-types';
import './Week.css';
import Day from './Day';

function Week({
  menu, options, handleUpdateDish, hidden,
}) {
  if (!menu || !menu.length) return null;
  const { days } = options;
  const className = hidden ? 'week-plan no-show' : 'week-plan';

  return (
    <div className={className}>
      {days.map((day, dayIndex) => {
        const { checked, name } = day;
        const dayDishes = menu.filter((dish) => {
          const { days: dayIndexes } = dish;
          return !!dayIndexes.includes(dayIndex);
        });

        return (
          <Day
            key={name}
            name={name}
            dayIndex={dayIndex}
            checked={checked}
            dishes={dayDishes}
            handleUpdateDish={handleUpdateDish}

          />
        );
      })}
    </div>

  );
}

Week.propTypes = {
  options: PropTypes.shape().isRequired,
  handleUpdateDish: PropTypes.func.isRequired,
  hidden: PropTypes.bool.isRequired,
  menu: PropTypes.arrayOf(PropTypes.shape()),
};

Week.defaultProps = {
  menu: null,
};

export default Week;
