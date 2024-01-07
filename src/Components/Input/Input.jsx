/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Input.css';
import { buildSelectOptions } from '../helpers';

function Input({
  modifier,
  id,
  name,
  value,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  selectOptions,
  type,
  enableDefaultSelect,
  disabled,
  min,
  max,
  resetValueOnClick,
  autoFocus,
}) {
  const [initialValue, setInitialValue] = useState(value);

  const checkLimits = (val) => {
    const parsedValue = Number(val);
    const valueToUse = parsedValue || initialValue;
    if (min === null && max === null) return valueToUse;
    if (min !== null && max === null) return valueToUse >= min ? valueToUse : min;
    if (min === null && max !== null) return valueToUse <= max ? valueToUse : max;
    if (min !== null && max !== null) {
      if (valueToUse <= min) return min;
      if (valueToUse >= max) return max;
    }
    return valueToUse;
  };

  const buildNumberEvent = (e, bypassCheck) => {
    const { target: { value: eValue, id: eId, name: eName } } = e;
    const valueToUse = bypassCheck ? eValue : checkLimits(eValue);

    return {
      ...e,
      target: {
        id: eId, name: eName, value: Number(valueToUse),
      },
    };
  };

  const setCursorOnInputEnd = (e) => {
    const { value: eValue } = e.target;
    const position = eValue.length;
    e.target.setSelectionRange(position, position);
  };

  const handleNumberBlur = (e) => {
    const newE = buildNumberEvent(e);
    newE.target.value = newE.target.value === '' ? initialValue : newE.target.value;
    setInitialValue(newE.target.value);
    onBlur(newE);
  };

  const handleNumberFocus = (e) => {
    const newE = buildNumberEvent(e);
    newE.target.value = resetValueOnClick ? '' : value;
    onFocus(newE);
  };

  const handleNumberChange = (e) => {
    const newE = buildNumberEvent(e, true);
    onChange(newE);
  };

  const handleEnter = (e) => {
    const { target, key } = e;
    const { form } = target;

    if (key.toLowerCase() === 'enter') {
      e.preventDefault();
      const index = [...form].indexOf(target);
      form.elements[index + 1].focus();
    }
    if (type === 'number') {
      const newE = buildNumberEvent(e);
      onChange(newE);
    }
    onChange(e);
  };

  return (
    <>
      {type === 'search' && (
      <input
        className={`text-input border-rad-5 pad-5 ${modifier}`}
        autoComplete="off"
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        onKeyDown={handleEnter}
      />
      )}
      {type === 'text' && (
      <input
        className={`text-input border-rad-5 pad-5 ${modifier}`}
        autoComplete="off"
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        onKeyDown={handleEnter}
      />
      )}
      {type === 'number' && (
        <input
          type="text"
          autoComplete="off"
          inputMode="numeric"
          pattern="[0-9]*"
          className={`number-input border-rad-5 pad-5 ${modifier}`}
          aria-label={id}
          key={id}
          id={id}
          name={name}
          value={value}
          onClick={setCursorOnInputEnd}
          onFocus={handleNumberFocus}
          onBlur={handleNumberBlur}
          onChange={handleNumberChange}
          disabled={disabled}
          onKeyDown={handleEnter}
        />
      )}
      {type === 'checkbox' && (
      <input
        className={`checkbox-input border-rad-5 pad-5 ${modifier}`}
        autoComplete="off"
        type={type}
        id={id}
        name={name}
        checked={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
      )}
      {type === 'textarea' && (
      <textarea
        className={`textarea-input border-rad-5 pad-5 w-f ${modifier}`}
        autoComplete="off"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        onBlur={onBlur}
        autoFocus={autoFocus}
      />
      )}
      {type === 'select' && (
      <select
        className={`select-input border-rad-5 pad-5 ${modifier}`}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onKeyDown={handleEnter}
      >
        {placeholder && (
        <option value="" className="select-input-option" disabled={!enableDefaultSelect}>
          {placeholder}
        </option>
        )}
        {buildSelectOptions(selectOptions)}
      </select>
      )}

    </>

  );
}

Input.propTypes = {
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  type: PropTypes.string,
  selectOptions: PropTypes.arrayOf(PropTypes.shape()),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  modifier: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  enableDefaultSelect: PropTypes.bool,
  disabled: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  resetValueOnClick: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

Input.defaultProps = {
  type: 'text',
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  selectOptions: [],
  modifier: '',
  id: '',
  name: '',
  placeholder: '',
  value: '',
  enableDefaultSelect: false,
  disabled: false,
  min: null,
  max: null,
  resetValueOnClick: true,
  autoFocus: false,
};

export default Input;
