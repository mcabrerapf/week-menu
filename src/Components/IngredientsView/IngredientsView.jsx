import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import IngredientsList from './IngredientsList';
import './IngredientsView.css';
import { handleGetAllIngredients } from '../../Services';

function IngredientsView({ hidden }) {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function getAllIngs() {
      const {
        data: {
          listIngredients: { items: ingredientsData },
        },
      } = await handleGetAllIngredients();
      setIngredients(ingredientsData);
    }
    getAllIngs();
  }, []);

  return (
    <div className="ingredients-view" style={{ display: hidden ? 'none' : 'flex' }}>
      <IngredientsList ingredients={ingredients} setIngredients={setIngredients} />
    </div>
  );
}

IngredientsView.propTypes = {
  hidden: PropTypes.bool.isRequired,
};

export default IngredientsView;
