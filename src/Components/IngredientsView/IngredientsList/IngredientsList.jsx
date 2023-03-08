import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../Modal';
import Ingredient from './Ingredient';
import IngredentModal from './IngredientModal';
import './IngredientsList.css';
import { getModalHeader } from '../../Modal/helpers';

// TODO: improve this shit
function IngredientsList({ ingredients, setIngredients }) {
  const [showModal, setShowModal] = useState({
    show: false, action: null, modalData: {},
  });
  const {
    show, action, modalData,
  } = showModal;
  if (!ingredients) return null;

  const handleNameClick = (data) => {
    setShowModal({
      show: !show, action: 1, modalData: data,
    });
  };

  const handleEdit = (data) => {
    setShowModal({
      show: !show, action: 2, modalData: data,
    });
  };

  const handleDelete = (data) => {
    setShowModal({ show: !show, action: 3, modalData: data });
  };

  return (
    <div className="ingredients-list-container">
      <ul className="ingredients-list">
        {ingredients.map((ingredient) => (
          <Ingredient
            key={ingredient.id}
            label={ingredient.name}
            type={ingredient.type}
            unit={ingredient.unit}
            ingredient={ingredient}
            handleNameClick={handleNameClick}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </ul>
      <div className="add-ingredient">
        <button
          className="add-ingredient-button"
          type="button"
          onClick={() => setShowModal({ show: !show, action: 0, modalData: {} })}
        >
          <i className="fa fa-plus" aria-hidden="true" />

        </button>
      </div>
      {show
        && (
        <Modal
          headerText={getModalHeader(action, modalData.name, 'Ingredient')}
          hideModal={() => setShowModal({ show: false, action: null })}
        >
          <IngredentModal
            ingredient={modalData}
            action={action}
            setIngredients={setIngredients}
            setShowModal={setShowModal}
          />
        </Modal>
        )}
    </div>
  );
}

IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setIngredients: PropTypes.func.isRequired,
};

export default IngredientsList;
