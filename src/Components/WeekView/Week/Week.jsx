import React from 'react';
import PropTypes from 'prop-types';
import './Week.css';
import Day from './Day';

function Week({ weekPlan, hidden }) {
  if (!weekPlan || !weekPlan.length) return null;

  return (
    <div className="week-plan" style={{ display: hidden ? 'none' : 'flex' }}>
      {weekPlan.map((plan) => <Day key={plan.label} plan={plan} />)}
    </div>

  );
}

Week.propTypes = {
  hidden: PropTypes.bool.isRequired,
  weekPlan: PropTypes.arrayOf(PropTypes.shape()),
};

Week.defaultProps = {
  weekPlan: null,
};

export default Week;
