import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import './List.css';
import { MainContext } from '../../Contexts/MainContext';
import { ModalContext } from '../../Contexts/ModalContext';
import Button from '../Button';
import { sortBy } from '../helpers';
import Input from '../Input';
import { INGREDIENT_TYPES, DISH_TYPES } from '../constants';
import { DISH_STRING } from '../../constants';
import { filterList } from './helpers';

// const sortOptions = [{ id: 'name', name: 'Name' }, { id: 'type', name: 'Type' }];

function List({ listData }) {
  const { view } = useContext(MainContext);
  const { addModal } = useContext(ModalContext);
  const [searchValue, setSearchValue] = useState('');
  const [listFilter, setListFilter] = useState();
  // const [listSort, setListSort] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  const handleOpenModal = (type, mode, data) => {
    addModal({
      type,
      mode,
      modalData: data,
    });
  };

  const foundItems = filterList(listData, 'name', searchValue, listFilter);
  const sortedItems = sortBy(foundItems, 'name', 'alphabetical');
  const filterOptions = view === DISH_STRING ? DISH_TYPES : INGREDIENT_TYPES;
  const filtersClassName = `list-filters${showFilters ? '' : ' no-show'}`;
  const buttonText = `${showFilters ? 'Hide' : 'Show'} filters`;

  return (
    <div className="list-container">
      <div className={filtersClassName}>
        <Input
          type="text"
          modifier="list-search-filter"
          value={searchValue}
          id="search-value"
          name="search-value"
          label="Search: "
          onChange={({ target: { value } }) => setSearchValue(value)}
        />
        <Input
          type="select"
          modifier="list-filter-by"
          value={listFilter}
          id="filter-value"
          name="filter-value"
          onChange={({ target: { value } }) => setListFilter(value)}
          placeholder="None"
          enableDefaultSelect
          label="Filter by:"
          selectOptions={filterOptions}
        />
        {/* <Input
          type="select"
          modifier="list-sort-by"
          value={listSort}
          id="filter-value"
          name="filter-value"
          label="Sort by:"
          onChange={({ target: { value } }) => setListSort(value)}
          selectOptions={sortOptions}
        /> */}

      </div>
      <Button
        modifier="list-filters-toggle-button"
        buttonText={buttonText}
        onClick={() => setShowFilters(!showFilters)}
      />
      <ul className="list">
        {sortedItems.map((listItem) => (
          <ListItem
            key={listItem.id}
            modifier={view}
            itemData={listItem}
            handleOpenModal={handleOpenModal}
          />
        ))}

        {!sortedItems.length && <h3 className="empty-list-message">So empty...</h3>}
      </ul>
      <div className="add-container">
        <Button
          modifier="add-button"
          type="button"
          onClick={() => handleOpenModal('list', 'create', {})}
        >
          <i className="fa fa-plus" aria-hidden="true" />

        </Button>
      </div>
    </div>
  );
}

List.propTypes = {
  listData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default List;
