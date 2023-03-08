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
        data,
      } = await handleGetAllIngredients();
      if (!data) return;
      const {
        listIngredients: { items },
      } = data;
      setIngredients(items);
    }
    getAllIngs();
  }, []);
  console.log({ ingredients });
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
