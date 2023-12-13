/* eslint-disable no-restricted-globals */
import React from 'react';
import PropTypes from 'prop-types';
import './DishFormInputs.css';
import IngredientsFields from './IngredientsFields';
import GeneralFields from './GeneralFields';
import InstructionsFields from './InstructionsFields';

function DishFormInputs({
  currentData, setCurrentData, fieldsView, handleSubmit,
}) {
  const {
    ingredients, instructions,
  } = currentData;

  const updateIngredients = (updatedIngredients) => {
    setCurrentData({ ...currentData, ingredients: updatedIngredients });
  };

  const updateGeneralFields = (updatedFields) => {
    setCurrentData(updatedFields);
  };

  const updateInstructions = (updatedFields) => {
    setCurrentData({ ...currentData, instructions: updatedFields });
  };

  return (
    <div className="form-inputs dish">

      {fieldsView === 0
      && (
      <GeneralFields
        currentData={currentData}
        updateGeneralFields={updateGeneralFields}
        handleSubmit={handleSubmit}
      />
      )}
      {fieldsView === 1
      && (
      <IngredientsFields
        ingredients={ingredients}
        updateIngredients={updateIngredients}
        handleSubmit={handleSubmit}
      />
      )}
      {fieldsView === 2
      && (
      <InstructionsFields
        instructions={instructions}
        updateInstructions={updateInstructions}
        handleSubmit={handleSubmit}
      />
      )}
    </div>
  );
}

DishFormInputs.propTypes = {
  setCurrentData: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  fieldsView: PropTypes.number,
  currentData: PropTypes.shape(),

};

DishFormInputs.defaultProps = {
  currentData: {},
  fieldsView: 0,
};

export default DishFormInputs;
