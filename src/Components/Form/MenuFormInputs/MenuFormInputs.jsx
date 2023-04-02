/* eslint-disable no-restricted-globals */
import React from 'react';
import PropTypes from 'prop-types';
import './MenuFormInputs.css';
import Input from '../../Input';
import Button from '../../Button';

function MenuFormInputs({ currentData, setCurrentData }) {
  const handleOnChange = ({ target: { value, name: eName } }) => {
    setCurrentData({ ...currentData, [eName]: value });
  };

  const {
    name, dishes, favourite,
  } = currentData;
  const favouriteButtonClass = favourite ? '' : 'not-favourite';

  return (
    <div className="form-inputs">
      <div className="menu-inputs">
        <Input
          autoComplete="off"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleOnChange}
          placeholder="Name"
          label="Name"
        />
        <Button modifier={favouriteButtonClass} onClick={() => handleOnChange({ target: { value: !favourite, name: 'favourite' } })}>
          <i className="fa fa-star" aria-hidden="true" />
        </Button>
      </div>

      <div className="menu-dishes">
        <span className="menu-dishes-label">Dishes</span>
        <ul className="menu-dishes-list">
          {dishes
            .map(({ name: dishName }) => (
              <li className="menu-dishes-list-item" key={dishName}>{dishName}</li>
            ))}
        </ul>
      </div>
    </div>
  );
}

MenuFormInputs.propTypes = {
  setCurrentData: PropTypes.func.isRequired,
  currentData: PropTypes.shape(),

};

MenuFormInputs.defaultProps = {
  currentData: {},
};

export default MenuFormInputs;
