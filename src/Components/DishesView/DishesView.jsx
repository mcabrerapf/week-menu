import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './DishesView.css';
import DishesList from './DishesList';
import { handleGetAllDishes } from '../../Services';

function DishesView({ hidden }) {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    async function getAllIngs() {
      const {
        data,
      } = await handleGetAllDishes();
      if (!data) return;
      const {
        listDishes: { items },
      } = data;
      setDishes(items);
    }
    getAllIngs();
  }, []);

  return (
    <div className="dishes-view" style={{ display: hidden ? 'none' : 'flex' }}>
      <DishesList dishes={dishes} setDishes={setDishes} />
    </div>
  );
}

DishesView.propTypes = {
  hidden: PropTypes.bool.isRequired,
};

export default DishesView;
