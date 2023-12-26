import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../../../Input';
import Button from '../../../Button';
import { INGREDIENT_TYPES, INGREDIENT_UNITS } from '../../../constants';
import { INGREDIENT_STRING } from '../../../../constants';
import { MainContext } from '../../../../Contexts/MainContext';
import { SaveIcon } from '../../../Icons';

function NewIngredientForm({
  toggleNewIngredientView,
}) {
  const {
    handleSave,
  } = useContext(MainContext);
  const [newIngredientData, setNewIngredientData] = useState({});
  const { name, type, unit } = newIngredientData;

  const handleOnChange = ({ target: { name: eName, value } }) => {
    setNewIngredientData({ ...newIngredientData, [eName]: value });
  };

  const handleAddNewIngredient = async () => {
    const response = await handleSave(newIngredientData, INGREDIENT_STRING);
    toggleNewIngredientView(response);
  };

  const canSubmit = !!name && !!type && !!unit;

  return (
    <form className="form">
      <div className="add-ingredient-form-inputs">
        <Input
          autoComplete="off"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleOnChange}
          placeholder="Name"
        />
        <div className="buttons-group border-bottom">
          {INGREDIENT_TYPES
            .map(({ value, name: tName }) => (
              <Button
                key={value}
                modifier={type !== value ? 'disabled' : ''}
                name="type"
                value={value}
                buttonText={tName}
                onClick={handleOnChange}
              />
            ))}
        </div>
        <div className="buttons-group">
          {INGREDIENT_UNITS
            .map(({ value, name: uName }) => (
              <Button
                key={value}
                modifier={unit !== value ? 'disabled' : ''}
                name="unit"
                value={value}
                buttonText={uName}
                onClick={handleOnChange}
              />
            ))}
        </div>

      </div>
      <Button
        disabled={!canSubmit}
        modifier="icon-only"
        onClick={handleAddNewIngredient}
        disableMultipleClicks
      >
        <SaveIcon />
      </Button>
    </form>

  );
}

NewIngredientForm.propTypes = {
  toggleNewIngredientView: PropTypes.func.isRequired,
};

NewIngredientForm.defaultProps = {

};

export default NewIngredientForm;
