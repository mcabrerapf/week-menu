import React, { useState } from 'react';
import { INGREDIENTS } from '../../constants/INGREDIENTS';
import { capitalizeFirstLetter } from '../../helpers';
import Modal from '../../Modal';
import Ingredient from './Ingredient';
import './IngredientsList.css';

// TODO: improve this shit
function IngredientsList() {
  const [showModal, setShowModal] = useState({ show: false, action: null, modalData: {} });
  const { show, action, modalData } = showModal;
  const ingredients = Object.keys(INGREDIENTS).map((key) => INGREDIENTS[key]);
  const handleDelete = (data) => {
    setShowModal({ show: !show, action: 0, modalData: data });
  };

  const handleEdit = (data) => {
    setShowModal({ show: !show, action: 1, modalData: data });
  };

  return (
    <div>
      <ul className="ingredients-list">
        {ingredients.map(({ label, type, unit }) => (
          <Ingredient
            key={`${label}-${type}`}
            label={label}
            type={type}
            unit={unit}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </ul>
      {show
        && (
        <Modal
          headerText={action === 0 ? 'delete' : 'edit'}
          hideModal={() => setShowModal({ show: false, action: null })}
        >
          <div>
            {`${capitalizeFirstLetter(modalData.label)} - ${modalData.type} -  (${modalData.unit})`}

          </div>
        </Modal>
        )}
    </div>

  );
}

export default IngredientsList;
