/* eslint-disable no-restricted-globals */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './DishFormInputs.css';
import { DISH_TYPES } from '../../../constants/DISHES';
import { MainContext } from '../../../../Contexts/MainContext';
import Input from '../../../Input';
import Button from '../../../Button';
import QuantityInput from '../../../QuantityInput';
import { capitalizeFirstLetter, sortBy } from '../../../helpers';

const getMainDishes = (dishes, currentId, currentMainDishes = []) => {
  const sideDishes = dishes
    .filter(({ id, types: sideType }) => !sideType.includes('SIDE') && !currentMainDishes.includes(id) && id !== currentId);
  return sortBy(sideDishes, 'name', 'alphabetical');
};

function GeneralFields({
  currentData, updateGeneralFields, handleSubmit, canSave,
}) {
  const { dishes } = useContext(MainContext);

  const {
    id, name, types = [], sideDishTo, servings, time: { hours, minutes } = {},
  } = currentData;

  const handleOnChange = ({ target: { value, name: eName } }) => {
    updateGeneralFields({ ...currentData, [eName]: value });
  };

  const handleAddMainDish = ({ target: { value: eValue } }) => {
    updateGeneralFields({ ...currentData, sideDishTo: [...sideDishTo, eValue] });
  };

  const handleRemoveMainDish = (idToCheck) => {
    updateGeneralFields({
      ...currentData,
      sideDishTo: sideDishTo.filter((sideDishId) => sideDishId !== idToCheck),
    });
  };

  const handleTimeChange = (e) => {
    const { target: { value: eValue, name: eName } } = e;
    const {
      time,
    } = currentData;

    updateGeneralFields({ ...currentData, time: { ...time, [eName]: eValue } });
  };

  const toggleType = ({ target: { value: eValue } }) => {
    if (eValue === 'SIDE') return updateGeneralFields({ ...currentData, types: [eValue] });
    const newTypes = types.includes(eValue)
      ? types.filter((type) => type !== eValue) : [...types, eValue].filter((type) => type !== 'SIDE');
    return updateGeneralFields({ ...currentData, types: newTypes });
  };

  const handleIncrease = () => {
    updateGeneralFields({ ...currentData, servings: servings + 1 });
  };
  const handleDecrease = () => {
    updateGeneralFields({ ...currentData, servings: servings - 1 });
  };

  const showSideDishes = types.includes('SIDE');
  const sortedMainDishes = showSideDishes ? getMainDishes(dishes, id, sideDishTo) : [];

  return (
    <>
      <div>
        <div className="group-input type-input">
          <Input
            label="Name"
            autoComplete="off"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleOnChange}
            onBlur={handleOnChange}
            placeholder="Name"
          />
          <div className="group-input-inputs">
            {DISH_TYPES
              .map(({ id: typeId, shortLabel }) => (
                <Button
                  key={typeId}
                  modifier={types.includes(typeId) ? 'square' : 'square disabled'}
                  buttonText={shortLabel}
                  value={typeId}
                  onClick={toggleType}
                />
              ))}

          </div>
        </div>
        <div className="form-input-group">
          <div className="group-input">
            <span className="group-input-label"><i className="fa fa-users" aria-hidden="true" /></span>
            <QuantityInput
              value={servings}
              min={1}
              max={99}
              valueKey="servings"
              handleDecrease={handleDecrease}
              handleIncrease={handleIncrease}
            />
          </div>

          <div className="group-input">
            <span className="group-input-label"><i className="fa fa-clock-o" aria-hidden="true" /></span>
            <div className="group-input-inputs">
              <Input
                type="number"
                id="hours"
                name="hours"
                value={hours}
                resetValueOnClick
                min={0}
                max={99}
                onFocus={handleTimeChange}
                onBlur={handleTimeChange}
                onChange={handleTimeChange}
              />
              :
              <Input
                type="number"
                id="minutes"
                name="minutes"
                value={minutes}
                resetValueOnClick
                min={0}
                max={59}
                onFocus={handleTimeChange}
                onBlur={handleTimeChange}
                onChange={handleTimeChange}
              />
            </div>
          </div>
        </div>
        {showSideDishes && (
        <div className="side-dishes-container">
          <Input
            value=""
            name="side-dishes"
            id="side-dishes"
            onChange={handleAddMainDish}
            placeholder="Add main dish"
            selectOptions={sortedMainDishes}
            label="Side dish to"
            type="select"
          />
          {!!sideDishTo.length && (
          <div className="ingredients-options-container">
            {sideDishTo.map((sideDishId) => {
              const { name: sideDishName } = dishes
                .find(({ id: sideId }) => sideDishId === sideId) || {};
              return (
                <div className="form-side-dish" key={sideDishId}>
                  <Button
                    modifier="form-side-dish-remove"
                    aria-label={`remove-${sideDishId}`}
                    type="button"
                    value={sideDishId}
                    buttonText={capitalizeFirstLetter(sideDishName)}
                  >
                    <i
                      className="fa fa-times"
                      aria-hidden="true"
                      onClick={() => handleRemoveMainDish(sideDishId)}
                    />
                  </Button>
                </div>
              );
            })}
          </div>
          )}
        </div>
        )}
      </div>
      <Button modifier="icon-only" onClick={handleSubmit} disabled={!canSave}>
        <i className="fa fa-floppy-o" aria-hidden="true" />
      </Button>

    </>

  );
}

GeneralFields.propTypes = {
  updateGeneralFields: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  canSave: PropTypes.bool.isRequired,
  currentData: PropTypes.shape(),
};

GeneralFields.defaultProps = {
  currentData: {},
};

export default GeneralFields;
