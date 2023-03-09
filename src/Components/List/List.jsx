import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import ListItem from './ListItem';
import ListModal from './ListModalContent';
import './List.css';
import { getModalHeader } from '../Modal/helpers';
import { useMainContext, MainContext } from '../../Context';

function List({ listData, setListData }) {
  const { view } = useMainContext(MainContext);
  const [showModal, setShowModal] = useState({
    show: false, action: null, modalData: {},
  });

  const {
    show, action, modalData,
  } = showModal;

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
    <div className="list-container">
      <ul className="list">
        {listData.map((listItem) => (
          <ListItem
            key={listItem.id}
            itemData={listItem}
            handleNameClick={handleNameClick}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </ul>
      <div className="add-container">
        <button
          className="add-button"
          type="button"
          onClick={() => setShowModal({ show: !show, action: 0, modalData: {} })}
        >
          <i className="fa fa-plus" aria-hidden="true" />

        </button>
      </div>
      {show
        && (
        <Modal
          headerText={getModalHeader(action, modalData.name, view)}
          hideModal={() => setShowModal({ show: false, action: null })}
        >
          <ListModal
            modalData={modalData}
            action={action}
            setParentData={setListData}
            setShowModal={setShowModal}
          />
        </Modal>
        )}
    </div>
  );
}

List.propTypes = {
  listData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setListData: PropTypes.func.isRequired,
};

export default List;
