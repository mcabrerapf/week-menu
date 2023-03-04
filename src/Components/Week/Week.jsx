import React from 'react';
import PropTypes from 'prop-types';
import './Week.css';
import Day from '../Day';

function Week({ weekPlan }) {
  return (

    <div className="week-plan">
      {weekPlan && <div className="days">{weekPlan.map((plan) => <Day key={plan.label} plan={plan} />)}</div>}
    </div>

  );
}

Week.propTypes = {
  weekPlan: PropTypes.arrayOf().isRequired,
};

export default Week;
