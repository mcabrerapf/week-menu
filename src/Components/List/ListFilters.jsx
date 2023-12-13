import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { MainContext } from '../../Contexts/MainContext';
import Input from '../Input';
import { getFilterOptions } from './helpers';

function ListFilters({
  setFilterValue, setSearchValue, searchValue, filterValue,
}) {
  const {
    view,
  } = useContext(MainContext);
  const filterOptions = getFilterOptions(view);

  return (
    <div className="list-filters">
      <Input
        type="search"
        modifier="list-search-filter"
        value={searchValue}
        id="search-value"
        name="search-value"
        placeholder="🔍"
        onChange={({ target: { value } }) => setSearchValue(value)}
      />
      <Input
        type="select"
        modifier="list-filter-by"
        value={filterValue}
        id="filter-value"
        name="filter-value"
        onChange={({ target: { value } }) => setFilterValue(value)}
        placeholder="All"
        enableDefaultSelect
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
  );
}

ListFilters.propTypes = {
  setFilterValue: PropTypes.func.isRequired,
  setSearchValue: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  filterValue: PropTypes.string.isRequired,
};

export default ListFilters;