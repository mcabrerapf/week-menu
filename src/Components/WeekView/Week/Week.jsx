import React from 'react';
import PropTypes from 'prop-types';
import './Week.css';
import Day from './Day';

function Week({ weekPlan }) {
  return (
    <div className="week">
      {weekPlan.map((plan) => <Day key={plan.label} plan={plan} />)}
    </div>

  );
}

Week.propTypes = {
  weekPlan: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Week;
