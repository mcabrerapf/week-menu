import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { MainContext } from '../../../Contexts/MainContext';
import Button from '../../Button';
import Input from '../../Input';
import Icon from '../../Icon';
import { deepCompare, initData } from '../../helpers';
import { INGREDIENT_STRING } from '../../../constants/STRINGS';
import { INGREDIENT_TYPES, INGREDIENT_UNITS } from '../../../constants/INGREDIENT';

function IngredientModal({
  modalData, closeModal,
}) {
  const {
    handleSave,
  } = useContext(MainContext);
  const [ingredientData, setIngredientData] = useState(initData(modalData, INGREDIENT_STRING));

  const handleSubmit = async () => {
    const noChange = deepCompare(ingredientData, modalData);
    if (noChange) return closeModal();
    return handleSave(ingredientData, INGREDIENT_STRING, closeModal);
  };

  const handleOnClick = (eValue, eName) => {
    setIngredientData({ ...ingredientData, [eName]: eValue });
  };

  const handleOnChange = ({ target: { value, name: eName } }) => {
    setIngredientData({ ...ingredientData, [eName]: value });
  };

  const { name, type, unit } = ingredientData;
  const isButtonDisabled = !name;

  return (
    <form className="col pad-10 gap-10">
      <div className="col gap-10">
        <Input
          autoComplete="off"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleOnChange}
          placeholder="Name"
        />
        <div className="row centered wrap gap-5">
          {INGREDIENT_TYPES
            .map(({ value }) => (
              <Button
                key={value}
                modifier={type === value ? 'icon-l l' : 'icon-l l bgc-gr'}
                name="type"
                value={value}
                onClick={() => handleOnClick(value, 'type')}
              >
                <Icon iconName={value} />
              </Button>
            ))}
        </div>
        <div className="row centered wrap gap-5">
          {INGREDIENT_UNITS
            .map(({ value, name: uName }) => (
              <Button
                key={value}
                modifier={unit === value ? 'l' : 'l bgc-gr'}
                name="unit"
                value={value}
                buttonText={uName}
                onClick={() => handleOnClick(value, 'unit')}
              />
            ))}
        </div>
      </div>
      <div className="col">
        <Button
          modifier="icon"
          onClick={handleSubmit}
          disabled={isButtonDisabled}
          disableMultipleClicks
        >
          <Icon iconName="save" />
        </Button>
      </div>

    </form>
  );
}

IngredientModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape(),
};

IngredientModal.defaultProps = {
  modalData: {},
};

export default IngredientModal;
