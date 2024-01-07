import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Icon';
import Button from '../../Button';
import { DISH_STRING, INGREDIENT_STRING } from '../../../constants/STRINGS';
import { DISH_TYPES } from '../../../constants/DISH';
import { INGREDIENT_TYPES } from '../../../constants/INGREDIENT';

function ListFiltersModal({ modalData, closeModal }) {
  const { view, filterValue } = modalData;

  const handleFilterSelect = (filterId) => {
    const valueToSend = filterId === filterValue ? '' : filterId;
    closeModal({ value: valueToSend });
  };

  return (
    <div className="col w-16 gap-10 pad-10">
      <div className="row centered wrap pad-5 gap-5">
        {view === DISH_STRING && DISH_TYPES.map(({ id }) => (
          <Button
            key={id}
            fakeDisabled={filterValue !== id}
            modifier="l icon"
            onClick={() => handleFilterSelect(id)}
          >
            <Icon iconName={id} />
          </Button>
        ))}
        {view === INGREDIENT_STRING && INGREDIENT_TYPES.map(({ value }) => (
          <Button
            key={value}
            fakeDisabled={filterValue !== value}
            modifier="l icon"
            onClick={() => handleFilterSelect(value)}
          >
            <Icon iconName={value} />
          </Button>
        ))}
      </div>
    </div>
  );
}

ListFiltersModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape().isRequired,
};

export default ListFiltersModal;
