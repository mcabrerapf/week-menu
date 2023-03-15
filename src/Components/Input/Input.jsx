import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';
import { parseClassName, buildSelectOptions } from '../helpers';

function Button({
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
}) {
  const className = parseClassName('input', modifier);

  const setCursorOnInputEnd = (event) => {
    const { value: eValue } = event.target;
    const position = eValue.length;
    event.target.setSelectionRange(position, position);
  };

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
      />
      )}
      {type === 'select' && (
      <select
        className="select-input"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
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
        />
      )}
      {type === 'number' && (
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          className="number-input"
          aria-label={id}
          key={id}
          id={id}
          name={name}
          value={value}
          onClick={setCursorOnInputEnd}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
        />
      )}
      {!!children && children}
    </div>

  );
}

Button.propTypes = {
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  type: PropTypes.string,
  selectOptions: PropTypes.arrayOf(PropTypes.shape()),
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  modifier: PropTypes.string,
  children: PropTypes.shape(),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  enableDefaultSelect: PropTypes.bool,
};

Button.defaultProps = {
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
};

export default Button;
