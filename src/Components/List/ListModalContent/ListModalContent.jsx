import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  serviceHandler,
} from '../../../Services';
import { useMainContext, MainContext } from '../../../Context';
import {
  CREATE_STRING, DELETE_STRING, DISH_STRING, GET_ALL_STRING, INGREDIENT_STRING, UPDATE_STRING,
} from '../../../constants';
import './ListModalContent.css';
import Form from '../../Form';
import Button from '../../Button';
import { sortBy } from '../../helpers';

function ListModal({
  modalData, action, setParentData, setShowModal,
}) {
  const { view, offlineMode } = useMainContext(MainContext);
  const [modalMode, setModalMode] = useState();
  const [ingredientsData, setIngredientsData] = useState();

  useEffect(() => {
    // TODO: check why double api call on init
    async function initForm() {
      if (view === DISH_STRING) {
        const ingredients = await serviceHandler(GET_ALL_STRING, offlineMode)(INGREDIENT_STRING);
        const sortedIngredients = sortBy(ingredients, 'name', 'alphabetical');
        setIngredientsData(sortedIngredients);
      }
      setModalMode(action);
    }
    initForm();
  }, []);

  const { id } = modalData;
  const displayForm = modalMode === 0 || modalMode === 2;

  const handleSubmit = async (submitData) => {
    const serviceToUse = action === 0
      ? serviceHandler(CREATE_STRING, offlineMode) : serviceHandler(UPDATE_STRING, offlineMode);
    const parsedData = action === 0 ? submitData : { ...submitData, id };
    await serviceToUse(view, parsedData);
    const updatedData = await serviceHandler(GET_ALL_STRING, offlineMode)(view);
    if (updatedData) setParentData(updatedData);
    setShowModal({ show: false });
  };

  const handleDelete = async () => {
    await serviceHandler(DELETE_STRING, offlineMode)(view, { id });
    const updatedData = await serviceHandler(GET_ALL_STRING, offlineMode)(view);
    if (updatedData) setParentData(updatedData);
    setShowModal({ show: false });
  };

  const {
    name, unit, type, description, instructions, ingredients,
  } = modalData;
  if (typeof modalMode !== 'number') return null;

  return (
    <div className="list-modal-content">
      {modalMode === 1 && (
        <div className="list-modal-content-display">
          <div className="list-modal-content-display-props">
            {type && (
            <div className="list-modal-content-display-props-prop">
              <span>
                <strong>Type: </strong>
                {type}
              </span>

            </div>
            )}
            {unit && (
            <div className="list-modal-content-display-props-prop">
              <span>
                <strong>Unit: </strong>
                {unit}
              </span>

            </div>
            )}
            {ingredients && (
              <ul className="list-modal-content-display-props-ingredients">
                <li
                  className="list-modal-content-display-props-ingredients-label"
                >
                  Ingredients:
                </li>
                {ingredients.map(({ id: ingId, quantity }) => {
                  const { name: ingName } = ingredientsData
                    .find(({ id: idToCheck }) => ingId === idToCheck);
                  return (
                    <li key={ingId}>
                      -
                      {' '}
                      {ingName}
                      :
                      {' '}
                      {quantity}
                    </li>
                  );
                })}
              </ul>
            )}
            {description && (
            <div className="list-modal-content-display-props-prop">
              <span>
                <strong>Description: </strong>
                {description}
              </span>
            </div>
            )}
            {instructions && (
            <div className="list-modal-content-display-props-prop">
              <span>
                <strong>Instructions: </strong>
                {instructions}
              </span>
            </div>
            )}
          </div>
          <Button modifier="edit" buttonText="Edit" onClick={() => setModalMode(2)} />
        </div>
      )}
      {displayForm && (
        <Form handleSubmit={handleSubmit} formData={modalData} ingredientsData={ingredientsData} />
      )}
      {modalMode === 3 && (
        <div className="list-modal-content-delete">
          <div className="list-modal-content-delete-message">
            <span> Are you sure you want to delete</span>
            <span>
              <strong>
                {name}
              </strong>
            </span>
          </div>
          <div className="list-modal-content-delete-buttons">
            <Button modifier="delete" buttonText="DELETE" onClick={handleDelete} />
            <Button modifier="cancel" buttonText="Cancel" onClick={() => setShowModal({ show: false })} />
          </div>

        </div>

      )}
    </div>
  );
}

ListModal.propTypes = {
  setParentData: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape(),
  action: PropTypes.number,
};

ListModal.defaultProps = {
  modalData: {},
  action: 0,
};

export default ListModal;
