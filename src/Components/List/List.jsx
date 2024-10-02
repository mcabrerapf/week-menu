import React, { useState, useEffect } from 'react';
import './List.scss';
import {
  MENU_STRING, DELETE_STRING, SAVE_STRING, EDIT_STRING,
  UPDATE_STRING,
} from '../../constants/STRINGS';
import { filterList, getListData } from './helpers';
import Button from '../Button';
import ListItem from './ListItem';
import ListFilters from './ListFilters';
import Icon from '../Icon';
import Modal from '../Modal';
import { useMainContext } from '../../Contexts/MainContext';

function List() {
  const {
    view, updateCurrentMenu, handleDelete, handleSave, ...contextProps
  } = useMainContext();

  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    setSearchValue('');
    setFilterValue('');
  }, [view]);

  const handleOpenModal = (mData) => {
    setModalData(mData);
    setShowModal(true);
  };

  const handleCloseEvent = async (event) => {
    const { type, data } = event;
    if (type === DELETE_STRING) await handleDelete(data, view);
    if (type === SAVE_STRING) await handleSave(data, view);
    if (type === UPDATE_STRING) await handleSave(data, view);
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
    <div className="list-container col border-box pad-5 gap-5 h-f w-f">
      <ListFilters
        setFilterValue={setFilterValue}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        filterValue={filterValue}
        view={view}
      />
      <ul className="list h-f w-f col gap-5 pad-5 border-box overflow-y">
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
          modifier="list__add-button circle xl icon shadow"
          type="button"
          onClick={() => handleOpenModal({
            type: view, modalView: EDIT_STRING, itemData: {}, modifier: 'f',
          })}
        >
          <Icon iconName="plus" />
        </Button>
        )}
      </ul>
      {showModal && (
      <Modal
        // TODO rewrite all this
        closeModal={handleCloseModal}
        modalData={modalData}
      />
      )}
    </div>
  );
}

export default List;
