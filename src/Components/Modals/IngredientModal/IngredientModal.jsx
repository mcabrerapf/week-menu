import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import Input from '../../Input';
import Icon from '../../Icon';
import { deepCompare, initData } from '../../helpers';
import { INGREDIENT_STRING, SAVE_STRING } from '../../../constants/STRINGS';
import { INGREDIENT_TYPES, INGREDIENT_UNITS } from '../../../constants/INGREDIENT';

function IngredientModal({
  modalData, closeModal,
}) {
  const { itemData } = modalData;
  const [ingredientData, setIngredientData] = useState(initData(itemData, INGREDIENT_STRING));

  const handleSubmit = async () => {
    const noChange = deepCompare(ingredientData, itemData);
    if (noChange) return closeModal();
    return closeModal({
      type: SAVE_STRING,
      data: ingredientData,
    });
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
        />
        <div className="row centered wrap gap-5">
          {INGREDIENT_TYPES
            .map(({ value }) => (
              <Button
                key={value}
                modifier="icon l"
                fakeDisabled={type !== value}
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
                modifier="l"
                fakeDisabled={unit !== value}
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
