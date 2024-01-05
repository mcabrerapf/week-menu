import React, { useState, useContext } from 'react';
import './List.css';
import { MainContext } from '../../Contexts/MainContext';
import { ModalContext } from '../../Contexts/ModalContext';
import Button from '../Button';
import { filterList, getListData } from './helpers';
import ListItem from './ListItem';
import ListFilters from './ListFilters';
import Icon from '../Icon';
import { MENU_BUILDER_STRING, MENU_STRING } from '../../constants';

function List() {
  const {
    view, setContextState, ...contextProps
  } = useContext(MainContext);
  const { addModal } = useContext(ModalContext);
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const handleOpenModal = (type, mode, data, modifier) => {
    addModal({
      type,
      mode,
      hideHeader: mode === 'delete',
      modalData: data,
      modifier: modifier || 'full',
    });
  };

  const handleLoadMenu = async (menuData) => {
    setContextState('currentMenu', menuData, MENU_BUILDER_STRING);
  };

  const listData = getListData(view, contextProps);
  const filteredList = filterList(listData, searchValue, filterValue);

  return (
    <div className="list-container col h-f">
      <ListFilters
        setFilterValue={setFilterValue}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        filterValue={filterValue}
      />
      <ul className="list col w-f overflow-y gap-5">
        {filteredList.map((listItem) => (
          <ListItem
            key={listItem.id}
            modifier={view}
            itemData={listItem}
            handleOpenModal={handleOpenModal}
            handleLoadMenu={handleLoadMenu}
          />
        ))}
        {view !== MENU_STRING && (
        <Button
          modifier="circle l icon shadow list-add-button"
          type="button"
          onClick={() => handleOpenModal(view, 'create', {})}
        >
          <Icon iconName="plus" />
        </Button>
        )}
      </ul>

    </div>
  );
}

export default List;
