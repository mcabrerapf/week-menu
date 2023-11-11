import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import './List.css';
import { MainContext } from '../../Contexts/MainContext';
import { ModalContext } from '../../Contexts/ModalContext';
import Button from '../Button';
import { sortBy } from '../helpers';
import { filterList } from './helpers';
import ListFilters from './ListFilters';

function List({ listData }) {
  const {
    view, currentMenu, updateCurrentMenu,
  } = useContext(MainContext);
  const { addModal } = useContext(ModalContext);
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('');
  // const [listSort, setListSort] = useState('name');

  const handleOpenModal = (type, mode, data, modifier) => {
    addModal({
      type,
      mode,
      modalData: data,
      modifier: modifier || 'full',
    });
  };

  const handleLoadMenu = (menuData) => {
    const { dishes } = menuData;
    const newCurrentMenu = { ...currentMenu, menuDishes: dishes };
    updateCurrentMenu(newCurrentMenu);
  };

  const foundItems = filterList(listData, searchValue, filterValue);
  const sortedItems = sortBy(foundItems, 'name', 'alphabetical');

  return (
    <div className="list-container">
      <ListFilters
        setFilterValue={setFilterValue}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        filterValue={filterValue}
      />
      <ul className="list">
        {sortedItems.map((listItem) => (
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
          modifier="add-button"
          type="button"
          onClick={() => handleOpenModal('list', 'create', {})}
        >
          <i className="fa fa-plus" aria-hidden="true" />
        </Button>
      </div>
      )}
    </div>
  );
}

List.propTypes = {
  listData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default List;
