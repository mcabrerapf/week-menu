import React from 'react';
import PropTypes from 'prop-types';

function ShopingListItem({ label }) {
  return <div className="shoping-list-section-item">{label}</div>;
}

ShopingListItem.propTypes = {
  label: PropTypes.string.isRequired,
};

export default ShopingListItem;
