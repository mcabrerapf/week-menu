import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../../../Input';
import Button from '../../../Button';
import { INGREDIENT_TYPES, INGREDIENT_UNITS } from '../../../constants';
import { INGREDIENT_STRING } from '../../../../constants';
import { MainContext } from '../../../../Contexts/MainContext';

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
    <>
      <div>
        <Input
          autoComplete="off"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleOnChange}
          placeholder="Name"
        />
        <div className="ingredient-item-group">
          <span className="ingredient-item-group-label">Type</span>
          <div className="ingredient-item-group-options">
            {INGREDIENT_TYPES
              .map(({ value, name: tName }) => (
                <Button
                  key={value}
                  modifier={`ingredient-item-group-button${type === value ? '' : 'disabled'}`}
                  name="type"
                  value={value}
                  buttonText={tName}
                  onClick={handleOnChange}
                />
              ))}
          </div>
        </div>
        <div className="ingredient-item-group">
          <span className="ingredient-item-group-label">Unit</span>
          <div className="ingredient-item-group-options">
            {INGREDIENT_UNITS
              .map(({ value, name: uName }) => (
                <Button
                  key={value}
                  modifier={`ingredient-item-group-button${unit === value ? '' : 'disabled'}`}
                  name="unit"
                  value={value}
                  buttonText={uName}
                  onClick={handleOnChange}
                />
              ))}
          </div>
        </div>

      </div>

      <Button
        disabled={!canSubmit}
        modifier="icon-only"
        onClick={handleAddNewIngredient}
        // disabled={checkIsButtonDisabled(view, currentData)}
        disableMultipleClicks
      >
        <i className="fa fa-floppy-o" aria-hidden="true" />
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
