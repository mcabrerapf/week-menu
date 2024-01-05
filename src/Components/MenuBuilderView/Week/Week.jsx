/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DAYS, DAY_DISH_TYPES } from '../../constants';
import Icon from '../../Icon';
import { ModalContext } from '../../../Contexts/ModalContext';

function Week({
  week, handleUpdateDish,
}) {
  const { addModal } = useContext(ModalContext);
  if (!week || !week.days) return null;

  const openMealModal = (modalData) => {
    addModal({
      type: 'meal',
      modalData: { ...modalData, week },
      onClose: handleUpdateDish,
      hideHeader: true,
    });
  };
  const { days } = week;

  return (
    <div className="col w-f h-f overflow-y font-s gap-5">
      {days.map((day, index) => (
        <div key={DAYS[index][2]} className="row h-f border-rad-5 bgc-b">
          <div className="day-label row label border-r centered">
            <span className="day-label upright-text label">
              {DAYS[index][2]}
            </span>
          </div>
          <div className="col w-f">
            {day.map((dish, mealIndex) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={mealIndex}
                className={`row a-c h-f w-f border-rad-5 pad-l-10 gap-5${dish?.name ? '' : ' bgc-gr'}`}
                role="button"
                onClick={() => openMealModal({ dish, dayIndex: index })}
                onKeyDown={() => {}}
              >
                <Icon iconName={DAY_DISH_TYPES[mealIndex]} />
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
  week: PropTypes.shape(),
};

Week.defaultProps = {
  week: {},
};

export default Week;
