/* eslint-disable no-restricted-globals */
import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';
import { parseClassName, buildSelectOptions } from '../helpers';

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
  label,
  children,
  enableDefaultSelect,
  disabled,
  min,
  max,
  resetValueOnClick,
}) {
  const checkLimits = (val) => {
    const parsedValue = Number(val);
    if (min === null && max === null) return parsedValue;
    if (min !== null && max === null) return parsedValue >= min ? parsedValue : min;
    if (min === null && max !== null) return parsedValue <= max ? parsedValue : max;
    if (min !== null && max !== null) {
      if (parsedValue <= min) return min;
      if (parsedValue >= max) return max;
    }
    return parsedValue;
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
    newE.target.value = newE.target.value === '' ? 0 : newE.target.value;
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
    const newE = buildNumberEvent(e);
    if (key.toLowerCase() === 'enter') {
      e.preventDefault();

      const index = [...form].indexOf(target);
      form.elements[index + 1].focus();
    }
    onChange(newE);
  };

  const className = parseClassName('input', modifier);

  return (
    <div className={className}>
      {label && <label className="input-label" htmlFor={id}>{label}</label>}
      {type === 'checkbox' && (
      <input
        className="checkbox-input"
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
      {type === 'text' && (
      <input
        className="text-input"
        autoComplete="off"
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        onKeyDown={handleEnter}
      />
      )}
      {type === 'select' && (
      <select
        className="select-input"
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
      {type === 'textarea' && (
        <textarea
          className="textarea-input"
          autoComplete="off"
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
      {type === 'number' && (
        <input
          type="text"
          autoComplete="off"
          inputMode="numeric"
          pattern="[0-9]*"
          className="number-input"
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
      {!!children && children}
    </div>

  );
}

Input.propTypes = {
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  type: PropTypes.string,
  selectOptions: PropTypes.arrayOf(PropTypes.shape()),
  label: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  modifier: PropTypes.string,
  children: PropTypes.shape(),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  enableDefaultSelect: PropTypes.bool,
  disabled: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  resetValueOnClick: PropTypes.bool,
};

Input.defaultProps = {
  type: 'text',
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  selectOptions: [],
  label: '',
  modifier: '',
  id: '',
  name: '',
  placeholder: '',
  value: '',
  children: null,
  enableDefaultSelect: false,
  disabled: false,
  min: null,
  max: null,
  resetValueOnClick: true,
};

export default Input;
