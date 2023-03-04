import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

function ShoppingListToolTip({
  style, dishes, ingredientLabel, setShowTooltip,
}) {
  const wrapperRef = useRef(null);

  useEffect(
    () => {
      function handleClickOutside({ target, target: { innerText } }) {
        const shouldHideFlyOut = innerText !== ingredientLabel
          && wrapperRef.current
          && !wrapperRef.current.contains(target);
        if (shouldHideFlyOut) setShowTooltip(false);
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    },
    [setShowTooltip, wrapperRef],
  );

  return (
    <div
      ref={wrapperRef}
      className="shopping-list-tooltip"
      style={style}
    >
      <ul className="tooltip-list">
        {dishes.map((dish) => <li className="tooltip-list-item">{dish}</li>)}
      </ul>
    </div>
  );
}

ShoppingListToolTip.propTypes = {
  style: PropTypes.shape().isRequired,
  ingredientLabel: PropTypes.string.isRequired,
  setShowTooltip: PropTypes.func.isRequired,
  dishes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ShoppingListToolTip;
