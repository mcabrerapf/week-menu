import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Icon';
import Button from '../../Button';
import { DISH_STRING, INGREDIENT_STRING } from '../../../constants/STRINGS';
import { DISH_TYPES } from '../../../constants/DISH';
import { INGREDIENT_TYPES } from '../../../constants/INGREDIENT';

function ListFiltersModal({ modalData, closeModal, onClose }) {
  const { name, filterValue } = modalData;

  const handleFilterSelect = (filterId) => {
    const valueToSend = filterId === filterValue ? '' : filterId;
    onClose(valueToSend);
    closeModal();
  };

  return (
    <div className="col gap-10 pad-10">
      <div className="row w-15 centered wrap pad-5 gap-5">
        {name === DISH_STRING && DISH_TYPES.map(({ id }) => (
          <Button
            key={id}
            fakeDisabled={filterValue !== id}
            modifier="l icon"
            onClick={() => handleFilterSelect(id)}
          >
            <Icon iconName={id} />
          </Button>
        ))}
        {name === INGREDIENT_STRING && INGREDIENT_TYPES.map(({ value }) => (
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
  onClose: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape().isRequired,
};

export default ListFiltersModal;
