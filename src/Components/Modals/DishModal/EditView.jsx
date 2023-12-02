import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import DishFormInputs from './DishFormInputs';

function EditView({ formData, setDishData }) {
  const [fieldsView, setFieldsView] = useState('0');

  const changeFieldsView = (e) => {
    setFieldsView(e?.target?.value);
  };

  if (!formData) return null;

  return (
    <form className="form">
      <div className="form-header">
        <Button modifier={`header-option${fieldsView !== '0' ? ' disabled' : ''}`} onClick={changeFieldsView} buttonText="General" value="0" />
        <Button modifier={`header-option${fieldsView !== '1' ? ' disabled' : ''}`} onClick={changeFieldsView} buttonText="Ingredients" value="1" />
        <Button modifier={`header-option${fieldsView !== '2' ? ' disabled' : ''}`} onClick={changeFieldsView} buttonText="Instructions" value="2" />
      </div>
      <DishFormInputs
        currentData={formData}
        setCurrentData={setDishData}
        fieldsView={fieldsView}
      />
    </form>
  );
}

EditView.propTypes = {
  setDishData: PropTypes.func.isRequired,
  formData: PropTypes.shape(),

};

EditView.defaultProps = {
  formData: {},
};

export default EditView;
