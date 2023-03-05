import React from 'react';
import PropTypes from 'prop-types';
import './Week.css';
import Day from './Day';

function Week({ weekPlan }) {
  if (!weekPlan || !weekPlan.length) return null;
  return (
    <div className="week">
      {weekPlan.map((plan) => <Day key={plan.label} plan={plan} />)}
    </div>

  );
}

Week.propTypes = {
  weekPlan: PropTypes.arrayOf(PropTypes.shape()),
};

Week.defaultProps = {
  weekPlan: null,
};

export default Week;
