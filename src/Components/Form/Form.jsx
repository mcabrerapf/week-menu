import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Form.css';
import Button from '../Button';
import { MainContext } from '../../Contexts/MainContext';
import { checkIsButtonDisabled, getFormInputs, initFormData } from './helpers';
import { deepCompare } from '../helpers';

// TODO separate to individual forms

function Form({ formData, handleSubmit }) {
  const { view } = useContext(MainContext);
  const [currentData, setCurrentData] = useState();
  const [initialData, setInitialData] = useState();
  const [fieldsView, setFieldsView] = useState('0');

  useEffect(() => {
    const parsedData = initFormData(view, formData);
    setCurrentData(parsedData);
    setInitialData(parsedData);
  }, []);

  const handleSubmitButtonClick = () => {
    if (deepCompare(currentData, initialData)) {
      handleSubmit({}, true);
      return;
    }
    handleSubmit(currentData);
  };

  const changeFieldsView = (e) => {
    setFieldsView(e?.target?.value);
  };

  if (!currentData) return null;

  const FormInputs = getFormInputs(view);

  return (
    <form className="form">

      {view === 'dish' && (
        <div className="form-header">
          <Button modifier={`header-option${fieldsView !== '0' ? ' disabled' : ''}`} onClick={changeFieldsView} buttonText="General" value="0" />
          <Button modifier={`header-option${fieldsView !== '1' ? ' disabled' : ''}`} onClick={changeFieldsView} buttonText="Ingredients" value="1" />
          <Button modifier={`header-option${fieldsView !== '2' ? ' disabled' : ''}`} onClick={changeFieldsView} buttonText="Instructions" value="2" />
        </div>
      )}
      <FormInputs
        currentData={currentData}
        setCurrentData={setCurrentData}
        fieldsView={fieldsView}
      />

      <div className="form-footer">
        <Button
          modifier="submit"
          onClick={handleSubmitButtonClick}
          disabled={checkIsButtonDisabled(view, currentData)}
          disableMultipleClicks
        >
          <i className="fa fa-floppy-o" aria-hidden="true" />
        </Button>
      </div>

    </form>
  );
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  formData: PropTypes.shape(),

};

Form.defaultProps = {
  formData: {},
};

export default Form;
