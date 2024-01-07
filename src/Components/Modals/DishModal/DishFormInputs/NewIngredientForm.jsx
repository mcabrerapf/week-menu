import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { initData } from '../../../helpers';
import { INGREDIENT_TYPES, INGREDIENT_UNITS } from '../../../../constants/INGREDIENT';
import { INGREDIENT_STRING } from '../../../../constants/STRINGS';
import { MainContext } from '../../../../Contexts/MainContext';
import Icon from '../../../Icon';
import Input from '../../../Input';
import Button from '../../../Button';

function NewIngredientForm({
  toggleNewIngredientView,
}) {
  const {
    handleSave,
  } = useContext(MainContext);
  const [ingredientData, setIngredientData] = useState(initData({}, INGREDIENT_STRING));
  const { name, type, unit } = ingredientData;

  const handleOnChange = ({ target: { name: eName, value } }) => {
    setIngredientData({ ...ingredientData, [eName]: value });
  };

  const handleOnClick = (eValue, eName) => {
    setIngredientData({ ...ingredientData, [eName]: eValue });
  };

  const handleAddNewIngredient = async () => {
    const response = await handleSave(ingredientData, INGREDIENT_STRING);
    toggleNewIngredientView(response);
  };

  const canSubmit = !!name && !!type && !!unit;

  return (
    <>
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
                modifier="l"
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
      <Button
        disabled={!canSubmit}
        modifier="icon"
        onClick={handleAddNewIngredient}
        disableMultipleClicks
      >
        <Icon iconName="save" />
      </Button>
    </>

  );
}

NewIngredientForm.propTypes = {
  toggleNewIngredientView: PropTypes.func.isRequired,
};

NewIngredientForm.defaultProps = {

};

export default NewIngredientForm;
