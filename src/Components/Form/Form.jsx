/* eslint-disable no-restricted-globals */
import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Form.css';
import Button from '../Button';
import { MainContext } from '../../Contexts/MainContext';
import {
  DISH_STRING, INGREDIENT_STRING, MENU_STRING,
} from '../../constants';
import { checkIsButtonDisabled, initFormData } from './helpers';
import { deepCompare } from '../helpers';
import DishFormInputs from './DishFormInputs';
import IngredientFormInputs from './IngredientFormInputs';
import MenuFormInputs from './MenuFormInputs';

function Form({ formData, handleSubmit }) {
  const { view } = useContext(MainContext);
  const [currentData, setCurrentData] = useState();
  const [initialData, setInitialData] = useState();

  useEffect(() => {
    const parsedData = initFormData(view, formData);
    setCurrentData(parsedData);
    setInitialData(parsedData);
  }, []);

  const handleSubmitButtonClick = () => {
    if (deepCompare(currentData, initialData)) {
      handleSubmit({}, true);
      return;
    }
    handleSubmit(currentData);
  };

  if (!currentData) return null;

  const buttonClassName = `submit${checkIsButtonDisabled(view, currentData) ? ' disabled' : ''}`;

  return (
    <form className="form">
      { view === DISH_STRING && (
        <DishFormInputs currentData={currentData} setCurrentData={setCurrentData} />
      )}
      { view === INGREDIENT_STRING && (
        <IngredientFormInputs currentData={currentData} setCurrentData={setCurrentData} />
      )}
      { view === MENU_STRING && (
        <MenuFormInputs currentData={currentData} setCurrentData={setCurrentData} />
      )}

      <Button
        modifier={buttonClassName}
        onClick={handleSubmitButtonClick}
        disabled={checkIsButtonDisabled(view, currentData)}
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
  formData: {},
};

export default Form;
