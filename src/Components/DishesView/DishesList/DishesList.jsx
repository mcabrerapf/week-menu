import React from 'react';
import './DishesList.css';
import { DISHES } from '../../constants';
import Dish from './Dish';

function Dishes() {
  return (
    <div className="dishes-list">
      {DISHES.map(({ label }) => <Dish key={label} label={label} />)}
    </div>
  );
}

export default Dishes;
