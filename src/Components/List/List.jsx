import React, { useState, useContext, useEffect } from 'react';
import './List.css';
import {
  MENU_STRING, DELETE_STRING, SAVE_STRING, EDIT_STRING,
} from '../../constants/STRINGS';
import { MainContext } from '../../Contexts';
import { filterList, getListData } from './helpers';
import Button from '../Button';
import ListItem from './ListItem';
import ListFilters from './ListFilters';
import Icon from '../Icon';
import Modal from '../Modal';

function List() {
  const {
    view, updateCurrentMenu, handleDelete, handleSave, ...contextProps
  } = useContext(MainContext);

  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    setSearchValue('');
    setFilterValue('');
  }, [view]);

  const handleOpenModal = (mData) => {
    setShowModal(true);
    setModalData(mData);
  };

  const handleCloseEvent = async (event) => {
    const { type, data } = event;
    if (type === DELETE_STRING) await handleDelete(data, view);
    if (type === SAVE_STRING) await handleSave(data, view);
  };

  const handleCloseModal = async (closeEvent) => {
    if (closeEvent) {
      await handleCloseEvent(closeEvent);
      if (closeEvent.dontClose) return;
    }
    setShowModal(false);
    setModalData(null);
  };

  const handleLoadMenu = async (menuData) => {
    updateCurrentMenu(menuData);
  };

  const listData = getListData(view, contextProps);
  const filteredList = filterList(listData, searchValue, filterValue);

  return (
    <div className="list-container col h-f w-f">
      <ListFilters
        setFilterValue={setFilterValue}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        filterValue={filterValue}
        view={view}
      />
      <ul className="list h-a w-a overflow-y m-v-5">
        {filteredList.map((listItem) => (
          <ListItem
            key={listItem.id}
            itemType={view}
            itemData={listItem}
            handleOpenModal={handleOpenModal}
            handleLoadMenu={handleLoadMenu}
          />
        ))}
        {view !== MENU_STRING && (
        <Button
          modifier="circle xl icon-l shadow list-add-button"
          type="button"
          onClick={() => handleOpenModal({
            type: view, modalView: EDIT_STRING, itemData: {},
          })}
        >
          <Icon iconName="plus" />
        </Button>
        )}
      </ul>
      {showModal && <Modal closeModal={handleCloseModal} modalData={modalData} />}
    </div>
  );
}

export default List;
