/* eslint-disable no-restricted-globals */
import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Form.css';
import Button from '../Button';
import { MainContext } from '../../Contexts/MainContext';
import {
  DISH_STRING, MENU_STRING,
} from '../../constants';
import { checkIsButtonDisabled, initFormData } from './helpers';
import { deepCompare } from '../helpers';
import DishFormInputs from './DishFormInputs';
import IngredientFormInputs from './IngredientFormInputs';
import MenuFormInputs from './MenuFormInputs';

const getFormInputs = (type) => {
  switch (type) {
    case MENU_STRING:
      return MenuFormInputs;
    case DISH_STRING:
      return DishFormInputs;
    default:
      return IngredientFormInputs;
  }
};
function Form({ formData, handleSubmit }) {
  const { view } = useContext(MainContext);
  const [currentData, setCurrentData] = useState();
  const [initialData, setInitialData] = useState();
  const [showIngredients, setShowIngredients] = useState(false);

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

  const toggleIngredientsView = () => {
    setShowIngredients(!showIngredients);
  };

  if (!currentData) return null;

  const buttonClassName = `submit${checkIsButtonDisabled(view, currentData) ? ' disabled' : ''}`;
  const FormInputs = getFormInputs(view);
  const headerText = showIngredients ? 'View Dish' : 'View Ingredients';

  return (
    <form className="form">
      {view === 'dish' && (
      <div className="form-header">
        <Button className="header-option" onClick={toggleIngredientsView} buttonText={headerText} />
      </div>
      )}
      <FormInputs
        currentData={currentData}
        setCurrentData={setCurrentData}
        showIngredients={showIngredients}
      />
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
