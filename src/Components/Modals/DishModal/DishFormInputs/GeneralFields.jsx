/* eslint-disable no-restricted-globals */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DISH_TYPES } from '../../../../constants/DISH';
import { SIDE_STRING } from '../../../../constants/STRINGS';
import { MainContext } from '../../../../Contexts/MainContext';
import Input from '../../../Input';
import Button from '../../../Button';
import QuantityInput from '../../../QuantityInput';
import {
  capitalizeFirstLetter, filterByKey, findByKey, sortBy,
} from '../../../helpers';
import Icon from '../../../Icon';

const getMainDishes = (currentId, dishes, currentMainDishes = []) => {
  const sideDishes = dishes
    .filter(({ id, types }) => !types.includes(SIDE_STRING)
    && !currentMainDishes.includes(id) && id !== currentId);
  return sortBy(sideDishes, 'name', 'alphabetical');
};

function GeneralFields({
  currentData, updateGeneralFields, handleSubmit, canSave,
}) {
  const { dishes } = useContext(MainContext);

  const {
    id, name, types = [], sideDishTo = [], servings, time: { hours, minutes } = {},
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
      sideDishTo: filterByKey(sideDishTo, null, idToCheck, true),
    });
  };

  const handleTimeChange = (e) => {
    const { target: { value: eValue, name: eName } } = e;
    const {
      time,
    } = currentData;

    updateGeneralFields({ ...currentData, time: { ...time, [eName]: eValue } });
  };

  const toggleType = (eValue) => {
    if (eValue === SIDE_STRING) return updateGeneralFields({ ...currentData, types: [eValue] });

    const newTypes = types.includes(eValue)
      ? filterByKey(types, null, eValue)
      : filterByKey([...types, eValue], null, SIDE_STRING, true);
    return updateGeneralFields({ ...currentData, types: newTypes });
  };

  const handleIncrease = () => {
    updateGeneralFields({ ...currentData, servings: servings + 1 });
  };
  const handleDecrease = () => {
    updateGeneralFields({ ...currentData, servings: servings - 1 });
  };

  const sortedMainDishes = getMainDishes(id, dishes, sideDishTo);
  const showSideDishes = types.includes('side');

  return (
    <>
      <div className="col gap-20">
        <div className="row gap-5">
          <Input
            autoComplete="off"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleOnChange}
            onBlur={handleOnChange}
            placeholder="Name"
          />
          <div className="row centered gap-5">
            {DISH_TYPES
              .map(({ id: typeId }) => (
                <Button
                  key={typeId}
                  fakeDisabled={!types.includes(typeId)}
                  modifier="icon m"
                  value={typeId}
                  onClick={() => toggleType(typeId)}
                >
                  <Icon iconName={typeId} />
                </Button>
              ))}

          </div>
        </div>
        <div className="row gap-40">
          <div className="col j-bet gap-5">
            <div className="row centered icon-l"><Icon iconName="people" /></div>
            <QuantityInput
              value={servings}
              min={1}
              max={99}
              valueKey="servings"
              handleDecrease={handleDecrease}
              handleIncrease={handleIncrease}
            />
          </div>
          <div className="time-input col j-bet gap-5">
            <div className="row centered icon-l"><Icon iconName="clock" /></div>
            <div className="row gap-5">
              <Input
                type="number"
                id="hours"
                name="hours"
                modifier="xs"
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
                modifier="xs"
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
        <div className="col">
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
          <div>
            {sideDishTo.map((sideDishId) => {
              const { name: sideDishName } = findByKey(dishes, sideDishId) || {};

              return (
                <div key={sideDishId}>
                  <Button
                    aria-label={`remove-${sideDishId}`}
                    type="button"
                    value={sideDishId}
                    buttonText={capitalizeFirstLetter(sideDishName)}
                    onClick={() => handleRemoveMainDish(sideDishId)}
                  >
                    <Icon
                      iconName="close"
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
      <Button modifier="icon" onClick={handleSubmit} disabled={!canSave}>
        <Icon iconName="save" />
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
