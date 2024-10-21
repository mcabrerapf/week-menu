/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MEAL_STRING } from '../../../constants/STRINGS';
import Modal from '../../Modal';
import Day from './Day/Day';

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
        ...modalData, weekIndex: selectedWeekIndex, currentMenu, dishes, week,
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

  return (
    <>
      <div className={className}>
        {days.map((day, index) => (
          <Day day={day} index={index} handleClick={openModal} />
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
