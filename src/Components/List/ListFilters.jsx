import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { MainContext, ModalContext } from '../../Contexts';
import { LIST_FILTERS_STRING } from '../../constants/STRINGS';
import Input from '../Input';
import Button from '../Button';
import Icon from '../Icon';

function ListFilters({
  setFilterValue, setSearchValue, searchValue, filterValue,
}) {
  const {
    view,
  } = useContext(MainContext);
  const { addModal } = useContext(ModalContext);

  const openFiltersModal = () => {
    addModal({
      type: LIST_FILTERS_STRING,
      hideHeader: true,
      modalData: { name: view, filterValue },
      onClose: setFilterValue,
    });
  };

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
      <Button
        modifier="h-2 w-2 icon"
        fakeDisabled={!filterValue}
        onClick={openFiltersModal}
      >
        <Icon iconName="filter" />
      </Button>
      {/* <Input
        type="select"
        modifier="list-filter-by"
        value={filterValue}
        id="filter-value"
        name="filter-value"
        onChange={({ target: { value } }) => setFilterValue(value)}
        placeholder="All"
        enableDefaultSelect
        selectOptions={filterOptions}
      /> */}
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
