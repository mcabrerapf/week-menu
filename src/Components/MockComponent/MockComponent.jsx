import React from 'react';
import PropTypes from 'prop-types';
import './MockComponent.css';

function MockComponent({ prop }) {
  return (
    <div className="mock-component">
      {prop}
    </div>
  );
}

MockComponent.propTypes = {
  prop: PropTypes.string,

};

MockComponent.defaultProps = {
  prop: '',
};

export default MockComponent;
