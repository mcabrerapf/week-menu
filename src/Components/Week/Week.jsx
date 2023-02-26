import React from 'react';
import './Week.css';
import Day from '../Day';

function Week({ weekPlan }) {
  return (

    <div className="week-plan">
      {weekPlan && <div className="days">{weekPlan.map((plan) => <Day key={plan.label} plan={plan} />)}</div>}
    </div>

  );
}

export default Week;
