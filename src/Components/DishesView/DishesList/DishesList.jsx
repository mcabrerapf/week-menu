import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './DishesList.css';
import Dish from './Dish';
import Modal from '../../Modal';
import DishModal from './DishModal/DishModal';

const getModalHeader = (action, name) => {
  switch (action) {
    case 1:
      return `Editing ${name}`;
    case 2:
      return 'Delete';

    default:
      return 'New Dish';
  }
};

// TODO: improve this shit/unifify ingredients dishes list view improve modal rendering
function DishesList({ dishes, setDishes }) {
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
        {dishes.map((dish) => (
          <Dish
            key={dish.id}
            dish={dish}
            name={dish.name}
            type={dish.type}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </ul>
      <div className="add-dish">
        <button
          className="add-dish-button"
          type="button"
          onClick={() => setShowModal({ show: !show, action: 0, modalData: {} })}
        >
          <i className="fa fa-plus" aria-hidden="true" />
        </button>
      </div>

      {show
        && (
        <Modal
          headerText={getModalHeader(action, modalData.name)}
          hideModal={() => setShowModal({ show: false, action: null })}
        >
          <DishModal
            dish={modalData}
            action={action}
            setDishes={setDishes}
            setShowModal={setShowModal}
          />
        </Modal>
        )}
    </div>

  );
}

DishesList.propTypes = {
  dishes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setDishes: PropTypes.func.isRequired,
};

export default DishesList;
