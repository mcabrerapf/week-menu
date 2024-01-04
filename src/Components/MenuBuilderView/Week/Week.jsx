/* eslint-disable jsx-a11y/interactive-supports-focus */
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

  const openMealModal = (modalData) => {
    addModal({
      type: 'meal',
      modalData: { ...modalData, menuDishes: menu },
      onClose: handleUpdateDish,
      hideHeader: true,
    });
  };

  return (
    <div className="col w-f h-f overflow-y font-s pad-5 gap-5">
      {weekList.map((day, index) => (
        <div key={DAYS[index][2]} className="row h-f border-rad-5 bgc-b">
          <div className="day-label row label border-r centered">
            <span className="day-label upright-text label">
              {DAYS[index][2]}
            </span>
          </div>
          <div className="col w-f">
            {day.map((dish) => (
              <div
                key={dish.id}
                className={`row a-c h-f w-f border-rad-5 pad-l-10 gap-5${dish?.name ? '' : ' bgc-gr'}`}
                role="button"
                onClick={() => openMealModal({ dish, dayIndex: index })}
                onKeyDown={() => {}}
              >
                <Icon iconName={dish.useAs} />
                <span>{dish?.name || '---'}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
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
