/* eslint-disable react/jsx-filename-extension */
import React from 'react';

const buildSelectOptions = (options, key) => options
  .map(({
    value, id, name, [key]: optionalLabel,
  }) => (
    <option
      key={id || value}
      value={id || value}
    >
      {optionalLabel || name || id || value}
    </option>
  ));

export default buildSelectOptions;
