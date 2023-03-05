import React from 'react';
import PropTypes from 'prop-types';

function ShoppingListToolTip({
  dishes,
}) {
  const uniqueDishes = [...new Set([...dishes])];
  return (
    <div
      className="shopping-list-tooltip"

    >
      <ul className="tooltip-list">
        {uniqueDishes.map((dish) => <li key={dish} className="tooltip-list-item">{dish}</li>)}
      </ul>
    </div>
  );
}

ShoppingListToolTip.propTypes = {
  dishes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ShoppingListToolTip;
