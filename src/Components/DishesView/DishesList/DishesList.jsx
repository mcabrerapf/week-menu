import React, { useState } from 'react';
import './DishesList.css';
import { DISHES } from '../../constants';
import Dish from './Dish';
import { capitalizeFirstLetter } from '../../helpers';
import Modal from '../../Modal';

// TODO: improve this shit/unifify ingredients dishes list view improve modal rendering
function DishesList() {
  const [showModal, setShowModal] = useState({ show: false, action: null, modalData: {} });
  const { show, action, modalData } = showModal;

  const handleDelete = (data) => {
    setShowModal({ show: !show, action: 0, modalData: data });
  };

  const handleEdit = (data) => {
    setShowModal({ show: !show, action: 1, modalData: data });
  };

  return (
    <div className="dishes-list-container">
      <ul className="dishes-list">
        {DISHES.map((dish) => (
          <Dish
            key={`${dish.label}-${dish.type}`}
            dish={dish}
            label={dish.label}
            type={dish.type}
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
            <div>{capitalizeFirstLetter(modalData.label)}</div>
            <div>{capitalizeFirstLetter(modalData.type)}</div>
            <div>{capitalizeFirstLetter(modalData.description)}</div>
          </div>
        </Modal>
        )}
    </div>

  );
}

export default DishesList;
