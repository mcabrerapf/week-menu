import React from 'react';
import PropTypes from 'prop-types';
import './Week.css';
import Day from './Day';

function Week({
  menu, options, handleUpdateDish, hidden,
}) {
  if (!menu || !menu.length) return null;
  const { days } = options;
  const className = hidden ? 'week-plan hide' : 'week-plan';

  return (
    <div className={className}>
      {days.map((day, dayIndex) => {
        const { name } = day;
        const dishes = menu.filter((dish) => {
          const { days: dayIndexes } = dish;
          return !!dayIndexes.includes(dayIndex);
        });

        return (
          <Day
            key={name}
            name={name}
            dayIndex={dayIndex}
            dishes={dishes}
            handleUpdateDish={handleUpdateDish}

          />
        );
      })}
    </div>

  );
}

Week.propTypes = {
  handleUpdateDish: PropTypes.func.isRequired,
  hidden: PropTypes.bool.isRequired,
  menu: PropTypes.arrayOf(PropTypes.shape()),
  options: PropTypes.shape(),
};

Week.defaultProps = {
  menu: null,
  options: null,
};

export default Week;
