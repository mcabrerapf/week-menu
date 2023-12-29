import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../Button';
import DishFormInputs from '../DishFormInputs';
import Icon from '../../../Icon';

function EditView({ dishData, setDishData, handleSubmit }) {
  const [fieldsView, setFieldsView] = useState(0);

  if (!dishData) return null;

  return (
    <>
      <div className="header">
        <Button
          modifier={`icon${fieldsView !== 0 ? ' bgc-gr' : ''}`}
          onClick={() => setFieldsView(0)}
        >
          <Icon iconName="info" />
        </Button>
        <Button
          modifier={`icon${fieldsView !== 1 ? ' bgc-gr' : ''}`}
          onClick={() => setFieldsView(1)}
        >
          <Icon iconName="ingredient" />
        </Button>
        <Button
          modifier={`icon${fieldsView !== 2 ? ' bgc-gr' : ''}`}
          onClick={() => setFieldsView(2)}
        >
          <Icon iconName="list" />
        </Button>
      </div>
      <DishFormInputs
        currentData={dishData}
        setCurrentData={setDishData}
        fieldsView={fieldsView}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

EditView.propTypes = {
  setDishData: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  dishData: PropTypes.shape(),

};

EditView.defaultProps = {
  dishData: {},
};

export default EditView;
