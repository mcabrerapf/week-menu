import React from 'react';
import PropTypes from 'prop-types';
import './Week.css';
import Day from './Day';

function Week({ menu, hidden }) {
  if (!menu || !menu.length) return null;

  return (
    <div className="week-plan" style={{ display: hidden ? 'none' : 'flex' }}>
      {menu.map((day) => <Day key={day.name} day={day} />)}
    </div>

  );
}

Week.propTypes = {
  hidden: PropTypes.bool.isRequired,
  menu: PropTypes.arrayOf(PropTypes.shape()),
};

Week.defaultProps = {
  menu: null,
};

export default Week;
