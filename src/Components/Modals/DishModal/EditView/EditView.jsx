import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../Button';
import DishFormInputs from '../DishFormInputs';
import { IngredientIcon, ListIcon, InfoIcon } from '../../../Icons';

function EditView({ dishData, setDishData, handleSubmit }) {
  const [fieldsView, setFieldsView] = useState(0);

  if (!dishData) return null;

  return (
    <form className="form">
      <div className="form-header">
        <Button
          modifier={`header-option icon-only${fieldsView !== 0 ? ' disabled' : ''}`}
          onClick={() => setFieldsView(0)}
        >
          <InfoIcon />
        </Button>
        <Button
          modifier={`header-option icon-only${fieldsView !== 1 ? ' disabled' : ''}`}
          onClick={() => setFieldsView(1)}
        >
          <IngredientIcon />
        </Button>
        <Button
          modifier={`header-option icon-only${fieldsView !== 2 ? ' disabled' : ''}`}
          onClick={() => setFieldsView(2)}
        >
          <ListIcon />
        </Button>
      </div>
      <DishFormInputs
        currentData={dishData}
        setCurrentData={setDishData}
        fieldsView={fieldsView}
        handleSubmit={handleSubmit}
      />
    </form>
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
