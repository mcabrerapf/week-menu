/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { getMenuWeekList } from '../../helpers';
import { DAYS } from '../../constants';
import Icon from '../../Icon';
import { ModalContext } from '../../../Contexts/ModalContext';

function Week({
  menu, handleUpdateDish,
}) {
  const { addModal } = useContext(ModalContext);
  if (!menu || !menu.length) return null;
  const weekList = getMenuWeekList(menu);

  const openMealModal = (dish) => {
    console.log(handleUpdateDish);
    addModal({
      type: 'meal',
      modalData: dish,
      // onClose: updateDishes,
      hideHeader: true,
    });
  };

  return (
    <div className="col h-f w-f border-rad-10 pad-10 gap-10 bgc-b">
      <ul className="days-list col h-f j-even overflow-y font-s">
        {weekList.map((day, index) => (
          <div key={DAYS[index][2]} className="row gap-5 border-rad-5">
            <div className="day-label row label border-r">
              <span className="day-label upright-text label">
                {DAYS[index][2]}
              </span>
            </div>
            <div className="col w-f">
              {day.map((dish) => (
                <li
                  key={dish.id}
                  className="row a-c w-f border-rad-5 gap-5 pad-l-5"
                  role="button"
                  onClick={() => openMealModal(dish)}
                  onKeyDown={() => {}}
                >
                  <Icon iconName={dish.useAs} />
                  <span>{dish?.name || '---'}</span>
                </li>

              ))}
            </div>

          </div>
        ))}
      </ul>
    </div>

  );
}

Week.propTypes = {
  handleUpdateDish: PropTypes.func.isRequired,
  menu: PropTypes.arrayOf(PropTypes.shape()),
};

Week.defaultProps = {
  menu: [],
};

export default Week;
