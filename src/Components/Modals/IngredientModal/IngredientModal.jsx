import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MainContext } from '../../../Contexts/MainContext';
import './IngredientModal.css';
import Button from '../../Button';
import { INGREDIENT_TYPES, INGREDIENT_UNITS } from '../../constants';
import Input from '../../Input';
import { deepCompare } from '../../helpers';
import Icon from '../../Icon';
import { INGREDIENT_STRING } from '../../../constants';

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
    await handleSave(ingredientData, INGREDIENT_STRING);
    return closeModal();
  };

  const handleOnClick = (eValue, eName) => {
    setIngredientData({ ...ingredientData, [eName]: eValue });
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
          <div className="ingredient-item-group border-b">
            <div className="buttons-group">
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
          </div>
          <div className="ingredient-item-group">
            <div className="buttons-group">
              {INGREDIENT_UNITS
                .map(({ value, name: uName }) => (
                  <Button
                    key={value}
                    modifier={unit === value ? 'l' : 'l bgc-gr'}
                    name="unit"
                    value={value}
                    buttonText={uName}
                    onChange={() => handleOnClick(value, 'unit')}
                  />
                ))}
            </div>
          </div>
        </div>

        <div className="form-footer">
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
