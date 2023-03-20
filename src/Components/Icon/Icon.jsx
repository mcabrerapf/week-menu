import React from 'react';
import PropTypes from 'prop-types';
import './Icon.css';
import icons from './svgs';

function Icon({ type }) {
  return (
    <div
      className="icon-component"
      style={{
        backgroundImage: `url(${icons[type || 'test']})`,
      }}
    />
  );
}

Icon.propTypes = {
  type: PropTypes.string,

};

Icon.defaultProps = {
  type: '',
};

export default Icon;
