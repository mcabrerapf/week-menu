import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../../../Input';
import Button from '../../../Button';
import { INGREDIENT_TYPES, INGREDIENT_UNITS } from '../../../constants';
import { INGREDIENT_STRING } from '../../../../constants';
import { MainContext } from '../../../../Contexts/MainContext';
import Icon from '../../../Icon';

function NewIngredientForm({
  toggleNewIngredientView,
}) {
  const {
    handleSave,
  } = useContext(MainContext);
  const [newIngredientData, setNewIngredientData] = useState({ name: '', unit: 'u', type: 'other' });
  const { name, type, unit } = newIngredientData;

  const handleOnChange = ({ target: { name: eName, value } }) => {
    setNewIngredientData({ ...newIngredientData, [eName]: value });
  };

  const handleOnClick = (eValue, eName) => {
    setNewIngredientData({ ...newIngredientData, [eName]: eValue });
  };

  const handleAddNewIngredient = async () => {
    const response = await handleSave(newIngredientData, INGREDIENT_STRING);
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
                modifier={type === value ? 'l' : 'l bgc-gr'}
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
