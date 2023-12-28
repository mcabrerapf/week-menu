import React from 'react';
import PropTypes from 'prop-types';
import { getIcon } from './helpers';

function Icon({ iconName }) {
  const IconToUse = getIcon(iconName);
  return <IconToUse />;
}

Icon.propTypes = {
  iconName: PropTypes.string,

};

Icon.defaultProps = {
  iconName: '',
};

export default Icon;
