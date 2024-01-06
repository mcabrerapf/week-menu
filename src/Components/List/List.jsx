import React, { useState, useContext } from 'react';
import './List.css';
import { MENU_STRING } from '../../constants/STRINGS';
import { MainContext, ModalContext } from '../../Contexts';
import { filterList, getListData } from './helpers';
import Button from '../Button';
import ListItem from './ListItem';
import ListFilters from './ListFilters';
import Icon from '../Icon';

function List() {
  const {
    view, updateCurrentMenu, ...contextProps
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
    updateCurrentMenu(menuData);
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
