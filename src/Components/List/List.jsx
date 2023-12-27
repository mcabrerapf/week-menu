import React, { useState, useContext } from 'react';
import './List.css';
import { MainContext } from '../../Contexts/MainContext';
import { ModalContext } from '../../Contexts/ModalContext';
import Button from '../Button';
// import { sortBy } from '../helpers';
import { filterList, getListData } from './helpers';
import ListItem from './ListItem';
import ListFilters from './ListFilters';
import { PlusIcon } from '../Icons';

function List() {
  const {
    view, currentMenu, updateCurrentMenu, ...contextProps
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

  const handleLoadMenu = (menuData) => {
    const { dishes } = menuData;
    const newCurrentMenu = { ...currentMenu, menuDishes: dishes };
    updateCurrentMenu(newCurrentMenu);
  };

  const listData = getListData(view, contextProps);
  const filteredList = filterList(listData, searchValue, filterValue);
  // const sortedItems = sortBy(foundItems, 'name', 'alphabetical');

  return (
    <div className="list-container">
      <ListFilters
        setFilterValue={setFilterValue}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        filterValue={filterValue}
      />
      <ul className="list">
        {filteredList.map((listItem) => (
          <ListItem
            key={listItem.id}
            modifier={view}
            itemData={listItem}
            handleOpenModal={handleOpenModal}
            handleLoadMenu={handleLoadMenu}
          />
        ))}
      </ul>
      {view !== 'menu' && (
      <div className="add-container">
        <Button
          modifier="circle l icon-only"
          type="button"
          onClick={() => handleOpenModal(view, 'create', {})}
        >
          <PlusIcon />
        </Button>
      </div>
      )}
    </div>
  );
}

export default List;
