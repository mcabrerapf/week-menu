/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DAYS } from '../../../constants/MENU';
import { MEAL_STRING } from '../../../constants/STRINGS';
import Modal from '../../Modal';
import { truncateString } from '../../helpers';

function Week({
  week, selectedWeekIndex, handleUpdateWeek, currentMenu, dishes, show,
}) {
  const [showModal, setShowModal] = useState(false);
  const [mealModalData, setMealModalData] = useState(false);
  if (!week || !week.days) return null;

  const openModal = (modalData) => {
    setMealModalData({
      type: MEAL_STRING,
      itemData: {
        ...modalData, currentMenu, dishes, week,
      },
      hideHeader: true,
      modifier: 'f',
    });
    setShowModal(true);
  };

  const closeModal = (closeEvent) => {
    if (closeEvent) handleUpdateWeek(closeEvent);
    setShowModal(false);
  };

  const { days } = week;
  const className = `week col w-f h-f gap-5 font-m${show ? '' : ' hidden'}`;
  const dayClassName = 'row centered h-f w-f pointer gap-5 font-s';

  return (
    <>
      <div className={className}>
        {days.map(({ dishes: dayDishes }, index) => (
          <div key={DAYS[index][2]} className="day col w-a h-f border-rad-5 bgc-primary">
            <div className="day-label row label centered border-b">
              <span className="day-label label pad-h-5">
                {DAYS[index][2]}
              </span>
            </div>
            <div className="day-content row w-f h-f">
              {dayDishes.map((dish, mealIndex) => (
                <div
                // eslint-disable-next-line react/no-array-index-key
                  key={mealIndex}
                  className={`${dayClassName}${dish?.name ? '' : ' bgc-light'}${mealIndex !== 2 ? ' border-r' : ''}`}
                  role="button"
                  onClick={() => openModal({
                    dish, dayIndex: index, mealIndex, weekIndex: selectedWeekIndex,
                  })}
                  onKeyDown={() => {}}
                >
                  <span>{truncateString(dish?.name, 45)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {showModal && <Modal modalData={mealModalData} closeModal={closeModal} />}
    </>
  );
}

Week.propTypes = {
  handleUpdateWeek: PropTypes.func.isRequired,
  selectedWeekIndex: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
  week: PropTypes.shape(),
  currentMenu: PropTypes.shape(),
  dishes: PropTypes.arrayOf(PropTypes.shape()),

};

Week.defaultProps = {
  week: {},
  currentMenu: {},
  dishes: [],
};

export default Week;
