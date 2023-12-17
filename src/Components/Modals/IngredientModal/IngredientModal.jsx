import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MainContext } from '../../../Contexts/MainContext';
import './IngredientModal.css';
import Button from '../../Button';
import { INGREDIENT_TYPES, INGREDIENT_UNITS } from '../../constants';
import Input from '../../Input';
import { deepCompare } from '../../helpers';

function IngredientModal({
  modalData, closeModal,
}) {
  const {
    handleSave,
  } = useContext(MainContext);
  const [ingredientData, setIngredientData] = useState({});

  useEffect(() => {
    if (modalData.name) {
      setIngredientData(
        {
          id: modalData.id,
          name: modalData.name,
          type: modalData.type,
          unit: modalData.unit,
        },
      );
    }
  }, []);

  const handleSubmit = async () => {
    const noChange = deepCompare(ingredientData, modalData);
    if (noChange) return closeModal();
    handleSave(ingredientData.id, ingredientData.name, ingredientData);
    return closeModal();
  };

  const handleOnChange = ({ target: { value, name: eName } }) => {
    setIngredientData({ ...ingredientData, [eName]: value });
  };

  const { name, type, unit } = ingredientData;
  const isButtonDisabled = !name || !type || !unit;

  return (
    <div className="ingredient-modal">
      <form className="form">
        <div className="form-inputs">
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
                    modifier={`ingredient-item-group-button${type === value ? '' : ' not-selected'}`}
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
                    modifier={`ingredient-item-group-button${unit === value ? '' : ' not-selected'}`}
                    name="unit"
                    value={value}
                    buttonText={uName}
                    onClick={handleOnChange}
                  />
                ))}
            </div>
          </div>
        </div>

        <div className="form-footer">
          <Button
            modifier="submit"
            onClick={handleSubmit}
            disabled={isButtonDisabled}
            disableMultipleClicks
          >
            <i className="fa fa-floppy-o" aria-hidden="true" />
          </Button>
        </div>

      </form>
    </div>

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
