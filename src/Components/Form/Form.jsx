import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Form.css';
import Button from '../Button';
import { MainContext, useMainContext } from '../../Context';
import { buildSelectOptions } from '../helpers';
import { SELECT_OPTIONS } from '../constants/INGREDIENTS';

const initData = ({
  name, unit, type,
}) => ({
  name: name || '',
  type: type || '',
  unit: unit || '',
  // time: time || '',f
  // ingredients: ingredients || [],
  // size: size || '',
  // instructions: instructions || '',
  // description: description || '',
});

function Form({ formData, handleSubmit }) {
  const { view } = useMainContext(MainContext);
  const [currentData, setCurrentData] = useState();

  useEffect(() => {
    setCurrentData(initData(formData));
  }, []);

  if (!formData) return null;
  const { name, type, unit } = formData;

  const isButtonDisabled = !name || !type || !unit;

  const handleSubmitButtonClick = () => {
    if (isButtonDisabled) return;
    handleSubmit(formData);
  };

  const handleOnChange = ({ target: { value, name: eName } }) => {
    setCurrentData({ ...currentData, [eName]: value });
  };

  return (
    <form className="form">
      <input
        className="form-input"
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={handleOnChange}
        placeholder="Name"
      />
      <select
        className="form-select"
        name="type"
        id="type"
        value={type}
        onChange={handleOnChange}
      >
        <option value="" className="form-select-option" disabled>
          Choose an
          {' '}
          {view}
          {' '}
          type...
        </option>
        {buildSelectOptions(SELECT_OPTIONS[view].type)}
      </select>
      <select
        className="form-select"
        id="unit"
        name="unit"
        value={unit}
        onChange={handleOnChange}
      >
        <option value="" className="form-select-option" disabled>
          Choose an
          {' '}
          {view}
          {' '}
          unit...
        </option>
        {buildSelectOptions(SELECT_OPTIONS[view].unit)}
      </select>
      <Button
        modifier="submit"
        handleOnClick={handleSubmitButtonClick}
        disabled={isButtonDisabled}
        buttonText="Save"

      />
    </form>
  );
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  formData: PropTypes.shape(),

};

Form.defaultProps = {
  formData: '',
};

export default Form;
