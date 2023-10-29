import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './Week.css';
import Day from './Day';
import Button from '../../Button';
import { ModalContext } from '../../../Contexts/ModalContext';

function Week({
  menu, options, handleUpdateDish, hidden,
}) {
  const { addModal } = useContext(ModalContext);
  if (!menu || !menu.length) return null;
  const { days } = options;
  const className = hidden ? 'week-plan no-show' : 'week-plan';

  const handleOnClick = () => {
    addModal({
      type: 'menu',
      modalData: { dishes: menu },
      modifier: 'small',
    });
  };

  return (
    <div className={className}>
      <Button modifier="week-save-button" onClick={handleOnClick}>
        <i className="fa fa-save" aria-hidden="true" />
      </Button>
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
