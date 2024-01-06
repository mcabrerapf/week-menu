import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { getFilterOptions } from './helpers';
import { MainContext } from '../../Contexts';
import Input from '../Input';

function ListFilters({
  setFilterValue, setSearchValue, searchValue, filterValue,
}) {
  const {
    view,
  } = useContext(MainContext);

  const filterOptions = getFilterOptions(view);

  return (
    <div className="row w-f centered top a-c gap-5 h-3 pad-5">
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
