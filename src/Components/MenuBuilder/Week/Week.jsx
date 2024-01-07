/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DAYS, DAY_DISH_TYPES } from '../../../constants/MENU';
import { MEAL_STRING } from '../../../constants/STRINGS';
import Icon from '../../Icon';
import Modal from '../../Modal';

function Week({
  week, selectedWeekIndex, handleUpdateWeek, currentMenu, dishes,
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
    });
    setShowModal(true);
  };

  const closeModal = (closeEvent) => {
    if (closeEvent) handleUpdateWeek(closeEvent);
    setShowModal(false);
  };

  const { days } = week;

  return (
    <>
      <div className="col w-f h-f overflow-y font-s gap-5">
        {days.map(({ dishes: dayDishes }, index) => (
          <div key={DAYS[index][2]} className="row h-f border-rad-5 bgc-b">
            <div className="day-label row label border-r centered">
              <span className="day-label upright-text label">
                {DAYS[index][2]}
              </span>
            </div>
            <div className="col w-f">
              {dayDishes.map((dish, mealIndex) => (
                <div
                // eslint-disable-next-line react/no-array-index-key
                  key={mealIndex}
                  className={`row a-c h-f w-f pointer border-rad-5 pad-l-10 gap-5${dish?.name ? '' : ' bgc-gr'}`}
                  role="button"
                  onClick={() => openModal({
                    dish, dayIndex: index, mealIndex, weekIndex: selectedWeekIndex,
                  })}
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
      {showModal && <Modal modalData={mealModalData} closeModal={closeModal} />}
    </>
  );
}

Week.propTypes = {
  handleUpdateWeek: PropTypes.func.isRequired,
  selectedWeekIndex: PropTypes.number.isRequired,
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
