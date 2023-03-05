import React from 'react';
import PropTypes from 'prop-types';
import './ShopingList.css';

function ShopingListNoteSectionItem({
  dishes, label, baseLabel, setShowTooltip,
}) {
  const handleOnClick = () => {
    setShowTooltip({
      modalProps: { headerText: baseLabel },
      tooltipProps: { ingredientLabel: label, dishes },
    });
  };

  return (
    <span role="button" tabIndex={0} className="ingredient-item" onClick={handleOnClick} onKeyDown={handleOnClick}>
      {label}
    </span>
  );
}

ShopingListNoteSectionItem.propTypes = {
  label: PropTypes.string.isRequired,
  baseLabel: PropTypes.string.isRequired,
  dishes: PropTypes.arrayOf(PropTypes.string).isRequired,
  setShowTooltip: PropTypes.func.isRequired,
};

export default ShopingListNoteSectionItem;
