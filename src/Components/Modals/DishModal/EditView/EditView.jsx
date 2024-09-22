import React, { useState } from 'react';
import './EditView.scss';
import PropTypes from 'prop-types';
import Button from '../../../Button';
import DishFormInputs from '../DishFormInputs';
import Icon from '../../../Icon';

function EditView({ dishData, setDishData, handleSubmit }) {
  const [fieldsView, setFieldsView] = useState(0);

  return (
    <>
      <div className="header row">
        <Button
          modifier="icon"
          fakeDisabled={fieldsView !== 0}
          onClick={() => setFieldsView(0)}
        >
          <Icon iconName="info" />
        </Button>
        <Button
          modifier="icon"
          fakeDisabled={fieldsView !== 1}
          onClick={() => setFieldsView(1)}
        >
          <Icon iconName="ingredient" />
        </Button>
        <Button
          modifier="icon"
          fakeDisabled={fieldsView !== 2}
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
