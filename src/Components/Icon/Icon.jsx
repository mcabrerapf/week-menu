import React from 'react';
import PropTypes from 'prop-types';
import './Icon.css';
import icons from './svgs';

function Icon({ type, value }) {
  return (
    <div
      className="icon-component"
      value={value}
      style={{
        backgroundImage: `url(${icons[type || 'test']})`,
      }}
    />
  );
}

Icon.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,

};

Icon.defaultProps = {
  type: '',
  value: '',
};

export default Icon;
