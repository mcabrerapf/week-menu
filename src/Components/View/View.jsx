import React from 'react';
import PropTypes from 'prop-types';
import './View.css';
import List from '../List';
import { useMainContext, MainContext } from '../../Context';

function View({
  name,
}) {
  const { view, ingredients, dishes } = useMainContext(MainContext);
  const isHidden = view !== name;
  const listData = view === 'dish' ? dishes : ingredients;
  const className = isHidden ? 'view no-show' : 'view';

  return (
    <div className={className}>
      <List listData={listData} />
    </div>
  );
}

View.propTypes = {
  name: PropTypes.string.isRequired,
};

export default View;
