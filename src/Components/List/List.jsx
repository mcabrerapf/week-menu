import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import ListModal from './ListModal';
import './List.css';
import { useMainContext, MainContext } from '../../Context';
import Button from '../Button';
import { sortBy } from '../helpers';
import Input from '../Input';
import { INGREDIENT_TYPES, DISH_TYPES } from '../constants';
import { DISH_STRING } from '../../constants';

const filterList = (list, key, searchValue, filterValue) => {
  if (!searchValue && !filterValue) return list;

  return list.filter(({ name, type }) => {
    const filterMatch = type === filterValue;
    if (searchValue) {
      if (filterValue) {
        return name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 && filterMatch;
      }
      return name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
    }
    if (filterValue) return filterMatch;
    return true;
  });
};

const sortOptions = [{ id: 'name', name: 'Name' }, { id: 'type', name: 'Type' }];

function List({ listData }) {
  const { view } = useMainContext(MainContext);
  const [showModal, setShowModal] = useState({
    show: false, action: null, modalData: {},
  });
  const [searchValue, setSearchValue] = useState('');
  const [listFilter, setListFilter] = useState();
  const [listSort, setListSort] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

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

  const foundItems = filterList(listData, 'name', searchValue, listFilter);
  const sortedItems = sortBy(foundItems, listSort, 'alphabetical');
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
        <Input
          type="select"
          modifier="list-sort-by"
          value={listSort}
          id="filter-value"
          name="filter-value"
          label="Sort by:"
          onChange={({ target: { value } }) => setListSort(value)}
          selectOptions={sortOptions}
        />

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
            handleNameClick={handleNameClick}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}

        {!sortedItems.length && <h3 className="empty-list-message">So empty...</h3>}
      </ul>
      <div className="add-container">
        <Button
          modifier="add-button"
          type="button"
          onClick={() => setShowModal({ show: !show, action: 0, modalData: {} })}
        >
          <i className="fa fa-plus" aria-hidden="true" />

        </Button>
      </div>
      {show
        && (
          <ListModal
            modalData={modalData}
            action={action}
            setShowModal={setShowModal}
          />
        )}
    </div>
  );
}

List.propTypes = {
  listData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default List;
