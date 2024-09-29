/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import Icon from '../../Icon';

function WeekModal({ modalData, closeModal }) {
  const { currentMenu: { weeks }, selectedWeekIndex } = modalData;
  return (
    <div className="col gap-10 pad-10 gap-15">
      <div className="row centered">
        <Icon modifier="icon" iconName="calendar" />
      </div>
      <div className="row centered wrap pad-5 gap-5">
        {weeks.map((_, i) => (
          <Button
            key={i}
            fakeDisabled={selectedWeekIndex !== i}
            modifier="icon"
            onClick={() => closeModal(i)}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </div>
  );
}

WeekModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape().isRequired,
};

export default WeekModal;
