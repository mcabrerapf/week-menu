/* eslint-disable no-restricted-globals */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './DishFormInputs.css';
import { MainContext } from '../../../../Contexts/MainContext';
import IngredientsField from './IngredientsField';
import Button from '../../../Button';
import NewIngredientForm from './NewIngredientForm';
import AddIngredientsView from './AddIngredientsView';
import Icon from '../../../Icon';

function IngredientsFields({
  ingredients, updateIngredients, handleSubmit, canSave,
}) {
  const { ingredients: contextIngredients } = useContext(MainContext);
  const [ingredientsView, setIngredientsView] = useState(0);

  const handleRemoveIngredient = (ingredientId) => {
    const updatedIngredients = ingredients
      .filter(({ id: currentId }) => ingredientId !== currentId);
    updateIngredients(updatedIngredients);
  };

  const handleIngredientChange = (e = {}) => {
    const { target: { value: eValue, id: eId, name: eName } } = e;

    const updatedIngredients = ingredients.map((ing) => {
      const { id: ingId } = ing;
      if (ingId === eId) {
        return {
          ...ing,
          [eName]: eValue,
        };
      }
      return ing;
    });
    updateIngredients(updatedIngredients);
  };

  const toggleNewIngredientView = (newIngredient) => {
    if (newIngredient.id) {
      const updatedIngredients = [...ingredients, {
        ...newIngredient, quantity: 1,
      }];
      updateIngredients(updatedIngredients);
    }
    setIngredientsView(0);
  };

  return (
    <>
      {ingredientsView === 0 && (
      <IngredientsField
        ingredients={ingredients}
        handleIngredientChange={handleIngredientChange}
        handleRemoveIngredient={handleRemoveIngredient}
      />
      )}
      {ingredientsView === 1 && (
        <AddIngredientsView
          ingredients={contextIngredients}
          selectedIngredients={ingredients}
          setIngredientsView={setIngredientsView}
          updateIngredients={updateIngredients}
        />
      )}
      {ingredientsView === 2
      && <NewIngredientForm toggleNewIngredientView={toggleNewIngredientView} />}
      { ingredientsView === 0 && (
      <div className="col gap-5">

        <Button
          modifier="icon"
          onClick={() => setIngredientsView(1)}
        >
          <Icon iconName="plus" />
        </Button>

        <Button
          modifier="icon"
          onClick={handleSubmit}
          disabled={!canSave}
        >
          <Icon iconName="save" />
        </Button>

      </div>
      )}

    </>
  );
}

IngredientsFields.propTypes = {
  updateIngredients: PropTypes.func.isRequired,
  canSave: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape()),
};

IngredientsFields.defaultProps = {
  ingredients: [],
};

export default IngredientsFields;
