import React from 'react';
import PropTypes from 'prop-types';
import { getIcon } from './helpers';

function Icon({ iconName, modifier }) {
  const IconToUse = getIcon(iconName);
  return <IconToUse className={modifier} />;
}

Icon.propTypes = {
  iconName: PropTypes.string,
  modifier: PropTypes.string,

};

Icon.defaultProps = {
  iconName: '',
  modifier: '',
};

export default Icon;
